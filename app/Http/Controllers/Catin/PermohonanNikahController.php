<?php

namespace App\Http\Controllers\Catin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Mempelai;
use App\Models\OrangTua;
use App\Models\WaliNikah;
use App\Models\TandaTangan;
use Illuminate\Http\Request;
use App\Models\TemplateBerkas;
use App\Models\PermohonanNikah;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\BerkasPermohonanNikah;
use App\Models\StatusPermohonanNikah;
use App\Mail\NotifikasiPermohonanNikah;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;
use App\Http\Requests\StorePermohonanNikahRequest;

class PermohonanNikahController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:catin|kelurahan|puskesmas|kua|kecamatan')->only('show');
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;

        return Inertia::render('menu/permohonan-nikah/pages', [
            'permohonanNikah' => PermohonanNikah::with(['mempelaiPria.orangTua', 'mempelaiWanita.orangTua', 'user', 'latestStatus', 'berkasPermohonanNikah', 'jadwalBimbinganNikah'])->where('user_id', $userId)->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/permohonan-nikah/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request->all());
        DB::transaction(function () use ($request) {
            $userId = Auth::user()->id;
            // 1. Simpan pria
            $pria = Mempelai::create([
                'user_id' => $userId,
                'nama_lengkap' => $request->pria['nama_lengkap'],
                'nik' => $request->pria['nik'],
                'jenis_kelamin' => $request->pria['jenis_kelamin'],
                'tempat_lahir' => $request->pria['tempat_lahir'],
                'tanggal_lahir' => $request->pria['tanggal_lahir'],
                'kewarganegaraan' => $request->pria['kewarganegaraan'],
                'agama' => $request->pria['agama'],
                'pekerjaan' => $request->pria['pekerjaan'],
                'status_perkawinan' => $request->pria['status_perkawinan'],
                'alamat' => $request->pria['alamat'],
            ]);

            // 2. Simpan ayah & ibu pria
            OrangTua::create(array_merge($request->pria['ayah'], [
                'mempelai_id' => $pria->id,
                'jenis_kelamin' => 'Laki-laki',
            ]));

            OrangTua::create(array_merge($request->pria['ibu'], [
                'mempelai_id' => $pria->id,
                'jenis_kelamin' => 'Perempuan',
            ]));

            // 3. Simpan wanita
            $wanita = Mempelai::create([
                'user_id' => $userId,
                'nama_lengkap' => $request->wanita['nama_lengkap'],
                'nik' => $request->wanita['nik'],
                'jenis_kelamin' => $request->wanita['jenis_kelamin'],
                'tempat_lahir' => $request->wanita['tempat_lahir'],
                'tanggal_lahir' => $request->wanita['tanggal_lahir'],
                'kewarganegaraan' => $request->wanita['kewarganegaraan'],
                'agama' => $request->wanita['agama'],
                'pekerjaan' => $request->wanita['pekerjaan'],
                'status_perkawinan' => $request->wanita['status_perkawinan'],
                'alamat' => $request->wanita['alamat'],
            ]);

            // 4. Simpan ayah & ibu wanita
            OrangTua::create(array_merge($request->wanita['ayah'], [
                'mempelai_id' => $wanita->id,
                'jenis_kelamin' => 'Laki-laki',
            ]));

            OrangTua::create(array_merge($request->wanita['ibu'], [
                'mempelai_id' => $wanita->id,
                'jenis_kelamin' => 'Perempuan',
            ]));

            // 5. Tambahkan Data Mempelai wanita dan pria ke tabel permohonan nikah
            $permohonanNikah = PermohonanNikah::create([
                'user_id' => $userId,
                'mempelai_pria_id' => $pria->id,
                'mempelai_wanita_id' => $wanita->id,
            ]);

            StatusPermohonanNikah::create([
                'permohonan_nikah_id' => $permohonanNikah->id,
                'keterangan' => 'Menunggu diproses'
            ]);

            TandaTangan::create([
                'permohonan_nikah_id' => $permohonanNikah->id,
                'ttd_mempelai_pria' => $this->simpanTtd($request->input('pria.ttd'), 'ttd-mempelai-pria-' . now()->timestamp),
                'ttd_mempelai_wanita' => $this->simpanTtd($request->input('wanita.ttd'), 'ttd-mempelai-wanita-' . now()->timestamp),
                'ttd_ortu_l_mempelai_pria' => $this->simpanTtd($request->input('pria.ayah.ttd'), 'ttd-ortu-l-pria-' . now()->timestamp),
                'ttd_ortu_p_mempelai_pria' => $this->simpanTtd($request->input('pria.ibu.ttd'), 'ttd-ortu-p-pria-' . now()->timestamp),
                'ttd_ortu_l_mempelai_wanita' => $this->simpanTtd($request->input('wanita.ayah.ttd'), 'ttd-ortu-l-wanita-' . now()->timestamp),
                'ttd_ortu_p_mempelai_wanita' => $this->simpanTtd($request->input('wanita.ibu.ttd'), 'ttd-ortu-p-wanita-' . now()->timestamp),

                'ttd_wali_nikah' => $request->filled('wali_nikah.ttd')
                    ? $this->simpanTtd($request->input('wali_nikah.ttd'), 'ttd-wali-nikah-' . now()->timestamp)
                    : null,
            ]);


            if ($request->hasFile('file_path')) {
                BerkasPermohonanNikah::create([
                    'permohonan_nikah_id' => $permohonanNikah->id,
                    'dibuat_oleh' => $userId,
                    'nama_berkas' => 'Berkas Permohonan Nikah - ' . $pria->nama_lengkap . ' & ' . $wanita->nama_lengkap . ' - ' . now()->timestamp,
                    'file_path' => $request->file('file_path')->store('berkas-permohonan-nikah', 'public'),
                ]);
            }

            if ($request->ayah_adalah_wali === false) {
                WaliNikah::create([
                    'permohonan_nikah_id' => $permohonanNikah->id,
                    'nama_lengkap' => $request->wali_nikah['nama_lengkap'],
                    'nama_ayah' => $request->wali_nikah['nama_ayah'],
                    'tempat_lahir' => $request->wali_nikah['tempat_lahir'],
                    'tanggal_lahir' => $request->wali_nikah['tanggal_lahir'],
                    'kewarganegaraan' => $request->wali_nikah['kewarganegaraan'],
                    'agama' => $request->wali_nikah['agama'],
                    'pekerjaan' => $request->wali_nikah['pekerjaan'],
                    'status_hubungan' => $request->wali_nikah['status_hubungan'],
                    'alamat' => $request->wali_nikah['alamat'],
                ]);
            }

            $userKelurahan = User::role('kelurahan')->first();

            Mail::to($userKelurahan->email)->send(new NotifikasiPermohonanNikah($permohonanNikah->load([
                'mempelaiPria.orangTua',
                'mempelaiWanita.orangTua',
                'user',
            ])));
        });

        return to_route('catin.permohonan-nikah.index');
    }

    public function simpanTtd($base64, $filename)
    {
        [$type, $data] = explode(';', $base64);
        [, $data] = explode(',', $data);
        $image = base64_decode($data);
        Storage::disk('public')->put("ttd/$filename.png", $image);
        return "ttd/$filename.png";
    }


    /**
     * Display the specified resource.
     */
    public function show(PermohonanNikah $permohonanNikah)
    {
        return Inertia::render('menu/permohonan-nikah/show', [
            'permohonanNikah' => $permohonanNikah->load(['mempelaiPria.orangTua', 'mempelaiWanita.orangTua', 'user', 'latestStatus', 'jadwalBimbinganNikah', 'berkasPermohonanNikah']),
            'templateBerkas' => TemplateBerkas::latest()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermohonanNikah $permohonanNikah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermohonanNikah $permohonanNikah)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermohonanNikah $permohonanNikah)
    {
        //
    }

    public function buatSuratPermohonan()
    {
        // 
    }
}

<?php

namespace App\Http\Controllers\Global;

use Inertia\Inertia;
use App\Models\Mempelai;
use App\Models\OrangTua;
use Illuminate\Http\Request;
use App\Models\TemplateBerkas;
use App\Models\PermohonanNikah;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\StatusPermohonanNikah;
use App\Http\Requests\StorePermohonanNikahRequest;

class PermohonanNikahController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:kelurahan|puskesmas|kua|kecamatan');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        $relevantStatus = [
            'kelurahan' => [
                'Menunggu Verifikasi Kelurahan',
                'Diverifikasi Kelurahan',
                'Ditolak Kelurahan',
            ],
            'puskesmas' => [
                'Diverifikasi Kelurahan',
                'Diverifikasi Puskesmas',
                'Ditolak Puskesmas',
            ],
            'kua' => [
                'Diverifikasi Puskesmas',
                'Diverifikasi KUA',
                'Ditolak KUA',
            ],
            'kecamatan' => [
                'Menunggu Verifikasi Kelurahan',
                'Diverifikasi Kelurahan',
                'Ditolak Kelurahan',
                'Diverifikasi Puskesmas',
                'Ditolak Puskesmas',
                'Diverifikasi Puskesmas',
            ],
        ];

        $permohonanNikah = PermohonanNikah::with([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
            'latestStatus',
        ])
            ->when(
                $role === 'kecamatan',
                function ($query) use ($relevantStatus) {
                    $query->where(function ($q) use ($relevantStatus) {
                        $q->whereHas('latestStatus', function ($statusQuery) use ($relevantStatus) {
                            $statusQuery->whereIn('status_permohonan', $relevantStatus['kecamatan']);
                        })
                            ->orWhereRaw('DATEDIFF(tanggal_pernikahan, DATE(created_at)) <= 10');
                    });
                },
                function ($query) use ($relevantStatus, $role) {
                    if (isset($relevantStatus[$role])) {
                        $query->whereHas('latestStatus', function ($q) use ($relevantStatus, $role) {
                            $q->whereIn('status_permohonan', $relevantStatus[$role]);
                        });
                    }
                }
            )
            ->latest()
            ->get();


        return Inertia::render('menu/permohonan-nikah/pages', [
            'permohonanNikah' => $permohonanNikah
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
    public function store(StorePermohonanNikahRequest $request)
    {

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
        });

        return to_route('catin.permohonan-nikah.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(PermohonanNikah $permohonanNikah)
    {
        return Inertia::render('menu/permohonan-nikah/show', [
            'permohonanNikah' => $permohonanNikah->load(['mempelaiPria.orangTua', 'mempelaiWanita.orangTua', 'user', 'latestStatus', 'berkasPermohonanNikah']),
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
}

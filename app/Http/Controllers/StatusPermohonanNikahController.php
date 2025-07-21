<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PermohonanNikah;
use Illuminate\Support\Facades\Log;
use App\Models\JadwalBimbinganNikah;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\BerkasPermohonanNikah;
use App\Models\StatusPermohonanNikah;
use App\Mail\NotifikasiPermohonanNikah;
use App\Mail\NotifikasiProsesPermohonanNikahKelurahan;
use App\Mail\NotifikasiProsesPermohonanNikahKUA;
use App\Mail\NotifikasiProsesPermohonanNikahPuskesmas;
use App\Mail\NotifikasiProsesPeromohonanNikah;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;

class StatusPermohonanNikahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StatusPermohonanNikah $statusPermohonanNikah)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StatusPermohonanNikah $statusPermohonanNikah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StatusPermohonanNikah $statusPermohonanNikah)
    {
        $validatedData = $request->validate([
            'status_permohonan' => 'required|in:Menunggu Verifikasi Kelurahan,Diverifikasi Kelurahan,Ditolak Kelurahan',
            'keterangan' => 'required_if:status_permohonan,Ditolak Kelurahan',
            'berkas_permohonan' => 'required_if:status_permohonan,Diverifikasi Kelurahan',
            'nomor_surat' => 'required_if:status_permohonan,Diverifikasi Kelurahan',
        ]);

        $permohonanNikah = PermohonanNikah::with(['mempelaiPria.orangTua', 'mempelaiWanita.orangTua', 'user', 'tandaTangan'])
            ->where('id', $statusPermohonanNikah->permohonan_nikah_id)
            ->first();

        $statusPermohonanNikah->update($validatedData);

        switch ($validatedData['status_permohonan']) {
            case 'Menunggu Verifikasi Kelurahan':
                $progress = 25;
                break;

            case 'Diverifikasi Kelurahan':
                $progress = 50;
                break;

            case 'Ditolak Kelurahan':
                $progress = 45;
                break;

            case 'Diverifikasi Puskesmas':
                $progress = 75;
                break;

            case 'Ditolak Puskesmas':
                $progress = 45;
                break;

            case 'Diverifikasi KUA':
                $progress = 100;
                break;

            case 'Ditolak KUA':
                $progress = 45;
                break;

            case 'Selesai':
                $progress = 100;
                break;

            default:
                $progress = 0;
                break;
        }

        $permohonanNikah->update([
            'progress' => $progress,
        ]);

        if ($validatedData['status_permohonan'] === 'Diverifikasi Kelurahan') {
            $templatePath = Storage::disk('public')->path($validatedData['berkas_permohonan']);

            if (!Storage::disk('public')->exists($validatedData['berkas_permohonan'])) {
                return back()->with('error', 'berkas tidak ditemukan');
            }

            $templateProcessor = new TemplateProcessor($templatePath);

            $this->setValueDataCatin($templateProcessor, $permohonanNikah->mempelaiPria, 'catin_l');
            $this->setValueDataCatin($templateProcessor, $permohonanNikah->mempelaiWanita, 'catin_p');
            $this->setValueDataOrangTua($templateProcessor, 'ayah', $permohonanNikah->mempelaiPria->orangTua->firstWhere('jenis_kelamin', 'Laki-laki'), 'pria');
            $this->setValueDataOrangTua($templateProcessor, 'ibu', $permohonanNikah->mempelaiPria->orangTua->firstWhere('jenis_kelamin', 'Perempuan'), 'pria');
            $this->setValueDataOrangTua($templateProcessor, 'ibu', $permohonanNikah->mempelaiWanita->orangTua->firstWhere('jenis_kelamin', 'Perempuan'), 'wanita');
            $this->setValueDataOrangTua($templateProcessor, 'ayah', $permohonanNikah->mempelaiWanita->orangTua->firstWhere('jenis_kelamin', 'Laki-laki'), 'wanita');

            if ($permohonanNikah->ayah_adalah_wali) {
                $this->setValueWaliNikah($templateProcessor, $permohonanNikah->mempelaiPria->orangTua->firstWhere('jenis_kelamin', 'Laki-laki'), 'wali_nikah');
            } else {
                $templateProcessor->setValue('${nama_lengkap_wali_l}', '-');
                $templateProcessor->setValue('${nik_wali_l}', '-');
                $templateProcessor->setValue('${jenis_kelamin_wali_l}', '-');
                $templateProcessor->setValue('${tempat_lahir_wali_l}', '-');
                $templateProcessor->setValue('${tanggal_lahir_wali_l}', '-');
                $templateProcessor->setValue('${kewarganegaraan_wali_l}', '-');
                $templateProcessor->setValue('${agama_wali_l}', '-');
                $templateProcessor->setValue('${pekerjaan_wali_l}', '-');
                $templateProcessor->setValue('${alamat_wali_l}', '-');

                $templateProcessor->setValue('${nama_lengkap_wali_p}', '-');
                $templateProcessor->setValue('${nik_wali_p}', '-');
                $templateProcessor->setValue('${jenis_kelamin_wali_p}', '-');
                $templateProcessor->setValue('${tempat_lahir_wali_p}', '-');
                $templateProcessor->setValue('${tanggal_lahir_wali_p}', '-');
                $templateProcessor->setValue('${kewarganegaraan_wali_p}', '-');
                $templateProcessor->setValue('${agama_wali_p}', '-');
                $templateProcessor->setValue('${pekerjaan_wali_p}', '-');
                $templateProcessor->setValue('${alamat_wali_p}', '-');
            }

            $templateProcessor->setValue('${nomor_surat}', $validatedData['nomor_surat']);

            $tandaTanganPathCatinPria = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_mempelai_pria);
            $tandaTanganPathCatinWanita = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_mempelai_wanita);
            $tandaTanganPathOrtuPria_L = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_ortu_l_mempelai_pria);
            $tandaTanganPathOrtuPria_P = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_ortu_p_mempelai_pria);
            $tandaTanganPathOrtuWanita_L = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_ortu_l_mempelai_wanita);
            $tandaTanganPathOrtuWanita_P = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_ortu_p_mempelai_wanita);

            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathCatinPria, 'catin_l');
            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathCatinWanita, 'catin_p');
            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathOrtuPria_L, 'ayah_pria');
            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathOrtuPria_P, 'ibu_pria');
            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathOrtuWanita_L, 'ayah_wanita');
            $this->setValueTandaTangan($templateProcessor, $tandaTanganPathOrtuWanita_P, 'ibu_wanita');

            if ($permohonanNikah->ayah_adalah_wali) {
                $this->setValueTandaTangan($templateProcessor, $tandaTanganPathOrtuPria_L, 'wali_nikah');
            } else {
                $tandaTanganPathWaliNikah = Storage::disk('public')->path($permohonanNikah->tandaTangan->ttd_wali_nikah);
                $this->setValueTandaTangan($templateProcessor, $tandaTanganPathWaliNikah, 'wali_nikah');
            }

            $outputPath = 'generated-berkas/Surat Keterangan Nikah - ' . $permohonanNikah->user->name . ' - ' . now()->timestamp . '.docx';

            $berkasLama = BerkasPermohonanNikah::where('permohonan_nikah_id', $permohonanNikah->id)
                ->where('dibuat_oleh', Auth::user()->id)
                ->first();

            if ($berkasLama) {
                if (Storage::disk('public')->exists($berkasLama->file_path)) {
                    Storage::disk('public')->delete($berkasLama->file_path);
                }
                $berkasLama->delete();
            }

            Storage::disk('public')->makeDirectory('generated-berkas');

            $templateProcessor->saveAs(Storage::disk('public')->path($outputPath));

            BerkasPermohonanNikah::create([
                'permohonan_nikah_id' => $permohonanNikah->id,
                'dibuat_oleh' => Auth::user()->id,
                'nama_berkas' => 'Surat Keterangan Nikah' . ' - ' . $permohonanNikah->user->name . '-' . now()->timestamp,
                'file_path' => $outputPath,
            ]);

            $userPuskesmas = User::role('puskesmas')->first();

            Mail::to('moh.fikryansyah@gmail.com')->send(new NotifikasiPermohonanNikah($permohonanNikah->load([
                'mempelaiPria.orangTua',
                'mempelaiWanita.orangTua',
                'user',
            ])));

            $userPemohon = User::where('id', $permohonanNikah->user_id)->first();

            Mail::to($userPemohon->email)->send(new NotifikasiProsesPermohonanNikahKelurahan($permohonanNikah->load([
                'mempelaiPria.orangTua',
                'mempelaiWanita.orangTua',
                'user',
            ])));
        }

        return back();
    }

    public function updatePuskesmas(Request $request, StatusPermohonanNikah $statusPermohonanNikah)
    {
        $validatedData = $request->validate([
            'status_permohonan' => 'required|in:Diverifikasi Puskesmas,Ditolak Puskesmas',
            'keterangan' => 'required_if:status_permohonan,Ditolak Puskesmas',
            'berkas_permohonan' => 'required_if:status_permohonan,Diverifikasi Puskesmas',
            'nomor_surat' => 'required_if:status_permohonan,Diverifikasi Puskesmas',
        ]);

        $permohonanNikah = PermohonanNikah::with(['mempelaiPria.orangTua', 'mempelaiWanita.orangTua', 'user'])->where('id', $statusPermohonanNikah->permohonan_nikah_id)->first();

        $statusPermohonanNikah->update($validatedData);

        switch ($validatedData['status_permohonan']) {
            case 'Menunggu Verifikasi Kelurahan':
                $progress = 25;
                break;

            case 'Diverifikasi Kelurahan':
                $progress = 50;
                break;

            case 'Ditolak Kelurahan':
                $progress = 45;
                break;

            case 'Diverifikasi Puskesmas':
                $progress = 75;
                break;

            case 'Ditolak Puskesmas':
                $progress = 45;
                break;

            case 'Diverifikasi KUA':
                $progress = 100;
                break;

            case 'Ditolak KUA':
                $progress = 45;
                break;

            case 'Selesai':
                $progress = 100;
                break;

            default:
                $progress = 0;
                break;
        }


        $permohonanNikah->update([
            'progress' => $progress,
        ]);


        if ($validatedData['status_permohonan'] === 'Diverifikasi Puskesmas') {
            $templatePath = Storage::disk('public')->path($validatedData['berkas_permohonan']);

            if (!Storage::disk('public')->exists($validatedData['berkas_permohonan'])) {
                return 'berkas tidak ditemukan';
            }

            $templateProcessor = new TemplateProcessor($templatePath);

            $this->setValueDataCatin($templateProcessor, $permohonanNikah->mempelaiPria, 'catin_l');
            $this->setValueDataCatin($templateProcessor, $permohonanNikah->mempelaiWanita, 'catin_p');


            $templateProcessor->setValue('${nomor_surat}', $validatedData['nomor_surat']);

            $outputPath = 'generated-berkas/Surat Keterangan Bimbingan Keluarga - ' . $permohonanNikah->user->name . ' - ' . now()->timestamp . '.docx';

            $berkasLama = BerkasPermohonanNikah::where('permohonan_nikah_id', $permohonanNikah->id)->where('dibuat_oleh', Auth::user()->id)->first();
            if ($berkasLama) {
                if (Storage::disk('public')->exists($berkasLama->file_path)) {
                    Storage::disk('public')->delete($berkasLama->file_path);
                }
                $berkasLama->delete();
            }

            Storage::disk('public')->makeDirectory('generated-berkas');

            $templateProcessor->saveAs(Storage::disk('public')->path($outputPath));


            BerkasPermohonanNikah::create([
                'permohonan_nikah_id' => $permohonanNikah->id,
                'dibuat_oleh' => Auth::user()->id,
                'nama_berkas' => 'Surat Keterangan Bimbingan Kesehatan Keluarga' . ' - ' . $permohonanNikah->user->name . '-' . now()->timestamp,
                'file_path' => $outputPath,
            ]);
        }

        $userPuskesmas = User::role('kua')->first();

        Mail::to($userPuskesmas->email)->send(new NotifikasiPermohonanNikah($permohonanNikah->load([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
        ])));

        $userPemohon = User::where('id', $permohonanNikah->user_id)->first();

        Mail::to($userPemohon->email)->send(new NotifikasiProsesPermohonanNikahPuskesmas($permohonanNikah->load([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
        ])));

        return back();
    }

    public function updateKUA(Request $request, StatusPermohonanNikah $statusPermohonanNikah)
    {
        $validatedData = $request->validate([
            'status_permohonan' => 'required|in:Diverifikasi KUA,Ditolak KUA',
            'keterangan' => 'required_if:status_permohonan,Ditolak KUA',
            'lokasi_bimbingan' => 'required_if:status_permohonan,Diverifikasi KUA',
            'tanggal_bimbingan' => 'required_if:status_permohonan,Diverifikasi KUA',
        ]);

        $permohonanNikah = PermohonanNikah::where('id', $statusPermohonanNikah->permohonan_nikah_id)->first();

        $statusPermohonanNikah->update([
            'status_permohonan' => $validatedData['status_permohonan'],
            'keterangan' => $validatedData['keterangan'],
        ]);

        switch ($validatedData['status_permohonan']) {
            case 'Menunggu Verifikasi Kelurahan':
                $progress = 25;
                break;

            case 'Diverifikasi Kelurahan':
                $progress = 50;
                break;

            case 'Ditolak Kelurahan':
                $progress = 100;
                break;

            case 'Diverifikasi Puskesmas':
                $progress = 75;
                break;

            case 'Ditolak Puskesmas':
                $progress = 100;
                break;

            case 'Diverifikasi KUA':
                $progress = 100;
                break;

            case 'Ditolak KUA':
                $progress = 100;
                break;

            case 'Selesai':
                $progress = 100;
                break;

            default:
                $progress = 0;
                break;
        }

        $permohonanNikah->update([
            'progress' => $progress,
        ]);

        if ($validatedData['status_permohonan'] === 'Diverifikasi KUA') {
            JadwalBimbinganNikah::updateOrCreate(
                [
                    'permohonan_nikah_id' => $permohonanNikah->id,
                ],
                [
                    'lokasi_bimbingan' => $validatedData['lokasi_bimbingan'],
                    'tanggal_bimbingan' => $validatedData['tanggal_bimbingan'],
                ]
            );
        }

        $userPemohon = User::where('id', $permohonanNikah->user_id)->first();

        Mail::to($userPemohon->email)->send(new NotifikasiProsesPermohonanNikahKUA($permohonanNikah->load([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
            'jadwalBimbinganNikah',
        ])));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StatusPermohonanNikah $statusPermohonanNikah)
    {
        //
    }

    private function formatTanggal($tanggal)
    {
        return Carbon::parse($tanggal)->translatedFormat('d F Y');
    }

    private function setValueDataCatin($templateProcessor, $mempelai, $suffix)
    {
        $templateProcessor->setValue('${nama_lengkap_' . $suffix . '}', $mempelai->nama_lengkap);
        $templateProcessor->setValue('${nik_' . $suffix . '}', $mempelai->nik);
        $templateProcessor->setValue('${jenis_kelamin_' . $suffix . '}', $mempelai->jenis_kelamin);
        $templateProcessor->setValue('${tempat_lahir_' . $suffix . '}', $mempelai->tempat_lahir);
        $templateProcessor->setValue('${tanggal_lahir_' . $suffix . '}', $this->formatTanggal($mempelai->tanggal_lahir));
        $templateProcessor->setValue('${kewarganegaraan_' . $suffix . '}', $mempelai->kewarganegaraan);
        $templateProcessor->setValue('${agama_' . $suffix . '}', $mempelai->agama);
        $templateProcessor->setValue('${pekerjaan_' . $suffix . '}', $mempelai->pekerjaan);
        $templateProcessor->setValue('${alamat_' . $suffix . '}', $mempelai->alamat);
    }

    private function setValueDataOrangTua($templateProcessor, $ibuAtauAyah, $data, $ortuDari)
    {
        $templateProcessor->setValue('${nama_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->nama_lengkap);
        $templateProcessor->setValue('${nik_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->nik);
        $templateProcessor->setValue('${jenis_kelamin_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->jenis_kelamin);
        $templateProcessor->setValue('${tempat_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->tempat_lahir);
        $templateProcessor->setValue('${tanggal_' . $ibuAtauAyah . '_' . $ortuDari . '}', $this->formatTanggal($data->tanggal_lahir));
        $templateProcessor->setValue('${kewarganegaraan_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->kewarganegaraan);
        $templateProcessor->setValue('${agama_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->agama);
        $templateProcessor->setValue('${pekerjaan_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->pekerjaan);
        $templateProcessor->setValue('${alamat_' . $ibuAtauAyah . '_' . $ortuDari . '}', $data->alamat);
    }

    private function setValueWaliNikah($templateProcessor, $mempelai, $suffix)
    {
        $templateProcessor->setValue('${nama_lengkap_' . $suffix . '}', $mempelai->nama_lengkap);
        $templateProcessor->setValue('${nik_' . $suffix . '}', $mempelai->nik);
        $templateProcessor->setValue('${jenis_kelamin_' . $suffix . '}', $mempelai->jenis_kelamin);
        $templateProcessor->setValue('${tempat_lahir_' . $suffix . '}', $mempelai->tempat_lahir);
        $templateProcessor->setValue('${tanggal_lahir_' . $suffix . '}', $this->formatTanggal($mempelai->tanggal_lahir));
        $templateProcessor->setValue('${kewarganegaraan_' . $suffix . '}', $mempelai->kewarganegaraan);
        $templateProcessor->setValue('${agama_' . $suffix . '}', $mempelai->agama);
        $templateProcessor->setValue('${pekerjaan_' . $suffix . '}', $mempelai->pekerjaan);
        $templateProcessor->setValue('${alamat_' . $suffix . '}', $mempelai->alamat);
    }

    private function setValueTandaTangan($templateProcessor, $tandaTanganPath, $suffix)
    {
        if (!file_exists($tandaTanganPath)) {
            throw new \Exception('Gambar tanda tangan tidak ditemukan: ' . $tandaTanganPath);
        }

        $templateProcessor->setImageValue('tanda_tangan_' . $suffix, [
            'path' => $tandaTanganPath,
            'width' => 120,
            'height' => 80,
            'ratio' => true,
        ]);
    }
}

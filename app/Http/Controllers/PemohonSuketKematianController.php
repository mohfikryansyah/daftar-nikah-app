<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\TemplateBerkas;
use App\Models\BerkasPermohonanSuketKematian;
use Illuminate\Support\Facades\DB;
use App\Models\PemohonSuketKematian;
use Illuminate\Support\Facades\Auth;
use App\Models\PermohonanSuketKematian;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;
use App\Http\Requests\StorePemohonSuketKematianRequest;
use Carbon\Carbon;

class PemohonSuketKematianController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('role:catin|kecamatan')->except('show');
    //     $this->middleware('role:catin|kecamatan|kelurahan')->only('show');
    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        if ($role === 'kecamatan') {
            $permohonanSuketKematian = PermohonanSuketKematian::with([
                'yangMeninggal.user',
                'pemohon.user',
                'berkasSuketKematian'
            ])->get();
        } elseif ($role === 'catin') {
            $permohonanSuketKematian = PermohonanSuketKematian::whereHas('yangMeninggal.user', function ($query) {
                $query->where('id', Auth::user()->id);
            })->with([
                'yangMeninggal.user',
                'pemohon.user',
                'berkasSuketKematian'
            ])->get();
        } else {
            $permohonanSuketKematian = PermohonanSuketKematian::whereHas('yangMeninggal.user', function ($query) {
                $query->where('id', Auth::user()->id);
            })->with([
                'yangMeninggal.user',
                'pemohon.user',
                'berkasSuketKematian'
            ])->get();
        }


        return Inertia::render('menu/permohonan-surat-kematian/pages', compact('permohonanSuketKematian'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $templateBerkas = TemplateBerkas::latest()->get();
        return Inertia::render('menu/permohonan-surat-kematian/create', compact('templateBerkas'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePemohonSuketKematianRequest $request)
    {
        DB::beginTransaction();

        try {
            $yangMeninggal = PemohonSuketKematian::create([
                'user_id' => Auth::user()->id,
                ...$request->input('yang_meninggal'),
            ]);

            // 2. Buat yang bertanda tangan
            $pemohon = PemohonSuketKematian::create([
                'user_id' => Auth::user()->id,
                ...$request->input('pemohon'),
            ]);

            // 3. Buat permohonan surat
            $permohonan = PermohonanSuketKematian::create([
                'yang_meninggal' => $yangMeninggal->id,
                'pemohon' => $pemohon->id,
            ]);

            DB::commit();
            return to_route('catin.permohonan-surat-keterangan-kematian.index');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PermohonanSuketKematian $pemohonSuketKematian)
    {
        return Inertia::render('menu/permohonan-surat-kematian/show', [
            'permohonanSuketKematian' => $pemohonSuketKematian->load([
                'yangMeninggal.user',
                'pemohon.user',
                'berkasSuketKematian'
            ]),
            'templateBerkas' => TemplateBerkas::latest()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PemohonSuketKematian $pemohonSuketKematian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermohonanSuketKematian $pemohonSuketKematian)
    {
        $validatedData = $request->validate([
            'status_permohonan' => 'required|in:Menunggu Verifikasi Kecamatan,Diverifikasi Kecamatan,Ditolak Kecamatan',
            'keterangan' => 'required_if:status_permohonan,Ditolak Kecamatan',
            'berkas_permohonan' => 'required_if:status_permohonan,Diverifikasi Kecamatan',
            'nomor_surat' => 'required_if:status_permohonan,Diverifikasi Kecamatan',
        ]);

        $permohonan = $pemohonSuketKematian->load(['yangMeninggal', 'pemohon', 'berkasSuketKematian']);
        $pemohon = PemohonSuketKematian::where('id', $permohonan->pemohon)->first();
        $permohonan->update([
            'status' => $validatedData['status_permohonan']
        ]);


        if ($validatedData['status_permohonan'] === 'Diverifikasi Kecamatan') {
            $templatePath = Storage::disk('public')->path($validatedData['berkas_permohonan']);

            if (!Storage::disk('public')->exists($validatedData['berkas_permohonan'])) {
                return back()->with('error', 'berkas tidak ditemukan');
            }

            $templateProcessor = new TemplateProcessor($templatePath);

            // Data yang meninggal
            $templateProcessor->setValue('${ym_nama_lengkap}', $permohonan->yangMeninggal->nama_lengkap);
            $templateProcessor->setValue('${ym_bin_binti}', $permohonan->yangMeninggal->bin_binti);
            $templateProcessor->setValue('${ym_nik}', $permohonan->yangMeninggal->nik);
            $templateProcessor->setValue('${ym_tempat_lahir}', $permohonan->yangMeninggal->tempat_lahir);
            $templateProcessor->setValue('${ym_tgl_lahir}', $permohonan->yangMeninggal->tanggal_lahir);
            $templateProcessor->setValue('${ym_kewarganegaraan}', $permohonan->yangMeninggal->kewarganegaraan);
            $templateProcessor->setValue('${ym_agama}', $permohonan->yangMeninggal->agama);
            $templateProcessor->setValue('${ym_pekerjaan}', $permohonan->yangMeninggal->pekerjaan);
            $templateProcessor->setValue('${ym_alamat}', $permohonan->yangMeninggal->alamat);
            $templateProcessor->setValue('${ym_tanggal_meninggal}', $permohonan->yangMeninggal->tanggal_meninggal ?? '-');
            $templateProcessor->setValue('${ym_tempat_meninggal}', $permohonan->yangMeninggal->tempat_meninggal ?? '-');
            $templateProcessor->setValue('${ym_status}', $permohonan->yangMeninggal->status_hubungan_dengan_pemohon);

            // Data pemohon
            $templateProcessor->setValue('${p_nama_lengkap}', $pemohon->nama_lengkap);
            $templateProcessor->setValue('${p_bin_binti}', $pemohon->bin_binti);
            $templateProcessor->setValue('${p_nik}', $pemohon->nik);
            $templateProcessor->setValue('${p_tempat_lahir}', $pemohon->tempat_lahir);
            $templateProcessor->setValue('${p_tgl_lahir}', $pemohon->tanggal_lahir);
            $templateProcessor->setValue('${p_kewarganegaraan}', $pemohon->kewarganegaraan);
            $templateProcessor->setValue('${p_agama}', $pemohon->agama);
            $templateProcessor->setValue('${p_pekerjaan}', $pemohon->pekerjaan);
            $templateProcessor->setValue('${p_alamat}', $pemohon->alamat);

            $templateProcessor->setValue('${nomor_surat}', $validatedData['nomor_surat']);
            $templateProcessor->setValue('${created_at}', $this->getTanggal());

            $outputPath = 'generated-berkas/Surat Keterangan Kematian - ' . $permohonan->yangMeninggal->nama_lengkap . ' - ' . now()->timestamp . '.docx';

            $berkasLama = BerkasPermohonanSuketKematian::where('suket_kematian_id', $permohonan->id)->first();

            if ($berkasLama) {
                if (Storage::disk('public')->exists($berkasLama->file_path)) {
                    Storage::disk('public')->delete($berkasLama->file_path);
                }
                $berkasLama->delete();
            }

            Storage::disk('public')->makeDirectory('generated-berkas');

            $templateProcessor->saveAs(Storage::disk('public')->path($outputPath));

            BerkasPermohonanSuketKematian::create([
                'suket_kematian_id' => $permohonan->id,
                'nama_berkas' => 'Surat Keterangan Kematian - ' . $permohonan->yangMeninggal->nama_lengkap . ' - ' . now(),
                'file_path' => $outputPath,
                'nomor_surat' => $validatedData['nomor_surat'],
            ]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PemohonSuketKematian $pemohonSuketKematian)
    {
        //
    }

    private function getTanggal() {
        Carbon::setLocale('id');
        $tanggal = Carbon::now()->translatedFormat('d F Y');

        return $tanggal;
    }
}

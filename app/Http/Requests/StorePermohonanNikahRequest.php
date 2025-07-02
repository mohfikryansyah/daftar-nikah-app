<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermohonanNikahRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pria.nama_lengkap' => 'required|string|max:255',
            // 'pria.nik' => 'required|numeric|digits:16|unique:mempelais,nik',
            'pria.nik' => 'required|numeric|unique:mempelais,nik',
            'pria.jenis_kelamin' => 'in:Laki-laki',
            'pria.tempat_lahir' => 'required|string',
            'pria.tanggal_lahir' => 'required|date',
            'pria.kewarganegaraan' => 'required|string',
            'pria.agama' => 'required|string',
            'pria.pekerjaan' => 'required|string',
            'pria.status_perkawinan' => 'required|in:Belum Kawin,Kawin,Cerai Hidup,Cerai Mati,Janda,Duda,Perawan,Jejaka',
            'pria.alamat' => 'required|string',
            'pria.ttd' => 'required|string',

            'pria.ayah.nama_lengkap' => 'required|string',
            // 'pria.ayah.nik' => 'required|numeric|digits:16|unique:orang_tuas,nik',
            'pria.ayah.nik' => 'required|numeric|unique:orang_tuas,nik',
            'pria.ayah.jenis_kelamin' => 'in:Laki-laki',
            'pria.ayah.tempat_lahir' => 'required|string',
            'pria.ayah.tanggal_lahir' => 'required|date',
            'pria.ayah.kewarganegaraan' => 'required|string',
            'pria.ayah.agama' => 'required|string',
            'pria.ayah.pekerjaan' => 'required|string',
            'pria.ayah.status_hubungan' => 'required|in:Ayah,Wali,Lainnya',
            'pria.ayah.alamat' => 'required|string',
            'pria.ayah.ttd' => 'required|string',

            'pria.ibu.nama_lengkap' => 'required|string',
            // 'pria.ibu.nik' => 'required|numeric|digits:16|unique:orang_tuas,nik',
            'pria.ibu.nik' => 'required|numeric|unique:orang_tuas,nik',
            'pria.ibu.jenis_kelamin' => 'in:Perempuan',
            'pria.ibu.tempat_lahir' => 'required|string',
            'pria.ibu.tanggal_lahir' => 'required|date',
            'pria.ibu.kewarganegaraan' => 'required|string',
            'pria.ibu.agama' => 'required|string',
            'pria.ibu.pekerjaan' => 'required|string',
            'pria.ibu.status_hubungan' => 'required|in:Ibu,Wali,Lainnya',
            'pria.ibu.alamat' => 'required|string',
            'pria.ibu.ttd' => 'required|string',

            'wanita.nama_lengkap' => 'required|string|max:255',
            // 'wanita.nik' => 'required|numeric|digits:16|unique:mempelais,nik',
            'wanita.nik' => 'required|numeric|unique:mempelais,nik',
            'wanita.jenis_kelamin' => 'in:Perempuan',
            'wanita.tempat_lahir' => 'required|string',
            'wanita.tanggal_lahir' => 'required|date',
            'wanita.kewarganegaraan' => 'required|string',
            'wanita.agama' => 'required|string',
            'wanita.pekerjaan' => 'required|string',
            'wanita.status_perkawinan' => 'required|in:Belum Kawin,Kawin,Cerai Hidup,Cerai Mati,Janda,Duda,Perawan,Jejaka',
            'wanita.alamat' => 'required|string',
            'wanita.ttd' => 'required|string',

            'wanita.ayah.nama_lengkap' => 'required|string',
            // 'wanita.ayah.nik' => 'required|numeric|digits:16|unique:orang_tuas,nik',
            'wanita.ayah.nik' => 'required|numeric|unique:orang_tuas,nik',
            'wanita.ayah.jenis_kelamin' => 'in:Laki-laki',
            'wanita.ayah.tempat_lahir' => 'required|string',
            'wanita.ayah.tanggal_lahir' => 'required|date',
            'wanita.ayah.kewarganegaraan' => 'required|string',
            'wanita.ayah.agama' => 'required|string',
            'wanita.ayah.pekerjaan' => 'required|string',
            'wanita.ayah.status_hubungan' => 'required|in:Ayah,Wali,Lainnya',
            'wanita.ayah.alamat' => 'required|string',
            'wanita.ayah.ttd' => 'required|string',

            'wanita.ibu.nama_lengkap' => 'required|string',
            // 'wanita.ibu.nik' => 'required|numeric|digits:16|unique:orang_tuas,nik',
            'wanita.ibu.nik' => 'required|numeric|unique:orang_tuas,nik',
            'wanita.ibu.jenis_kelamin' => 'in:Perempuan',
            'wanita.ibu.tempat_lahir' => 'required|string',
            'wanita.ibu.tanggal_lahir' => 'required|date',
            'wanita.ibu.kewarganegaraan' => 'required|string',
            'wanita.ibu.agama' => 'required|string',
            'wanita.ibu.pekerjaan' => 'required|string',
            'wanita.ibu.status_hubungan' => 'required|in:Ibu,Wali,Lainnya',
            'wanita.ibu.alamat' => 'required|string',
            'wanita.ibu.ttd' => 'required|string',

            'file_path' => 'required|file|mimes:pdf|max:2048',
            
            'ayah_adalah_wali' => 'boolean',

            'wali_nikah.nama_lengkap' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.tempat_lahir' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.tanggal_lahir' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.kewarganegaraan' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.agama' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.pekerjaan' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.status_hubungan' => 'required_if:ayah_adalah_wali,0|in:Ayah Kandung,Wali',
            'wali_nikah.alamat' => 'required_if:ayah_adalah_wali,0',
            'wali_nikah.ttd' => 'required_if:ayah_adalah_wali,0',

        ];
    }

    public function messages(): array
{
    return [
        // Mempelai pria
        'pria.nama_lengkap.required' => 'Nama lengkap mempelai pria wajib diisi.',
        'pria.nik.required' => 'NIK mempelai pria wajib diisi.',
        'pria.nik.numeric' => 'NIK mempelai pria harus berupa angka.',
        'pria.nik.unique' => 'NIK mempelai pria sudah digunakan.',
        'pria.jenis_kelamin.in' => 'Jenis kelamin mempelai pria harus Laki-laki.',
        'pria.tempat_lahir.required' => 'Tempat lahir mempelai pria wajib diisi.',
        'pria.tanggal_lahir.required' => 'Tanggal lahir mempelai pria wajib diisi.',
        'pria.tanggal_lahir.date' => 'Tanggal lahir mempelai pria tidak valid.',
        'pria.kewarganegaraan.required' => 'Kewarganegaraan mempelai pria wajib diisi.',
        'pria.agama.required' => 'Agama mempelai pria wajib diisi.',
        'pria.pekerjaan.required' => 'Pekerjaan mempelai pria wajib diisi.',
        'pria.status_perkawinan.required' => 'Status perkawinan mempelai pria wajib diisi.',
        'pria.status_perkawinan.in' => 'Status perkawinan mempelai pria tidak valid.',
        'pria.alamat.required' => 'Alamat mempelai pria wajib diisi.',
        'pria.ttd.required' => 'Tanda Tangan mempelai pria wajib diisi.',

        // Ayah pria
        'pria.ayah.nama_lengkap.required' => 'Nama lengkap ayah mempelai pria wajib diisi.',
        'pria.ayah.nik.required' => 'NIK ayah mempelai pria wajib diisi.',
        'pria.ayah.nik.numeric' => 'NIK ayah mempelai pria harus berupa angka.',
        'pria.ayah.nik.unique' => 'NIK ayah mempelai pria sudah digunakan.',
        'pria.ayah.jenis_kelamin.in' => 'Jenis kelamin ayah mempelai pria harus Laki-laki.',
        'pria.ayah.tempat_lahir.required' => 'Tempat lahir ayah mempelai pria wajib diisi.',
        'pria.ayah.tanggal_lahir.required' => 'Tanggal lahir ayah mempelai pria wajib diisi.',
        'pria.ayah.tanggal_lahir.date' => 'Tanggal lahir ayah mempelai pria tidak valid.',
        'pria.ayah.kewarganegaraan.required' => 'Kewarganegaraan ayah mempelai pria wajib diisi.',
        'pria.ayah.agama.required' => 'Agama ayah mempelai pria wajib diisi.',
        'pria.ayah.pekerjaan.required' => 'Pekerjaan ayah mempelai pria wajib diisi.',
        'pria.ayah.status_hubungan.required' => 'Status hubungan ayah mempelai pria wajib diisi.',
        'pria.ayah.status_hubungan.in' => 'Status hubungan ayah mempelai pria tidak valid.',
        'pria.ayah.alamat.required' => 'Alamat ayah mempelai pria wajib diisi.',
        'pria.ayah.ttd.required' => 'Tanda Tangan ayah mempelai pria wajib diisi.',

        // Ibu pria
        'pria.ibu.nama_lengkap.required' => 'Nama lengkap ibu mempelai pria wajib diisi.',
        'pria.ibu.nik.required' => 'NIK ibu mempelai pria wajib diisi.',
        'pria.ibu.nik.numeric' => 'NIK ibu mempelai pria harus berupa angka.',
        'pria.ibu.nik.unique' => 'NIK ibu mempelai pria sudah digunakan.',
        'pria.ibu.jenis_kelamin.in' => 'Jenis kelamin ibu mempelai pria harus Perempuan.',
        'pria.ibu.tempat_lahir.required' => 'Tempat lahir ibu mempelai pria wajib diisi.',
        'pria.ibu.tanggal_lahir.required' => 'Tanggal lahir ibu mempelai pria wajib diisi.',
        'pria.ibu.tanggal_lahir.date' => 'Tanggal lahir ibu mempelai pria tidak valid.',
        'pria.ibu.kewarganegaraan.required' => 'Kewarganegaraan ibu mempelai pria wajib diisi.',
        'pria.ibu.agama.required' => 'Agama ibu mempelai pria wajib diisi.',
        'pria.ibu.pekerjaan.required' => 'Pekerjaan ibu mempelai pria wajib diisi.',
        'pria.ibu.status_hubungan.required' => 'Status hubungan ibu mempelai pria wajib diisi.',
        'pria.ibu.status_hubungan.in' => 'Status hubungan ibu mempelai pria tidak valid.',
        'pria.ibu.alamat.required' => 'Alamat ibu mempelai pria wajib diisi.',
        'pria.ibu.ttd.required' => 'Tanda Tangan ibu mempelai pria wajib diisi.',
        
        // Mempelai wanita
        'wanita.nama_lengkap.required' => 'Nama lengkap mempelai wanita wajib diisi.',
        'wanita.nik.required' => 'NIK mempelai wanita wajib diisi.',
        'wanita.nik.numeric' => 'NIK mempelai wanita harus berupa angka.',
        'wanita.nik.unique' => 'NIK mempelai wanita sudah digunakan.',
        'wanita.jenis_kelamin.in' => 'Jenis kelamin mempelai wanita harus Perempuan.',
        'wanita.tempat_lahir.required' => 'Tempat lahir mempelai wanita wajib diisi.',
        'wanita.tanggal_lahir.required' => 'Tanggal lahir mempelai wanita wajib diisi.',
        'wanita.tanggal_lahir.date' => 'Tanggal lahir mempelai wanita tidak valid.',
        'wanita.kewarganegaraan.required' => 'Kewarganegaraan mempelai wanita wajib diisi.',
        'wanita.agama.required' => 'Agama mempelai wanita wajib diisi.',
        'wanita.pekerjaan.required' => 'Pekerjaan mempelai wanita wajib diisi.',
        'wanita.status_perkawinan.required' => 'Status perkawinan mempelai wanita wajib diisi.',
        'wanita.status_perkawinan.in' => 'Status perkawinan mempelai wanita tidak valid.',
        'wanita.alamat.required' => 'Alamat mempelai wanita wajib diisi.',
        'wanita.ttd.required' => 'Tanda Tangan mempelai wanita wajib diisi.',
        
        // Ayah wanita
        'wanita.ayah.nama_lengkap.required' => 'Nama lengkap ayah mempelai wanita wajib diisi.',
        'wanita.ayah.nik.required' => 'NIK ayah mempelai wanita wajib diisi.',
        'wanita.ayah.nik.numeric' => 'NIK ayah mempelai wanita harus berupa angka.',
        'wanita.ayah.nik.unique' => 'NIK ayah mempelai wanita sudah digunakan.',
        'wanita.ayah.jenis_kelamin.in' => 'Jenis kelamin ayah mempelai wanita harus Laki-laki.',
        'wanita.ayah.tempat_lahir.required' => 'Tempat lahir ayah mempelai wanita wajib diisi.',
        'wanita.ayah.tanggal_lahir.required' => 'Tanggal lahir ayah mempelai wanita wajib diisi.',
        'wanita.ayah.tanggal_lahir.date' => 'Tanggal lahir ayah mempelai wanita tidak valid.',
        'wanita.ayah.kewarganegaraan.required' => 'Kewarganegaraan ayah mempelai wanita wajib diisi.',
        'wanita.ayah.agama.required' => 'Agama ayah mempelai wanita wajib diisi.',
        'wanita.ayah.pekerjaan.required' => 'Pekerjaan ayah mempelai wanita wajib diisi.',
        'wanita.ayah.status_hubungan.required' => 'Status hubungan ayah mempelai wanita wajib diisi.',
        'wanita.ayah.status_hubungan.in' => 'Status hubungan ayah mempelai wanita tidak valid.',
        'wanita.ayah.alamat.required' => 'Alamat ayah mempelai wanita wajib diisi.',
        'wanita.ayah.ttd.required' => 'Tanda Tangan ayah mempelai wanita wajib diisi.',

        // Ibu wanita
        'wanita.ibu.nama_lengkap.required' => 'Nama lengkap ibu mempelai wanita wajib diisi.',
        'wanita.ibu.nik.required' => 'NIK ibu mempelai wanita wajib diisi.',
        'wanita.ibu.nik.numeric' => 'NIK ibu mempelai wanita harus berupa angka.',
        'wanita.ibu.nik.unique' => 'NIK ibu mempelai wanita sudah digunakan.',
        'wanita.ibu.jenis_kelamin.in' => 'Jenis kelamin ibu mempelai wanita harus Perempuan.',
        'wanita.ibu.tempat_lahir.required' => 'Tempat lahir ibu mempelai wanita wajib diisi.',
        'wanita.ibu.tanggal_lahir.required' => 'Tanggal lahir ibu mempelai wanita wajib diisi.',
        'wanita.ibu.tanggal_lahir.date' => 'Tanggal lahir ibu mempelai wanita tidak valid.',
        'wanita.ibu.kewarganegaraan.required' => 'Kewarganegaraan ibu mempelai wanita wajib diisi.',
        'wanita.ibu.agama.required' => 'Agama ibu mempelai wanita wajib diisi.',
        'wanita.ibu.pekerjaan.required' => 'Pekerjaan ibu mempelai wanita wajib diisi.',
        'wanita.ibu.status_hubungan.required' => 'Status hubungan ibu mempelai wanita wajib diisi.',
        'wanita.ibu.status_hubungan.in' => 'Status hubungan ibu mempelai wanita tidak valid.',
        'wanita.ibu.alamat.required' => 'Alamat ibu mempelai wanita wajib diisi.',
        'wanita.ibu.ttd.required' => 'Tanda Tangan ibu mempelai wanita wajib diisi.',

        'file_path.required' => 'Berkas permohonan nikah wajib diunggah.',
        'file_path.file' => 'File permohonan nikah harus berupa file.',
        'file_path.mimes' => 'File permohonan nikah harus berformat PDF.',
        'file_path.max' => 'Ukuran file permohonan nikah maksimal 2MB.',

        'wali_nikah.nama_lengkap.required' => 'Nama lengkap mempelai wali_nikah wajib diisi.',
        'wali_nikah.nik.required' => 'NIK mempelai wali_nikah wajib diisi.',
        'wali_nikah.nik.numeric' => 'NIK mempelai wali_nikah harus berupa angka.',
        'wali_nikah.nik.unique' => 'NIK mempelai wali_nikah sudah digunakan.',
        'wali_nikah.jenis_kelamin.in' => 'Jenis kelamin mempelai wali_nikah harus Laki-laki.',
        'wali_nikah.tempat_lahir.required' => 'Tempat lahir mempelai wali_nikah wajib diisi.',
        'wali_nikah.tanggal_lahir.required' => 'Tanggal lahir mempelai wali_nikah wajib diisi.',
        'wali_nikah.tanggal_lahir.date' => 'Tanggal lahir mempelai wali_nikah tidak valid.',
        'wali_nikah.kewarganegaraan.required' => 'Kewarganegaraan mempelai wali_nikah wajib diisi.',
        'wali_nikah.agama.required' => 'Agama mempelai wali_nikah wajib diisi.',
        'wali_nikah.pekerjaan.required' => 'Pekerjaan mempelai wali_nikah wajib diisi.',
        'wali_nikah.status_perkawinan.required' => 'Status perkawinan mempelai wali_nikah wajib diisi.',
        'wali_nikah.status_perkawinan.in' => 'Status perkawinan mempelai wali_nikah tidak valid.',
        'wali_nikah.alamat.required' => 'Alamat mempelai wali_nikah wajib diisi.',
        'wali_nikah.ttd.required' => 'Tanda Tangan mempelai wali_nikah wajib diisi.',
    ];
}

}

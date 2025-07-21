<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePemohonSuketKematianRequest extends FormRequest
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
            'yang_meninggal.nama_lengkap' => ['required', 'string', 'max:255'],
            'yang_meninggal.bin_binti' => ['required', 'string', 'max:255'],
            'yang_meninggal.nik' => ['required', 'digits:16', 'unique:pemohon_suket_kematians,nik'],
            'yang_meninggal.tempat_lahir' => ['required', 'string', 'max:255'],
            'yang_meninggal.tanggal_lahir' => ['required', 'date'],
            'yang_meninggal.kewarganegaraan' => ['required', 'string', 'max:100'],
            'yang_meninggal.agama' => ['required', 'string', 'max:100'],
            'yang_meninggal.pekerjaan' => ['required', 'string', 'max:255'],
            'yang_meninggal.alamat' => ['required', 'string'],
            'yang_meninggal.tanggal_meninggal' => ['required', 'date'],
            'yang_meninggal.tempat_meninggal' => ['required', 'string', 'max:255'],
            'yang_meninggal.status_hubungan_dengan_pemohon' => ['required', 'string', 'in:Suami,Istri'],

            'pemohon.nama_lengkap' => ['required', 'string', 'max:255'],
            'pemohon.bin_binti' => ['required', 'string', 'max:255'],
            'pemohon.nik' => ['required', 'digits:16', 'unique:pemohon_suket_kematians,nik'],
            'pemohon.tempat_lahir' => ['required', 'string', 'max:255'],
            'pemohon.tanggal_lahir' => ['required', 'date'],
            'pemohon.kewarganegaraan' => ['required', 'string', 'max:100'],
            'pemohon.agama' => ['required', 'string', 'max:100'],
            'pemohon.pekerjaan' => ['required', 'string', 'max:255'],
            'pemohon.alamat' => ['required', 'string'],
        ];
    }
}

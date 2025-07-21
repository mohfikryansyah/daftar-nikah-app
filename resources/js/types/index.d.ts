import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    roles: string[];
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type StatusPerkawinan = 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati' | 'Duda' | 'Janda' | 'Perawan' | 'Jejaka';
export type StatusHubungan = 'Ayah' | 'Ibu' | 'Wali' | 'Lainnya';
export type JenisKelamin = 'Laki-laki' | 'Perempuan';

export type StatusPermohonanNikah =
  | 'Menunggu Verifikasi Kelurahan'
  | 'Diverifikasi Kelurahan'
  | 'Ditolak Kelurahan'
  | 'Diverifikasi Puskesmas'
  | 'Ditolak Puskesmas'
  | 'Diverifikasi KUA'
  | 'Ditolak KUA'
  | 'Diverifikasi Kecamatan'
  | 'Ditolak Kecamatan'
  | 'Selesai';


export interface Mempelai {
    id: string;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: JenisKelamin;
    tempat_lahir: string;
    tanggal_lahir: string;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    status_perkawinan: StatusPerkawinan;
    alamat: string;
    orang_tua: OrangTua[];
    created_at: string;
    updated_at: string;
}

export interface OrangTua {
    id: string;
    mempelai_id: string;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: JenisKelamin;
    tempat_lahir: string;
    tanggal_lahir: string;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
    status_hubungan: StatusHubungan;
    created_at: string;
    updated_at: string;
}

export interface PermohonanNikah {
    id: string;
    user_id: number;
    user: User;
    mempelai_pria_id: number;
    mempelai_pria: Mempelai;
    mempelai_wanita_id: number;
    mempelai_wanita: Mempelai;
    latest_status: StatusTerakhir;
    tanggal_formatted: string;
    berkas_permohonan_nikah: BerkasPermohonanNikah[];
    jadwal_bimbingan_nikah: JadwalBimbinganNikah | null;
    progress: number;
}

export interface StatusTerakhir {
    id: string;
    status_permohonan: StatusPermohonanNikah;
    keterangan: string;
    created_at: string;
    updated_at: string;
    
}

export interface TemplateBerkas {
    id: string;
    nama_berkas: string;
    path: string;
    created_at: string;
    updated_at: string;
}

export interface BerkasPermohonanNikah {
    id: string;
    permohonan_nikah: PermohonanNikah;
    dibuat_oleh: User;
    nama_berkas: string;
    file_path: string;
    created_at: string;
    updated_at: string;
}

export interface JadwalBimbinganNikah {
    id: string;
    permohonan_nikah: PermohonanNikah;
    tanggal_bimbingan: string;
    lokasi_bimbingan: string;
    created_at: string;
    updated_at: string;
}

export interface PemohonSuketKematian {
  id: string;
  user_id: number;
  nama_lengkap: string;
  bin_binti: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  kewarganegaraan: string;
  agama: string;
  pekerjaan: string;
  alamat: string;
  tanggal_meninggal?: string | null;
  tempat_meninggal?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BerkasPermohonanSuketKematian {
  id: number;
  nama_berkas: string;
  file_path: string;
  nomor_surat: string;
  created_at?: string;
  updated_at?: string;
}


export interface PermohonanSuketKematian {
  id: string;
  yang_meninggal: PemohonSuketKematian;
  pemohon: PemohonSuketKematian;
  status: string;
  berkas_suket_kematian: BerkasPermohonanSuketKematian[];
  created_at?: string;
  updated_at?: string;
  tanggal_formatted: string;
}


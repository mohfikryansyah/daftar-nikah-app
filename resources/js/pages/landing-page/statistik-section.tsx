import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatistikData {
    countAllPengaduan: number;
    countPengaduanDiproses: number;
    countPengaduanSelesai: number;
}

interface Props {
    data: StatistikData;
}

const AlurPendaftaranNikah = [
    {
        title: '1. Daftar Nikah',
        description:
            'Langkah pertama adalah mengajukan permohonan nikah melalui aplikasi. Pastikan semua dokumen yang diperlukan sudah lengkap dan sesuai dengan persyaratan yang berlaku.',
    },
    {
        title: '2. Verifikasi Dokumen',
        description:
            'Setelah pengajuan, petugas kelurahan akan memverifikasi dokumen yang telah diajukan. Memastikan semua informasi yang diberikan akurat dan lengkap.',
    },
    {
        title: '3. Pengecekan Kesehatan',
        description:
            'Setelah verifikasi kelurahan, calon pengantin akan menjalani pemeriksaan kesehatan di Puskesmas. Ini penting untuk memastikan kesehatan calon pengantin sebelum menikah.',
    },
    {
        title: '4. Persetujuan KUA',
        description:
            'Setelah semua langkah di atas selesai, permohonan akan diajukan ke KUA untuk mendapatkan persetujuan. Jika disetujui, calon pengantin tinggal menunggu jadwal bimbingan nikah.',
    },
];

export default function StatistikSection({ data }: Props) {
    return (
        <div className="w-full rounded-br-[20rem] bg-sky-50 p-8 py-20">
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
                <h1 className="text-center text-4xl font-semibold text-gray-800">Alur Pendaftaran Nikah</h1>
                <p className="mx-auto max-w-5xl text-center text-lg leading-8 text-gray-600">
                    Mau nikah? Yuk, ikuti alurnya! Mulai dari pengajuan, verifikasi dokumen, sampai persetujuan dari pihak KUA — semuanya transparan
                    dan gampang diikuti. Biar urusan nikah nggak ribet, tinggal ikuti tahapannya aja!
                </p>

                <div className="grid md:grid-cols-4">
                    {AlurPendaftaranNikah.map((step, index) => (
                        <Card key={index} className="m-2">
                            <CardHeader>
                                <CardTitle className="text-md font-semibold">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-md">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

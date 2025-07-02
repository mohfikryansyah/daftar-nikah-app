import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { hasRole } from '@/helpers/helpers';
import AppLayout from '@/layouts/app-layout';
import { getFileIcon, strLimit } from '@/lib/utils';
import { BreadcrumbItem, PermohonanNikah, SharedData, TemplateBerkas } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AksiPermohonanNikahKelurahan from './lainnya/aksi-kelurahan';
import AksiPermohonanNikahKUA from './lainnya/aksi-kua';
import AksiPermohonanNikahPuskesmas from './lainnya/aksi-puskesmas';
import DetailPermohonanNikah from './lainnya/detail-permohonan-nikah';
import RenderBiodataMempelai from './lainnya/render-biodata-mempelai';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ShowPermohonanNikah() {
    const { permohonanNikah } = usePage<{ permohonanNikah: PermohonanNikah }>().props;
    const { templateBerkas } = usePage<{ templateBerkas: TemplateBerkas[] }>().props;
    const mempelaiPria = permohonanNikah.mempelai_pria;
    const mempelaiWanita = permohonanNikah.mempelai_wanita;

    const { user } = usePage<SharedData>().props.auth;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Permohonan Nikah" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                {permohonanNikah.latest_status.status_permohonan === 'Diverifikasi KUA' && (
                    <Alert className="border-2 border-yellow-500 bg-yellow-50 text-yellow-800">
                        <AlertTitle>Jadwal Bimbingan Tersedia!</AlertTitle>
                        <AlertDescription>
                            Permohonan nikah ini telah memiliki jadwal bimbingan nikah. Silakan cek detailnya di bawah.
                            <br />
                            <strong>Lokasi:</strong> {permohonanNikah.jadwal_bimbingan_nikah?.lokasi_bimbingan || 'Belum ditentukan'}
                            <br />
                            <strong>Tanggal:</strong> {permohonanNikah.jadwal_bimbingan_nikah?.tanggal_bimbingan || 'Belum ditentukan'}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="grid grid-cols-1 not-[md]:gap-y-4 xl:grid-cols-3 xl:gap-4">
                    <div className="flex flex-col gap-4 overflow-x-auto xl:col-span-2">
                        <RenderBiodataMempelai data={mempelaiPria} />
                        <RenderBiodataMempelai data={mempelaiWanita} />
                    </div>
                    <div className="flex w-full flex-col gap-4 xl:col-span-1">
                        <DetailPermohonanNikah permohonanNikah={permohonanNikah} />
                        <Card>
                            <CardContent>
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">📎 Lampiran</h2>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                        {permohonanNikah.berkas_permohonan_nikah?.length > 0 ? (
                                            permohonanNikah.berkas_permohonan_nikah.map((berkas) => (
                                                <div
                                                    className="flex items-center gap-2 rounded-md border bg-white p-2 transition hover:shadow-sm"
                                                    key={berkas.id}
                                                    title={berkas.nama_berkas}
                                                >
                                                    <img src={getFileIcon(berkas.file_path)} alt="" className="size-7" />
                                                    <a
                                                        href={`/storage/${berkas.file_path}`}
                                                        className="text-sm text-blue-600 hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                    >
                                                        {strLimit(berkas.nama_berkas, 10)}
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground text-sm italic">Tidak ada lampiran</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {hasRole(user, ['kelurahan']) && (
                            <AksiPermohonanNikahKelurahan permohonanNikah={permohonanNikah} templateBerkas={templateBerkas} />
                        )}
                        {hasRole(user, ['puskesmas']) && (
                            <AksiPermohonanNikahPuskesmas permohonanNikah={permohonanNikah} templateBerkas={templateBerkas} />
                        )}
                        {hasRole(user, ['kua']) && <AksiPermohonanNikahKUA permohonanNikah={permohonanNikah} templateBerkas={templateBerkas} />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

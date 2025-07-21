import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { hasRole } from '@/helpers/helpers';
import AppLayout from '@/layouts/app-layout';
import { getFileIcon, strLimit } from '@/lib/utils';
import { BreadcrumbItem, PermohonanNikah, PermohonanSuketKematian, SharedData, TemplateBerkas } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import RenderBiodataMempelai from '../permohonan-nikah/lainnya/render-biodata-mempelai';
import DetailPermohonanNikah from '../permohonan-nikah/lainnya/detail-permohonan-nikah';
import DetailPermohonanSuketKematian from './lainnya/detail-permohonan-suket-kematian';
import BiodataPemohonSuketKematian from './lainnya/biodata-pemohon';
import AksiPermohonanSuketKematianKecamatan from './lainnya/aksi-kecamatan-suket-kematian';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ShowPermohonanNikah() {
    const { permohonanSuketKematian } = usePage<{ permohonanSuketKematian: PermohonanSuketKematian }>().props;
    console.log(permohonanSuketKematian)
    const { templateBerkas } = usePage<{ templateBerkas: TemplateBerkas[] }>().props;

    const { user } = usePage<SharedData>().props.auth;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Permohonan Nikah" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                <div className="grid grid-cols-1 not-[md]:gap-y-4 xl:grid-cols-3 xl:gap-4">
                    <div className="flex flex-col gap-4 overflow-x-auto xl:col-span-2">
                        <BiodataPemohonSuketKematian data={permohonanSuketKematian.pemohon} />
                        <BiodataPemohonSuketKematian data={permohonanSuketKematian.yang_meninggal} />
                    </div>
                    <div className="flex w-full flex-col gap-4 xl:col-span-1">
                        <DetailPermohonanSuketKematian data={permohonanSuketKematian} />
                        <Card>
                            <CardContent>
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">📎 Lampiran</h2>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                        {permohonanSuketKematian.berkas_suket_kematian?.length > 0 ? (
                                            permohonanSuketKematian.berkas_suket_kematian.map((berkas) => (
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
                        {hasRole(user, ['kecamatan', 'catin']) && <AksiPermohonanSuketKematianKecamatan permohonanSuketKematian={permohonanSuketKematian} templateBerkas={templateBerkas} />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

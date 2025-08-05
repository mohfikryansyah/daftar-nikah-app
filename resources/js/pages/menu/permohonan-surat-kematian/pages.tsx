import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { hasRole } from '@/helpers/helpers';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PermohonanSuketKematian, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function SuratKeteranganKematian() {
    const { permohonanSuketKematian } = usePage<{ permohonanSuketKematian: PermohonanSuketKematian[] }>().props;
    const { user } = usePage<SharedData>().props.auth;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permohonan Surat Kematian" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={permohonanSuketKematian}>
                    {hasRole(user, ['catin']) && (
                        <Link href={route('catin.permohonan-surat-keterangan-kematian.create')}>
                            <Button className="h-8">Buat Permohonan</Button>
                        </Link>
                    )}
                </DataTable>
            </div>
        </AppLayout>
    );
}

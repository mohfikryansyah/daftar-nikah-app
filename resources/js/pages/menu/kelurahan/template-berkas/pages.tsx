import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TemplateBerkas as TypeTemplateBerkas } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function TemplateBerkas() {
    const { templateBerkas } = usePage<{ templateBerkas: TypeTemplateBerkas[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Berkas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={templateBerkas}>
                    <Link href={route('kelurahan.template-berkas.create')}>
                        <Button className="h-8">Unggah Berkas</Button>
                    </Link>
                </DataTable>
            </div>
        </AppLayout>
    );
}

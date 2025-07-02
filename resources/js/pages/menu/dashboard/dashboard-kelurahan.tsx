import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PermohonanNikah, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Chart from './chart';
import { DataTable } from '@/components/datatable/data-table';
import { columns } from '../permohonan-nikah/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
type LocalTypePermohonanNikah = {
    created_at: string;
};

interface Props {
    permohonanNikahChart: LocalTypePermohonanNikah[];
    permohonanNikah: PermohonanNikah[]
}

export default function DashboardKUA({ permohonanNikahChart, permohonanNikah }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Kelurahan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h2 className="text-xl font-semibold tracking-tight">{`Selamat datang, ${auth.user.name}`}</h2>
                <div className="grid md:grid-cols-2 gap-2">
                    <Card>
                        <CardContent>
                            <Chart data={permohonanNikahChart}></Chart>
                        </CardContent>
                    </Card>
                    <Card className='max-h-[500px]'>
                        <CardHeader>
                            <CardTitle>Daftar Permohonan Nikah Terbaru  </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={permohonanNikah}></DataTable>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

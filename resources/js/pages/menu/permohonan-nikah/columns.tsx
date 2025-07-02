import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { PermohonanNikah, StatusPermohonanNikah } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getStatusBadgeClass } from '@/helpers/helpers';
// import useDelete from '@/hooks/use-delete';

export const columns: ColumnDef<PermohonanNikah>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'user.name',
        id: 'nama',
        header: 'Didaftarkan oleh',
    },
    {
        accessorKey: 'mempelai_pria.nama_lengkap',
        id: 'mempelai pria',
        header: 'Mempelai Pria',
    },
    {
        accessorKey: 'mempelai_wanita.nama_lengkap',
        id: 'mempelai wanita',
        header: 'Mempelai Wanita',
    },
    {
        accessorKey: 'latest_status.status_permohonan',
        id: 'status permohonan',
        header: 'Status Permohonan',
        cell: ({ row }) => {
            const status = row.original.latest_status.status_permohonan as StatusPermohonanNikah

            return (
                <Badge variant={"default"} className={cn(getStatusBadgeClass(status))}>{status}</Badge>
            )
        }
    },
    {
        accessorKey: 'tanggal_formatted',
        id: 'tanggal mendaftar',
        header: 'Tanggal mendaftar',
    },
    {
        accessorKey: 'aksi',
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className="flex items-center">
                    <Link href={route('catin.permohonan-nikah.show', { permohonanNikah: data })}>
                        <Button variant="ghost" size="sm" title="Lihat detail">
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];

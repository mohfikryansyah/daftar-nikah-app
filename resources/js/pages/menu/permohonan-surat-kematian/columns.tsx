import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusBadgeClassKecamatan } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { PermohonanSuketKematian } from '@/types';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
// import useDelete from '@/hooks/use-delete';

export const columns: ColumnDef<PermohonanSuketKematian>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'pemohon.nama_lengkap',
        id: 'pemohon.nama',
        header: 'Pemohon',
    },
    {
        accessorKey: 'yang_meninggal.nama_lengkap',
        id: 'yang_meninggal.nama',
        header: 'Yang Meninggal',
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return <Badge className={cn(getStatusBadgeClassKecamatan(row.getValue('status')))}>{row.getValue('status')}</Badge>;
        },
    },
    {
        id: 'nomor_surat',
        header: 'Nomor Surat',
        cell: ({ row }) => {
            const berkas = row.original.berkas_suket_kematian;

            const nomorSurat = berkas && berkas.length > 0 ? berkas[0].nomor_surat : '-';

            return <span>{nomorSurat}</span>;
        },
    },
    {
        accessorKey: 'tanggal_formatted',
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
                    <Link href={route('catin.permohonan-surat-keterangan-kematian.show', { pemohonSuketKematian: data })}>
                        <Button variant="ghost" size="sm" title="Lihat detail">
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];

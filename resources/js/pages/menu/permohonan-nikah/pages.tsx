import { DataTable } from '@/components/datatable/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getProgressColor, getStatusBadgeClass, hasRole } from '@/helpers/helpers';
import AppLayout from '@/layouts/app-layout';
import { cn, getFileIcon, strLimit } from '@/lib/utils';
import { BreadcrumbItem, SharedData, PermohonanNikah as TypePermohonanNikah } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns } from './columns';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    permohonanNikah: TypePermohonanNikah[];
}

export default function PermohonanNikah({ permohonanNikah }: Props) {
    const { user } = usePage<SharedData>().props.auth;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permohonan Nikah" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {permohonanNikah.length == 0 ? (
                    <>
                        {hasRole(user, ['kelurahan', 'kua', 'puskesmas']) ? (
                            <>
                                <Heading className="mb-4" title="Daftar Permohonan Nikah" />
                                <DataTable columns={columns} data={permohonanNikah} />
                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <div className="flex flex-col space-y-4 text-center">
                                    {/* <SplitText className="text-primary text-2xl font-bold md:text-4xl xl:text-5xl">Halo, {user.name}</SplitText> */}

                                    <motion.div
                                        className="mx-auto max-w-fit space-y-6 py-12 text-center"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        <motion.h1 variants={item} className="text-primary text-2xl font-bold md:text-4xl xl:text-5xl">
                                            Halo, {user.name}
                                        </motion.h1>

                                        <motion.p variants={item} className="text-muted-foreground mx-auto max-w-xl text-xl">
                                            Sepertinya kamu belum mengajukan permohonan nikah nih. Yuk mulai perjalanan sakralmu dengan melengkapi
                                            data calon mempelai terlebih dahulu.
                                        </motion.p>

                                        <motion.div variants={item}>
                                            <Link href={route('catin.permohonan-nikah.create')}>
                                                <Button variant="default" className="cursor-pointer">
                                                    Klik di sini
                                                </Button>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        {hasRole(user, ['kelurahan', 'kua', 'puskesmas', 'kecamatan']) ? (
                            <DataTable columns={columns} data={permohonanNikah} />
                        ) : (
                            <>
                                <Heading title="Daftar Permohonan Nikah Anda" />
                                <div className="flex h-full w-full max-w-3xl flex-col gap-6">
                                    {permohonanNikah.map((permohonan) => (
                                        <Card key={permohonan.id} className="transition-shadow duration-300 hover:shadow-md">
                                            <CardHeader className="pb-1">
                                                <CardTitle className="items-center justify-between text-base md:flex">
                                                    <p className="text-muted-foreground">Status Permohonan</p>
                                                    <Badge className={cn(getStatusBadgeClass(permohonan.latest_status.status_permohonan))}>
                                                        {permohonan.latest_status.status_permohonan}
                                                    </Badge>
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="space-y-5">
                                                {/* Progress */}
                                                <div>
                                                    <div className="text-muted-foreground mb-1 flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="font-medium">{permohonan.progress}%</span>
                                                    </div>
                                                    <Progress
                                                        value={permohonan.progress}
                                                        className={cn(getProgressColor(permohonan.progress))}
                                                        customStyle="h-4 rounded-full shadow-inner"
                                                    />
                                                </div>

                                                {/* Jadwal Bimbingan */}
                                                <div className="rounded-xl border bg-gray-50 px-4 py-3">
                                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">📅 Jadwal Bimbingan</h2>
                                                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                                                        <MapPin className="text-primary h-4 w-4" />
                                                        <span>
                                                            <span className="font-medium text-gray-800">Lokasi: </span>
                                                            {permohonan.jadwal_bimbingan_nikah?.lokasi_bimbingan || 'Belum ditentukan'}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                                                        <Clock className="text-primary h-4 w-4" />
                                                        <span>
                                                            <span className="font-medium text-gray-800">Waktu: </span>
                                                            {permohonan.jadwal_bimbingan_nikah?.tanggal_bimbingan || 'Belum ditentukan'}
                                                        </span>
                                                    </p>
                                                </div>

                                                {/* Info Mempelai */}
                                                <div className="rounded-xl border bg-white p-4">
                                                    <h2 className="mb-3 text-sm font-semibold text-gray-700">💍 Data Mempelai</h2>
                                                    <div className="grid gap-y-2 text-sm sm:grid-cols-2">
                                                        <div>
                                                            <p className="text-primary font-semibold">{permohonan.mempelai_pria.nama_lengkap}</p>
                                                            <p className="text-muted-foreground text-xs">
                                                                ({permohonan.mempelai_pria.jenis_kelamin})
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-primary font-semibold">{permohonan.mempelai_wanita.nama_lengkap}</p>
                                                            <p className="text-muted-foreground text-xs">
                                                                ({permohonan.mempelai_wanita.jenis_kelamin})
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Lampiran */}
                                                <div>
                                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">📎 Lampiran</h2>
                                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                                        {permohonan.berkas_permohonan_nikah?.length > 0 ? (
                                                            permohonan.berkas_permohonan_nikah.map((berkas) => (
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
                                                                        {strLimit(berkas.nama_berkas, 25)}
                                                                    </a>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-muted-foreground text-sm italic">Tidak ada lampiran</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="w-full">
                                                <Link
                                                    href={route('catin.permohonan-nikah.show', { permohonanNikah: permohonan })}
                                                    className="not-md:w-full"
                                                >
                                                    <Button variant="default" className="mt-2 w-full rounded-xl">
                                                        📄 Lihat Detail
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

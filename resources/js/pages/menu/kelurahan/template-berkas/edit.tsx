import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Template Berkas',
        href: '/kelurahan/template-berkas',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

type TemplateBerkas = {
    id: number;
    nama_berkas: string;
    path: string;
};

type EditTemplateBerkasProps = {
    templateBerkas: TemplateBerkas;
};

export default function EditTemplateBerkas({ templateBerkas }: EditTemplateBerkasProps) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        nama_berkas: templateBerkas.nama_berkas,
        path: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('kelurahan.template-berkas.update', templateBerkas), {
            onSuccess: () => {
                toast.success('Template berkas berhasil diperbarui!');
            },
            onError: () => {
                toast.error('Gagal memperbarui template berkas.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Template Berkas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Edit Template Berkas Nikah</CardTitle>
                        <CardDescription>
                            Kamu bisa mengganti nama atau mengunggah file baru. File sebelumnya akan diganti jika kamu upload file baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Nama Berkas</Label>
                                <Input
                                    value={data.nama_berkas}
                                    onChange={(e) => setData('nama_berkas', e.target.value)}
                                />
                                {errors.nama_berkas && (
                                    <p className="text-sm text-red-500">{errors.nama_berkas}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Upload File Baru (opsional)</Label>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        setData('path', e.target.files?.[0] ?? null)
                                    }
                                />
                                {errors.path && (
                                    <p className="text-sm text-red-500">{errors.path}</p>
                                )}
                            </div>
                            <Button type="submit" disabled={processing || !isDirty}>
                                Simpan Perubahan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

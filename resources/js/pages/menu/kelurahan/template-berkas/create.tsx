import InputError from '@/components/input-error';
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
];

type TemplateBerkasForm = {
    nama_berkas: string;
    path: File | null;
};

export default function CreateTemplateBerkas() {
    const { data, setData, post, processing, reset, errors, isDirty } = useForm<TemplateBerkasForm>({
        nama_berkas: '',
        path: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('kelurahan.template-berkas.store'), {
            onSuccess: () => {
                toast.success('Berhasil menggunggah template berkas.', {
                    duration: 3000,
                });
            },
            onError: () => {
                //
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Template Berkas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className='max-w-3xl'>
                    <CardHeader>
                        <CardTitle>Form Template Berkas Nikah</CardTitle>
                        <CardDescription>
                            Silakan lengkapi data dan unggah dokumen yang diperlukan untuk keperluan administrasi pernikahan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Nama Berkas</Label>
                                <Input
                                    value={data.nama_berkas}
                                    onChange={(e) => {
                                        setData('nama_berkas', e.target.value);
                                    }}
                                />
                                <InputError message={errors.nama_berkas}/>
                            </div>
                            <div className="grid gap-2">
                                <Label>Nama Berkas</Label>
                                <Input
                                    type="file"
                                    onChange={(e) => {
                                        setData('path', e.target.files && e.target.files[0] ? e.target.files[0] : null);
                                    }}
                                    accept='.docx'
                                />
                                <InputError message={errors.path}/>
                            </div>
                            <Button type="submit" disabled={!isDirty || processing}>
                                Simpan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

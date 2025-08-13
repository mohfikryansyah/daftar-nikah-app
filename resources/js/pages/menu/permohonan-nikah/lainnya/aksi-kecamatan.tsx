import Required from '@/components/custom/tanda-required';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PermohonanNikah, TemplateBerkas } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormUpdateStatusPermohonan = {
    berkas_permohonan: string;
    nomor_surat: string;
};

export default function AksiPermohonanNikahKecamatan({
    permohonanNikah,
    templateBerkas,
}: {
    permohonanNikah: PermohonanNikah;
    templateBerkas: TemplateBerkas[];
}) {
    const { data, setData, put, errors, reset, processing, isDirty } = useForm<FormUpdateStatusPermohonan>({
        berkas_permohonan: '',
        nomor_surat: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('status-permohonan-nikah.update-kecamatan', { statusPermohonanNikah: permohonanNikah.latest_status.id }), {
            onSuccess: () => {
                toast.success('Berhasil mempebarui status');
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal mempebarui status!');
            },
        });
    };

    return (
        <Card className="w-full xl:max-h-fit">
            <CardHeader>
                <CardTitle>Aksi</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label>
                            Nomor Surat Pengantar Nikah
                            <Required />
                        </Label>
                        <Input value={data.nomor_surat} onChange={(e) => setData('nomor_surat', e.target.value)} />
                        <InputError message={errors.nomor_surat}></InputError>
                    </div>
                    <div className="grid gap-2">
                        <Label>
                            Berkas
                            <Required />
                        </Label>
                        <Select value={data.berkas_permohonan} onValueChange={(value) => setData('berkas_permohonan', value)} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Berkas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {templateBerkas.map((berkas) => (
                                        <SelectItem value={berkas.path}>{berkas.nama_berkas}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.berkas_permohonan}></InputError>
                    </div>
                    <Button disabled={processing || !isDirty} type="submit" variant={'default'} className="w-full">
                        Simpan
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

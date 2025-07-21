import Required from '@/components/custom/tanda-required';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PermohonanSuketKematian, StatusPermohonanNikah, TemplateBerkas } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormUpdateStatusPermohonan = {
    status_permohonan: string;
    keterangan: string;
    berkas_permohonan: string;
    nomor_surat: string;
};

export default function AksiPermohonanSuketKematianKecamatan({
    permohonanSuketKematian,
    templateBerkas,
}: {
    permohonanSuketKematian: PermohonanSuketKematian;
    templateBerkas: TemplateBerkas[];
}) {
    const { data, setData, put, errors, reset, processing, isDirty } = useForm<FormUpdateStatusPermohonan>({
        status_permohonan: permohonanSuketKematian.status,
        keterangan: '',
        berkas_permohonan: '',
        nomor_surat: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('catin.permohonan-surat-keterangan-kematian.update', { pemohonSuketKematian: permohonanSuketKematian.id }), {
            onSuccess: () => {
                toast.success('Berhasil mempebarui status');
                reset();
            },
            onError: (errors) => {
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
                            Status
                            <Required />
                        </Label>
                        <Select
                            defaultValue={data.status_permohonan}
                            onValueChange={(value) => setData('status_permohonan', value as StatusPermohonanNikah)}
                            required
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Menunggu verifikasi">Menunggu verifikasi</SelectItem>
                                    <SelectItem value="Diverifikasi Kecamatan">Diverifikasi Kecamatan</SelectItem>
                                    <SelectItem value="Ditolak Kecamatan">Ditolak Kecamatan</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status_permohonan}></InputError>
                    </div>
                    {data.status_permohonan === 'Diverifikasi Kecamatan' && (
                        <>
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
                            <div className="grid gap-2">
                                <Label>
                                    Nomor Surat Keterangan Kematian
                                    <Required />
                                </Label>
                                <Input value={data.nomor_surat} onChange={(e) => setData('nomor_surat', e.target.value)} />
                                <InputError message={errors.nomor_surat}></InputError>
                            </div>
                        </>
                    )}
                    <div className="grid gap-2">
                        <Label>Keterangan</Label>
                        <Textarea
                            value={data.keterangan}
                            onChange={(e) => {
                                setData('keterangan', e.target.value);
                            }}
                        />
                        <InputError message={errors.keterangan}></InputError>
                    </div>
                    <Button disabled={processing || !isDirty} type="submit" variant={'default'} className="w-full">
                        Simpan
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

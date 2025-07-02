import Required from '@/components/custom/tanda-required';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PermohonanNikah, StatusPermohonanNikah, TemplateBerkas } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormUpdateStatusPermohonan = {
    status_permohonan: StatusPermohonanNikah;
    keterangan: string;
    lokasi_bimbingan: string;
    tanggal_bimbingan: string;
};

export default function AksiPermohonanNikahKUA({
    permohonanNikah,
    templateBerkas,
}: {
    permohonanNikah: PermohonanNikah;
    templateBerkas: TemplateBerkas[];
}) {
    const { data, setData, put, errors, reset, processing, isDirty, transform } = useForm<FormUpdateStatusPermohonan>({
        status_permohonan: permohonanNikah.latest_status.status_permohonan,
        keterangan: '',
        lokasi_bimbingan: '',
        tanggal_bimbingan: '',
    });

    transform((data) => ({
        ...data,
        tanggal_bimbingan: data.tanggal_bimbingan ? format(new Date(data.tanggal_bimbingan), 'EEEE, dd MMMM yyyy', { locale: id }) : '',    
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('status-permohonan-nikah.update-kua', { statusPermohonanNikah: permohonanNikah.latest_status.id }), {
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
                                    <SelectItem value="Diverifikasi Puskesmas">Diverifikasi Puskesmas</SelectItem>
                                    <SelectItem value="Diverifikasi KUA">Diverifikasi KUA</SelectItem>
                                    <SelectItem value="Ditolak KUA">Ditolak KUA</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status_permohonan}></InputError>
                    </div>
                    {data.status_permohonan === 'Diverifikasi KUA' && (
                        <>
                            <div className="grid gap-2">
                                <Label>
                                    Tanggal Bimbingan
                                    <Required />
                                </Label>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full bg-transparent pl-3 text-left font-normal',
                                                !data.tanggal_bimbingan && 'text-muted-foreground',
                                            )}
                                        >
                                            {data.tanggal_bimbingan ? (
                                                format(data.tanggal_bimbingan, 'PPP', { locale: id })
                                            ) : (
                                                <span>Pilih tanggal</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            required
                                            selected={data.tanggal_bimbingan ? new Date(data.tanggal_bimbingan) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setData('tanggal_bimbingan', format(date, 'yyyy-MM-dd'));
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.tanggal_bimbingan}></InputError>
                            </div>
                            <div className="grid gap-2">
                                <Label>
                                    Lokasi Bimbingan
                                    <Required />
                                </Label>
                                <Textarea value={data.lokasi_bimbingan} onChange={(e) => setData('lokasi_bimbingan', e.target.value)} required />
                                <InputError message={errors.tanggal_bimbingan}></InputError>
                            </div>
                        </>
                    )}
                    {data.status_permohonan === 'Ditolak KUA' && (
                        <div className="grid gap-2">
                            <Label>
                                Keterangan
                                <Required />
                            </Label>
                            <Textarea
                                value={data.keterangan}
                                onChange={(e) => {
                                    setData('keterangan', e.target.value);
                                }}
                            />
                            <InputError message={errors.keterangan}></InputError>
                        </div>
                    )}
                    <Button disabled={processing || !isDirty} type="submit" variant={'default'} className="w-full">
                        Simpan
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

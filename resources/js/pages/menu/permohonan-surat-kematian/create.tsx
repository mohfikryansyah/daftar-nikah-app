import Required from '@/components/custom/tanda-required';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { useFormError } from '@/helpers/helpers';
import { id } from 'date-fns/locale';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DataDiri {
    [key: string]: any;
    nama_lengkap: string;
    bin_binti: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: Date | undefined;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
}
export interface SuratKeteranganKematian extends DataDiri {
    tanggal_meninggal: Date | undefined;
    tempat_meninggal: string;
    status_hubungan_dengan_pemohon: 'Istri' | 'Suami' | '';
}

export type OrangMeninggalForm = {
    yang_meninggal: SuratKeteranganKematian;
    pemohon: DataDiri;
};

export default function CreateSuratKeteranganKematian() {
    const { data, setData, post, errors, transform, reset } = useForm<OrangMeninggalForm>({
        yang_meninggal: {
            nama_lengkap: '',
            bin_binti: '',
            nik: '',
            tempat_lahir: '',
            tanggal_lahir: undefined,
            kewarganegaraan: '',
            agama: '',
            pekerjaan: '',
            alamat: '',
            tanggal_meninggal: undefined,
            tempat_meninggal: '',
            status_hubungan_dengan_pemohon: '',
        },
        pemohon: {
            nama_lengkap: '',
            bin_binti: '',
            nik: '',
            tempat_lahir: '',
            tanggal_lahir: undefined,
            kewarganegaraan: '',
            agama: '',
            pekerjaan: '',
            alamat: '',
        },
    });

    transform((data) => ({
        ...data,
        yang_meninggal: {
            ...data.yang_meninggal,
            tanggal_lahir: data.yang_meninggal.tanggal_lahir ? format(new Date(data.yang_meninggal.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            tanggal_meninggal: data.yang_meninggal.tanggal_meninggal ? format(new Date(data.yang_meninggal.tanggal_meninggal), 'yyyy-MM-dd') : undefined,
        },
        pemohon: {
            ...data.pemohon,
            tanggal_lahir: data.pemohon.tanggal_lahir ? format(new Date(data.pemohon.tanggal_lahir), 'yyyy-MM-dd') : undefined,
        },
    }));

    const { getNestedError } = useFormError();

    const renderFormSectionYangMeninggal = (key: 'yang_meninggal' | 'pemohon') => {
        return (
            <>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tanggal Meniggal
                        <Required />
                    </Label>
                    <Popover modal={true}>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-full bg-transparent pl-3 text-left font-normal',
                                    !data[key].tanggal_meninggal && 'text-muted-foreground',
                                )}
                            >
                                {data[key].tanggal_meninggal ? (
                                    format(data[key].tanggal_meninggal, 'PPP', { locale: id })
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
                                selected={data[key].tanggal_meninggal}
                                onSelect={(date) => {
                                    setData(key, {
                                        ...data[key],
                                        tanggal_meninggal: date,
                                    });
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <InputError message={getNestedError(`${key}`, 'tanggal_meninggal')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tempat Meninggal
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        placeholder="Contoh: Rumah"
                        value={data[key].tempat_meninggal}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key],
                                tempat_meninggal: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'tempat_meninggal')}></InputError>
                </div>
            </>
        );
    };

    const renderFormSectionDataDiri = (label: string, key: 'yang_meninggal' | 'pemohon') => (
        <Card className="mb-4">
            <CardContent className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-4">
                    <div className="col-span-1 space-y-1">
                        <CardTitle>{label}</CardTitle>
                        <CardDescription>Lengkapi formulir dibawah ini.</CardDescription>
                    </div>
                    <div className="col-span-3 grid gap-4 lg:grid-cols-4">
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Nama lengkap
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                value={data[key].nama_lengkap}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        nama_lengkap: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'nama_lengkap')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Bin/Binti
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                value={data[key].bin_binti}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        bin_binti: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'bin_binti')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                NIK
                                <Required />
                            </Label>
                            <Input
                                type="number"
                                minLength={16}
                                maxLength={16}
                                placeholder="7571050102050006"
                                value={data[key].nik}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        nik: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'nik')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Tempat Lahir
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Gorontalo"
                                value={data[key].tempat_lahir}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        tempat_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'tempat_lahir')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Tanggal Lahir
                                <Required />
                            </Label>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full bg-transparent pl-3 text-left font-normal',
                                            !data[key].tanggal_lahir && 'text-muted-foreground',
                                        )}
                                    >
                                        {data[key].tanggal_lahir ? (
                                            format(data[key].tanggal_lahir, 'PPP', { locale: id })
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
                                        selected={data[key].tanggal_lahir}
                                        onSelect={(date) => {
                                            setData(key, {
                                                ...data[key],
                                                tanggal_lahir: date,
                                            });
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={getNestedError(`${key}`, 'tanggal_lahir')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Pekerjaan
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Petani"
                                value={data[key].pekerjaan}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        pekerjaan: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'pekerjaan')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Agama</Label>
                            <Select defaultValue={data[key].agama} onValueChange={(value) => setData(key, { ...data[key], agama: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Agama" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Islam">Islam</SelectItem>
                                        <SelectItem value="Kristen">Kristen</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={getNestedError(`${key}`, 'agama')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Kewarganegaraan
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Indonesia"
                                value={data[key].kewarganegaraan}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        kewarganegaraan: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'kewarganegaraan')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Status Hubungan</Label>
                            <Select
                                defaultValue={data[key].status_hubungan_dengan_pemohon}
                                onValueChange={(value) => setData(key, { ...data[key], status_hubungan_dengan_pemohon: value as 'Istri' | 'Suami' })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Istri">Istri</SelectItem>
                                        <SelectItem value="Suami">Suami</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={getNestedError(`${key}`, 'status_hubungan_dengan_pemohon')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Alamat
                                <Required />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Jl. Usman Isa, Kel. Lekobalo Kec. Kota Barat "
                                value={data[key].alamat}
                                onChange={(e) =>
                                    setData(key, {
                                        ...data[key],
                                        alamat: e.target.value,
                                    })
                                }
                                required
                            />
                            <InputError message={getNestedError(`${key}`, 'alamat')}></InputError>
                        </div>
                        {key === 'yang_meninggal' && <>{renderFormSectionYangMeninggal('yang_meninggal')}</>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('catin.permohonan-surat-keterangan-kematian.store'), {
            onSuccess: () => {
                toast.success('Berhasil!');
                reset();
            },
            onError: () => {
                console.log(errors)
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Permohonan Surat Kematian" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit}>
                    {renderFormSectionDataDiri('Yang Meninggal', 'yang_meninggal')}
                    {renderFormSectionDataDiri('Pemohon', 'pemohon')}
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </AppLayout>
    );
}

import Required from '@/components/custom/tanda-required';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, JenisKelamin, StatusHubungan, StatusPerkawinan } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import Stepper, { Step } from '@/components/ui/stepper';
import { Switch } from '@/components/ui/switch';
import { useFormError } from '@/helpers/helpers';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { id } from 'date-fns/locale';
import toast from 'react-hot-toast';
import SignaturePad from './signature';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export type FormOrangTua = {
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: JenisKelamin;
    tempat_lahir: string;
    tanggal_lahir: Date | undefined;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
    status_hubungan: StatusHubungan;
    ttd: File | null;
    ttdUrl: string | null;
};

export type FormWaliNikah = {
    nama_lengkap: string;
    nama_ayah: string;
    tempat_lahir: string;
    tanggal_lahir: Date | undefined;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
    status_hubungan: 'Ayah Kandung' | 'Wali';
    ttd: File | null;
    ttdUrl: string | null;
};

export type FormMempelai = {
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: JenisKelamin;
    tempat_lahir: string;
    tanggal_lahir: Date | undefined;
    kewarganegaraan: string;
    agama: string;
    pekerjaan: string;
    status_perkawinan: string;
    alamat: string;
    ayah: FormOrangTua;
    ibu: FormOrangTua;
    ttd: File | null;
    ttdUrl: string | null;
};

export type FormPermohonanNikah = {
    pria: FormMempelai;
    wanita: FormMempelai;
    file_path: File | null;
    ayah_adalah_wali: boolean;
    wali_nikah?: FormWaliNikah | null;
    ttdUrl: string | null;
};

export default function FormPermohonanNikah() {
    const { data, setData, post, processing, errors, transform, reset } = useForm<FormPermohonanNikah>({
        pria: {
            nama_lengkap: '',
            nik: '',
            jenis_kelamin: 'Laki-laki',
            tempat_lahir: '',
            tanggal_lahir: undefined,
            kewarganegaraan: 'Indonesia',
            agama: 'Islam',
            pekerjaan: '',
            status_perkawinan: 'Jejaka',
            alamat: '',
            ttdUrl: null,
            ayah: {
                nama_lengkap: '',
                nik: '',
                jenis_kelamin: 'Laki-laki' as JenisKelamin,
                tempat_lahir: '',
                tanggal_lahir: undefined,
                kewarganegaraan: 'Indonesia',
                agama: 'Islam',
                pekerjaan: '',
                alamat: '',
                status_hubungan: 'Ayah' as StatusHubungan,
                ttd: null as File | null,
                ttdUrl: null,
            },
            ibu: {
                nama_lengkap: '',
                nik: '',
                jenis_kelamin: 'Perempuan' as JenisKelamin,
                tempat_lahir: '',
                tanggal_lahir: undefined,
                kewarganegaraan: 'Indonesia',
                agama: 'Islam',
                pekerjaan: '',
                alamat: '',
                status_hubungan: 'Ibu' as StatusHubungan,
                ttd: null as File | null,
                ttdUrl: null,
            },
            ttd: null as File | null,
        },
        wanita: {
            nama_lengkap: '',
            nik: '',
            jenis_kelamin: 'Perempuan',
            tempat_lahir: '',
            tanggal_lahir: undefined,
            kewarganegaraan: 'Indonesia',
            agama: 'Islam',
            pekerjaan: '',
            status_perkawinan: 'Perawan',
            alamat: '',
            ttdUrl: null,
            ayah: {
                nama_lengkap: '',
                nik: '',
                jenis_kelamin: 'Laki-laki' as JenisKelamin,
                tempat_lahir: '',
                tanggal_lahir: undefined,
                kewarganegaraan: 'Indonesia',
                agama: 'Islam',
                pekerjaan: '',
                alamat: '',
                status_hubungan: 'Ayah' as StatusHubungan,
                ttd: null as File | null,
                ttdUrl: null,
            },
            ibu: {
                nama_lengkap: '',
                nik: '',
                jenis_kelamin: 'Perempuan' as JenisKelamin,
                tempat_lahir: '',
                tanggal_lahir: undefined,
                kewarganegaraan: 'Indonesia',
                agama: 'Islam',
                pekerjaan: '',
                alamat: '',
                status_hubungan: 'Ibu' as StatusHubungan,
                ttd: null as File | null,
                ttdUrl: null,
            },
            ttd: null as File | null,
        },
        file_path: null,
        ayah_adalah_wali: true,
        wali_nikah: {
            nama_lengkap: '',
            nama_ayah: '',
            tempat_lahir: '',
            tanggal_lahir: undefined,
            kewarganegaraan: 'Indonesia',
            agama: 'Islam',
            pekerjaan: '',
            alamat: '',
            status_hubungan: 'Wali',
            ttd: null as File | null,
            ttdUrl: null,
        },
        ttdUrl: null,
    });

    transform((data) => ({
        ...data,
        pria: {
            ...data.pria,
            ttdUrl: null,
            tanggal_lahir: data.pria.tanggal_lahir ? format(new Date(data.pria.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            ayah: {
                ...data.pria.ayah,
                ttdUrl: null,
                tanggal_lahir: data.pria.ayah.tanggal_lahir ? format(new Date(data.pria.ayah.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            },
            ibu: {
                ...data.pria.ibu,
                ttdUrl: null,
                tanggal_lahir: data.pria.ibu.tanggal_lahir ? format(new Date(data.pria.ibu.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            },
        },
        wanita: {
            ...data.wanita,
            ttdUrl: null,
            tanggal_lahir: data.wanita.tanggal_lahir ? format(new Date(data.wanita.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            ayah: {
                ...data.wanita.ayah,
                ttdUrl: null,
                tanggal_lahir: data.wanita.ayah.tanggal_lahir ? format(new Date(data.wanita.ayah.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            },
            ibu: {
                ...data.wanita.ibu,
                ttdUrl: null,
                tanggal_lahir: data.wanita.ibu.tanggal_lahir ? format(new Date(data.wanita.ibu.tanggal_lahir), 'yyyy-MM-dd') : undefined,
            },
        },
        wali_nikah: {
            ...data.wali_nikah,
            ttdUrl: null,
            tanggal_lahir: data.wali_nikah?.tanggal_lahir ? format(new Date(data.wali_nikah?.tanggal_lahir), 'yyyy-MM-dd') : undefined,
        },
    }));

    const { getNestedError } = useFormError();

    const [showError, setShowError] = useState(false);

    const submit: FormEventHandler = (e) => {
        if (!informasiTidakDapatDiUbah || !informasiYangDiberikan) {
            e.preventDefault();
            toast.error('Centang semua persyaratan sebelum melanjutkan!');
            return;
        }

        e.preventDefault();
        post(route('catin.permohonan-nikah.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Berhasil melengkapi data');
                reset();
            },
            onError: (errors) => {
                toast.error('Terjadi kesalahan saat melengkapi data!');
                setShowError(true);
            },
        });
    };

    console.log('Data Formulir Permohonan Nikah:', data);

    const { capitalize } = useCapitalizeEachWord();

    const [informasiYangDiberikan, setInformasiYangDiberikan] = useState(false);
    const [informasiTidakDapatDiUbah, setInformasiTidakDapatDiUbah] = useState(false);

    const renderFormSectionWaliNikah = (key: 'wali_nikah') => (
        <div className="grid gap-4 md:grid-cols-4">
            <div className="col-span-1">
                <CardTitle>Wali Nikah</CardTitle>
                <CardDescription>Lengkapi formulir dibawah ini.</CardDescription>
            </div>
            <div className="col-span-3 grid gap-4 md:grid-cols-4">
                <div className="flex flex-col space-y-2">
                    <Label>
                        Nama lengkap
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data.wali_nikah?.nama_lengkap}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
                                nama_lengkap: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'nama_lengkap')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Nama ayah
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data.wali_nikah?.nama_ayah}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
                                nama_ayah: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'nama_ayah')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tempat Lahir
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data.wali_nikah?.tempat_lahir}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
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
                                    !data.wali_nikah?.tanggal_lahir && 'text-muted-foreground',
                                )}
                            >
                                {data.wali_nikah?.tanggal_lahir ? (
                                    format(data.wali_nikah?.tanggal_lahir, 'PPP', { locale: id })
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
                                selected={data.wali_nikah?.tanggal_lahir}
                                onSelect={(date) => {
                                    setData(key, {
                                        ...data[key]!,
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
                        value={data.wali_nikah?.pekerjaan}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
                                pekerjaan: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'pekerjaan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Agama</Label>
                    <Select
                        defaultValue={data.wali_nikah?.agama}
                        onValueChange={(value) =>
                            setData(key, {
                                ...data[key]!,
                                agama: value,
                            })
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
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
                        value={data.wali_nikah?.kewarganegaraan}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
                                kewarganegaraan: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'kewarganegaraan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Alamat
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data.wali_nikah?.alamat}
                        onChange={(e) =>
                            setData(key, {
                                ...data[key]!,
                                alamat: e.target.value,
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${key}`, 'alamat')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Status Hubungan</Label>
                    <Select
                        defaultValue={data[key]?.status_hubungan}
                        onValueChange={(value) =>
                            setData(key, {
                                ...data[key]!,
                                status_hubungan: value as 'Ayah Kandung' | 'Wali',
                            })
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status Hubungan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Ayah Kandung">Ayah Kandung</SelectItem>
                                <SelectItem value="Wali">Wali</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={getNestedError(`${key}`, 'status_hubungan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tanda Tangan
                        <Required />
                    </Label>
                    {/* <SignaturePad
                        defaultValue={data[key]?.ttd ?? undefined}
                        onChange={(base64) =>
                            setData(key, {
                                ...data[key]!,
                                ttd: base64,
                            })
                        }
                    /> */}
                    <SignaturePad
                        defaultValue={data[key]?.ttdUrl ?? undefined}
                        onChange={(file) => {
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setData(key, {
                                        ...data[key]!,
                                        ttd: file,
                                        ttdUrl: reader.result as string,
                                    });
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setData(key, {
                                    ...data[key]!,
                                    ttd: null,
                                    ttdUrl: null,
                                });
                            }
                        }}

                        
                    />
                    <InputError message={getNestedError(`${key}`, 'nama_lengkap')}></InputError>
                </div>
            </div>
        </div>
    );

    const renderFormSectionOrangTuaMempelai = (label: string, orangTuaDari: 'pria' | 'wanita', ayahAtauIbu: 'ayah' | 'ibu') => (
        <div className="grid gap-4 md:grid-cols-4">
            <div className="col-span-1">
                <CardTitle>
                    {capitalize(ayahAtauIbu)}/wali Mempelai {label}
                </CardTitle>
                <CardDescription>Lengkapi formulir dibawah ini.</CardDescription>
            </div>
            <div className="col-span-3 grid gap-4 md:grid-cols-4">
                <div className="flex flex-col space-y-2">
                    <Label>
                        Nama lengkap
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data[orangTuaDari][ayahAtauIbu].nama_lengkap}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    nama_lengkap: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'nama_lengkap')}></InputError>
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
                        value={data[orangTuaDari][ayahAtauIbu].nik}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    nik: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, 'nik')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Jenis Kelamin</Label>
                    <Select
                        disabled
                        defaultValue={data[orangTuaDari][ayahAtauIbu].jenis_kelamin}
                        onValueChange={(value) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    jenis_kelamin: value as JenisKelamin,
                                },
                            })
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'jenis_kelamin')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tempat Lahir
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data[orangTuaDari][ayahAtauIbu].tempat_lahir}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    tempat_lahir: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'tempat_lahir')}></InputError>
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
                                    !data[orangTuaDari][ayahAtauIbu].tanggal_lahir && 'text-muted-foreground',
                                )}
                            >
                                {data[orangTuaDari][ayahAtauIbu].tanggal_lahir ? (
                                    format(data[orangTuaDari][ayahAtauIbu].tanggal_lahir, 'PPP', { locale: id })
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
                                selected={data[orangTuaDari][ayahAtauIbu].tanggal_lahir}
                                onSelect={(date) => {
                                    setData(orangTuaDari, {
                                        ...data[orangTuaDari],
                                        [ayahAtauIbu]: {
                                            ...data[orangTuaDari][ayahAtauIbu],
                                            tanggal_lahir: date,
                                        },
                                    });
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'tanggal_lahir')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Pekerjaan
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data[orangTuaDari][ayahAtauIbu].pekerjaan}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    pekerjaan: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'pekerjaan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Agama</Label>
                    <Select
                        defaultValue={data[orangTuaDari][ayahAtauIbu].agama}
                        onValueChange={(value) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    agama: value,
                                },
                            })
                        }
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Islam">Islam</SelectItem>
                                <SelectItem value="Kristen">Kristen</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'agama')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Kewarganegaraan
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data[orangTuaDari][ayahAtauIbu].kewarganegaraan}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    kewarganegaraan: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'kewarganegaraan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Status Hubungan</Label>
                    <Select
                        defaultValue={data[orangTuaDari][ayahAtauIbu].status_hubungan}
                        onValueChange={(value) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    status_hubungan: value as StatusHubungan,
                                },
                            })
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status Hubungan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem disabled={data[orangTuaDari][ayahAtauIbu].jenis_kelamin !== 'Laki-laki'} value="Ayah">
                                    Ayah
                                </SelectItem>
                                <SelectItem disabled={data[orangTuaDari][ayahAtauIbu].jenis_kelamin !== 'Perempuan'} value="Ibu">
                                    Ibu
                                </SelectItem>
                                <SelectItem value="Wali">Wali</SelectItem>
                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'status_hubungan')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Alamat
                        <Required />
                    </Label>
                    <Input
                        type="text"
                        value={data[orangTuaDari][ayahAtauIbu].alamat}
                        onChange={(e) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    alamat: e.target.value,
                                },
                            })
                        }
                        required
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'alamat')}></InputError>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>
                        Tanda Tangan
                        <Required />
                    </Label>
                    {/* <SignaturePad
                    defaultValue={data[orangTuaDari][ayahAtauIbu].ttd ?? undefined}
                        onChange={(base64) =>
                            setData(orangTuaDari, {
                                ...data[orangTuaDari],
                                [ayahAtauIbu]: {
                                    ...data[orangTuaDari][ayahAtauIbu],
                                    ttd: base64,
                                },
                            })
                        }
                    /> */}
                    <SignaturePad
                        defaultValue={data[orangTuaDari][ayahAtauIbu].ttdUrl ?? undefined}
                        onChange={(file) => {
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setData(orangTuaDari, {
                                        ...data[orangTuaDari]!,
                                        [ayahAtauIbu]: {
                                            ...data[orangTuaDari][ayahAtauIbu],
                                            ttd: file,
                                            ttdUrl: reader.result as string,
                                        },
                                    });
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setData(orangTuaDari, {
                                    ...data[orangTuaDari]!,
                                    [ayahAtauIbu]: {
                                        ...data[orangTuaDari][ayahAtauIbu],
                                        ttd: null,
                                        ttdUrl: null,
                                    },
                                });
                            }
                        }}
                    />
                    <InputError message={getNestedError(`${orangTuaDari}`, `${ayahAtauIbu}`, 'ttd')}></InputError>
                </div>
            </div>
        </div>
    );

    const renderFormSectionMempelai = (label: string, key: 'pria' | 'wanita') => (
        <Card className="border-0 p-0 shadow-none">
            <CardHeader>
                <CardTitle>
                    <Heading
                        title={capitalize(`Formulir Data Mempelai ${key}`)}
                        description="Silakan lengkapi data di bawah ini dengan informasi yang benar dan akurat."
                        className="text-primary mb-8 text-center"
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-0">
                <div className="grid gap-4 border-b pb-6 md:grid-cols-4">
                    <div className="col-span-1">
                        <CardTitle>Mempelai {label}</CardTitle>
                        <CardDescription>Lengkapi formulir dibawah ini.</CardDescription>
                    </div>
                    <div className="col-span-3 grid gap-4 md:grid-cols-4">
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
                                NIK
                                <Required />
                            </Label>
                            <Input
                                type="number"
                                minLength={16}
                                maxLength={16}
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
                            <Label>Jenis Kelamin</Label>
                            <Select
                                defaultValue={data[key].jenis_kelamin}
                                onValueChange={(value) => setData(key, { ...data[key], jenis_kelamin: value as JenisKelamin })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem disabled={data[key].jenis_kelamin !== 'Laki-laki'} value="Laki-laki">
                                            Laki-laki
                                        </SelectItem>
                                        <SelectItem disabled={data[key].jenis_kelamin !== 'Perempuan'} value="Perempuan">
                                            Perempuan
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={getNestedError(`${key}`, 'jenis_kelamin')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Tempat Lahir
                                <Required />
                            </Label>
                            <Input
                                type="text"
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
                            <Label>Status Perkawinan</Label>
                            <Select
                                defaultValue={data[key].status_perkawinan}
                                onValueChange={(value) => setData(key, { ...data[key], status_perkawinan: value as StatusPerkawinan })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Perawan">Perawan</SelectItem>
                                        <SelectItem value="Jejaka">Jejaka</SelectItem>
                                        <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                                        <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={getNestedError(`${key}`, 'status_perkawinan')}></InputError>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Alamat
                                <Required />
                            </Label>
                            <Input
                                type="text"
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
                        <div className="flex flex-col space-y-2">
                            <Label>
                                Tanda Tangan
                                <Required />
                            </Label>
                            <SignaturePad
                                defaultValue={data[key]?.ttdUrl ?? undefined}
                                onChange={(file) => {
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setData(key, {
                                                ...data[key]!,
                                                ttd: file,
                                                ttdUrl: reader.result as string,
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setData(key, {
                                            ...data[key]!,
                                            ttd: null,
                                            ttdUrl: null,
                                        });
                                    }
                                }}
                            />
                            <InputError message={getNestedError(`${key}`, 'ttd')}></InputError>
                        </div>
                    </div>
                </div>
                <div className="space-y-12">
                    {renderFormSectionOrangTuaMempelai(label, key, 'ayah')}
                    {renderFormSectionOrangTuaMempelai(label, key, 'ibu')}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <div className="grid gap-4">
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Berkas yang dibutuhkan</CardTitle>
                            <CardDescription>
                                <span>Lengkapi seluruh berkas yang diperlukan dan jadikan satu file dengan format .PDF</span>
                                <p className="mt-4">
                                    Download surat pernyataan status{' '}
                                    <a href={'/assets/surat/SURAT-PERNYATAAN-STATUS.docx'} className="text-blue-500 underline">
                                        disini
                                    </a>
                                    , lalu gabungkan dengan berkas dibawah ini.
                                </p>
                                <p className="mt-2">Berikut berkas yang diperlukan dalam .PDF</p>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
                                    <li>Persetujuan calon mempelai</li>
                                    <li>Fotokopi KTP, catin, wali, dan saksi</li>
                                    <li>Fotokopi akte kelahiran</li>
                                    <li>Fotokopi kartu keluarga</li>
                                    <li>Fotokopi ijazah terakhir</li>
                                </ul>
                                <p className="mt-4">Berkas yang dibawa ke KUA</p>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
                                    <li>Paspoto 2x3 = 3 lembar berlatar belakang biru, 4x6 = 2 lembar</li>
                                </ul>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Berkas</Label>
                                    <Input
                                        type="file"
                                        onChange={(e) => {
                                            setData('file_path', e.target.files && e.target.files[0] ? e.target.files[0] : null);
                                        }}
                                        accept=".pdf"
                                        className="max-w-[500px] bg-gray-100"
                                    />
                                    <InputError message={errors.file_path} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <Switch
                                    id="ayah-adalah-wali"
                                    className="scale-125"
                                    checked={data.ayah_adalah_wali}
                                    onCheckedChange={(checked) => setData('ayah_adalah_wali', checked)}
                                />
                                <Label htmlFor="ayah-adalah-wali" className="text-md">
                                    {data.ayah_adalah_wali ? 'Ayah adalah wali nikah' : 'Ayah bukan wali nikah'}
                                </Label>
                            </div>
                            {!data.ayah_adalah_wali && <div className="mt-6">{renderFormSectionWaliNikah('wali_nikah')}</div>}
                        </CardContent>
                    </Card>
                    {showError && (
                        <Alert className="border-red-500 bg-red-100">
                            <AlertDescription className="text-red-800">Terjadi kesalahan, mohon periksa kembali data Anda</AlertDescription>
                        </Alert>
                    )}
                </div>
                <Stepper
                    className="w-full"
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => console.log('All steps completed!')}
                    backButtonText="Kembali"
                    nextButtonText="Selanjutnya"
                >
                    <Step>{renderFormSectionMempelai('Pria', 'pria')}</Step>
                    <Step>{renderFormSectionMempelai('Wanita', 'wanita')}</Step>
                    <Step>
                        <div className="mb-4 flex items-center gap-3">
                            <Checkbox
                                id="info-valid"
                                className="bg-gray-200"
                                checked={informasiYangDiberikan}
                                onCheckedChange={() => setInformasiYangDiberikan((prev) => !prev)}
                            />
                            <Label htmlFor="info-valid">Saya mengisi informasi di atas dengan benar</Label>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                            <Checkbox
                                id="info-final"
                                className="bg-gray-200"
                                checked={informasiTidakDapatDiUbah}
                                onCheckedChange={() => setInformasiTidakDapatDiUbah((prev) => !prev)}
                            />
                            <Label htmlFor="info-final">Saya mengerti bahwa informasi tidak dapat diubah setelah disubmit</Label>
                        </div>
                    </Step>
                </Stepper>
            </div>

            {/* <Button type="submit">Submit</Button> */}
        </form>
    );
}

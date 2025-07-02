import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import FormPermohonanNikah from "./lainnya/form-permohonan-nikah";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function CreatePermohonanNikah() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Buat Permohonan Nikah' />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Buat Permohonan Nikah" description="Lengkapi data dibawah ini untuk melakukan permohonan nikah ya." />
                <FormPermohonanNikah />
            </div>
        </AppLayout>
    )
};
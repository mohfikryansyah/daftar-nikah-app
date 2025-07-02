import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="flex w-full flex-col items-center justify-center rounded-tl-[10rem] bg-sky-900 px-4 py-20">
            <div className="mx-auto w-full max-w-5xl space-y-10">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    {/* <img src="/assets/images/logouniv.png" className="size-22" alt="" /> */}
                    {/* <ul className="not-md:hidden mt-4 mr-5 flex flex-col rounded-lg bg-transparent p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.label} {...item} />
                        ))}
                    </ul> */}
                    <Link
                        href={route('register')}
                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 not-md:hidden hover:-translate-y-0.5"
                    >
                        Register
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-gray-100">© Ayudia Rahim</p>
                    <div className="flex items-center gap-4">
                        <Instagram className="text-white" />
                        <Facebook className="text-white" />
                        <Twitter className="text-white" />
                    </div>
                </div>
                <p className="text-gray-300">
                    Aplikasi Daftar Nikah adalah sistem digital yang memudahkan calon pengantin untuk mengajukan permohonan pernikahan secara online.
                    Proses pendaftaran menjadi lebih efisien, transparan, dan terstruktur—mulai dari pengisian data mempelai, pengunggahan berkas,
                    hingga pemantauan status verifikasi oleh pihak terkait.
                </p>
            </div>
        </footer>
    );
}

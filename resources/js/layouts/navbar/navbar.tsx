import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { hasRole } from '@/helpers/helpers';
import { useIsMobile } from '@/hooks/use-mobile';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import NavLogo from './nav-logo';

export const NAV_ITEMS = [
    { label: 'Home', href: '#', current: true },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
];

export function NavLink({ label, href, current = false }: { label: string; href: string; current?: boolean }) {
    return (
        <li>
            <a
                href={href}
                className={`block rounded-sm px-3 py-2 md:p-0 ${
                    current
                        ? 'bg-blue-700 text-white md:bg-transparent md:text-white md:dark:text-blue-500'
                        : 'text-black hover:bg-gray-100 md:text-white md:hover:bg-transparent md:hover:text-black dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500'
                }`}
                aria-current={current ? 'page' : undefined}
            >
                {label}
            </a>
        </li>
    );
}

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();

    return (
        <nav className="start-0 top-0 z-20 w-full bg-sky-800 dark:border-gray-600 dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <NavLogo />
                </Link>

                <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                    <div className="hidden items-center gap-2 md:flex">
                        <div className="hidden w-full items-center justify-between gap-2 md:order-1 md:flex md:w-auto" id="navbar-sticky">
                            {/* <ul className="mt-4 mr-5 flex flex-col rounded-lg bg-transparent p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                                {NAV_ITEMS.map((item) => (
                                    <NavLink key={item.label} {...item} />
                                ))}
                            </ul> */}
                            {auth.user ? (
                                hasRole(auth.user, ['catin']) ? (
                                    <Link
                                        href={route('catin.permohonan-nikah.index')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Permohonan Nikah
                                    </Link>
                                ) : hasRole(auth.user, ['puskesmas']) ? (
                                    <Link
                                        href={route('dashboard.puskesmas')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : hasRole(auth.user, ['kelurahan']) ? (
                                    <Link
                                        href={route('dashboard.kelurahan')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : hasRole(auth.user, ['kua']) ? (
                                    <Link
                                        href={route('dashboard.kua')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : hasRole(auth.user, ['kecamatan']) ? (
                                    <Link
                                        href={route('dashboard.kecamatan')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : null
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block transform rounded-sm bg-transparent px-5 py-1.5 text-sm leading-normal font-medium text-white outline outline-white transition-all duration-300 hover:-translate-y-0.5 hover:text-yellow-400 hover:outline-yellow-400"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <ul className="mt-4 flex flex-col gap-2 rounded-lg p-4 font-medium dark:border-gray-700 dark:bg-gray-800">
                                {auth.user ? (
                                    hasRole(auth.user, ['catin']) ? (
                                        <Link
                                            href={route('catin.permohonan-nikah.index')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Permohonan Nikah
                                        </Link>
                                    ) : hasRole(auth.user, ['puskesmas']) ? (
                                        <Link
                                            href={route('dashboard.puskesmas')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : hasRole(auth.user, ['kelurahan']) ? (
                                        <Link
                                            href={route('dashboard.kelurahan')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : hasRole(auth.user, ['kua']) ? (
                                        <Link
                                            href={route('dashboard.kua')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : hasRole(auth.user, ['kecamatan']) ? (
                                        <Link
                                            href={route('dashboard.kecamatan')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : null
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block transform rounded-sm bg-transparent px-5 py-1.5 text-sm leading-normal font-medium text-white outline outline-white transition-all duration-300 hover:-translate-y-0.5 hover:text-yellow-400 hover:outline-yellow-400"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block transform rounded-sm bg-yellow-400 px-5 py-1.5 text-sm leading-normal font-medium transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Menu */}
            </div>
        </nav>
    );
}

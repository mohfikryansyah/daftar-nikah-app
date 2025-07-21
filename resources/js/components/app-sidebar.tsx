import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, FileText, Folder, HeartHandshake, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.kua'),
        icon: LayoutGrid,
        roles: ['kua']
    },
    {
        title: 'Dashboard',
        href: route('dashboard.puskesmas'),
        icon: LayoutGrid,
        roles: ['puskesmas']
    },
    {
        title: 'Dashboard',
        href: route('dashboard.kelurahan'),
        icon: LayoutGrid,
        roles: ['kelurahan',]
    },
    {
        title: 'Dashboard',
        href: route('dashboard.kecamatan'),
        icon: LayoutGrid,
        roles: ['kecamatan',]
    },
    {
        title: 'Permohonan Nikah',
        href: route('catin.permohonan-nikah.index'),
        icon: HeartHandshake,
        roles: ['catin']
    },
    {
        title: 'Permohonan Suket Kematian',
        href: route('catin.permohonan-surat-keterangan-kematian.index'),
        icon: HeartHandshake,
        roles: ['catin', 'kecamatan']
    },
    {
        title: 'Permohonan Nikah',
        href: route('global.permohonan-nikah.index'),
        icon: HeartHandshake,
        roles: ['kelurahan', 'puskesmas', 'kua']
    },
    {
        title: 'Template Berkas',
        href: route('kelurahan.template-berkas.index'),
        icon: FileText,
        roles: ['kelurahan', 'puskesmas', 'kecamatan']
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

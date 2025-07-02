import { useInitials } from '@/hooks/use-initials';
import GuestLayout from '@/layouts/guest-layout';
import Footer from './footer';
import HeroSection from './hero-section';
import StatistikSection from './statistik-section';

interface Props {
    countAllPengaduan: number;
    countPengaduanDiproses: number;
    countPengaduanSelesai: number;
}

export default function LandingPage({ countAllPengaduan, countPengaduanDiproses, countPengaduanSelesai }: Props) {
    const getInitials = useInitials();

    return (
        <GuestLayout>
            <div className="flex h-full w-full flex-1 flex-col">
                <HeroSection />
                <StatistikSection data={{ countAllPengaduan, countPengaduanDiproses, countPengaduanSelesai }} />
                <Footer />
            </div>
        </GuestLayout>
    );
}

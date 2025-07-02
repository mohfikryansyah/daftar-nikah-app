import { BreadcrumbItem } from '@/types';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type PermohonanNikah = {
    created_at: string;
};

type Props = {
    data: PermohonanNikah[];
};

export default function Chart({ data }: { data: PermohonanNikah[] }) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const now = new Date();
        const months = [...Array(6)].map((_, i) => {
            const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
            return {
                label: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
                key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
            };
        });

        const counts = months.map(({ key }) => data.filter((d) => d.created_at.startsWith(key)).length);

        const option: echarts.EChartsOption = {
            title:{
                text: 'Statistik Permohonan Nikah',
                left: 'center',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 'bottom',
                left: 'center',
            },
            series: [
                {
                    name: 'Permohonan Nikah',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 24,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: months.map((m, i) => ({
                        value: counts[i],
                        name: m.label,
                    })),
                },
            ],
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

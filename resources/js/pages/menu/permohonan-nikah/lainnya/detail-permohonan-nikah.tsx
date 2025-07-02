import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getProgressColor, getStatusBadgeClass } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { PermohonanNikah } from '@/types';

export default function DetailPermohonanNikah({ permohonanNikah }: { permohonanNikah: PermohonanNikah }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Detail Permohonan Nikah</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="">Mempelai Pria</TableCell>
                            <TableCell className="font-medium">{permohonanNikah.mempelai_pria.nama_lengkap}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Mempelai Wanita</TableCell>
                            <TableCell className="font-medium">{permohonanNikah.mempelai_wanita.nama_lengkap}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Tanggal Permohonan</TableCell>
                            <TableCell className="font-medium">{permohonanNikah.tanggal_formatted}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Status</TableCell>
                            <TableCell className="font-medium">
                                <Badge className={cn(getStatusBadgeClass(permohonanNikah.latest_status.status_permohonan))}>
                                    {permohonanNikah.latest_status.status_permohonan}
                                </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Progress</TableCell>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2 text-xs">
                                    <Progress value={permohonanNikah.progress} className={cn(getProgressColor(permohonanNikah.progress))} />
                                    {permohonanNikah.progress}%
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

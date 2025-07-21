import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getProgressColor, getStatusBadgeClass } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { PermohonanNikah, PermohonanSuketKematian } from '@/types';

export default function DetailPermohonanSuketKematian({ data }: { data: PermohonanSuketKematian }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Detail Permohonan Suket Kematian</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="">Pemohon</TableCell>
                            <TableCell className="font-medium">{data.pemohon.nama_lengkap}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Yang Meninggal</TableCell>
                            <TableCell className="font-medium">{data.yang_meninggal.nama_lengkap}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Tanggal Permohonan</TableCell>
                            <TableCell className="font-medium">{data.tanggal_formatted}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Status</TableCell>
                            <TableCell className="font-medium">
                                <Badge className={cn(getStatusBadgeClass(data.status))}>
                                    {data.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

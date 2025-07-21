import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import { Mempelai, PemohonSuketKematian } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function BiodataPemohonSuketKematian({ data }: { data: PemohonSuketKematian }) {
    // console.log(data)
    return (
        <Card className='max-w-full overflow-x-auto'>
            <CardHeader>
                <CardTitle>Biodata Pemohon</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nama Lengkap</TableCell>
                            <TableCell className="font-medium">{data.nama_lengkap}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>NIK</TableCell>
                            <TableCell className="font-medium">{data.nik}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tempat, Tanggal Lahir</TableCell>
                            <TableCell className="font-medium">
                                {data.tempat_lahir}, {data.tanggal_lahir}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Agama</TableCell>
                            <TableCell className="font-medium">{data.agama}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Kewarganegaraan</TableCell>
                            <TableCell className="font-medium">{data.kewarganegaraan}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pekerjaan</TableCell>
                            <TableCell className="font-medium">{data.pekerjaan}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Alamat</TableCell>
                            <TableCell className="font-medium">{data.alamat}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import { Mempelai } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function RenderBiodataMempelai({ data }: { data: Mempelai }) {
    return (
        <Card className='max-w-full overflow-x-auto'>
            <CardHeader>
                <CardTitle>Biodata Mempelai {data.jenis_kelamin === 'Laki-laki' ? 'Pria' : 'Wanita'}</CardTitle>
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
                            <TableCell>Jenis Kelamin</TableCell>
                            <TableCell className="font-medium">{data.jenis_kelamin}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tempat, Tanggal Lahir</TableCell>
                            <TableCell className="font-medium">
                                {data.tempat_lahir}, {format(data.tanggal_lahir, 'd MMMM y', {locale: id})}
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
                            <TableCell>Status Perkawinan</TableCell>
                            <TableCell className="font-medium">{data.status_perkawinan}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Alamat</TableCell>
                            <TableCell className="font-medium">{data.alamat}</TableCell>
                        </TableRow>
                        {data.orang_tua.map((ortu, index) => (
                            <TableRow key={ortu.id}>
                                <TableCell>{index === 0 ? 'Nama Ayah' : index === 1 ? 'Nama Ibu' : `Orang Tua ${index + 1}`}</TableCell>
                                <TableCell className="font-medium">{ortu.nama_lengkap}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

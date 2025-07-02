<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\RolesEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $catin = Role::create(['name' => RolesEnum::CATIN]);
        $kelurahan = Role::create(['name' => RolesEnum::KELURAHAN]);
        $kecamatan = Role::create(['name' => RolesEnum::KECAMATAN]);
        $puskesmas = Role::create(['name' => RolesEnum::PUSKESMAS]);
        $kua = Role::create(['name' => RolesEnum::KUA]);

        User::factory()->create([
            'name' => 'Mohamad Fiqriansyah Panu',
            'email' => 'moh.fikryansyah@gmail.com',
        ])->assignRole($catin);

        User::factory()->create([
            'name' => 'Kelurahan',
            'email' => 'kelurahan@gmail.com',
        ])->assignRole($kelurahan);

        User::factory()->create([
            'name' => 'kecamatan',
            'email' => 'kecamatan@gmail.com',
        ])->assignRole($kecamatan);

        User::factory()->create([
            'name' => 'Puskesmas',
            'email' => 'puskesmas@gmail.com',
        ])->assignRole($puskesmas);

        User::factory()->create([
            'name' => 'KUA',
            'email' => 'kua@gmail.com',
        ])->assignRole($kua);
    }
}

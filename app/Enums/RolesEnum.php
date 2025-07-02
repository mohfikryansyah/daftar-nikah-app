<?php

namespace App\Enums;

enum RolesEnum: string
{
    case CATIN = 'catin';
    case KELURAHAN = 'kelurahan';    
    case PUSKESMAS = 'puskesmas';    
    case KECAMATAN = 'kecamatan';    
    case KUA = 'kua';

    public static function labels(): array
    {
        return [
            self::CATIN->value => 'Catin',
            self::KELURAHAN->value => 'Kelurahan',
            self::PUSKESMAS->value => 'Puskesmas',
            self::KECAMATAN->value => 'Kecamatan',
            self::KUA->value => 'KUA',
        ];
    }
    
    public function label(): string
    {
        return match($this) {
            self::CATIN => 'Catin',
            self::KELURAHAN => 'Kelurahan',
            self::PUSKESMAS => 'Puskesmas',
            self::KECAMATAN => 'Kecamatan',
            self::KUA => 'KUA',
        };
    }
}

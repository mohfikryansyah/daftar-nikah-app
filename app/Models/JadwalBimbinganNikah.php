<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class JadwalBimbinganNikah extends Model
{
    use HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function permohonanNikah()
    {
        return $this->belongsTo(PermohonanNikah::class);
    }
}

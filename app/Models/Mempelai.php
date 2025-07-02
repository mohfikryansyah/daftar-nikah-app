<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Mempelai extends Model
{
    /** @use HasFactory<\Database\Factories\MempelaiFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function orangTua()
    {
        return $this->hasMany(OrangTua::class);
    }

    public function permohonanNikah()
    {
        return $this->belongsTo(PermohonanNikah::class);
    }
}

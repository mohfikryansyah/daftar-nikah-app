<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BerkasPermohonanSuketKematian extends Model
{
    use HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';

    public function permohonanSuketKematian(): BelongsTo
    {
        return $this->belongsTo(PermohonanSuketKematian::class, 'permohonan_suket_kematian_id');
    }
}

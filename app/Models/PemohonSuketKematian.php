<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PemohonSuketKematian extends Model
{
    use HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function permohonanSebagaiYangMeninggal(): HasMany
    {
        return $this->hasMany(PermohonanSuketKematian::class, 'yang_meninggal');
    }

    public function permohonanSebagaiPemohon(): HasMany
    {
        return $this->hasMany(PermohonanSuketKematian::class, 'pemohon');
    }
}

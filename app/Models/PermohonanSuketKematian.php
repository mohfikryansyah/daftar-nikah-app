<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermohonanSuketKematian extends Model
{
    use HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $appends = ['tanggal_formatted'];
    
    public $incrementing = false;

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn () => Carbon::parse($this->created_at)->translatedFormat('d F Y'));
    }

    public function yangMeninggal(): BelongsTo
    {
        return $this->belongsTo(PemohonSuketKematian::class, 'yang_meninggal');
    }

    public function pemohon(): BelongsTo
    {
        return $this->belongsTo(PemohonSuketKematian::class, 'pemohon');
    }

    public function berkasSuketKematian(): HasMany
    {
        return $this->hasMany(BerkasPermohonanSuketKematian::class, 'suket_kematian_id');
    }
}
    
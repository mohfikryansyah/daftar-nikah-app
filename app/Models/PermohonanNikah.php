<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PermohonanNikah extends Model
{
    /** @use HasFactory<\Database\Factories\PermohonanNikahFactory> */
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $appends = ['tanggal_formatted'];
    
    public $incrementing = false;

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn () => Carbon::parse($this->created_at)->translatedFormat('d F Y'));
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mempelaiPria()
    {
        return $this->belongsTo(Mempelai::class, 'mempelai_pria_id');
    }

    public function mempelaiWanita()
    {
        return $this->belongsTo(Mempelai::class, 'mempelai_wanita_id');
    }

    public function latestStatus(): HasOne
    {
        return $this->hasOne(StatusPermohonanNikah::class, 'permohonan_nikah_id')->latestOfMany();
    }

    public function berkasPermohonanNikah(): HasMany
    {
        return $this->hasMany(BerkasPermohonanNikah::class, 'permohonan_nikah_id');
    }

    public function jadwalBimbinganNikah(): hasOne
    {
        return $this->hasOne(JadwalBimbinganNikah::class, 'permohonan_nikah_id');
    }

    public function tandaTangan(): HasOne
    {
        return $this->hasOne(TandaTangan::class, 'permohonan_nikah_id');
    }

    public function waliNikah(): HasOne
    {
        return $this->hasOne(WaliNikah::class, 'permohonan_nikah_id');
    }
}

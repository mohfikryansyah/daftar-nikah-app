<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BerkasPermohonanNikah extends Model
{
    use HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $appends = ['tanggal_formatted'];

    protected function tanggalFormatted(): Attribute
    {
    return Attribute::get(fn () => Carbon::parse($this->created_at)->translatedFormat('d F Y'));
    }

    public function permohonanNikah()
    {
        return $this->belongsTo(PermohonanNikah::class);
    }
}

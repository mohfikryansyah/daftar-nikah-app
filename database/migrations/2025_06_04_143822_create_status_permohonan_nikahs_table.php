<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('status_permohonan_nikahs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('permohonan_nikah_id')->constrained('permohonan_nikahs')->onDelete('cascade');
            $table->enum('status_permohonan', ['Menunggu Verifikasi Kelurahan', 'Diverifikasi Kelurahan', 'Ditolak Kelurahan', 'Diverifikasi Puskesmas', 'Ditolak Puskesmas', 'Diverifikasi KUA', 'Ditolak KUA', 'Diverifikasi Kecamatan', 'Ditolak Kecamatan', 'Selesai'])->default('Menunggu Verifikasi Kelurahan');
            $table->string('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_permohonan_nikahs');
    }
};

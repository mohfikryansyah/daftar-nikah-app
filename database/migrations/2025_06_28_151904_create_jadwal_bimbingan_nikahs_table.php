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
        Schema::create('jadwal_bimbingan_nikahs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('permohonan_nikah_id')->constrained('permohonan_nikahs')->onDelete('cascade');
            $table->string('tanggal_bimbingan');
            $table->string('lokasi_bimbingan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_bimbingan_nikahs');
    }
};

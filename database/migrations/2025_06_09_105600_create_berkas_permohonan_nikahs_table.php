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
        Schema::create('berkas_permohonan_nikahs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('dibuat_oleh')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('permohonan_nikah_id')->constrained('permohonan_nikahs')->onDelete('cascade');
            $table->string('nama_berkas');
            $table->string('file_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_permohonan_nikahs');
    }
};

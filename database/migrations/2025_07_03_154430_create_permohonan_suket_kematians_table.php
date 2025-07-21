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
        Schema::create('permohonan_suket_kematians', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pemohon')->constrained('pemohon_suket_kematians')->cascadeOnDelete();
            $table->foreignUuid('yang_meninggal')->constrained('pemohon_suket_kematians')->cascadeOnDelete();
            $table->string('status')->default('Menunggu verifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_suket_kematians');
    }
};

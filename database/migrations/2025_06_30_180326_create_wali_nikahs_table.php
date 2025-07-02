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
        Schema::create('wali_nikahs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('permohonan_nikah_id')->constrained('permohonan_nikahs')->onDelete('cascade');
            $table->string('nama_lengkap');
            $table->string('nama_ayah');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('kewarganegaraan');
            $table->string('agama');
            $table->string('pekerjaan');
            $table->enum('status_hubungan', ['Ayah Kandung', 'Wali']);
            $table->string('alamat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wali_nikahs');
    }
};

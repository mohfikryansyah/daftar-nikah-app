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
        Schema::create('pemohon_suket_kematians', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama_lengkap');
            $table->string('bin_binti');
            $table->string('nik', 16)->unique();
            $table->string('tempat_lahir');
            $table->string('tanggal_lahir');
            $table->string('kewarganegaraan');
            $table->string('agama');
            $table->string('pekerjaan');
            $table->text('alamat');
            $table->enum('status_hubungan_dengan_pemohon', ['Istri', 'Suami']);

            $table->string('tanggal_meninggal')->nullable();
            $table->string('tempat_meninggal')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemohon_suket_kematians');
    }
};

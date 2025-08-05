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
        Schema::create('permohonan_nikahs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('mempelai_pria_id')->constrained('mempelais')->onDelete('cascade');
            $table->foreignUuid('mempelai_wanita_id')->constrained('mempelais')->onDelete('cascade');
            $table->date('tanggal_pernikahan');
            $table->boolean('ayah_adalah_wali')->default(true);
            $table->integer('progress')->default(20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_nikahs');
    }
};

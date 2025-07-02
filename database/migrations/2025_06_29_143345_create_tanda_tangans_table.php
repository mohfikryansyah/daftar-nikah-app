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
        Schema::create('tanda_tangans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('permohonan_nikah_id')->constrained('permohonan_nikahs')->onDelete('cascade');
            $table->text('ttd_mempelai_pria');
            $table->text('ttd_mempelai_wanita');
            $table->text('ttd_ortu_l_mempelai_pria');
            $table->text('ttd_ortu_p_mempelai_pria');
            $table->text('ttd_ortu_l_mempelai_wanita');
            $table->text('ttd_ortu_p_mempelai_wanita');
            $table->text('ttd_wali_nikah')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tanda_tangans');
    }
};

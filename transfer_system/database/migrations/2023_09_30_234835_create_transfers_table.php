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
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->decimal('monto',10,2);
            $table->string('descripcion',)->nullable();
            $table->unsignedBigInteger('cuenta_emisor');
            $table->foreign('cuenta_emisor')->references('id')->on('acounts');
            $table->unsignedBigInteger('cuenta_receptor');
            $table->foreign('cuenta_receptor')->references('id')->on('acounts');
            $table->date('fecha_transferencia')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};

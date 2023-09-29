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
        Schema::create('retiros', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_retiro')->default(now());
            $table->decimal('monto',10,2);
            $table->string('descripcion',)->nullable();
            $table->unsignedBigInteger('user_emisor')->nullable();
            $table->foreign('user_emisor')->references('id')->on('users');
            $table->unsignedBigInteger('user_receptor')->nullable();
            $table->foreign('user_receptor')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retiros');
    }
};

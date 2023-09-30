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
        Schema::create('acounts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->decimal('saldo',10,2);
            $table->string('tipo_cuenta');
            $table->string('alias')->nullable();
            $table->boolean('activa')->default(true);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acounts');
    }
};

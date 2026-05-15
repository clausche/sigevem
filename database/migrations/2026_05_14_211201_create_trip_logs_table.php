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
        Schema::create('trip_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->unique()->constrained()->onDelete('cascade');
            $table->integer('start_km');
            $table->integer('end_km')->nullable();
            $table->string('fuel_level_start');
            $table->string('fuel_level_end')->nullable();
            $table->text('observations')->nullable();
            $table->text('incidents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_logs');
    }
};

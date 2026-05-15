<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->string('mobile_code', 10)->nullable()->unique()->after('id');
            $table->foreignId('assigned_driver_id')
                ->nullable()
                ->after('department_id')
                ->constrained('users')
                ->nullOnDelete();
            $table->string('parking_location')->nullable()->after('assigned_driver_id');
        });
    }

    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropConstrainedForeignId('assigned_driver_id');
            $table->dropColumn(['mobile_code', 'parking_location']);
        });
    }
};

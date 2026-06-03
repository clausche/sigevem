<?php

use Database\Seeders\DepartmentsSeeder;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Carga las unidades municipales desde el CSV de forma idempotente
        // (upsert por code), para que un simple `php artisan migrate`
        // deje los departments instalados sin pasos manuales.
        (new DepartmentsSeeder())->run();
    }

    public function down(): void
    {
        // Los datos de referencia no se eliminan al revertir.
    }
};

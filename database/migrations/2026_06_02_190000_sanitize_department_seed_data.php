<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $municipality = DB::table('departments')
            ->where('name', 'Municipalidad de Puerto Montt')
            ->first(['id']);

        if ($municipality) {
            $replacement = DB::table('departments')
                ->where('name', 'Alcalde')
                ->where('id', '!=', $municipality->id)
                ->first(['id']);

            if ($replacement) {
                $this->moveDepartmentReferences($municipality->id, $replacement->id);
                DB::table('departments')->where('id', $municipality->id)->delete();
            }
        }

        $duplicates = DB::table('departments')
            ->select('code')
            ->whereNotNull('code')
            ->groupBy('code')
            ->havingRaw('COUNT(*) > 1')
            ->pluck('code');

        foreach ($duplicates as $code) {
            $ids = DB::table('departments')
                ->where('code', $code)
                ->orderBy('id')
                ->pluck('id');

            $keepId = $ids->first();

            foreach ($ids->skip(1) as $duplicateId) {
                $this->moveDepartmentReferences($duplicateId, $keepId);
                DB::table('departments')->where('id', $duplicateId)->delete();
            }
        }

        $this->ensureDepartmentCodeUniqueIndex();
    }

    public function down(): void
    {
        // Data cleanup is intentionally not reversible.
    }

    private function moveDepartmentReferences(int $fromId, int $toId): void
    {
        DB::table('users')->where('department_id', $fromId)->update(['department_id' => $toId]);
        DB::table('vehicles')->where('department_id', $fromId)->update(['department_id' => $toId]);
        DB::table('requests')->where('department_id', $fromId)->update(['department_id' => $toId]);
    }

    private function ensureDepartmentCodeUniqueIndex(): void
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        $indexExists = collect(DB::select("SHOW INDEX FROM departments WHERE Key_name = 'departments_code_unique'"))
            ->isNotEmpty();

        if (! $indexExists) {
            Schema::table('departments', function ($table) {
                $table->unique('code');
            });
        }
    }
};

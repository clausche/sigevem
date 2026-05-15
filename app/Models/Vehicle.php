<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = ['plate', 'brand', 'model', 'year', 'type', 'status', 'current_km', 'department_id'];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'current_km' => 'integer',
            'department_id' => 'integer',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function documents()
    {
        return $this->hasMany(VehicleDocument::class);
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'mobile_code',
        'plate',
        'brand',
        'model',
        'year',
        'type',
        'status',
        'current_km',
        'department_id',
        'assigned_driver_id',
        'parking_location',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'current_km' => 'integer',
            'department_id' => 'integer',
            'assigned_driver_id' => 'integer',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function assignedDriver()
    {
        return $this->belongsTo(User::class, 'assigned_driver_id');
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

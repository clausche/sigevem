<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleRequest extends Model
{
    protected $fillable = ['user_id', 'department_id', 'reason', 'destination', 'start_date', 'end_date', 'status', 'granted_by'];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'user_id' => 'integer',
            'department_id' => 'integer',
            'granted_by' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function granter()
    {
        return $this->belongsTo(User::class, 'granted_by');
    }

    public function assignment()
    {
        return $this->hasOne(Assignment::class);
    }
}

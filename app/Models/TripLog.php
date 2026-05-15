<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripLog extends Model
{
    protected $fillable = ['assignment_id', 'start_km', 'end_km', 'fuel_level_start', 'fuel_level_end', 'observations', 'incidents'];

    protected function casts(): array
    {
        return [
            'start_km' => 'integer',
            'end_km' => 'integer',
            'assignment_id' => 'integer',
        ];
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }
}

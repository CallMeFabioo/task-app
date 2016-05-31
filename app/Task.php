<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'completed',
	];

	protected $casts = [
		'completed' => 'boolean'
	];

	public function getCreatedAtAttribute($value)
	{
	    return \Carbon\Carbon::parse($value)->diffForHumans();
	}

}

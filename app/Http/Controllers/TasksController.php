<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct(Request $request)
	{
		$this->request = $request;
	}

	public function index()
	{
		return Task::query()->take(100)->get();
	}

	public function store()
	{
		return factory(Task::class)->create(['completed' => false]);
	}

	public function update()
	{
		$task = $this->request->get('task');
		$id =  $task['id'];
		$completed = $task['completed'];

		return Task::where('id', $id)->update(['completed' => $completed]);
	}
}

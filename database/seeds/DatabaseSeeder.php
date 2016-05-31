<?php

use App\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        foreach(range(1, 100) as $task) {
        	factory(Task::class)->create();
        }
    }
}

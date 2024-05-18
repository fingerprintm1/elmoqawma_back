<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

	protected function schedule(Schedule $schedule)
	{
		$schedule->command('db:backup')->dailyAt('01:00');
//		$schedule->command('db:backup')->everyMinute();
	}


	protected function commands()
	{
		$this->load(__DIR__ . '/Commands');

		require base_path('routes/console.php');
	}
}

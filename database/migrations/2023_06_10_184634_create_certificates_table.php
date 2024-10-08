<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('certificates', function (Blueprint $table) {
			$table->id();
			$table->string("username");
			$table->boolean("status")->default(1);
			$table->decimal("score");
			$table->string('file', 500)->nullable();
			$table->foreignId("user_id")->constrained("users")->cascadeOnDelete()->cascadeOnUpdate();
			$table->foreignId("course_id")->constrained("courses")->cascadeOnDelete()->cascadeOnUpdate();
			$table->softDeletes();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('certificates');
	}
};

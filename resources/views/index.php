<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Task App</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.1.8/semantic.min.css">
	<style>
		body {
			padding-top: 25px;
		}
	</style>
</head>
<body>

  <div id="app">
  	<div class="ui container">

			<button class="massive blue fluid ui button" :class="{ loading: creatingTask, teal: creatingTask }" @click="makeRequest">Create task</button>

  		<div class="ui stacked segment">
  			<Statistics :tasks="tasks"></Statistics>
			</div>
  		<div class="ui stacked segment">
  			<filter-buttons :filter.sync="filter"></filter-buttons>
  		</div>

  		<Tasks :tasks="tasks" :filter.sync="filter"></Tasks>

  	</div>
  </div>

	<script src="/js/app.js"></script>
  </body>
</html>

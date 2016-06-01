'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';

import Statistics from './components/Statistics';
import FilterButtons from './components/FilterButtons';
import Tasks from './components/tasks/Tasks';
import Task from './components/tasks/Task';

Vue.use(VueResource);

new Vue({
	el: '#app',

	data() {
		return {
			tasks: [],
			filter: '',
			creatingTask: false
		}
	},

	components: {
		Statistics,
		FilterButtons,
		Tasks,
		Task
	},

	init() {
		Vue.resource = this.$resource('/tasks{/id}');

		// Get all tasks
		Vue.resource.get({}).then((res) => this.tasks = res.data);
	},

	methods: {

		makeRequest() {
			this.creatingTask = true;

			let interval = setInterval(() => this.createTask(), 2000);

			setTimeout(() => {
				this.creatingTask = false;
				clearInterval(interval);
			}, 10000);

		},

		createTask() {
			// Create a new task every 2 seconds.
			Vue.resource.save({})
									.then((res) => this.tasks.unshift(res.data))
									.catch((err) => console.log(err));
		}


	}

});

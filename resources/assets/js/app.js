'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';

import Statistics from './components/Statistics';
import FilterButtons from './components/FilterButtons';

Vue.use(VueResource);

Vue.filter('filterByStatus', (value, status) => {
	if(status === '') return value;
  return value.filter((task) => task.completed === status);
});

new Vue({
	el: '#app',

	data() {
		return {
			tasks: [],
			filter: '',
			creatingTask: false
		}
	},

	components: { Statistics, FilterButtons },

	init() {
		this.resource = this.$resource('/tasks{/id}');

		// Get all tasks
		this.resource.get({}).then((res) => this.tasks = res.data);
	},

	methods: {

		changeTaskStatus(task) {

			task.completed = !task.completed;

			// Update state from the task
			this.resource.update({ task })
									.then((res) => console.log('Task status changed successfully!'))
									.catch((err) => console.log(err));
		},

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
			this.resource.save({})
									.then((res) => this.tasks.unshift(res.data))
									.catch((err) => console.log(err));
		}


	}

});

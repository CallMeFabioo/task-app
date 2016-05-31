'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.filter('filterByStatus', (value, status) => {
	if(status === '') return value;
  return value.filter((task) => task.completed === status);
})

const filters = {
	all: (tasks) => tasks,
	active: (tasks) => tasks.filter((task) => !task.completed),
	completed: (tasks) => tasks.filter((task) => task.completed)
};

new Vue({
	el: '#app',

	data() {
		return {
			tasks: [],
			filter: '',
			creatingTask: false
		}
	},

	init() {
		this.$http.get('/tasks').then((res) => this.tasks = res.data);
	},

	computed: {

		total() {
			return filters.all(this.tasks).length;
		},

		active() {
			return filters.active(this.tasks).length;
		},

		completed() {
			return filters.completed(this.tasks).length;
		}

	},

	methods: {

		changeTaskStatus(task) {
			task.completed = !task.completed;
			this.$http.patch('/tasks', { task }).then((res) => console.log(res.data));
		},

		createTask() {
			this.creatingTask = true;
			let interval = setInterval(() => {
				this.$http.post('/tasks').then((res) => this.tasks.unshift(res.data));
			}, 2000);

			setTimeout(() => {
				this.creatingTask = false;
				clearInterval(interval);
			}, 10000);
		}


	}

});

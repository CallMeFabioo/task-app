import Vue from 'vue';

const filters = {
	all: (tasks) => tasks,
	active: (tasks) => tasks.filter((task) => !task.completed),
	completed: (tasks) => tasks.filter((task) => task.completed)
};

const Statistics = Vue.extend({
	template: `
		<div class="ui three statistics">
		  <div class="red statistic">
		    <div class="value">{{ active }}</div>
		    <div class="label">Active</div>
		  </div>
		  <div class="green statistic">
		    <div class="value">{{ completed }}</div>
		    <div class="label">Completed</div>
		  </div>
		  <div class="grey statistic">
		    <div class="value">{{ total }}</div>
		    <div class="label">Tasks</div>
		  </div>
		</div>
	`,

	props: {
		tasks: {
			type: Array,
			required: true
		}
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

	}

});

export default Statistics;

import Vue from 'vue';

import Task from './Task';

Vue.filter('filterByStatus', (value, status) => {
	if(status === '') return value;
  return value.filter((task) => task.completed === status);
});

const Tasks = Vue.extend({

	components: { Task },

	props: {
		tasks: {
			type: Array,
			required: true
		},

		filter: {
			type: [String, Boolean],
			required: true
		}
	},

	template: `
		<div class="ui four cards stackable">
			<Task :task.sync="task" v-for="task in tasks | filterByStatus filter" track-by="id"></Task>
		</div>
	`,

});

export default Tasks;

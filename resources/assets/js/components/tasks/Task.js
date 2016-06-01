import Vue from 'vue';

const Task = Vue.extend({

	props: {
		task: {
			type: Object,
			required: true
		}
	},

	template: `
		<div class="ui card">
	    <div class="content">
	      <div class="header">Completed: {{ task.name }}</div>
	      <div class="meta">{{ task.created_at }}</div>
	    </div>
	    <button class="ui bottom green attached button" v-show="task.completed" @click="changeTaskStatus(task)">
	      <i class="check icon"></i>
	      <span>Done</span>
	    </button>
	    <button class="ui bottom grey attached button" v-show="!task.completed" @click="changeTaskStatus(task)">
	      <i class="remove icon"></i>
	      <span>Active</span>
	    </button>
		</div>`,

		methods: {

			changeTaskStatus(task) {

				task.completed = !task.completed;

				// Update state from the task
				Vue.resource.update({ task })
										.then((res) => console.log('Task status changed successfully!'))
										.catch((err) => console.log(err));
			},

		}

});

export default Task;

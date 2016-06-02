'use strict';

import Vue from 'vue';

Vue.transition('bounce', {
	enterClass: 'zoomInDown',
  leaveClass: 'zoomOutUp',
  type: 'animation'
});

const Task = Vue.extend({

	props: {
		task: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			editedTask: null
		}
	},

	template: `
		<div class="ui card animated" transition="bounce">
	    <div class="content">
	      <div class="header">
	      	<label @dblclick="editTask(task)">{{ task.name }}</label>
	      	<div class="ui input">
	      		<input
	      			class="edit"
	      			type="text"
	      			v-model="task.name"
	      			v-task-focus="task == editedTask"
	      			@blur="doneEdit(task)"
	      			@keyup.enter="doneEdit(task)"
	      			@keyup.esc="cancelEdit(task)
	      		">
					</div>
	      </div>
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

			editTask(task) {
				this.cachedTitle = task.title;
				this.editedTask = task;
				console.log(task);
			},

			doneEdit(task) {
				if(!this.editedTask) return;

				this.editedTask = null;
				task.title = task.title.trim();

				if(!task.title) this.removeTask(task);
			},

			cancelEdit(task) {
				this.editedTask = null;
				task.title = this.cachedTitle;
			},

			removeTask(task) {
				this.$dispatch('task-removed', task);
			}

		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'task-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(() => el.focus());
			}
		}

});

export default Task;

import Vue from 'vue';

const FilterButtons = Vue.extend({
	props: {
		filter: {
      type: [String, Boolean],
      default: ''
    }
	},

	template: `
		<div class="three ui buttons">
		  <button class="ui red button" @click="filter = false">Filter tasks active</button>
		  <button class="ui green button" @click="filter = true">Filter tasks completed</button>
		  <button class="ui grey button" @click="filter = ''">Show all tasks</button>
		</div>
	`,

});

export default FilterButtons;

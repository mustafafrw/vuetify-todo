<template>
    <v-list
      v-if="$store.state.tasks.length"
      flat
      class="pt-0"
    >
    <draggable 
      v-model="tasks"
      handle=".handle"
    >
      <Task  
          v-for="task in $store.getters.tasksFiltered"
          :key="task.id"
          :task ="task"
        />
      </draggable>
    </v-list>
    <NoTask v-else />
</template>

<script>
import Task from "@/components/Todo/Task"
import NoTask from "@/components/Todo/NoTask"

import draggable from 'vuedraggable'
export default {
    components:{
        Task,
        NoTask,
        draggable
    },
    computed: {
      tasks: {
        get() {
          return this.$store.getters.tasksFiltered
        },
        set(value) {
          this.$store.dispatch('setTasks', value)
        }
      }
  },
}
</script>

<style>

</style>
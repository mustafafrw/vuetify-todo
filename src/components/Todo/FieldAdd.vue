<template>
   <v-text-field
        v-model = "newTaskTitle"
        @keyup.enter = "addTask"
        class="pa-2 pb-1 field-add-task"
        outlined
        placeholder="Add Task"
        append-icon="mdi-plus"
        hide-details
        clearable
      >
        <template v-slot:append>
          <v-icon 
            @click = "addTask"
            :disabled="newTaskTitleInvalid"
          >mdi-plus</v-icon>
      </template>
      
      
      </v-text-field>
</template>
<script>
export default {
  data(){
    return {
      newTaskTitle:""
    }
  },
  methods:{
    addTask(){
      if(!this.newTaskTitleInvalid){
        this.$store.dispatch('addTask',this.newTaskTitle)
        this.newTaskTitle = ""
      }
    }
  },
  computed:{
    newTaskTitleInvalid(){
      return !this.newTaskTitle
    }
  }
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(32,96,126,1) !important
</style>
<template>
  <v-dialog
      :value="true"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Edit task
          </v-card-title>

        <v-card-text>
          Edit the title
          <v-text-field v-model="taskTitle"
            @keyup.enter="editTask()"
           />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            text
            @click="$emit('close')"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            :disabled = "taskTitleInvalid"
            @click="editTask()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:["task"],
    methods:{
        editTask(){
            if(!this.taskTitleInvalid){
              let payload={
                id: this.task.id,
                title : this.taskTitle
              }
              this.$store.dispatch("updateTask",payload)
              this.$emit("close")
            }
        }
    },
    data(){
      return {
         taskTitle:null
      }
    },
    mounted(){
      this.taskTitle = this.task.title
    },
    computed:{
      taskTitleInvalid(){
        return !this.taskTitle || this.taskTitle === this.task.title
      }
    }
}
</script>

<style>

</style>
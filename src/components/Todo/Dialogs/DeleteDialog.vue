<template>
  <v-dialog
      :value="true"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Delete task
          </v-card-title>

        <v-card-text>
          Are you sure you want to delete this task?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            text
            @click="$emit('close')"
          >
            No
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="deleteTask(task.id)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:["task"],
    methods:{
        deleteTask(id){
            this.$emit("close")
            this.$store.dispatch('deleteTask',id)
        }
    },
}
</script>

<style>

</style>
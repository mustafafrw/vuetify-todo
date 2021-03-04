<template>
 <div>
      <v-dialog
        ref="dialog"
        :value="true"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="saveTask"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
 </div>
</template>

<script>
export default {
    props:["task"],
    data: () => ({
      date: new Date().toISOString().substr(0, 10)
    }),
    mounted(){
        if(this.task.dueDate){
            this.date=this.task.dueDate
        }
    },
    methods:{
        saveTask(){
            let payload = {
                id:this.task.id,
                dueDate: this.date
            }
            this.$store.dispatch("updateTaskDueDate",payload)
            this.$emit("close")
        }
    }
    
}
</script>

<style>

</style>
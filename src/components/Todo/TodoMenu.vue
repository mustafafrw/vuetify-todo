<template>
    <div>
    <v-menu
                bottom
                left
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list class="pt-0 pb-0">
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click = "handleClick(i)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
                </v-list>
            </v-menu>
            <DeleteDialog 
                v-if="dialogs.delete" 
                :task = "task" 
                @close="dialogs.delete=false"
            /> 
            <EditDialog 
                v-if="dialogs.edit" 
                :task = "task" 
                @close="dialogs.edit=false"
            />
            <DueDateDialog
                v-if="dialogs.duedate" 
                :task = "task" 
                @close="dialogs.duedate=false"
            /> 
    </div>
</template>

<script>
import DeleteDialog from "@/components/Todo/Dialogs/DeleteDialog"
import EditDialog from "@/components/Todo/Dialogs/EditDialog"
import DueDateDialog from "@/components/Todo/Dialogs/DueDateDialog"
export default {
    props:["task"],
    data: () => ({
      dialogs:
      {
            delete:false,
            edit:false,
            duedate:false
      },
      items: [
        { 
            title: 'Edit', 
            icon: 'mdi-pencil',
            click(){
                this.dialogs.edit=true
            }
        },
        { 
            title: 'Due Date', 
            icon: 'mdi-calendar',
            click(){
                this.dialogs.duedate = true
            }
        },
        { 
            title: 'Delete', 
            icon: 'mdi-delete',
            click(){
                this.dialogs.delete = true
            } 
        },
        { 
            title: 'Sort', 
            icon: 'mdi-drag-horizontal-variant',
            click(){
                if(this.$store.state.search == null){
                    this.$store.commit("toggleSorting")
                }
                else{
                    this.$store.commit('showSnackbar',"You can't sort while searching")
                }

            } 
        }
      ],
    }),
    methods:{
       handleClick(index) {
            this.items[index].click.call(this)
        }
    },
    components:{
        DeleteDialog,
        EditDialog,
        DueDateDialog
    }
}
</script>


        DueDateDialog<style>

</style>
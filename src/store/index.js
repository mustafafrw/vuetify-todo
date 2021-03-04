import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle : process.env.VUE_APP_TITLE,
    search:null,
    sorting: false,
    tasks: [
      
    ],
    snackbar:{
      show:false,
      message:""
    },

  },
  mutations: {
    setTasks(state,tasks){
      state.tasks = tasks
    },
    setSearch(state,value){
       state.search = value
    },
    addTask(state,newTask){
      state.tasks.push(newTask)
    },
    doneTask(state,id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state,id){
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTask(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    showSnackbar(state,message){
      let timeout =0
      if(state.snackbar.show){
        state.snackbar.show=false
        timeout=200
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.message = message
      }, timeout);
    },
    closeSnackbar(state){
      state.snackbar.show = false
    },
    toggleSorting(state){
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({commit},newTaskTitle){
      if(newTaskTitle==="")return
      let newTask = {
        id : Date.now(),
        title:newTaskTitle,
        done:false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask',newTask)
        commit('showSnackbar',"New Task is added!")
      })
      
    },
    deleteTask({commit},id){
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask',id)
        commit('showSnackbar',"Task is deleted!")
      })
    },
    updateTask({commit},payload){
      db.collection('tasks').doc({id: payload.id}).update({
        title: payload.title
      }).then(() => {
        commit('updateTask',payload)
        commit('showSnackbar',"Task is updated!")
      })
      
    },
    updateTaskDueDate({commit},payload){
      db.collection('tasks').doc({id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate',payload)
        commit('showSnackbar',"Task due date is updated!")
      })
    },
    doneTask({ state, commit },id){
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({id: id}).update({
         done: !task.done
      }).then( () => {
         commit('doneTask',id)
      })
      if(task.done===false)
        commit('showSnackbar',"Task has done!")
    },
    setTasks({ commit },tasks){
      db.collection('tasks').set(tasks)
      commit('setTasks',tasks)
    },
    getTasks({commit}){
      console.log(commit)
      db.collection('tasks').get().then(tasks =>{
        commit('setTasks',tasks)
      })
    }
  },
  getters: {
    tasksFiltered(state) {
      if(!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
})

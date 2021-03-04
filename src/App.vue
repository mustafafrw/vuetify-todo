<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >
    <v-img
      src="polar.jpg"
      class = "pa-4 pt-7"
      height="170"
      gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      
    >
      <v-avatar size=70 class="mb-2">
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
      </v-avatar>
      <div class="white--text text-subtitle-1 font-weight-bold">
        John Cornell
      </div>
      <div class="white--text text-subtitle-2">
        @johncornell
      </div>
    </v-img>
     <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $store.state.appTitle }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{subtitle}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to= "item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

     <v-app-bar
      color="primary"
      dark
      prominent
      src="polar.jpg"
      app
      :height="$route.path === '/' ? '238' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-container class="pa-0 pt-2 header-container">
        <v-row>
             <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
             <v-spacer></v-spacer>
             <Search />
        </v-row>
        <v-row>
            <v-app-bar-title class="text-h4 ml-5">{{ $store.state.appTitle }}</v-app-bar-title>
        </v-row>
        <v-row>
            <Livedate />
        </v-row>
        <v-row v-if="$route.path === '/'">
            <FieldAdd />
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
        <router-view></router-view>
        <Snackbar/>  
    </v-main>
  </v-app>
</template>

<script>
    
  import Snackbar from "@/components/Shared/Snackbar"
  import Search from "@/components/Tools/Search"
  import Livedate from "@/components/Tools/Livedate"
  import FieldAdd from '@/components/Todo/FieldAdd'

  export default {
    name: 'Main',
    data () {
      return {
        items: [
          { title: 'To-do', icon: 'mdi-format-list-checks', route:"/" },
          { title: 'About', icon: 'mdi-information-variant', route:"/about"},
        ],
        right: null,
        drawer :null,
        subtitle : "Todo-app for you"
      }
    },
    mounted(){
      this.$store.dispatch('getTasks')
    }
    ,
    components:{
      Snackbar,
      Search,
      Livedate,
      FieldAdd
    }

  }
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>
<template>
  <div class="home">
      <ListTasks />   
      <ButtonDoneSorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
import ListTasks from '@/components/Todo/ListTasks'
import ButtonDoneSorting from '@/components/Todo/ButtonDoneSorting'

export default {
  name: 'Home',
  components:{
    ListTasks,
    ButtonDoneSorting
  }
}
</script>

<style scoped>

</style>
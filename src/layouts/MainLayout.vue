<template>
  <div class="app-main-layout">

    <Navbar @open="isOpen = !isOpen"/>

    <Sidebar v-model="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">

        <router-view/>

      </div>
    </main>

    <div class="fixed-action-btn" data-position="left" v-tooltip="'Добавить новую запись'">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/app/Navbar';
  import Sidebar from '../components/app/Sidebar';
  import messages from "@/utills/messages";

  export default {
    name: 'main-layout',
    data: ()=>({
      isOpen: true,
    }),
    async mounted() {
      if(!Object.keys(this.$store.getters.info).length){
        await this.$store.dispatch('fetchInfo')
      }
    },
    components: {
      Sidebar, Navbar
    },
    computed:{
      error(){
        return this.$store.getters.error
      }
    },
    watch:{
      error(frError){
        this.$error(messages[frError.code] || 'Ошибка системы')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
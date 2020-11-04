<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import messages from "@/utills/messages";
  export default {
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
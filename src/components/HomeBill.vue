<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span v-if="!getCurrency(cur)">{{ 0 | currencyFilter(cur)}}</span>
          <span v-else>{{getCurrency(cur) | currencyFilter(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homeBill',
    props:['currency'],
    data:()=>({
      currencies:['UZS', 'RUB', 'USD']
    }),
    computed:{
      base(){
        return this.$store.getters.info.bill / (this.currency['UZS'] / this.currency['EUR'])
      }
    },
    methods:{
      getCurrency(currency){
        return this.base * this.currency[currency]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
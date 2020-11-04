<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{this.info.bill | currencyFilter('UZS')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      Категорий нет.
      <router-link to="/categories">Добавить категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currencyFilter('UZS')}} из {{cat.limit | currencyFilter('UZS')}}
        </p>
        <div class="progress" v-tooltip="cat.tooltipe">
          <div
            class="determinate" :class="[cat.recordColor]"
            :style="{width: cat.recordPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from "../filter/currenct.filter";

  export default {
    data: () => ({
      loading: true,
      categories: []
    }),
    computed: {
      ...mapGetters(['info'])
    },
    async mounted() {
      try {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.categories = categories.map(cat => {
          const spend = records
            .filter(r => r.categoryId == cat.id)
            .filter(r => r.type == 'outcome')
            .reduce((total, record) => {
              return total += +record.amount
            }, 0)

          const persent = 100 * spend / cat.limit
          const recordPercent = persent > 100 ? 100 : persent
          const recordColor = persent < 60
            ? 'green'
            : persent < 100
              ? 'yellow'
              : 'red'

          const tooltipValue = cat.limit - spend
          const tooltipe = `${tooltipValue<0?'Превышение на': 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

          return {
            ...cat,
            spend,
            recordPercent,
            recordColor,
            tooltipe
          }
        })
        this.loading = false
      } catch (e) {
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.typeText}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="[record.typeClass]"
            class="card"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currencyFilter('UZS')}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | dateFilter('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Такой записи не существует</p>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data: () => ({
      loading: true,
      record: null
    }),
    async mounted() {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: category.title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }

      this.loading = false
    },
  }
</script>

<style lang="scss" scoped>

</style>
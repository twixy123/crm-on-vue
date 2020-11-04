<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      Категорий нет.
      <router-link to="/categories">Добавить категорию</router-link>
    </p>
    <form class="form" v-else @submit.prevent="checkSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="radio"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="radio"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
            Минимальное значение {{$v.limit.$params.minValue.min}} сум
          </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
            Введите описание
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {minValue, required} from "vuelidate/lib/validators";
  import {mapGetters} from "vuex";

  export default {
    name: 'record',
    data: () => ({
      loading: true,
      select: null,
      categories: [],
      category: null,
      radio: 'outcome',
      amount: 100,
      description: null
    }),
    validations: {
      description: {required},
      amount: {minValue: minValue(100)}
    },
    computed: {
      ...mapGetters(['info']),
      canCreated() {
        if (this.radio == 'income') return true

        return this.info.bill >= this.amount
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if (this.categories.length) this.category = this.categories[0].id

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
      }, 0)
    },
    methods: {
      async checkSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const categoryData = {
          categoryId: this.category,
          type: this.radio,
          description: this.description,
          amount: this.amount,
          date: new Date().toJSON()
        }
        if (this.canCreated) {
          try {
            await this.$store.dispatch('createRecord', categoryData)
            const bill = this.radio == 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount
            await this.$store.dispatch('updateInfo', {bill})
            this.$v.$reset()
            this.amount = 100
            this.description = null
            this.$message(`Запись добавлена`)
          } catch (e) {}
        } else {
          this.$message(`Не достаточно средств (${this.amount - this.info.bill} сум)`)
        }


      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
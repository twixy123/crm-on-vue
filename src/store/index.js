import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import getInfo from "./getInfo";
import category from "./category";
import record from "./record";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  getters: {
    error: s=> s.error
  },
  modules: {
    auth, getInfo, category, record
  },
  actions:{
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,UZS,RUB,EUR`)
      return await res.json()
    }
  }
});

import Vue from "vue";
import Vuelidate from 'vuelidate'
import App from "./App.vue";
import tooltipeDirective from '@/directives/tooltip.directive'
import dateFilter from "@/filter/date.filter";
import currencyFilter from "@/filter/currenct.filter";
import messagePlugin from '@/utills/message.plugin'
import router from "./router";
import store from "./store";
import Loader from "@/components/app/Loader";
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate)
Vue.use(messagePlugin)

Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)

Vue.directive('tooltip', tooltipeDirective)

Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyBEJ2VEHFAYc0SJkvqLuSvBUfiJ0uT1bio",
  authDomain: "crm-on-vue-75ac3.firebaseapp.com",
  databaseURL: "https://crm-on-vue-75ac3.firebaseio.com",
  projectId: "crm-on-vue-75ac3",
  storageBucket: "crm-on-vue-75ac3.appspot.com",
  messagingSenderId: "796371999747",
  appId: "1:796371999747:web:19aa3184b98546096f0236",
  measurementId: "G-FZQC199Z7Z"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})



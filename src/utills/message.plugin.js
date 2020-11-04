export default {
  install(Vue, options){
    Vue.prototype.$message = function (html) {
      return M.toast({html})
    }
    Vue.prototype.$error = function (html) {
      return M.toast({html: `[Ошибка]: ${html}`})
    }
  }
}
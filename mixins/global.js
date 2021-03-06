import Vue from 'vue'
Vue.mixin({
  methods: {
    /**
     * To evaluate a parameter in <template>
     * @param {any} param
     * @param {string} evalString Example: something?.somethingElse
     * @returns {any} Return evaluated param?.something?.somethingElse
     */
    $e(param, evalString) {
      // eslint-disable-next-line no-useless-escape
      if (/^([a-zA-Z0-9\[\].?])*$/g.test(evalString)) {
        // eslint-disable-next-line no-eval
        return eval('param?.' + evalString)
      } else {
        return null
      }
    },
  },
})

import { debug } from '@/services/apiroot.dev'

export default {
  data () {
    return {

    }
  },

  methods: {
    log () {
      if (debug) {
        console.log.apply(null, arguments)
      }
    }
  }
}

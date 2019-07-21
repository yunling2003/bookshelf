<script>
import 'wx-promise-pro'
import baseCommon from '@/mixins/base.common'
import loginCommon from '@/mixins/login.common'
import { apiRoot } from '@/services/apiroot.dev'

export default {
  mixins: [baseCommon, loginCommon],

  data () {
    return {
      shouldCheckToken: true
    }
  },

  methods: {
    saveAppOptions (options) {
      wx.setStorageSync('appOptions', options)
    },

    clearToken () {
      wx.removeStorageSync('authorization')
    }
  },

  async onLaunch (options) {
    this.log('apiRoot', apiRoot)
    this.clearToken()
    this.saveAppOptions(options)
  },

  async onShow () {
    if (this.shouldCheckToken) {
      await this.checkUserLogin()
    }
  },

  async onHide () {
    this.shouldCheckToken = true
  }
}
</script>

<style>

</style>

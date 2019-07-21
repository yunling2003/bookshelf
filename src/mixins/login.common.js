import 'wx-promise-pro'
import {login, getWXUserInfo} from '@/services/index'

export default {
  methods: {
    async checkUserLogin () {
      this.log('checkUserLogin...')

      var beginTick = Date.now()
      var token = wx.getStorageSync('authorization') || ''
      if (typeof token === 'object') {
        token = token.length > 0 ? token[0] : ''
      }

      var obj = token ? JSON.parse(base64decode(token.replace(/.+\.(\w+)\..+/, '$1'))) : {}
      var isExpired = (obj.exp < Date.now() / 1000)
      var isVisitor = !!obj.visitor || !obj.uid

      var endTick = Date.now()
      this.log('auth checking token consumed time: ', endTick - beginTick)

      if (isExpired || isVisitor) {
        this.log('token is expired or is visitor, should do login...........')
        await this.doLogin()
      }
    },

    async doLogin () {
      var user = null

      try {
        var result = await wx.pro.login()
        user = await login(result.code)
        this.app.user = user
        await this.refreshUserData(user)
      } catch (e) {
        this.log('login error:', e)
      }

      return user
    },

    async refreshUserData (user) {
      this.log('refresh user info...')
      var res = await wx.pro.getUserInfo()

      if (res) {
        var data = {
          ...res,
          wechatOpenID: user.wechatOpenID,
          wechatUnionID: user.wechatUnionID
        }
        user = await getWXUserInfo(data)
        this.log('refresh user info result', user)
        this.app.user = user
      }
    }
  }
}

// eslint-disable-next-line no-array-constructor
const base64DecodeChars = new Array(
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  62,
  -1,
  -1,
  -1,
  63,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  -1,
  -1,
  -1,
  -1,
  -1
)

// 解码的方法
const base64decode = str => {
  var c1, c2, c3, c4
  var i, len, out
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c1 === -1)
    if (c1 === -1) break

    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c2 === -1)
    if (c2 === -1) break
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))

    do {
      c3 = str.charCodeAt(i++) & 0xff
      if (c3 === 61) return out
      c3 = base64DecodeChars[c3]
    } while (i < len && c3 === -1)
    if (c3 === -1) break
    out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2))

    do {
      c4 = str.charCodeAt(i++) & 0xff
      if (c4 === 61) return out
      c4 = base64DecodeChars[c4]
    } while (i < len && c4 === -1)
    if (c4 === -1) break
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
  }
  return out
}

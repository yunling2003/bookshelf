import { apiRoot, debug } from './apiroot.dev'
var Fly = require('flyio/dist/npm/wx')

//  debug = true

export default async (path, data, method = 'GET') => {
  var url = apiRoot + path
  var fly = createFly()
  return method === 'GET' ? fly.get(url, data) : fly.post(url, data)
}

export const createFly = () => {
  var fly = new Fly()
  fly.interceptors.request.use(request => {
    if (debug) {
      console.log('>>> request', request)
    }

    wx.showLoading()
    var token = wx.getStorageSync('authorization')
    if (token) {
      request.headers['authorization'] = token
    }

    return request
  })

  fly.interceptors.response.use(response => {
    if (debug) {
      console.log('>>> response', response)
    }

    wx.hideLoading()
    if (response.headers.authorization) {
      wx.setStorageSync('authorization', response.headers.authorization[0])
    }

    return response.data
  }, err => {
    if (debug) {
      console.log('error: ', err)
    }

    if (err.response && err.response.status === 401) {
      wx.showToast({
        icon: 'loading',
        content: '权限不够'
      })
      return
    }

    console.log('network error', JSON.stringify(err.response))
    wx.showToast({
      icon: 'loading',
      title: '网络错误' + JSON.stringify(err.response)
    })
  })

  return fly
}

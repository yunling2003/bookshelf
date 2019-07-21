import fetch from './fetch'

export const getAllBooks = async () => fetch('/api/books')

export const login = async (code) => fetch(`/api/v1/wechat/login`, {code})

export const getWXUserInfo = async (detail) => fetch(`/api/v1/wechat/getuserinfo`, detail, 'POST')

export const getMyUserInfo = async () => fetch('/api/v1/users/myuserinfo')

import request from '@/utils/request'

const local = 'http://localhost:8000'
const cloud = 'https://qingjiao.shop:8000'
const server = cloud
export function login(data) {
  console.log('longinapi', data)
  return request({
    url: server + '/api/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  console.log('getinfo', token)
  return request({
    url: server + '/api/getUserInfo/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

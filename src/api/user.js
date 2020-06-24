import request from '@/utils/request'

export function login(data) {
  console.log('longinapi',data)
  return request({
    url: 'http://localhost:8000/api/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  console.log('getinfo', token)
  return request({
    url: 'http://localhost:8000/api/getUserInfo/',
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

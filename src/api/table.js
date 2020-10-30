import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function orderinquire(params) {
  return request({
    url: 'http://localhost:8000/api/test/',
    method: 'get',
    params
  })
}


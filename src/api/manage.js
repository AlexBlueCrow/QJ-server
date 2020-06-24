import request from '@/utils/request'

const local = 'http://localhost:8000'
const cloud = 'https://qingjiao.shop:8000'
const server = local

export function itemList(farmname) {
  console.log('sent', farmname)
  return request({
    url: server + '/api/itemList/',
    method: 'get',
    params: { farmname }
  })
}

export function farmInfo(farmname) {
  return request({
    url: server + '/api/farm/',
    method: 'get',
    params: { farmname }
  })
}


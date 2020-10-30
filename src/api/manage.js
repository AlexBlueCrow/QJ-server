import request from '@/utils/request'
const local = 'http://localhost:8000'
const cloud = 'https://qingjiao.shop:8000'
const server = cloud
const qs = require('qs')
import Axios from 'axios'
const axios = require('axios').default

export function VIMap(itemid, videos) {
  return axios.post(server + '/api/VIMap/', {
    params: {
      itemid: itemid,
      videosid: videos
    },
    paramsSerializer: function(params) {
      return Qs.stringfy(params, { arrayFormat: 'repeat' })
    }
  }
  )
}

export function itemList(farmname) {
  return request({
    url: server + '/api/Item/',
    method: 'get',
    params: { farmname }
  })
}

export function videoList(farmname) {
  return request({
    url: server + '/api/video/',
    method: 'get',
    params: { farmname }
  })
}

export function farmInfo(farmname) {
  return request({
    url: server + '/api/farm/',
    method: 'GET',
    params: { farmname }
  })
}

export function farmUpdate(formData) {
  return axios.post(
    server + '/api/farm/',
    formData,
    { headers: { 'X-CSRFToken': this.getCookie('csrftoken'), 'Content-Type': 'application/x-www-form-urlencoded' }})
}

export function deleteItem(id) {
  return request({
    url: server + '/api/Item/',
    method: 'DELETE',
    params: { id }
  })
}

export function staticUrl(filename) {
  return server + '/static/' + filename
}


import axios from 'axios'
import Qs from 'qs'

export function getUsers (params) {
  const url = '/sys/user/userList.json'
  // const data = {}
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }]
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function getAllUsers () {
  const url = '/sys/user/allUsers.json'
  // const data = {}
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function saveUser (params) {
  const url = '/sys/user/save.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }]
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function delUser (userId) {
  const url = '/sys/user/del.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    params: {
      userId: userId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

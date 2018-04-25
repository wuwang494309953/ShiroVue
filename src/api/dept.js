import axios from 'axios'
import Qs from 'qs'

export function getDeptTree () {
  const url = '/sys/dept/tree.json'

  // const data = {}
  return axios.get(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function saveDept (params) {
  const url = '/sys/dept/save.json'

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

export function delDept (deptId) {
  const url = '/sys/dept/del.json'
  return axios({
    method: 'post',
    url: url,
    data: {
      id: deptId
    },
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

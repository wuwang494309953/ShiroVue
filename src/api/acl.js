import axios from 'axios'
import Qs from 'qs'

export function getAcls (params) {
  const url = '/sys/acl/aclList.json'
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

export function saveAcl (params) {
  const url = '/sys/acl/save.json'

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
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function delAcl (aclId) {
  const url = '/sys/acl/del.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    params: {
      aclId: aclId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function getAclWithModule (aclModuleId) {
  const url = '/sys/acl/aclWithModule.json'

  // const data = {}
  return axios({
    method: 'get',
    url: url,
    params: {
      aclModuleId: aclModuleId
    }
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

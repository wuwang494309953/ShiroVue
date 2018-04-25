import axios from 'axios'
import Qs from 'qs'

export function saveRole (params) {
  const url = '/sys/role/save.json'

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

export function delRole (roleId) {
  const url = '/sys/role/del.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    params: {
      roleId: roleId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function getRoles () {
  const url = '/sys/role/getRoles.json'

  // const data = {}
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function changeUsers (roleId, userIds) {
  const url = '/sys/role/changeUsers.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    params: {
      roleId: roleId,
      userIds: userIds
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function changeAcls (roleId, aclIds) {
  const url = '/sys/role/changeAcls.json'

  // const data = {}
  return axios({
    method: 'post',
    url: url,
    params: {
      roleId: roleId,
      aclIds: aclIds
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function getUsersWithRoleId (roleId) {
  const url = '/sys/role/getUsersWithRoleId.json'

  // const data = {}
  return axios({
    method: 'get',
    url: url,
    params: {
      roleId: roleId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

import axios from 'axios'
import Qs from 'qs'

export function getAclModuleTree () {
  const url = '/sys/aclModule/tree.json'

  // const data = {}
  return axios.get(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function saveAclModule (params) {
  const url = '/sys/aclModule/save.json'

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

export function getAclModuleIdsWithRoleId (roleId) {
  const url = '/sys/aclModule/getAclModulesWithRoleId.json'

  // const data = {}
  return axios({
    method: 'get',
    url: url,
    params: {
      roleId: roleId
    }
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

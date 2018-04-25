import axios from 'axios'
// import Qs from 'qs'

export function rePermission () {
  const url = '/shiro/rePermission'

  // const data = {}
  return axios({
    method: 'post',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

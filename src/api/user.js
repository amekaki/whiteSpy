import request from '@/utils/request'
export function getUserInfo () {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': localStorage.getItem("token")
    },
  })
}

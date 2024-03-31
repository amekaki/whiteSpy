import request from '@/utils/request'

export function sendToOneUser (userId) {
  var data={"userId":userId}
  return request({
    url: '/telegram/sendMessage',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function startChatList (userList,groupId) {
  var data={
    "userList":userList,
    "groupId":groupId
}
  return request({
    url: '/telegram/startChatList',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getChatTasks (type) {
  var data={
    "type":type
}
  return request({
    url: '/telegram/getTasks',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}


import request from '@/utils/request'
export function getGroupSearchResult (searchQuery) {
  var data={"searchQuery":searchQuery}
  return request({
    url: '/telegram/searchGroup2',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getGroupChatRecord (groupName) {
  var data={"groupName":groupName}
  return request({
    url: '/telegram/getGroupChatRecord',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getUserByGroupId (groupId) {
  var data={"groupId":groupId}
  return request({
    url: '/telegram/getAllUserByGroup',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getAllGroup () {
  return request({
    url: '/telegram/getAllGroups',
    method: 'get'
  })
}
export function getAllTGBOTS () {
  return request({
    url: '/telegram/getTGBots',
    method: 'get'
  })
}
export function getAllQQBOTS () {
  return request({
    url: '/telegram/getQQBots',
    method: 'get'
  })
}
export function getAllUserApi () {
  return request({
    url: '/telegram/getAllUsers',
    method: 'get'
  })
}
export function addGroup (activeGroup) {
  var data={"activeGroup":activeGroup}
  return request({
    url: '/telegram/addGroup',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getUserInfoById (userId) {
  var data={"userId":userId}
  return request({
    url: '/telegram/getUserInfoById',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getGroupInfoById (userId) {
  var data={"id":userId}
  return request({
    url: '/telegram/getgroupById',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getMsgLogById (userId) {
  var data={"userId":userId}
  return request({
    url: '/msg/getMsgLogById',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function deleteGroupsById (ids) {
  var data={"groupIds":ids}
  return request({
    url: '/telegram/deleteGroups',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}

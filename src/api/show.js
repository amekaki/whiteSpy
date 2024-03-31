import request from '@/utils/request'
export function getGraphDataByType (userId,type) {
  var data={
    "userId":userId,
    "nodeType":type
}
  return request({
    url: '/show/getGraphDataByNodeType',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getGraphDataByNodeId (nodeId) {
  var data={"nodeId":nodeId}
  return request({
    url: '/show/getGraphDataByNodeId',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getAllGraphData() {
  return request({
    url: '/show/getAllGraphData',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
  })
}

export function getGroupGraphData() {
  return request({
    url: '/show/getGroupAnalyseGraph',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
  })
}
export function getGroupStatistic() {
  return request({
    url: '/show/getGroupStatistic',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
  })
}
export function getGroupInfo() {
  return request({
    url: '/show/getGroupInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
  })
}
export function getGroupListInfo() {
  return request({
    url: '/show/getGroupListInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
  })
}
export function getGroupAnalyseGraphByUser (userId) {
  console.log("userId",userId)
  var data={"userId":userId}
  return request({
    url: '/show/getGroupAnalyseGraphByUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function getGraphDataByUserId (userId) {
  console.log("userId",userId)
  var data={"userId":userId}
  return request({
    url: '/show/getGraphDataByUserId',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}

import request from '@/utils/request'
export function getPosts (location,type) {
  var getUrl
  console.log("location",location,type)
  if(location!=0){
    if(type!=0){
      getUrl='/post/getPosts?location='+location+'&type='+type
    }else {
      getUrl='/post/getPosts?location='+location
    }
  }else {
    getUrl='/post/getPosts'
  }
  return request({
    url: getUrl,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getPostByID (postID) {
  console.log("API GET POSTID",postID)
  var data={"postID":postID}
  return request({
    url: '/post/getPostByPostID',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function InsertPost (postID) {
  console.log("API GET POSTID",postID)
  var data={"postID":postID}
  return request({
    url: '/post/insertPost',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function uploadePostCover (formData) {
  // console.log("API login",password,phonenumber)
//   var data={
//     "phoneNumber":phonenumber,
//     "password":password,
// }
  return request({
    url: '/post/uploadeCover',
    method: 'post',
    headers: {
      'token': localStorage.getItem("token")
    },
    data:formData
  })
}
export function uploadPost (content, location, type, cover, header) {
  console.log(header)
  var data={
    "content":content,
    "location":location,
    "type":type,
    "cover":cover,
    "header":header
}
  return request({
    url: '/post/createPost',
    method: 'post',
    headers: {
      'token': localStorage.getItem("token")
    },
    data:data
  })
}


import request from '@/utils/request'
export function registeUser (username,password,phonenumber) {
  console.log("API Resgiter",username,password,phonenumber)
  var data={
    "phoneNumber":phonenumber,
    "password":password,
    "userName":username
}
  return request({
    url: '/auth/registe',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}
export function loginUser (phonenumber,password) {
  console.log("API login",password,phonenumber)
  var data={
    "phoneNumber":phonenumber,
    "password":password,
}
  return request({
    url: '/auth/loginByPassword',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}

export function uploaderImg (formData) {
  // console.log("API login",password,phonenumber)
//   var data={
//     "phoneNumber":phonenumber,
//     "password":password,
// }
  return request({
    url: '/auth/uploaderAvatar',
    method: 'post',
    headers: {
      'token': localStorage.getItem("token")
    },
    data:formData
  })
}
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
    url: '/post/getPost',
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON'
    },
    data:data
  })
}

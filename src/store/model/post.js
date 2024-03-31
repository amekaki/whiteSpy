import {getPosts} from '../../api/post'
const post={
  actions:{
    GetPost({commit},args) {
      console.log("args",args)
      return new Promise((resolve, reject) => {
       getPosts(args[0],args[1]).then(response => {
          console.log('resopnsee', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default post

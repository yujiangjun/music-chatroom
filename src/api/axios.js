import axios from "axios";

const instance=axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 3000
})

// 请求拦截
instance.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    // if (store.state.app.token) {
    //   config.headers.token = store.state.app.token;
    //   config.headers.timestamp = new Date().getTime();
    // }
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截
instance.interceptors.response.use(response => {
    // const resCode = response.status;
    // if (resCode === 200) {
    //   return Promise.resolve(response);
    // } else {
    //   return Promise.reject(response);
    // }
    return response;
}, error => {
    // const resCode = error.response.status;
    // switch (resCode) {
    //   case 401:
    //     vm.$Message.error(error.response.data.message);
    //     store.commit('logout', this);
    //     store.commit('clearOpenedSubmenu');
    //     // console.log('token-0', store.state.app.token);
    //     router.replace({
    //       name: 'login'
    //     });
    //     break;
    //   case 404:
    //     vm.$Message.error('网络请求不存在');
    //     break;
    //   case 500:
    //     vm.$Message.error('服务器连接错误');
    //     break;
    //   // 其他状态码错误提示
    //   default:
    //     vm.$Message.error(error.response.data.message);
    // }
    return Promise.reject(error);
})

//get方法
function GetExample(url,params){
    return new Promise((resolve, reject) =>{
        instance.get(url,{params:params}).then((resp)=>{
            resolve(resp.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

// function PostExample(url,data){
//     return new Promise((resolve, reject)=>{
//         instance.post(url,data).then((resp)=>{
//             resolve(resp.data)
//         }).catch((error)=>{
//             reject(error)
//         })
//     })
// }

/**
 * 获取音乐排行榜top100
 */
export function getTopSongs(){
    let url="/music/getTopSongs"
    return GetExample(url,null)
}

export function searchMusic(key){
    let url='/music/searchMusicList'
    return GetExample(url,key)
}

export function getSongPlayUrl(songMid){
    let url="/music/getSongPlayUrl";
    return GetExample(url,songMid)
}

export function getSongLyric(songMid){
    let url="/music/getLyric"
    return GetExample(url,songMid)
}
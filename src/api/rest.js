import {
    getRoomList,
    getSearchHis,
    getSongLyric,
    getSongPlayUrl,
    getTopSongs,
    login,
    searchMusic,
    uploadFile
} from '@/api/axios'

export default {
    getTopSongs:()=>getTopSongs(),
    searchMusic:(key)=>searchMusic(key),
    getSongPlayUrl:(songMid)=>getSongPlayUrl(songMid),
    getSongLyric:(songMid)=>getSongLyric(songMid),
    getSearchHis:()=>getSearchHis(),
    uploadFile:(file)=>uploadFile(file),
    login:(data)=>login(data),
    getRoomList:()=>getRoomList()
}
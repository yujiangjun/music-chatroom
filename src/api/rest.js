import {getSearchHis, getSongLyric, getSongPlayUrl, getTopSongs, searchMusic, uploadFile} from '@/api/axios'

export default {
    getTopSongs:()=>getTopSongs(),
    searchMusic:(key)=>searchMusic(key),
    getSongPlayUrl:(songMid)=>getSongPlayUrl(songMid),
    getSongLyric:(songMid)=>getSongLyric(songMid),
    getSearchHis:()=>getSearchHis(),
    uploadFile:(file)=>uploadFile(file)
}
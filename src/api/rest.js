import {getSongPlayUrl, getTopSongs, searchMusic} from '@/api/axios'

export default {
    getTopSongs:()=>getTopSongs(),
    searchMusic:(key)=>searchMusic(key),
    getSongPlayUrl:(songMid)=>getSongPlayUrl(songMid)
}
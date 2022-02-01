import HelloWorld from "@/components/HelloWorld";
import VueRouter from "vue-router";
import Login from '@/view/Login'
import Main from '@/view/main'
import Chat from '@/view/chat'
import Repertoire from '@/view/repertoire'
import ChooseSong from '@/view/choose_song'
import player from "@/view/player";
import test from "@/view/test"

const routes = [
    { path: '/hello', component: HelloWorld },
    { path: '/', component: Login },
    { path: '/player', component: player },
    { path: '/test',component: test},
    {
        path: '/main', component: Main,
        children:[
            {path:'chat',component:Chat},
            {path:'repertoire',component:Repertoire},
            {path:'chooseSong',component:ChooseSong}
        ]
    }

]
const router=new VueRouter({
    routes
})

export default router


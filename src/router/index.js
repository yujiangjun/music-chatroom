import HelloWorld from "@/components/HelloWorld";
import VueRouter from "vue-router";
import Test from '@/view/Test'
import Main from '@/view/main'
import Chat from '@/view/chat'
import Repertoire from '@/view/repertoire'
import ChooseSong from '@/view/choose_song'

const routes = [
    { path: '/hello', component: HelloWorld },
    { path: '/test', component: Test },
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


import Vue from "vue";
import VueRouter from "vue-router";

const Map1=()=>import('../views/Information/Map1.vue')
const Map2=()=>import('../views/Information/map2.vue')

Vue.use(VueRouter);
export default new VueRouter({
 routes: [
  {
    path: "/",
    redirect: "/map1"
  },{
    path: "/map1",
    name: "Map1",
    component: Map1
  },{
    path: "/map2",
    name: "Map2",
    component: Map2
  }
]
})


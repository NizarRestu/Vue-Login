// import { createRouter, createWebHistory, RouterLink } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../view/Home.vue";
import About from "../view/About.vue";
import Contact from "../view/Contact.vue";
import Product from "../view/Product.vue";
import Detail from "../view/Detail.vue";


import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)
const routes = [
  {
path: "/",
name:"LoginPage",
component:Login
  },
  {
path:"/register",
name:"RegisterPage",
component:Register
  },
  {
    path:"/home",
    name:"Home",
    component:Home
  },
  {
    path:"/about",
    component:About
  },
  {
    path:"/contact",
    component:Contact
  },
  {
    path:"/product",
    component:Product
  },
  {
    path:"/detail",
    component:Detail
  }
];
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });


const router =new Router({
  routes,
  mode: "history",
});

export default router;

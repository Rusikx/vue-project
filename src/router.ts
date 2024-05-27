import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
// lazy-loaded
const Profile = () => import("./pages/Profile.vue");
const Network = () => import("./pages/Network.vue");
// const BoardAdmin = () => import("./pages/BoardAdmin.vue");
// const BoardModerator = () => import("./pages/BoardModerator.vue");
const BoardUser = () => import("./pages/BoardUser.vue");

// const DEFAULT_TITLE: string = "Default Title"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login"
      }
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/network",
      name: "network",
      // lazy-loaded
      component: Network,
    },
    // {
    //   path: "/admin",
    //   name: "admin",
    //   // lazy-loaded
    //   component: BoardAdmin,
    // },
    // {
    //   path: "/mod",
    //   name: "moderator",
    //   // lazy-loaded
    //   component: BoardModerator,
    // },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: BoardUser,
    },
    // {
    //   path: "/",
    //   name: "main",
    //   component: () => import("./pages/Main.vue"),
    //   meta: {
    //     title: "Main"
    //   }
    // },
  ],
});

// this is an async function without try catch, but only autologin will fail, which is ok
// router.beforeEach(async (to, from, next) => {
//   const mainStore = useMainStore()
//   // do auto login
//   const jwtToken = localStorage.getItem("jwt.token")
//   const ghToken = localStorage.getItem("gh.token")
//   if (!mainStore.isAuthenticated && jwtToken && ghToken) {
//     await mainStore.login(jwtToken, ghToken)
//   }
//
//   // if meta.requiresAuth is true, check if the user is authenticated
//   // only next() if the user is authenticated, otherwise redirect to start
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (mainStore.isUserAuthenticated) next()
//     else next({ name: "start" })
//   } else next()
// })
//
//
// router.afterEach((to, from) => {
//   // set the page title
//   document.title = String(to.meta.title || DEFAULT_TITLE)
// })

export default router;

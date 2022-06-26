import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "ValoMe - Get your stats & more!",
      metaTags: [
        {
          name: "description",
          content:
            "Valorant Stats! Check your profile and weapon statistics. compare your performace to others players.",
        },
        {
          property: "og:description",
          content:
            "Valorant Stats! Check your profile and weapon statistics. compare your performace to others players.",
        },
      ],
    },
  },
  {
    path: "/profile/:Name/:Tag",
    name: "Overview",
    component: () => import("../views/Overview.vue"),
  },
  {
    path: "/stats/:MatchID",
    name: "Stats",
    component: () => import("../views/Stats.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

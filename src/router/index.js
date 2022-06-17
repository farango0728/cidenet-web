import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import { canNavigate } from "@/libs/acl/routeProtection";
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@/auth/utils";
import apps from "./routes/apps";
import employees from "./routes/employees";
import areas from "./routes/areas";
import country from "./routes/country";
import identificationType from "./routes/identificationType";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    ...apps,
    ...employees,
    ...areas,
    ...country,
    ...identificationType,
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: "auth-login" });

    // If logged in => not authorized
    return next({ name: "misc-not-authorized" });
  }

  // Redirect if logged in

  if (to.meta.redirectIfLoggedIn == false && isLoggedIn) {
    return next({ name: "misc-not-authorized" });
  }

  return next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;

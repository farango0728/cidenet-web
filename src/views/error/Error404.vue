<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <img src="logo.png" alt="" />
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">Page Not Found 🕵🏻‍♀️</h2>
        <p class="mb-2">
          Oops! 😖 The requested URL was not found on this server.
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="loginRoute()"
        >
          Back to home
        </b-button>

        <!-- image -->
        <b-img fluid :src="imgUrl" alt="Error page" />
      </div>
    </div>
  </div>
  <!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";

export default {
  components: {
    VuexyLogo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require("@/assets/images/pages/error.svg"),
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/error-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
  methods: {
    loginRoute() {
      const user = JSON.parse(localStorage.getItem("userData"));
      return getHomeRouteForLoggedInUser(user ? user.role : null);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
</style>

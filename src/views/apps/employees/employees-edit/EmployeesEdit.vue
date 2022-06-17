<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs v-if="userData" pills>
      <!-- Header: Personal Info -->
      <div class="d-flex">
        <feather-icon icon="UserIcon" size="19" />
        <h4 class="mb-0 ml-50">Employee Information</h4>
      </div>
      <user-edit-tab-account :user-data="userData" class="mt-2 pt-75" />
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import employeeStoreModule from "../employeeStoreModule";
import UserEditTabAccount from "./AreaEditTabAccount.vue";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserEditTabAccount,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-areas";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, employeeStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-areas/fetchOne", { id: router.currentRoute.params.id })
      .then((response) => {
        userData.value = response.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          userData.value = undefined;
        }
      });

    return {
      userData,
    };
  },
};
</script>

<style></style>

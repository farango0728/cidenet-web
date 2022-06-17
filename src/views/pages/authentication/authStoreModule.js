import axios from "@axios";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchAuth(ctx, queryParams) {
      const { user_name, password } = queryParams.value;
      return new Promise((resolve, reject) => {
        axios
          .post("/auth", { user_name, password })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
};

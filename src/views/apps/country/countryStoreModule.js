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
    fetchAll(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get("/country/getAll", { params: queryParams })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    fetchOne(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/country/getOne/${id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    add(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .post("/country/add", { params: queryParams.model.value })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },

    update(ctx, queryParams) {
      const id = queryParams.model.value.id;
      delete queryParams.model.value.id;
      return new Promise((resolve, reject) => {
        axios
          .put(`/country/update/${id}`, { params: queryParams.model.value })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    updateStatus(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        const status = { status: queryParams.status };
        axios
          .put(`/country/updateStatus/${queryParams.id}`, { status })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
};

<template>
  <div>
    <!-- User Info: Input Fields -->
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- Field: name -->
          <b-col cols="12" md="4">
            <b-form-group label="Name Country" label-for="nameCountry">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name Area"
              >
                <b-form-input id="username" v-model="model.name" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Domain -->
          <b-col cols="12" md="4">
            <b-form-group label="Domain" label-for="domain">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Domain"
              >
                <b-form-input id="domain" v-model="model.domain" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click.prevent="validationForm"
    >
      Create Area
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="reset"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required,
  email,
  confirmed,
  url,
  between,
  alpha,
  integer,
  password,
  min,
  digits,
  alphaDash,
  length,
} from "@validations";
import router from "@/router";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import countryStoreModule from "../countryStoreModule";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,

    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.addEmployee();
        }
      });
    },
  },
  setup() {
    const toast = useToast();

    const USER_APP_STORE_MODULE_NAME = "app-country";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, countryStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const model = ref({
      name: "",
      domain: "",
      status: true,
    });
    const userData = ref(null);

    const addEmployee = () => {
      store
        .dispatch("app-country/add", { model })
        .then((response) => {
          userData.value = response.data;
          toast({
            component: ToastificationContent,
            props: {
              title: `The country ${model.value.name} was created correctly`,
              icon: "AlertTriangleIcon",
              variant: "success",
            },
          });
          router.push({ name: "apps-country-list" });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            userData.value = undefined;
          }
        });
    };

    const reset = () => {
      model.value.name = "";
      model.value.domain = "";
    };

    return {
      model,

      addEmployee,
      reset,
    };
  },
};
</script>

<style lang="scss"></style>

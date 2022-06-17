<template>
  <div>
    <validation-observer ref="simpleRules">
      <!-- User Info: Input Fields -->
      <b-form>
        <b-row>
          <!-- Field: Name -->
          <b-col cols="12" md="4">
            <b-form-group
              label="Name Identification Type"
              label-for="identificationType"
            >
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name Identification Type"
              >
                <b-form-input id="username" v-model="model.name" />
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
      @click.prevent="validationForm(userData.id)"
    >
      Save Changes Area
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
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
import vSelect from "vue-select";
import router from "@/router";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import identificationTypeStoreModule from "../identificationTypeStoreModule";
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
    vSelect,

    ValidationProvider,
    ValidationObserver,
  },
  props: {
    userData: {
      required: true,
    },
  },
  methods: {
    validationForm(id) {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.update(id);
        }
      });
    },
  },
  setup(props) {
    const USER_APP_STORE_MODULE_NAME = "app-identification-type";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(
        USER_APP_STORE_MODULE_NAME,
        identificationTypeStoreModule
      );

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const toast = useToast();

    const statusOptions = [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ];
    const userData1 = ref(null);

    const { id, name } = props.userData;

    const model = ref({
      id,
      name,
    });

    const update = (id) => {
      store
        .dispatch("app-identification-type/update", {
          model,
        })
        .then((response) => {
          userData1.value = response.data;
          toast({
            component: ToastificationContent,
            props: {
              title: `The identification type  was created correctly`,
              icon: "AlertTriangleIcon",
              variant: "success",
            },
          });
          router.push({ name: "apps-identification-type-list" });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            userData1.value = undefined;
          }
        });
    };

    return {
      model,

      update,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

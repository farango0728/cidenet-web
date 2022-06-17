<template>
  <div>
    <validation-observer ref="simpleRules">
      <!-- User Info: Input Fields -->
      <b-form>
        <b-row>
          <!-- Field: Status -->
          <b-col cols="12" md="4">
            <b-form-group
              label="Identification Type"
              label-for="identificationType"
            >
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name identification Type"
              >
                <v-select
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="identificationTypeOptions"
                  :reduce="(val) => val.value"
                  :clearable="false"
                  v-model="model.identificationTypeId"
                  input-id="user-status"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group
              label="Identification Number"
              label-for="identificationNumber"
            >
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name identification Number"
              >
                <b-form-input
                  id="username"
                  v-model="model.identification_number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group label="First Surname" label-for="firstSurname">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name first Surname"
              >
                <b-form-input id="username" v-model="model.first_surname" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group label="Second Surname" label-for="secondSurname">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name second Surname"
              >
                <b-form-input id="username" v-model="model.second_surname" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group label="First Name" label-for="firstName">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name first Name"
              >
                <b-form-input id="username" v-model="model.first_name" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group label="Other Names" label-for="otherNames">
              <validation-provider
                #default="{ errors }"
                rules=""
                name="Name other Names"
              >
                <b-form-input id="username" v-model="model.other_names" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Status -->
          <b-col cols="12" md="4">
            <b-form-group label="Country" label-for="country">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name country"
              >
                <v-select
                  :options="countryOptions"
                  v-model="model.countryId"
                  :reduce="(val) => val.value"
                  :clearable="false"
                  input-id="country"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: BirthDate -->
          <b-col cols="12" md="4">
            <b-form-group>
              <label>Admission Date</label>
              <validation-provider
                #default="{ errors }"
                name="Admission Date"
                rules=""
              >
                <flat-pickr
                  v
                  class="form-control"
                  v-model="model.Admission_date"
                  :state="errors.length > 0 ? false : null"
                  placeholder=""
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Status -->
          <b-col cols="12" md="4">
            <b-form-group label="Area" label-for="area">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Name Area"
              >
                <v-select
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="areasOptions"
                  :reduce="(val) => val.value"
                  :clearable="false"
                  v-model="model.areaId"
                  input-id="user-status"
                />
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
import employeeStoreModule from "../employeeStoreModule";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    flatPickr,

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
    const USER_APP_STORE_MODULE_NAME = "app-employees";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, employeeStoreModule);

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

    const {
      id,
      first_surname,
      second_surname,
      first_name,
      other_names,
      identification_number,
      Admission_date,
      areaId,
      identificationTypeId,
      countryId,
    } = props.userData;

    const model = ref({
      id,
      first_surname,
      second_surname,
      first_name,
      other_names,
      identification_number,
      Admission_date,
      areaId,
      identificationTypeId,
      countryId,
    });
    const country = [];
    const countryOptions = ref([]);

    const area = [];
    const areasOptions = ref([]);

    const identification_type = [];
    const identificationTypeOptions = ref([]);

    store
      .dispatch("app-employees/fetchHelpers")
      .then((response) => {
        const { countries, areas, identificationType } = response.data.data;
        countries.map((data, item) => {
          country.push({ label: data.name, value: data.id, id: item });
        });

        areas.map((data, item) => {
          area.push({ label: data.name, value: data.id, id: item });
        });

        identificationType.map((data, item) => {
          identification_type.push({
            label: data.name,
            value: data.id,
            id: item,
          });
        });

        countryOptions.value = country;
        areasOptions.value = area;
        identificationTypeOptions.value = identification_type;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          userData.value = undefined;
        }
      });

    const update = (id) => {
      store
        .dispatch("app-areas/update", {
          model,
        })
        .then((response) => {
          userData1.value = response.data;
          toast({
            component: ToastificationContent,
            props: {
              title: `The employee  was created correctly`,
              icon: "AlertTriangleIcon",
              variant: "success",
            },
          });
          router.push({ name: "apps-employees-list" });
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
      countryOptions,
      identificationTypeOptions,
      areasOptions,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>

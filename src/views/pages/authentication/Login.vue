<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Login-->
      <b-col lg="6" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="9" class="px-xl-2 mx-auto">
          <img src="logo-login.png" class="img-fluid" alt="" />
          <b-card-title
            class="mb-1 font-weight-bold text-center"
            title-tag="h1"
          >
            Welcome admin
          </b-card-title>

          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- email -->
              <b-form-group
                label="Username"
                class="font-weight-bold"
                label-size="lg"
                label-for="userName"
              >
                <validation-provider
                  #default="{ errors }"
                  name="username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="userName"
                    v-model="userName"
                    :state="errors.length > 0 ? false : null"
                    name="userame"
                    placeholder="Use your username"
                    size="lg"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                label="Password"
                class="font-weight-bold"
                label-size="lg"
                label-for="login-password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Write your password"
                      size="lg"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group class="">
                <div class="container">
                  <div class="row">
                    <b-form-checkbox
                      id="remember-me"
                      v-model="status"
                      name="checkbox-1"
                      class="d-inline col-6"
                    >
                      Remember Me
                    </b-form-checkbox>
                    <div class="d-inline col-6 text-right">
                      <b-link>
                        <p class="font-weight-bold">Forgot Password?</p>
                      </b-link>
                    </div>
                  </div>
                </div>
              </b-form-group>

              <!-- submit buttons -->
              <div class="text-center mt-2">
                <b-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  pill
                  :disabled="invalid"
                >
                  Sign in
                </b-button>
              </div>
            </b-form>
          </validation-observer>

          <br />
          <br />
          <div class="text-center mt-4">© 2022 · Cidenet.</div>
        </b-col>
      </b-col>
      <!-- /Login-->
      <!-- Left Text-->
      <b-col lg="6" class="ml-n1 d-none d-lg-flex bg-white">
        <b-img fluid :src="imgUrl" alt="Login V2" />
      </b-col>
      <!-- /Left Text-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import router from "@/router";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import { ref, onUnmounted } from "@vue/composition-api";
import authStoreModule from "./authStoreModule";
import jwt from "jsonwebtoken";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userName: "",
      sideImg: require("@/assets/images/pages/login-nuevo.png"),

      // validation rules
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        /*  this.sideImg = require("@/assets/images/pages/login-v2-dark.svg"); */
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.loginForm(
            this.userName,
            this.password,
            this.$ability,
            this.$toast
          );
        }
      });
    },
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = "app-auth";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, authStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const model = ref({
      user_name: "",
      password: "",
    });

    const jwtConfig = {
      secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
      refreshTokenSecret: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
      expireTime: "10m",
      refreshTokenExpireTime: "10m",
    };

    return {
      loginForm: (email, password, data, toast) => {
        model.value.user_name = email;
        model.value.password = password;
        store
          .dispatch("app-auth/fetchAuth", model)
          .then((response) => {
            if (response.data.is_access) {
              const { token, user, menuUser, dataUser } = response.data;
              const { id } = user;
              const accessToken = jwt.sign({ id }, jwtConfig.secret, {
                expiresIn: jwtConfig.expireTime,
              });

              const refreshToken = jwt.sign(
                { id },
                jwtConfig.refreshTokenSecret,
                {
                  expiresIn: jwtConfig.refreshTokenExpireTime,
                }
              );

              const userData = { ...user };

              delete userData.password;

              /* useJwt.setToken(accessToken);
              useJwt.setRefreshToken(refreshToken); */
              useJwt.setToken(token);
              useJwt.setRefreshToken(token);
              const dataStoreLocal = {
                dataUser,
                token,
                userData,
                fullName: `${dataUser.Employeess_first_name} ${dataUser.Employeess_last_name}`,
                username: dataUser.name,
                // eslint-disable-next-line global-require
                avatar: require("@/assets/images/avatars/avatar.png"),
                email: "admin",
                role: dataUser.rol,
                roleId: dataUser.rolId,
                ability: [
                  {
                    action: "manage",
                    subject: "all",
                  },
                ],
              };

              localStorage.setItem("userData", JSON.stringify(dataStoreLocal));

              localStorage.setItem("menuUser", JSON.stringify(menuUser));

              data.update(dataStoreLocal.ability);

              router
                .replace(getHomeRouteForLoggedInUser(dataStoreLocal.role))
                .then(() => {
                  toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `Welcome ${
                        dataStoreLocal.fullName || dataStoreLocal.username
                      }`,
                      icon: "CoffeeIcon",
                      variant: "success",
                      text: `You have successfully logged in as ${dataStoreLocal.role}. Now you can start to explore!`,
                    },
                  });
                });
            } else {
              toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                  title: `ERROR`,
                  icon: "CoffeeIcon",
                  variant: "danger",
                  text: `User no Autorized`,
                  solid: true,
                },
              });
            }
          })
          .catch((error) => {
            console.log("ERROR", error);
          });
      },
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>

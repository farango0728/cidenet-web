export default [
  {
    path: "/apps/country/create",
    name: "apps-country-add",
    component: () => import("@/views/apps/country/country-add/CountryAdd.vue"),
    meta: {
      pageTitle: "Country",
      breadcrumb: [
        {
          text: "Country",
        },
        {
          text: "Create",
        },
      ],
    },
  },
  {
    path: "/apps/country/list",
    name: "apps-country-list",
    component: () =>
      import("@/views/apps/country/country-list/CountryList.vue"),
    meta: {
      pageTitle: "Countries",
      breadcrumb: [
        {
          text: "Countries",
        },
        {
          text: "List",
        },
      ],
    },
  },
  {
    path: "/apps/country/edit",
    name: "apps-country-edit",
    component: () =>
      import("@/views/apps/country/country-edit/CountryEdit.vue"),
    meta: {
      pageTitle: "Country",
      breadcrumb: [
        {
          text: "Country",
        },
        {
          text: "Edit",
        },
      ],
    },
  },
];

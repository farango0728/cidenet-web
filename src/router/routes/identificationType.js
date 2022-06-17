export default [
  {
    path: "/apps/identification-type/create",
    name: "apps-identification-type-add",
    component: () =>
      import(
        "@/views/apps/identificationType/identificationType-add/IdentificationTypeAdd.vue"
      ),
    meta: {
      pageTitle: "Identification Type",
      breadcrumb: [
        {
          text: "Identification Type",
        },
        {
          text: "Create",
        },
      ],
    },
  },
  {
    path: "/apps/identification-type/list",
    name: "apps-identification-type-list",
    component: () =>
      import(
        "@/views/apps/identificationType/identificationType-list/IdentificationTypeList.vue"
      ),
    meta: {
      pageTitle: "Identification Type",
      breadcrumb: [
        {
          text: "Identification Type",
        },
        {
          text: "List",
        },
      ],
    },
  },
  {
    path: "/apps/identification-type/edit",
    name: "apps-identification-type-edit",
    component: () =>
      import(
        "@/views/apps/identificationType/identificationType-edit/IdentificationTypeEdit.vue"
      ),
    meta: {
      pageTitle: "Identification Type",
      breadcrumb: [
        {
          text: "Identification Type",
        },
        {
          text: "Edit",
        },
      ],
    },
  },
];

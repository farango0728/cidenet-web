export default [
  {
    path: "/apps/areas/create",
    name: "apps-areas-add",
    component: () => import("@/views/apps/areas/areas-add/AreasAdd.vue"),
    meta: {
      pageTitle: "Areas",
      breadcrumb: [
        {
          text: "Areas",
        },
        {
          text: "Create",
        },
      ],
    },
  },
  {
    path: "/apps/areas/list",
    name: "apps-areas-list",
    component: () => import("@/views/apps/areas/areas-list/AreasList.vue"),
    meta: {
      pageTitle: "Areas",
      breadcrumb: [
        {
          text: "Areas",
        },
        {
          text: "List",
        },
      ],
    },
  },
  {
    path: "/apps/areas/edit",
    name: "apps-areas-edit",
    component: () => import("@/views/apps/areas/areas-edit/AreasEdit.vue"),
    meta: {
      pageTitle: "Areas",
      breadcrumb: [
        {
          text: "Areas",
        },
        {
          text: "Edit",
        },
      ],
    },
  },
];

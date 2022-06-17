export default [
  {
    path: "/apps/employees/create",
    name: "apps-employees-add",
    component: () =>
      import("@/views/apps/employees/employees-add/EmployeesAdd.vue"),
    meta: {
      pageTitle: "Employee",
      breadcrumb: [
        {
          text: "Employee",
        },
        {
          text: "Create",
        },
      ],
    },
  },
  {
    path: "/apps/employees/list",
    name: "apps-employees-list",
    component: () =>
      import("@/views/apps/employees/employees-list/EmployeeList.vue"),
    meta: {
      pageTitle: "Employees",
      breadcrumb: [
        {
          text: "Employees",
        },
        {
          text: "List",
        },
      ],
    },
  },
  {
    path: "/apps/employees/edit",
    name: "apps-employees-edit",
    component: () =>
      import("@/views/apps/employees/employees-edit/EmployeesEdit.vue"),
    meta: {
      pageTitle: "Employee",
      breadcrumb: [
        {
          text: "Employee",
        },
        {
          text: "Edit",
        },
      ],
    },
  },
];

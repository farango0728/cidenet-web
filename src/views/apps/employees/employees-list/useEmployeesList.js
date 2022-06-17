import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";
import { title } from "@core/utils/filter";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useUsersList() {
  // Use toast
  const toast = useToast();

  const refUserListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "id", sortable: true },
    { key: "first_surname", sortable: true },
    { key: "second_surname", sortable: true },
    { key: "first_name", sortable: true },
    { key: "other_names", sortable: true },
    { key: "identification_number", sortable: true },
    { key: "email", sortable: true },
    { key: "Admission_date", sortable: true },
    { key: "status", sortable: true },
    { key: "country.name", label: "Country", sortable: true },
    {
      key: "identification_type.name",
      label: "identification type",
      sortable: true,
    },
    { key: "area.name", label: "area", sortable: true },
    { key: "actions" },
  ];
  const perPage = ref(5);
  const totalUsers = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [1, 5, 10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("id");
  const isSortDirDesc = ref(true);
  const nameFilter = ref(null);
  const countryFilter = ref(null);
  const identificationTypeFilter = ref(null);
  const statusFilter = ref(null);
  const itemsAreas = ref([]);
  const itemsStatus = ref([]);
  const itemsCountry = ref([]);
  const itemsIdentificationType = ref([]);

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value
      ? refUserListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    };
  });

  const refetchData = () => {
    refUserListTable.value.refresh();
  };

  watch(
    [
      currentPage,
      perPage,
      searchQuery,
      nameFilter,
      statusFilter,
      countryFilter,
      identificationTypeFilter,
    ],
    () => {
      refetchData();
    }
  );

  const fetchData = (ctx, callback) => {
    store
      .dispatch("app-employees/fetchAll", {
        q: searchQuery.value.toLowerCase(),
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
        area: nameFilter.value,
        country: countryFilter.value,
        identificationType: identificationTypeFilter.value,
      })
      .then((response) => {
        const { data, total } = response.data;

        callback(data);
        totalUsers.value = total;
        const arrayAreas = [];
        const arrayStatus = [];
        const arrayCountry = [];
        const arrayIdentificationType = [];
        const setObj = new Set();
        const setObjArea = new Set();
        const setObjCountry = new Set();
        const setObjIdentificationType = new Set();
        data.map((data, item) => {
          if (!setObj.has(data.status)) {
            setObj.add(data.status, data);
            arrayStatus.push({
              label: data.status === true ? "Active" : "Inactive",
              value: data.status,
              id: item,
            });
          }

          if (!setObjArea.has(data.area.name)) {
            setObjArea.add(data.area.name, data);
            arrayAreas.push({
              label: data.area.name,
              value: data.area.id,
              id: item,
            });
          }

          if (!setObjCountry.has(data.country.name)) {
            setObjCountry.add(data.country.name, data);
            arrayCountry.push({
              label: data.country.name,
              value: data.country.id,
              id: item,
            });
          }

          if (!setObjIdentificationType.has(data.identification_type.name)) {
            setObjIdentificationType.add(data.identification_type.name, data);
            arrayIdentificationType.push({
              label: data.identification_type.name,
              value: data.identification_type.id,
              id: item,
            });
          }
        });
        itemsAreas.value = arrayAreas;
        itemsStatus.value = arrayStatus;
        itemsCountry.value = arrayCountry;
        itemsIdentificationType.value = arrayIdentificationType;
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching areas list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  const resolveUserStatusVariant = (status) => {
    if (status === true) return "success";
    if (status === false) return "warning";
    return "success";
  };

  const dataItemAreas = itemsAreas;
  const dataItemStatus = itemsStatus;
  const dataItemCountry = itemsCountry;
  const dataItemitemsIdentificationType = itemsIdentificationType;

  return {
    fetchData,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    nameFilter,
    statusFilter,
    dataItemStatus,
    dataItemAreas,
    dataItemCountry,
    countryFilter,
    identificationTypeFilter,
    dataItemitemsIdentificationType,
  };
}

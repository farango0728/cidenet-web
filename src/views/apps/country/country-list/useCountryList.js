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
    { key: "name", sortable: true },
    { key: "domain", sortable: true },
    { key: "status", sortable: true },
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
  const statusFilter = ref(null);
  const itemsAreas = ref([]);
  const itemsStatus = ref([]);

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

  watch([currentPage, perPage, searchQuery, nameFilter, statusFilter], () => {
    refetchData();
  });

  const fetchData = (ctx, callback) => {
    store
      .dispatch("app-country/fetchAll", {
        q: searchQuery.value.toLowerCase(),
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        name: nameFilter.value,
        status: statusFilter.value,
      })
      .then((response) => {
        const { data, total } = response.data;

        callback(data);
        totalUsers.value = total;
        const arrayAreas = [];
        const arrayStatus = [];
        const setObj = new Set();
        data.map((data, item) => {
          arrayAreas.push({ label: data.name, value: data.name });
          if (!setObj.has(data.status)) {
            setObj.add(data.status, data);
            arrayStatus.push({
              label: data.status === true ? "Active" : "Inactive",
              value: data.status,
              id: item,
            });
          }
        });
        itemsAreas.value = arrayAreas;
        itemsStatus.value = arrayStatus;
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
  };
}

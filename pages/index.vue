<script lang="ts" setup>
import { useToast } from "vue-toastification";
import { useTitledPageStore } from "~/store/titled";
import type { PaginatedResult } from "~/types/common/result";
import type { TripExtended } from "~/types/trip";

definePageMeta({
  layout: "titled",
});
useHead({
  title: "Командировки",
});

const templateStore = useTitledPageStore();
const toast = useToast();
const { $api } = useNuxtApp();
const reportId = ref<number>(1);
const confirmationOpened = ref<boolean>();

const data = ref<PaginatedResult<TripExtended>>(
  await $api.trips.get({
    page: 1,
    perPage: 10,
  })
);
const updateTable = async (options: { page: number; itemsPerPage: number }) => {
  data.value = await $api.trips.get({
    page: options.page,
    perPage: options.itemsPerPage,
  });
};
const openReportConfirmation = (id: number) => {
  reportId.value = id;
  confirmationOpened.value = true;
};
const generateReport = () => {
  location.assign(`/api/parser/export_to_excel/${reportId.value}`);
  confirmationOpened.value = false;
  toast.success("Отчёт сгенерирован. Проверьте папку загрузок.");
};

onMounted(() => {
  templateStore.setTitle("Список командированных");
  templateStore.clearActions();

  templateStore.addAction({
    props: {
      color: "primary",
      to: "/manage/add",
    },
    text: "Добавить",
  });
});

const headers = [
  {
    key: "fio",
    title: "ФИО",
  },
  {
    key: "date_start",
    title: "Дата начала",
  },
  {
    key: "date_end",
    title: "Дата окончания",
  },
  {
    key: "status",
    title: "Статус",
  },
  {
    key: "total",
    title: "Итого",
  },
  {
    key: "actions",
    title: "Действия",
    sortable: false,
    align: "end",
  },
];
</script>

<template>
  <div>
    <VDataTableServer
      :headers="headers"
      :items="data.data"
      :items-length="data.total"
      hover
      @update:options="updateTable"
    >
      <template #item.status="{ item }">
        <!-- @vue-expect-error -->
        <VChip v-if="item.failed > 0" color="error">
          Есть неподтвержденные записи ({{ item.failed }})
        </VChip>
        <VChip v-else color="success"> ОК </VChip>
      </template>
      <template #item.actions="{ item }">
        <v-btn
          :to="`/manage/${item.id}`"
          class="mx-1"
          color="primary"
          variant="text"
          min-width="36px"
          width="36px"
          title="Редактировать"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          color="primary"
          variant="text"
          min-width="36px"
          width="36px"
          title="Сформировать отчёт"
          @click.stop="openReportConfirmation(item.id)"
        >
          <v-icon>mdi-file-document-check</v-icon>
        </v-btn>
      </template>
    </VDataTableServer>
    <ReportConfirmation v-model="confirmationOpened" @save="generateReport" />
  </div>
</template>

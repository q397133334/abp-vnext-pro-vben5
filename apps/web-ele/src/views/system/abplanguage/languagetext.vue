<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, onMounted } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { ElTag as Tag } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  postLanguageTextsAllResource,
  postLanguageTextsPage,
} from '#/api-client';
import { TableAction } from '#/components/table-action';

// 新增modal
import AddLanguageTextModal from './AddLanguageTextModal.vue';

// 编辑modal
import EditLanguageTextModal from './EditLanguageTextModal.vue';
import { languageTextQuerySchema, languageTextTableSchema } from './schema';

defineOptions({
  name: 'LanguageText',
});

const formOptions: VbenFormProps = {
  schema: languageTextQuerySchema,
  wrapperClass: 'grid-cols-4',
};

const gridOptions: VxeGridProps<any> = {
  columns: languageTextTableSchema,
  toolbarConfig: {
    custom: true,
  },
  customConfig: {
    storage: true,
  },
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { data } = await postLanguageTextsPage({
          body: {
            pageIndex: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          },
        });
        return data;
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

onMounted(async () => {
  const res = await postLanguageTextsAllResource();

  gridApi.formApi.updateSchema([
    {
      componentProps: {
        options: res?.data?.map((item) => ({
          label: item.label,
          value: item.value,
        })),
      },
      fieldName: 'resourceName',
    },
  ]);
});

const [AddVbenLanguageTextModal, addModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: AddLanguageTextModal,
});
const [EditVbenLanguageTextModal, editModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: EditLanguageTextModal,
});
const handleAdd = () => {
  addModalApi.open();
};

const handleEdit = async (row: Record<string, any>) => {
  const formValues = await gridApi.formApi.getValues();
  const cultureName = formValues.cultureName;
  const record = { ...row, cultureName };
  editModalApi.setData({
    row: record,
  });
  editModalApi.open();
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <TableAction
          :actions="[
            {
              label: $t('common.add'),
              type: 'primary',
              icon: 'ant-design:plus-outlined',
              onClick: handleAdd.bind(null),
              auth: ['AbpIdentity.LanguageTexts.Create'],
            },
          ]"
        />
      </template>

      <template #action="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              link: true,
              size: 'small',
              onClick: handleEdit.bind(null, row),
              auth: ['AbpIdentity.LanguageTexts.Update'],
            },
          ]"
        />
      </template>
      <template #isEnabled="{ row }">
        <component
          :is="
            h(
              Tag,
              { color: row.isEnabled ? 'green' : 'red' },
              row.isEnabled ? $t('common.enabled') : $t('common.disabled'),
            )
          "
        />
      </template>
    </Grid>
    <AddVbenLanguageTextModal @reload="gridApi.reload" />
    <EditVbenLanguageTextModal @reload="gridApi.reload" />
  </Page>
</template>
<style scoped></style>

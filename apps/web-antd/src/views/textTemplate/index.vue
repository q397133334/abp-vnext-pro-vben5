<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  postTextTemplatesDelete,
  postTextTemplatesPage,
} from '#/api-client/index';
import fileRequest from '#/api-client-config/index-blob';
import { TableAction } from '#/components/table-action';
import { $t } from '#/locales';

// 新增modal
import AddModal from './AddModal.vue';

// 编辑modal
import EditModal from './EditModal.vue';
import { querySchema, tableSchema } from './schema';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: querySchema,
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
  wrapperClass: 'grid-cols-4',
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: tableSchema,
  keepSource: true,
  height: 'auto',
  pagerConfig: {},
  toolbarConfig: {
    custom: true,
  },
  customConfig: {
    storage: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        if (formValues?.time?.length === 2) {
          formValues = {
            ...formValues,
            startCreationTime: formValues.time[0],
            endCreationTime: formValues.time[1],
          };
        }
        const { data } = await postTextTemplatesPage({
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

const [AddVbenModal, addModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: AddModal,
});
const [EditVbenModal, editModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: EditModal,
});
const handleAdd = () => {
  addModalApi.open();
};

const handleEdit = (row: Record<string, any>) => {
  editModalApi.setData({
    row,
  });
  editModalApi.open();
};

const handleDelete = async (row: any) => {
  await postTextTemplatesDelete({
    body: {
      id: row.id,
    },
  });
  gridApi.reload();
};

const exportData = async () => {
  gridApi.setLoading(true);
  try {
    const formValues = await gridApi.formApi.getValues();
    const {
      pager: { currentPage, pageSize },
    } = await gridApi.grid.getProxyInfo();
    const pagination = { pageIndex: currentPage, pageSize };
    const { data } = await fileRequest.post(
      '/TextTemplates/Export',
      { ...formValues, ...pagination },
      { responseType: 'blob' },
    );
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '模板导出.xlsx');
    document.body.append(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } finally {
    gridApi.setLoading(false);
  }
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
              auth: ['AbpTemplateManagement.Template.Create'],
            },
            {
              label: $t('common.export'),
              type: 'primary',
              icon: 'ant-design:download-outlined',
              onClick: exportData.bind(null),
              auth: ['AbpTemplateManagement.Template.Export'],
            },
          ]"
        />
      </template>
      <template #action="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              auth: ['AbpTemplateManagement.Template.Update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              auth: ['AbpTemplateManagement.Template.Delete'],
              popConfirm: {
                title: $t('common.askConfirmDelete'),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <AddVbenModal @reload="gridApi.reload" />
    <EditVbenModal @reload="gridApi.reload" />
  </Page>
</template>
<style scoped></style>

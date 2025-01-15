<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Modal, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { postProjectsDelete, postProjectsPage } from '#/api-client/index';
import { TableAction } from '#/components/table-action';
import { $t } from '#/locales';

// 新增modal
import AddModal from './AddModal.vue';
// 编辑modal
import EditModal from './EditModal.vue';
import { querySchema, tableSchema } from './schema';

const router = useRouter();

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: querySchema,
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
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
        const { data } = await postProjectsPage({
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

const handleDelete = (row: any) => {
  Modal.confirm({
    title: `${$t('common.confirmDelete')}?`,
    onOk: async () => {
      await postProjectsDelete({
        body: {
          id: row.id,
        },
      });
      gridApi.reload();
    },
  });
};

const handleViewModel = (row: Record<string, any>) => {
  router.push({
    name: 'EntityModel',
    query: {
      projectId: row.id,
    },
  });
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
              auth: ['AbpCodeManagement.Project.Create'],
            },
          ]"
        />
      </template>
      <template #supportTenant="{ row }">
        <component
          :is="
            h(
              Tag,
              { color: row.supportTenant ? 'green' : 'red' },
              row.supportTenant ? $t('common.yes') : $t('common.no'),
            )
          "
        />
      </template>
      <template #action="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('code.model'),
              type: 'link',
              size: 'small',
              auth: ['AbpCodeManagement.Project.Model'],
              onClick: handleViewModel.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              size: 'small',
              auth: ['AbpCodeManagement.Project.Update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              size: 'small',
              auth: ['AbpCodeManagement.Project.Delete'],
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

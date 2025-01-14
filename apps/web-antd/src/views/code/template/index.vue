<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Modal, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { postTemplatesDelete, postTemplatesPage } from '#/api-client/index';
import { $t } from '#/locales';
// 新增modal
import AddModal from './AddModal.vue';
import CopyModaComponent from './CopyModal.vue';
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
        const { data } = await postTemplatesPage({
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
      await postTemplatesDelete({
        body: {
          id: row.id,
        },
      });
      gridApi.reload();
    },
  });
};

const [CopyModal, copyModalApi] = useVbenModal({
  connectedComponent: CopyModaComponent,
});

const handleCopy = (row: Record<string, any>) => {
  copyModalApi.setData({
    id: row.id,
  });
  copyModalApi.open();
};

const handleViewDetail = (row: Record<string, any>) => {
  router.push({
    name: 'TemplateDetail',
    query: {
      templateId: row.id,
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <Space>
          <Button
            type="primary"
            v-access:code="'AbpCodeManagement.Template.Create'"
            @click="handleAdd"
          >
            {{ $t('common.add') }}
          </Button>
        </Space>
      </template>

      <template #action="{ row }">
        <Button
          type="link"
          v-access:code="'AbpCodeManagement.Template.Update'"
          @click="handleViewDetail(row)"
        >
          {{ $t('code.detail') }}
        </Button>
        <Button
          type="link"
          v-access:code="'AbpCodeManagement.Template.Copy'"
          @click="handleCopy(row)"
        >
          {{ $t('code.copy') }}
        </Button>
        <Button
          type="link"
          v-access:code="'AbpCodeManagement.Template.Update'"
          @click="handleEdit(row)"
        >
          {{ $t('common.edit') }}
        </Button>
        <Button
          danger
          type="link"
          v-access:code="'AbpCodeManagement.Template.Delete'"
          @click="handleDelete(row)"
        >
          {{ $t('common.delete') }}
        </Button>
      </template>
    </Grid>
    <AddVbenModal @reload="gridApi.reload" />
    <EditVbenModal @reload="gridApi.reload" />
    <CopyModal @reload="gridApi.reload" />
  </Page>
</template>
<style scoped></style>

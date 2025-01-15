<script setup lang="ts">
import { ref } from 'vue';

import { Page, type VbenFormProps } from '@vben/common-ui';
import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Space,
  Switch,
} from 'ant-design-vue';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import {
  postDataDictionaryDelete,
  postDataDictionaryDeleteDataDictionaryType,
  postDataDictionaryPage,
  postDataDictionaryPageDetail,
  postDataDictionaryStatus,
} from '#/api-client/index';
import { TableAction } from '#/components/table-action';
import { $t } from '#/locales';

import DataDictionaryDetail from './DataDictionaryDetailModal.vue';
import DataDictionaryModal from './DataDictionaryModal.vue';

defineOptions({
  name: 'DataDictionary',
});

/**  ============左侧表格相关逻辑 start ============== */
const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'filter',
      label: '',
      componentProps: {
        allowClear: true,
      },
    },
  ],
  wrapperClass: 'grid-cols-2',
  showDefaultActions: true,
  submitOnEnter: true,
  showCollapseButton: false,
  commonConfig: {
    hideLabel: true,
  },
};

const gridOptions: VxeGridProps<any> = {
  columns: [
    { type: 'radio', width: '50' },
    {
      field: 'codeName',
      title: $t('abp.dataDictionary.codeName'),
      minWidth: '75',
      slots: { default: 'codeName' },
    },
    {
      title: $t('common.action'),
      field: 'action',
      fixed: 'right',
      width: '180',
      slots: { default: 'action' },
    },
  ],
  minHeight: '800',
  keepSource: true,
  pagerConfig: {},
  radioConfig: {
    highlight: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { data } = await postDataDictionaryPage({
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

const gridEvents = {
  radioChange: handleDataDictionaryItemChange,
};
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions,
  gridEvents,
});

const [DataDictionaryModalComponent, dataDictionaryModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: DataDictionaryModal,
});

const openDataDictionaryModal = () => {
  dataDictionaryModalApi.setData({
    isEdit: false,
  });
  dataDictionaryModalApi.open();
};

const editDataDictionary = (row: Record<string, any>) => {
  dataDictionaryModalApi.setData({
    isEdit: true,
    row,
  });
  dataDictionaryModalApi.open();
};

const deleteDataDictionary = async (row: Record<string, any>) => {
  Modal.confirm({
    title: `${$t('common.confirmDelete')}${row.displayText} ?`,
    async onOk() {
      await postDataDictionaryDeleteDataDictionaryType({
        body: { id: row.id },
      });
      message.success($t('common.deleteSuccess'));
      gridApi.reload();
    },
  });
};

const current = ref<Record<string, any>>({});
async function handleDataDictionaryItemChange(item: Record<string, any>) {
  current.value = item;

  gridTableApi.reload({
    dataDictionaryId: 'current.value?.row?.id',
  });
}

/**  ============>左侧表格相关逻辑 end ============== */

/** ============>右侧表格相关逻辑 start ============== */
const rightFormOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'filter',
      componentProps: {
        allowClear: true,
      },
    },
  ],
  wrapperClass: 'grid-cols-2',
  showDefaultActions: true,
  submitOnEnter: true,
  showCollapseButton: false,
  commonConfig: {
    hideLabel: true,
  },
};

const rightGridOptions: VxeGridProps<any> = {
  columns: [
    { field: 'code', title: $t('abp.dataDictionary.code'), minWidth: '75' },
    {
      field: 'displayText',
      title: $t('abp.dataDictionary.name'),
      minWidth: '150',
    },
    { field: 'order', title: $t('abp.dataDictionary.order'), minWidth: '150' },
    {
      field: 'isEnabled',
      title: $t('abp.dataDictionary.status'),
      minWidth: '150',
      slots: { default: 'isEnabled' },
    },
    {
      field: 'description',
      title: $t('abp.dataDictionary.description'),
      minWidth: '150',
    },
    {
      title: $t('common.action'),
      field: 'action',
      fixed: 'right',
      width: '150',
      slots: { default: 'action' },
    },
  ],
  toolbarConfig: {
    custom: true,
  },
  customConfig: {
    storage: true,
  },
  minHeight: '800',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { data } = await postDataDictionaryPageDetail({
          body: {
            pageIndex: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            dataDictionaryId: current.value?.row?.id,
          },
        });
        return data;
      },
    },
  },
};

const [GridTable, gridTableApi] = useVbenVxeGrid({
  gridOptions: rightGridOptions,
  formOptions: rightFormOptions,
});

const handleItemStausChange = async (
  enabled: any,
  row: Record<string, any>,
) => {
  await postDataDictionaryStatus({
    body: {
      dataDictionaryId: current.value?.row?.id,
      dataDictionayDetailId: row.id,
      isEnabled: enabled,
    },
  });
};

const [DataDictionaryDetailComponent, dataDictionaryDetailModalApi] =
  useVbenModal({
    // 连接抽离的组件
    connectedComponent: DataDictionaryDetail,
  });

const openDataDictionaryDetailModal = () => {
  dataDictionaryDetailModalApi.setData({
    isEdit: false,
    type: current.value?.row?.displayText,
    id: current.value?.row?.id,
  });
  dataDictionaryDetailModalApi.open();
};

const editDetailRow = (row: Record<string, any>) => {
  dataDictionaryDetailModalApi.setData({
    isEdit: true,
    type: current.value?.row?.displayText,
    id: current.value?.row?.id,
    row,
  });
  dataDictionaryDetailModalApi.open();
};

const removeDetailRow = async (row: Record<string, any>) => {
  Modal.confirm({
    title: `${$t('common.confirmDelete')}${row.displayText} ?`,
    async onOk() {
      await postDataDictionaryDelete({
        body: {
          dataDictionaryId: current.value?.row?.id,
          dataDictionayDetailId: row.id,
        },
      });
      message.success($t('common.deleteSuccess'));
      gridTableApi.reload();
    },
  });
};

/** ============>右侧表格相关逻辑 end ============== */
</script>

<template>
  <Page>
    <Row :gutter="16">
      <Col :span="8">
        <Grid>
          <template #toolbar-actions>
            <Button type="primary" @click="openDataDictionaryModal">
              {{ $t('common.add') }}
            </Button>
          </template>

          <template #codeName="{ row }">
            <div>{{ `${row.code}|${row.displayText}` }}</div>
          </template>

          <template #action="{ row }">
            <TableAction
              :actions="[
                {
                  label: $t('common.edit'),
                  type: 'link',
                  size: 'small',
                  onClick: editDataDictionary.bind(null, row),
                },
                {
                  label: $t('common.delete'),
                  type: 'link',
                  size: 'small',
                  onClick: deleteDataDictionary.bind(null, row),
                },
              ]"
            />
          </template>
        </Grid>
      </Col>
      <Col :span="16">
        <GridTable>
          <template #toolbar-actions>
            <Button
              :disabled="!current.row"
              type="primary"
              @click="openDataDictionaryDetailModal"
            >
              {{ $t('common.add') }}
            </Button>
          </template>

          <template #isEnabled="{ row }">
            <Switch
              v-model:checked="row.isEnabled"
              @change="handleItemStausChange($event, row)"
            />
          </template>

          <template #action="{ row }">
            <Space>
              <Button type="link" @click="editDetailRow(row)">
                {{ $t('common.edit') }}
              </Button>
              <Button danger type="link" @click="removeDetailRow(row)">
                {{ $t('common.delete') }}
              </Button>
            </Space>
          </template>
        </GridTable>
      </Col>
    </Row>
    <DataDictionaryModalComponent @reload="gridApi.reload" />
    <DataDictionaryDetailComponent @reload="gridTableApi.reload" />
  </Page>
</template>

<style scoped></style>

<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import dayjs from 'dayjs';
import {
  NButton as Button,
  NModal as Modal,
  NSpace as Space,
  NTag as Tag,
} from 'naive-ui';

import { message as Message } from '#/adapter/naive';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
// import {
//   postNotificationNotificationPage,
//   postNotificationRead,
// } from '#/api-client';
import { $t } from '#/locales';

defineOptions({
  name: 'AbpNotifyItem',
});

const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'messageType',
      label: 'messageType',
      defaultValue: 20,
      dependencies: {
        show: () => false,
        triggerFields: ['messageType'],
      },
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('abp.message.title'),
    },
    {
      component: 'Input',
      fieldName: 'content',
      label: $t('abp.message.content'),
    },
    {
      component: 'Select',
      fieldName: 'messageLevel',
      label: $t('abp.message.level'),
      componentProps: {
        options: [
          {
            label: $t('common.warning'),
            value: 10,
          },
          {
            label: $t('common.info'),
            value: 20,
          },
          {
            label: $t('common.error'),
            value: 30,
          },
        ],
      },
    },

    {
      component: 'Select',
      fieldName: 'read',
      label: $t('abp.message.isRead'),
      componentProps: {
        options: [
          {
            label: $t('common.yes'),
            value: true,
          },
          {
            label: $t('common.no'),
            value: false,
          },
        ],
      },
    },
  ],
  wrapperClass: 'grid-cols-5',
};
const userStore = useUserStore();
const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {},
  columns: [
    { title: $t('common.seq'), type: 'seq', width: 50 },
    { field: 'title', title: $t('abp.message.title'), minWidth: '150' },
    { field: 'content', title: $t('abp.message.content'), minWidth: '150' },
    // { field: 'messageTypeName', title: '类型', minWidth: '150' },
    {
      field: 'messageLevelName',
      title: $t('abp.message.level'),
      minWidth: '150',
      slots: { default: 'messageLevel' },
    },
    {
      field: 'senderUserName',
      title: $t('abp.message.sender'),
      minWidth: '150',
    },
    {
      field: 'receiveUserName',
      title: $t('abp.message.receiver'),
      minWidth: '150',
    },
    {
      field: 'read',
      title: $t('abp.message.isRead'),
      minWidth: '150',
      slots: { default: 'read' },
    },
    {
      field: 'creationTime',
      title: $t('common.createTime'),
      minWidth: '150',
      formatter: ({ cellValue }) => {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: $t('common.action'),
      field: 'action',
      fixed: 'right',
      minWidth: '150',
      slots: { default: 'action' },
    },
  ],
  height: 'auto',
  keepSource: true,
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
        // const { data } = await postNotificationNotificationPage({
        //   body: {
        //     pageIndex: page.currentPage,
        //     pageSize: page.pageSize,
        //     receiverUserId: userStore.userInfo?.userId,
        //     ...formValues,
        //   },
        // });
        return null;
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const onRead = (row: any) => {
  // if (row.read) {
  //   Message.info('该消息已读,不需要重复设置');
  //   return;
  // }
  Modal.confirm({
    title: $t('abp.message.confirmRead'),
    onOk: async () => {
      // await postNotificationRead({ body: { id: row.id } });
      gridApi.reload();
      Message.success($t('common.success'));
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #messageLevel="{ row }">
        <Tag v-if="row.messageLevel === 10" color="yellow">
          {{ row.messageLevelName }}
        </Tag>
        <Tag v-if="row.messageLevel === 20" color="green">
          {{ row.messageLevelName }}
        </Tag>
        <Tag v-if="row.messageLevel === 30" color="red">
          {{ row.messageLevelName }}
        </Tag>
      </template>
      <template #read="{ row }">
        <Tag v-if="row.read" color="green">{{ $t('abp.message.read') }} </Tag>
        <Tag v-else color="red"> {{ $t('abp.message.unread') }} </Tag>
      </template>

      <template #action="{ row }">
        <Space>
          <Button size="small" type="primary" @click="onRead(row)">
            {{ $t('abp.message.setRead') }}
          </Button>
        </Space>
      </template>
    </Grid>
  </Page>
</template>

<style scoped></style>

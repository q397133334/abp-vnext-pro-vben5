<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, ref } from 'vue';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import {
  ElMessage,
  ElRadio,
  ElRadioGroup,
  ElTag,
  ElTree as Tree,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  postPermissionsTree,
  postPermissionsUpdate,
  postRolesCreate,
  postRolesDelete,
  postRolesPage,
  postRolesUpdate,
} from '#/api-client';
import { TableAction } from '#/components/table-action';
import { $t } from '#/locales';

import { addRoleFormSchema, querySchema, tableSchema } from './schema';

defineOptions({
  name: 'AbpRole',
});

const authTreeRef = ref<InstanceType<typeof Tree>>();
const formOptions: VbenFormProps = {
  schema: querySchema,
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: tableSchema,
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
    response: {
      total: 'totalCount',
    },
    ajax: {
      query: async ({ page }, formValues) => {
        const { data } = await postRolesPage({
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

const editRow: Record<string, any> = ref({});
const [AddModal, addModalApi] = useVbenModal({
  draggable: true,
  onConfirm: submit,
  onBeforeClose: () => {
    editRow.value = {};
  },
});

const [AddRoleForm, addRoleFormApi] = useVbenForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-4/5',
    },
  },
  // 提交函数
  handleSubmit: () => gridApi.reload(),
  layout: 'horizontal',
  schema: addRoleFormSchema,
  showCollapseButton: false,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1',
});

async function submit() {
  // 表单校验
  const { valid } = await addRoleFormApi.validate();
  if (!valid) return;
  const formValues = await addRoleFormApi.getValues();
  // 获取调用的api和请求参数
  const api = editRow.value.id ? postRolesUpdate : postRolesCreate;
  const fetchParams: any = editRow.value.id
    ? {
        roleInfo: {
          ...formValues,
          isDefault: Boolean(formValues.isDefault),
        },
        roleId: editRow.value.id,
      }
    : {
        name: formValues.name,
        isDefault: !!formValues.isDefault,
      };

  try {
    addModalApi.setState({ loading: true, confirmLoading: true });
    const { data = {} } = await api({ body: fetchParams });
    if (data.id) {
      ElMessage({
        type: 'success',
        message: editRow.value.id
          ? $t('common.editSuccess')
          : $t('common.addSuccess'),
      });
      addModalApi.close();
      gridApi.reload();
    }
  } finally {
    addModalApi.setState({ loading: false, confirmLoading: false });
  }
}

function onEdit(record: any) {
  editRow.value = record;
  addModalApi.open();
  addRoleFormApi.setValues({ ...record, isDefault: record.isDefault ? 1 : 0 });
}

async function onDel(row: any) {
  await postRolesDelete({ body: { id: row.id } });
  gridApi.reload();
  ElMessage({
    type: 'success',
    message: $t('common.deleteSuccess'),
  });
}

const authTree = ref([] as any);
const authPolicy = ref([] as any);
const defaultCheckedKeys = ref([] as any);

const onAuth = async (row: any) => {
  editRow.value = row;
  authDrawerApi.open();
  try {
    authDrawerApi.setState({ loading: true });
    const { data = {} } = await postPermissionsTree({
      body: { providerKey: row.name, providerName: 'R' },
    });
    authTree.value = data?.permissions || [];
    authPolicy.value = data?.allGrants || [];

    // 只设置实际的权限节点，父节点会自动根据子节点状态设置
    const grants = data.grants || [];
    defaultCheckedKeys.value = grants.filter(
      (item: string) => item.includes('.'), // 只包含实际权限节点
    );
  } finally {
    authDrawerApi.setState({ loading: false });
  }
};

const [AuthDrawer, authDrawerApi] = useVbenDrawer({
  onConfirm: () => {
    updateAuth();
  },
  onBeforeClose: () => {
    editRow.value = {};
  },
});

// 自定义级联选中
const handleCheck = (
  e: any,
  checkedStatus: { checkedKeys: string[]; checkedNodes: any[] },
) => {
  defaultCheckedKeys.value = checkedStatus.checkedKeys;
};

const updateAuth = async () => {
  try {
    authDrawerApi.setState({ loading: true, confirmLoading: true });
    const permissions = [] as any;

    // 处理选中的权限
    const checkedKeys = authTreeRef.value?.getCheckedKeys() || [];
    checkedKeys.forEach((item: string) => {
      if (item.includes('.')) {
        // 只处理实际权限节点
        permissions.push({
          name: item,
          isGranted: true,
        });
      }
    });

    // 处理未选中的权限
    authPolicy.value.forEach((item: string) => {
      if (!checkedKeys.includes(item) && item.includes('.')) {
        permissions.push({
          name: item,
          isGranted: false,
        });
      }
    });

    const resp = await postPermissionsUpdate({
      body: {
        providerKey: editRow.value.name,
        providerName: 'R',
        updatePermissionsDto: {
          permissions,
        },
      },
    });

    if (resp.status === 200 || resp.status === 204) {
      ElMessage.success($t('common.editSuccess'));
      authDrawerApi.close();
    }
  } finally {
    authDrawerApi.setState({ loading: false, confirmLoading: false });
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
              onClick: addModalApi.open.bind(null),
              auth: ['AbpIdentity.Roles.Create'],
            },
          ]"
        />
      </template>

      <template #isDefault="{ row }">
        <component
          :is="
            h(
              ElTag,
              { type: row.isDefault ? 'success' : 'danger' },
              row.isDefault ? $t('common.yes') : $t('common.no'),
            )
          "
        />
      </template>

      <template #action="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('abp.role.permissions'),
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['AbpIdentity.Roles.ManagePermissions'],
              onClick: onAuth.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: $t('common.edit'),
              size: 'small',
              icon: 'ant-design:edit-outlined',
              auth: ['AbpIdentity.Roles.Update'],
              onClick: onEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              icon: 'ant-design:delete-outlined',
              type: 'primary',
              auth: ['AbpIdentity.Roles.Delete'],
              popConfirm: {
                title: $t('common.askConfirmDelete'),
                confirm: onDel.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>

    <AddModal
      :title="editRow.id ? $t('common.edit') : $t('common.add')"
      class="w-[600px]"
    >
      <AddRoleForm>
        <template #isDefault="slotProps">
          <ElRadioGroup v-bind="slotProps">
            <ElRadio
              v-for="item in slotProps.options"
              :key="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </ElRadio>
          </ElRadioGroup>
        </template>
      </AddRoleForm>
    </AddModal>
    <AuthDrawer :title="$t('abp.role.permissions')" class="w-[500px]">
      <Tree
        ref="authTreeRef"
        :check-strictly="true"
        :data="authTree"
        :default-checked-keys="defaultCheckedKeys"
        :props="{ label: 'title', children: 'children' }"
        node-key="key"
        show-checkbox
      />
    </AuthDrawer>
  </Page>
</template>
<style scoped></style>

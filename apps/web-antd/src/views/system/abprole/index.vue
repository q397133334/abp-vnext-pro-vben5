<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, ref } from 'vue';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import {
  Button,
  Dropdown,
  Menu,
  MenuItem,
  message as Message,
  Modal,
  Space,
  Tag,
  Tree,
} from 'ant-design-vue';

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
import { $t } from '#/locales';

import { addRoleFormSchema, querySchema, tableSchema } from './schema';
// const [openFullLoading, closeFullLoading] = useLoading({
//   tip: '加载中...'
// });

// onMounted(() => {
//   openFullLoading();
//   console.log('onMounted')
//   setTimeout(() => {
//     closeFullLoading();
//   }, 3000);
// })

defineOptions({
  name: 'AbpRole',
});

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
      Message.success(
        editRow.value.id ? $t('common.editSuccess') : $t('common.addSuccess'),
      );
      addModalApi.close();
      gridApi.reload();
    }
  } finally {
    addModalApi.setState({ loading: false, confirmLoading: false });
  }
}

// function fn() {
//   openFullLoading();
//   setTimeout(() => {
//     closeFullLoading();
//   }, 3000);
// }

function onEdit(record: any) {
  editRow.value = record;
  addModalApi.open();
  addRoleFormApi.setValues({ ...record, isDefault: record.isDefault ? 1 : 0 });
}

function onDel(row: any) {
  Modal.confirm({
    title: `${$t('common.confirmDelete')}${row.name} ?`,
    onOk: async () => {
      await postRolesDelete({ body: { id: row.id } });
      gridApi.reload();
      Message.success($t('common.deleteSuccess'));
    },
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
const handleCheck = (checkedKeys, e) => {
  if (e.checked === true) {
    // 新增权限时，向下级联选中
    const filteredKeys = authPolicy.value.filter((key) =>
      key.startsWith(e.node.key),
    );
    checkedKeys.checked = defaultCheckedKeys.value.checked.concat(
      filteredKeys.filter((key) => !checkedKeys.checked.includes(key)),
    );
  } else {
    // 取消权限时，向下级联反选
    checkedKeys.checked = checkedKeys.checked.filter(
      (key) => !key.startsWith(e.node.key),
    );
  }
};

const updateAuth = async () => {
  try {
    authDrawerApi.setState({ loading: true, confirmLoading: true });
    const permissions = [] as any;

    // 处理选中的权限
    const checkedKeys = defaultCheckedKeys.value;
    checkedKeys.checked.forEach((item: string) => {
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
      if (!checkedKeys.checked.includes(item) && item.includes('.')) {
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
      Message.success($t('common.editSuccess'));
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
        <Space>
          <Button
            type="primary"
            v-access:code="'AbpIdentity.Roles.Create'"
            @click="addModalApi.open"
          >
            {{ $t('common.add') }}
          </Button>
          <!-- <Button
            type="primary"
            @click="fn"
          >
          loading测试
          </Button> -->
        </Space>
      </template>

      <template #isDefault="{ row }">
        <component
          :is="
            h(
              Tag,
              { color: row.isDefault ? 'green' : 'red' },
              row.isDefault ? $t('common.yes') : $t('common.no'),
            )
          "
        />
      </template>

      <template #action="{ row }">
        <Space>
          <Button
            size="small"
            type="primary"
            v-access:code="'AbpIdentity.Roles.Update'"
            @click="onEdit(row)"
          >
            {{ $t('common.edit') }}
          </Button>
          <Dropdown>
            <Button size="small">......</Button>
            <template #overlay>
              <Menu>
                <MenuItem @click="onAuth(row)">
                  <Button
                    size="small"
                    type="link"
                    v-access:code="'AbpIdentity.Roles.ManagePermissions'"
                  >
                    {{ $t('abp.role.permissions') }}
                  </Button>
                </MenuItem>
                <MenuItem @click="onDel(row)">
                  <Button
                    danger
                    size="small"
                    type="link"
                    v-access:code="'AbpIdentity.Roles.Delete'"
                  >
                    {{ $t('common.delete') }}
                  </Button>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </Space>
      </template>
    </Grid>

    <AddModal
      :title="editRow.id ? $t('common.edit') : $t('common.add')"
      class="w-[600px]"
    >
      <AddRoleForm />
    </AddModal>
    <AuthDrawer :title="$t('abp.role.permissions')" class="w-[500px]">
      <Tree
        v-model:checked-keys="defaultCheckedKeys"
        :check-strictly="true"
        :tree-data="authTree"
        checkable
        @check="handleCheck"
      />
    </AuthDrawer>
  </Page>
</template>
<style scoped></style>

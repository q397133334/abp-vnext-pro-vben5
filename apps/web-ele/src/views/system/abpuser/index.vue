<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton as Button,
  ElCheckbox,
  ElCheckboxGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMessage,
  ElMessageBox,
  ElSpace,
  ElTabPane,
  ElTabs,
  ElTag,
  ElText,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  postRolesAll,
  postUsersCreate,
  postUsersDelete,
  postUsersLock,
  postUsersPage,
  postUsersRole,
  postUsersUpdate,
} from '#/api-client';
import fileRequest from '#/api-client-config/index-blob';
import { $t } from '#/locales';

import {
  addUserFormSchema,
  editUserFormSchemaEdit,
  querySchema,
  tableSchema,
} from './schema';

defineOptions({
  name: 'AbpUser',
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
        const { data } = await postUsersPage({
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
const [UserModal, userModalApi] = useVbenModal({
  draggable: true,
  onConfirm: submit,
  onBeforeClose: () => {
    editRow.value = {};
  },
});

const [AddForm, addFormApi] = useVbenForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    labelWidth: 110,
    componentProps: {
      class: 'w-4/5',
    },
  },
  layout: 'horizontal',
  schema: addUserFormSchema,
  showCollapseButton: false,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const [EditForm, editFormApi] = useVbenForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    labelWidth: 110,
    componentProps: {
      class: 'w-4/5',
    },
  },
  // 提交函数
  layout: 'horizontal',
  schema: editUserFormSchemaEdit,
  showCollapseButton: false,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

// 新增和编辑提交的逻辑
async function submit() {
  const isEdit = !!editRow.value.id;
  const formApi = isEdit ? editFormApi : addFormApi;
  const api = isEdit ? postUsersUpdate : postUsersCreate;
  const { valid } = await formApi.validate();
  if (!valid) return;

  const formValues = await formApi.getValues();
  const fetchParams: any = isEdit
    ? {
        userInfo: { ...formValues, roleNames: checkedRoles.value },
        userId: editRow.value.id,
      }
    : { ...formValues, roleNames: checkedRoles.value };

  try {
    userModalApi.setState({ loading: true, confirmLoading: true });
    const resp = await api({ body: fetchParams });
    if (resp.status === 200 || resp.status === 204) {
      ElMessage({
        type: 'success',
        message: editRow.value.id
          ? $t('common.editSuccess')
          : $t('common.addSuccess'),
      });
      userModalApi.close();
      gridApi.reload();
    }
  } finally {
    userModalApi.setState({ loading: false, confirmLoading: false });
  }
}

async function onEdit(record: any) {
  editRow.value = record;
  userModalApi.open();
  editFormApi.setValues({ ...record });
  getAllRoles();
  const { data: { items = [] } = {} } = await postUsersRole({
    body: { id: record.id },
  });
  checkedRoles.value = items?.map((item: any) => item.name) as any;
}

function onDel(row: any) {
  ElMessageBox.confirm(`${$t('common.confirmDelete')}${row.userName} ?`, {
    type: 'warning',
  }).then(async () => {
    await postUsersDelete({ body: { id: row.id } });
    gridApi.reload();
    ElMessage({
      type: 'success',
      message: $t('common.deleteSuccess'),
    });
  });
}

const onLock = async (row: Record<string, any>) => {
  await postUsersLock({ body: { userId: row.id, locked: !row.isActive } });
  gridApi.reload();
};

const rolesList = ref([] as any);
const checkedRoles = ref([]);
const openAddModal = async () => {
  editRow.value = {};
  checkedRoles.value = [];
  userModalApi.open();
  getAllRoles();
};

async function getAllRoles() {
  const { data: { items = [] } = {} } = await postRolesAll();
  rolesList.value = items?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
}

const exportData = async () => {
  gridApi.setLoading(true);
  try {
    const formValues = await gridApi.formApi.getValues();
    const {
      pager: { currentPage = 1, pageSize = 10 },
    } = (await gridApi.grid.getProxyInfo()) as any;
    const pagination = { pageIndex: currentPage, pageSize };
    const { data } = await fileRequest.post(
      '/Users/export',
      { ...formValues, ...pagination },
      { responseType: 'blob' },
    );
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '用户列表导出.xlsx');
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
        <ElSpace>
          <Button
            type="primary"
            v-access:code="'AbpIdentity.Users.Create'"
            @click="openAddModal"
          >
            {{ $t('common.add') }}
          </Button>
          <Button
            type="primary"
            v-access:code="'AbpIdentity.Users.Export'"
            @click="exportData"
          >
            {{ $t('common.export') }}
          </Button>
        </ElSpace>
      </template>

      <template #isActive="{ row }">
        <component
          :is="
            h(
              ElTag,
              { type: row.isActive ? 'success' : 'danger' },
              row.isActive ? $t('common.enabled') : $t('common.disabled'),
            )
          "
        />
      </template>
      <template #action="{ row }">
        <ElSpace>
          <Button
            size="small"
            type="primary"
            v-access:code="'AbpIdentity.Users.Update'"
            @click="onEdit(row)"
          >
            {{ $t('common.edit') }}
          </Button>
          <ElDropdown>
            <Button size="small"> ...... </Button>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem
                  v-access:code="'AbpIdentity.Users.Enable'"
                  @click="onLock(row)"
                >
                  <ElText type="primary">
                    {{
                      row.isActive
                        ? $t('common.disabled')
                        : $t('common.enabled')
                    }}
                  </ElText>
                </ElDropdownItem>
                <ElDropdownItem
                  v-access:code="'AbpIdentity.Users.Delete'"
                  @click="onDel(row)"
                >
                  <ElText type="danger">{{ $t('common.delete') }}</ElText>
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </ElSpace>
      </template>
    </Grid>

    <UserModal
      :title="editRow.id ? $t('common.edit') : $t('common.add')"
      class="w-[800px]"
    >
      <ElTabs>
        <ElTabPane key="1" :label="$t('abp.user.user')">
          <component :is="editRow.id ? EditForm : AddForm" />
        </ElTabPane>
        <ElTabPane key="2" :label="$t('abp.role.role')">
          <ElCheckboxGroup
            v-model="checkedRoles"
            :options="rolesList"
            name="checkboxgroup"
          >
            <ElCheckbox
              v-for="item in rolesList"
              :key="item.value"
              :label="item.value"
            />
          </ElCheckboxGroup>
        </ElTabPane>
      </ElTabs>
    </UserModal>
  </Page>
</template>

<style scoped></style>

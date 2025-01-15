<script setup lang="ts">
import type { DataNode, TreeProps } from 'ant-design-vue/es/tree';

import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  Button,
  Dropdown,
  Input,
  Menu,
  message as Message,
  message,
  Modal,
  Spin,
  Tree,
} from 'ant-design-vue';

import {
  type CreateTemplateDetailInput,
  postTemplatesControlType,
  postTemplatesCreateDetail,
  postTemplatesDeleteDetail,
  postTemplatesTree,
  postTemplatesUpdateDetailContent,
} from '#/api-client/index';

import AddEditTemplateModal from './AddEditTemplateModal.vue';

// 定义一个响应式变量，用于存储展开的节点
const expandedKeys = ref<(number | string)[]>([]);
// 定义一个响应式变量，用于存储搜索框的值
const searchValue = ref<string>('');
// 定义一个响应式变量，用于控制是否自动展开父节点
const autoExpandParent = ref<boolean>(true);
// 定义一个响应式变量，用于存储树形数据
const gData = ref<Array<DataNode>>([]);
// 定义一个响应式的变量，用于存储当前选中的节点的key
const currentSelectedKey = ref('');
// 定义一个响应式的变量，用于存储当前选中的节点
const currentSelectedTreeNode = ref();
const codeText = ref();
const route = useRoute();

const contextMenuOptions = [
  { label: $t('code.addFolder'), key: 'addFolder' },
  { label: $t('code.addFile'), key: 'addfile' },
  { label: $t('common.edit'), key: 'edit' },
  { label: $t('common.delete'), key: 'delete' },
];
const loading = ref<boolean>(true);
onMounted(() => {
  getTreeData().then(() => {
    loading.value = false;
  });
});

// 定义一个异步函数，用于处理右键菜单的选择
const onContextMenuSelect = async (key: string) => {
  // 根据选择的key值，执行不同的操作
  switch (key) {
    case 'addfile': {
      openCreateDetailModal(key);
      break;
    }
    // 如果选择的key值为add，则打开添加编辑实体模态框
    case 'addFolder': {
      openCreateDetailModal(key);
      break;
    }
    case 'delete': {
      Modal.confirm({
        title: `${$t('common.confirmDelete')}?`,
        onOk: async () => {
          const params = {
            templateId: route.query.templateId as string,
            templateDetailId: currentSelectedKey.value,
          };
          await postTemplatesDeleteDetail({
            body: params,
          });
          Message.success($t('common.success'));
          currentSelectedKey.value = '';
          currentSelectedTreeNode.value = null;
          getTreeData();
        },
      });
      break;
    }
    case 'edit': {
      addEditModalApi.setData({
        isEdit: true,
        templateId: route.query.templateId as string,
        templateDetailId: currentSelectedKey.value,
        row: currentSelectedTreeNode.value,
      });
      addEditModalApi.open();
      break;
    }
  }
};
// 当右键菜单点击时，执行该函数
const onContextMenuClick = (treeKey: string, nodeData: any, menuKey: any) => {
  // 将当前选中的树节点key赋值给currentSelectedKey
  currentSelectedKey.value = treeKey;
  // 将当前选中的树节点数据赋值给currentSelectedTreeNode
  currentSelectedTreeNode.value = nodeData;
  // 调用onContextMenuSelect函数，传入menuKey
  onContextMenuSelect(menuKey);
};

const dataList = ref<DataNode[]>([]);
const generateList = (data: TreeProps['treeData']) => {
  if (!data) return;
  for (const node of data) {
    const { key, title, children } = node;
    dataList.value.push({ key, title });
    if (children) {
      generateList(children);
    }
  }
};

const getParentKey = (
  key: number | string,
  tree: TreeProps['treeData'],
): number | string | undefined => {
  if (!tree) return undefined;
  let parentKey;
  for (const node of tree) {
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

// 获取所有节点的key
const getAllKeys = (tree: TreeProps['treeData']): (number | string)[] => {
  const keys: (number | string)[] = [];
  const traverse = (nodes: TreeProps['treeData']) => {
    if (!nodes) return;
    nodes.forEach((node) => {
      if (node.key) {
        keys.push(node.key);
      }
      if (node.children) {
        traverse(node.children);
      }
    });
  };
  traverse(tree);
  return keys;
};

// 展开所有节点
const expandAll = () => {
  expandedKeys.value = getAllKeys(gData.value as TreeProps['treeData']);
  autoExpandParent.value = true;
};

// 折叠所有节点
const collapseAll = () => {
  expandedKeys.value = [];
  autoExpandParent.value = true;
};

// 添加 onExpand 方法处理节点展开/折叠
const onExpand = (keys: (number | string)[], info: any) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};
// 定义一个响应式变量，用于控制是否是否显示保存按钮
const showSaveContentBtn = ref<boolean>(false);
const onSelect = (keys: any[], event: any) => {
  codeText.value = '';
  showSaveContentBtn.value = false;
  if (event.node.templateType === 10) return;
  showSaveContentBtn.value = true;
  currentSelectedKey.value = keys[0] ?? '';
  codeText.value = event.node.content || '';
  if (!keys[0]) return '';
};
const saveContent = async () => {
  if (!currentSelectedKey.value) {
    message.error('请选择节点');
    return;
  }
  const params = {
    templateId: route.query.templateId as string,
    templateDetailId: currentSelectedKey.value,
    content: codeText.value,
  };
  await postTemplatesUpdateDetailContent({ body: params });
  message.success($t('common.editSuccess'));
};
async function getTreeData() {
  const { data = [] } = await postTemplatesTree({
    body: { templateId: route.query.templateId as string },
  });
  gData.value = data as DataNode[];
  dataList.value = [];
  generateList(data as TreeProps['treeData']);
}

watch(searchValue, (value) => {
  if (!value) {
    expandedKeys.value = [];
    return;
  }
  const expanded = dataList.value
    .map((item) => {
      if (
        typeof item.title === 'string' &&
        item.title.toLowerCase().includes(value.toLowerCase())
      ) {
        return getParentKey(item.key, gData.value as TreeProps['treeData']);
      }
      return null;
    })
    .filter(
      (item, i, self): item is number | string =>
        item !== null && item !== undefined && self.indexOf(item) === i,
    );

  expandedKeys.value = expanded;
  autoExpandParent.value = true;
});

const [AddEditModal, addEditModalApi] = useVbenModal({
  connectedComponent: AddEditTemplateModal,
});

const openTemplateModal = () => {
  addEditModalApi.setData({
    isEdit: false,
    templateId: route.query.templateId as string,
  });
  addEditModalApi.open();
};

const [CreateDetailModal, createDetailModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    if (isOpen) {
      getControlTypeList();
    }
  },
  onConfirm: async () => {
    try {
      createDetailModalApi.setState({ loading: true, confirmLoading: true });
      const { valid } = await createDetailFormApi.validate();
      if (!valid) return;
      const formValues = await createDetailFormApi.getValues();
      let params: CreateTemplateDetailInput = {};
      if (isFloder.value) {
        // 创建文件夹
        params = {
          ...formValues,
          templateId: route.query.templateId as string,
          parentId: currentSelectedKey.value,
          templateType: 10,
        };
      } else {
        // 创建文件
        params = {
          ...formValues,
          templateId: route.query.templateId as string,
          parentId: currentSelectedKey.value,
          templateType: 20,
        };
      }
      await postTemplatesCreateDetail({ body: params });
      message.success($t('common.addSuccess'));
      createDetailModalApi.close();
      getTreeData();
    } finally {
      createDetailModalApi.setState({ loading: false, confirmLoading: false });
    }
  },
});

const controlTypeList = ref<any[]>();
const isFloder = ref<boolean>(false);
const getControlTypeList = async () => {
  const { data = [] } = await postTemplatesControlType();
  controlTypeList.value = data;
};

const [CreateDetailForm, createDetailFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'Select',
      fieldName: 'controlType',
      label: '模板策略',
      componentProps: () => {
        return {
          options: controlTypeList.value,
          fieldNames: { label: 'key', value: 'value' },
        };
      },
      dependencies: {
        triggerFields: ['templateType'],
        if: () => {
          return !isFloder.value;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: '描述',
    },
  ],
  wrapperClass: 'grid-cols-1',
  showDefaultActions: false,
});

const openCreateDetailModal = (key: string) => {
  isFloder.value = key === 'addFolder';
  createDetailModalApi.open();
};
</script>

<template>
  <Spin :spinning="loading" tip="loading...">
    <div class="m-4 grid min-h-[calc(100vh-120px)] grid-cols-12 gap-4">
      <div class="bg-card col-span-4 xl:col-span-3">
        <div class="bg-card flex items-center justify-between p-3">
          <Button class="mx-3" size="small" type="primary">
            <div class="flex items-center">
              <span class="icon-[material-symbols--add-circle-outline]"></span>
              <span class="ml-1" @click="openTemplateModal">{{
                $t('common.add')
              }}</span>
            </div>
          </Button>
          <Input.Search v-model:value="searchValue" class="ml-1 flex-1" />
          <Dropdown class="ml-1">
            <Button class="font-bold">......</Button>
            <template #overlay>
              <Menu>
                <Menu.Item @click="expandAll">
                  {{ $t('common.expandAll') }}
                </Menu.Item>
                <Menu.Item @click="collapseAll">
                  {{ $t('common.collapseAll') }}
                </Menu.Item>
              </Menu>
            </template>
          </Dropdown>
        </div>
        <Tree
          :auto-expand-parent="autoExpandParent"
          :block-node="true"
          :expanded-keys="expandedKeys"
          :tree-data="gData"
          class="mt-3"
          @expand="onExpand"
          @select="onSelect"
        >
          <template #title="{ title, key: treeKey, data: nodeData }">
            <Dropdown :trigger="['contextmenu']">
              <span v-if="title.indexOf(searchValue) > -1" class="block w-full">
                {{ title.substring(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{
                  title.substring(
                    title.indexOf(searchValue) + searchValue.length,
                  )
                }}
              </span>
              <span v-else class="block w-full">{{ title }}</span>
              <template #overlay>
                <Menu
                  @click="
                    ({ key: menuKey }) =>
                      onContextMenuClick(treeKey, nodeData, menuKey)
                  "
                >
                  <Menu.Item v-for="item in contextMenuOptions" :key="item.key">
                    {{ item.label }}
                  </Menu.Item>
                </Menu>
              </template>
            </Dropdown>
          </template>
        </Tree>
      </div>

      <div class="bg-card col-span-8 xl:col-span-9">
        <div class="bg-card">
          <Button
            v-show="showSaveContentBtn"
            style="margin-left: 96%"
            type="primary"
            @click="saveContent"
          >
            {{ $t('common.save') }}
          </Button>
          <Codemirror v-model:value="codeText" />
        </div>
      </div>

      <AddEditModal @get-tree-data="getTreeData" />
      <CreateDetailModal :title="$t('common.add')">
        <CreateDetailForm />
      </CreateDetailModal>
    </div>
  </Spin>
</template>

<style scoped></style>

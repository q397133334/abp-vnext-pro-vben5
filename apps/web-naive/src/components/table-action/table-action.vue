<script setup lang="ts">
import type { ActionItem, PopConfirm } from './types';

import { computed, h, type PropType, reactive, toRaw } from 'vue';

import { useAccess } from '@vben/access';
import { isBoolean, isFunction } from '@vben/utils';

import {
  NButton as Button,
  NDropdown as Dropdown,
  NPopconfirm as Popconfirm,
  NSpace as Space,
} from 'naive-ui';

import { Icon } from '#/components/icon';

const props = defineProps({
  actions: {
    type: Array as PropType<ActionItem[]>,
    default() {
      return [];
    },
  },
  dropDownActions: {
    type: Array as PropType<ActionItem[]>,
    default() {
      return [];
    },
  },
  divider: {
    type: Boolean,
    default: true,
  },
});

const { hasAccessByCodes } = useAccess();
const popconfirmRef = reactive<any>({});

function isIfShow(action: ActionItem): boolean {
  const ifShow = action.ifShow;

  let isIfShow = true;

  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(action);
  }
  return isIfShow;
}

const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    .filter((action) => {
      return (
        (hasAccessByCodes(action.auth || []) ||
          (action.auth || []).length === 0) &&
        isIfShow(action)
      );
    })
    .map((action) => {
      const { popConfirm } = action;
      return {
        // getPopupContainer: document.body,
        ...action,
        ...popConfirm,
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        enable: !!popConfirm,
      };
    });
});
const getPopConfirmProps = (attrs: PopConfirm) => {
  const originAttrs: any = attrs;
  delete originAttrs.icon;
  if (attrs.confirm && isFunction(attrs.confirm)) {
    originAttrs.onPositiveClick = attrs.confirm;
    delete originAttrs.confirm;
  }
  if (attrs.cancel && isFunction(attrs.cancel)) {
    originAttrs.onMegativeClick = attrs.cancel;
    delete originAttrs.cancel;
  }
  return {
    ...originAttrs,
    trigger: 'click',
  };
};
const getDropdownList = computed((): any[] => {
  return (toRaw(props.dropDownActions) || [])
    .filter((action) => {
      return (
        (hasAccessByCodes(action.auth || []) ||
          (action.auth || []).length === 0) &&
        isIfShow(action)
      );
    })
    .map((action, index) => {
      const { icon, label } = action;
      return {
        key: index,
        ...action,
        label,
        icon: icon
          ? () => {
              return h(Icon, { icon });
            }
          : undefined,
      };
    });
});

const getButtonProps = (action: ActionItem) => {
  const res = {
    type: action.type || 'primary',
    ...action,
  };
  delete res.icon;
  return res;
};
const handleRef = (e: any, index: number) => {
  popconfirmRef[index.toString()] = e;
};
const handleMenuClick = (index: any) => {
  const action = getDropdownList.value[index];
  if (action.onClick && isFunction(action.onClick)) {
    action.onClick();
  } else {
    const currentPopconfirmRef = popconfirmRef[index.toString()];
    currentPopconfirmRef?.click();
  }
};
</script>

<template>
  <div class="m-table-action">
    <Space inline size="small">
      <template v-for="(action, index) in getActions" :key="index">
        <Popconfirm
          v-if="action.popConfirm"
          v-bind="getPopConfirmProps(action.popConfirm)"
        >
          <template v-if="action.popConfirm.icon" #icon>
            <Icon :icon="action.popConfirm.icon" />
          </template>
          {{ action.popConfirm?.title }}
          <template #trigger>
            <Button v-bind="getButtonProps(action)">
              <template v-if="action.icon" #icon>
                <Icon :icon="action.icon" />
              </template>
              {{ action.label }}
            </Button>
          </template>
        </Popconfirm>
        <Button v-else v-bind="getButtonProps(action)" @click="action.onClick">
          <template v-if="action.icon" #icon>
            <Icon :icon="action.icon" />
          </template>
          {{ action.label }}
        </Button>
      </template>
      <Dropdown
        v-if="getDropdownList.length > 0"
        :options="getDropdownList"
        trigger="hover"
        @select="handleMenuClick"
      >
        <div>
          <slot name="more">
            <Button size="small" style="margin-left: 6px" text type="primary">
              <Icon class="icon-more" icon="ep:more" />
            </Button>
          </slot>
          <template v-for="(action, index) in getDropdownList" :key="index">
            <Popconfirm
              v-if="action.popConfirm"
              v-bind="getPopConfirmProps(action.popConfirm)"
            >
              {{ action.popConfirm?.title }}
              <template #trigger>
                <span :ref="(e) => handleRef(e, index)"></span>
              </template>
            </Popconfirm>
          </template>
        </div>
      </Dropdown>
    </Space>
  </div>
</template>
<style lang="less">
/** 修复 iconify 位置问题 **/
.m-table-action {
  .ant-btn > .iconify + span,
  .ant-btn > span + .iconify {
    margin-inline-start: 8px;
  }

  .ant-btn > .iconify {
    display: inline-flex;
    align-items: center;
    width: 1em;
    height: 1em;
    font-style: normal;
    line-height: 0;
    color: inherit;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>

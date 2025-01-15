<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';

import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal, useVbenModal } from '@vben/common-ui';
import { LOGIN_PATH } from '@vben/constants';
import { useWatermark } from '@vben/hooks';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';

import { message as Message } from 'ant-design-vue/es/components';
import dayjs from 'dayjs';

import {
  postNotificationBatchRead,
  postNotificationNotificationPage,
  postNotificationRead,
} from '#/api-client';
import { useSignalR } from '#/hooks/useSignalR';
import { $t } from '#/locales';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

import MyProfile from './my-profile.vue';
import NotifyItem from './NotifyItem.vue';

const notifications = ref<NotificationItem[]>([]);
const { startConnect } = useSignalR();
function convertToNotificationItem(message: any): NotificationItem {
  return {
    avatar: '',
    date: dayjs(message.creationTime).format('YYYY-MM-DD HH:mm:ss'),
    isRead: message.read,
    message: message.content,
    title: message.title,
    id: message.id,
  };
}
const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const router = useRouter();
onMounted(async () => {
  // 判断是否登录
  if (userStore?.userInfo?.token || userStore.checkUserLoginExpire()) {
    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: {
        redirect: encodeURIComponent(router.currentRoute.value.fullPath),
      },
    });
  }
  startConnect();
});

const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);
const [MyProfileModal, myProfileModalApi] = useVbenModal({
  draggable: true,
  onConfirm: () => {},
  onBeforeClose: () => {},
});
const [NotifyItemModal, notifyItemModalApi] = useVbenModal({
  draggable: true,
  onConfirm: () => {},
  onBeforeClose: () => {},
});
const menus = computed(() => [
  {
    handler: () => {
      myProfileModalApi.open();
    },
    icon: 'ph:user',
    text: $t('abp.user.myAccount'),
  },
  // {
  //   handler: () => {
  //     openWindow(VBEN_DOC_URL, {
  //       target: '_blank',
  //     });
  //   },
  //   icon: BookOpenText,
  //   text: $t('ui.widgets.document'),
  // },
  // {
  //   handler: () => {
  //     openWindow(VBEN_GITHUB_URL, {
  //       target: '_blank',
  //     });
  //   },
  //   icon: MdiGithub,
  //   text: 'GitHub',
  // },
  // {
  //   handler: () => {
  //     openWindow(`${VBEN_GITHUB_URL}/issues`, {
  //       target: '_blank',
  //     });
  //   },
  //   icon: CircleHelp,
  //   text: $t('ui.widgets.qa'),
  // },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

function handleNoticeClear() {
  notifications.value = [];
}

async function handleMakeAll() {
  // 获取notifications 已读的数据，并且请求api 标记为已读
  const readIds = notifications.value
    .filter((item) => item.isRead)
    .map((item) => item.id);

  if (readIds.length > 0) {
    await postNotificationBatchRead({ body: { ids: readIds } });
    Message.success($t('common.editSuccess'));
  }

  notifications.value.forEach((item) => (item.isRead = true));
}

async function handleRead(row: NotificationItem) {
  if (row.isRead) {
    return;
  }
  await postNotificationRead({ body: { id: row.id } });

  notifications.value.forEach((item) => {
    if (item.id === row.id) {
      item.isRead = true;
    }
  });
}
function handleViewAll() {
  notifyItemModalApi.open();
}

watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.userName}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);

async function loadMessage() {
  notifications.value = [];
  const message = await postNotificationNotificationPage({
    body: {
      pageIndex: 1,
      pageSize: 4,
      messageType: 20,
      receiverUserId: userStore.userInfo?.userId,
    },
  });
  message.data?.items?.forEach((item) => {
    notifications.value.push(convertToNotificationItem(item));
    // 按照isRead属性进行排序
    notifications.value.sort((a, b) => {
      if (a.isRead === b.isRead) {
        return 0;
      }
      return a.isRead ? 1 : -1;
    });
  });
}
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :tag-text="userStore.tenant?.name"
        :text="userStore.userInfo?.name"
        @logout="handleLogout"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @icon-click="loadMessage"
        @make-all="handleMakeAll"
        @read="handleRead"
        @view-all="handleViewAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
  <MyProfileModal
    :show-cancel-button="false"
    :show-confirm-button="false"
    :title="$t('abp.user.myAccount')"
    class="h-[410px] w-[800px]"
  >
    <MyProfile />
  </MyProfileModal>

  <NotifyItemModal
    :fullscreen="true"
    :show-cancel-button="false"
    :show-confirm-button="false"
  >
    <NotifyItem />
  </NotifyItemModal>
</template>

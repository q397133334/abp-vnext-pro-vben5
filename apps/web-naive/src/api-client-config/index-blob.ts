import { useUserStore } from '@vben/stores';

import axios from 'axios';

import { message as Message } from '#/adapter/naive';
import { $t } from '#/locales';
// import { antdLocale } from '#/locales/index';
import { useAuthStore } from '#/store';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? '/proxy/'
    : import.meta.env.VITE_APP_API_ADDRESS,
  timeout: 1000 * 60,
  responseType: 'blob', // 设置响应数据类型为blob
});

api.interceptors.request.use((request) => {
  // 全局拦截请求发送前提交的参数
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const token = userStore.userInfo?.token;
  // 设置请求头
  if (request.headers) {
    request.headers.__tenant = userStore.tenant?.tenantId;
    // request.headers['accept-language'] = antdLocale.value.locale;
  }
  // 如果token过期，则跳转到登录页面
  if (token && userStore.checkUserLoginExpire()) {
    authStore.logout();

    return Promise.reject($t('common.mesage401'));
  }

  // 设置请求头
  if (request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    if (response.data.status === 1) {
      if (response.data.error !== '') {
        // 错误提示
        Message.error(response.data.error);
        return Promise.reject(response.data);
      }
    } else {
      // useUserStore().logout()
    }
    return Promise.resolve(response);
  },
  (error) => {
    let message = error.message;
    if (message === 'Network Error') {
      message = $t('common.mesage500');
    } else if (message.includes('timeout')) {
      message = $t('common.timeOut');
    } else
      switch (error.status) {
        case 400: {
          message = error.response.data.error?.validationErrors[0].message;

          break;
        }
        case 401: {
          message = $t('common.mesage401');
          // useUserStore().logout()

          break;
        }
        case 403: {
          message = $t('common.mesage403');

          break;
        }
        case 500: {
          message = error.response.data.error?.message;

          break;
        }
        default: {
          if (message.includes('Request failed with status code')) {
            message = $t('common.mesage500');
          }
        }
      }
    Message.error(message);
    return Promise.reject(error);
  },
);

export default api;

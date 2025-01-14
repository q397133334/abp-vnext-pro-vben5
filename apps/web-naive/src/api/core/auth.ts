import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
    client_id?: string;
    grant_type?: string;
    scope?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  data.grant_type = 'password';
  data.scope = 'offline_access';
  data.client_id = 'AbpSolution1_App';
  console.log('data', data);
  return requestClient.post<AuthApi.LoginResult>('/connect/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}

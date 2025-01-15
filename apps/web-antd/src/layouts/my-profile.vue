<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { z } from '@vben/common-ui';

import {
  Button,
  Col,
  Image,
  message as Message,
  Row,
  Spin,
  Step,
  Steps,
  TabPane,
  Tabs,
} from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  postUsersCanUseTwoFactor,
  postUsersChangePassword,
  postUsersDisabledTwoFactor,
  postUsersEnabledTwoFactor,
  postUsersGetQrCode,
  postUsersMyProfile,
} from '#/api-client';
import { $t } from '#/locales';

defineOptions({
  name: 'MyProfile',
});
const activeName = ref(0);
const loading = ref(false);
const [ProfileForm, profileFormApi] = useVbenForm({
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
  handleSubmit: () => {},
  layout: 'horizontal',
  schema: [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.userName'),
      },
      fieldName: 'userName',
      label: $t('abp.user.userName'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.userName'),
      }),
      disabled: true,
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.name'),
      },
      fieldName: 'name',
      disabled: true,
      label: $t('abp.user.name'),
    },
    // {
    //   component: 'VbenInput',
    //   componentProps: {
    //     placeholder: $t('common.pleaseInput') + $t('abp.user.surname'),
    //   },
    //   fieldName: 'surname',
    //   label: $t('abp.user.surname'),
    //   rules: z.string().min(1, {
    //     message: $t('common.pleaseInput') + $t('abp.user.surname'),
    //   }),
    // },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.email'),
      },
      fieldName: 'email',
      disabled: true,
      label: $t('abp.user.email'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.email'),
      }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.phone'),
      },
      fieldName: 'phoneNumber',
      disabled: true,
      label: $t('abp.user.phone'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.phone'),
      }),
    },
  ],
  // showCollapseButton: false,
  // showDefaultActions: false,
  wrapperClass: 'grid-cols-1',
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    show: false,
  },
});
const [ResetPasswordForm, resetPasswordApi] = useVbenForm({
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
  handleSubmit: async () => {
    // 表单校验
    const { valid } = await resetPasswordApi.validate();
    if (!valid) return;
    const formValues = await resetPasswordApi.getValues();

    if (formValues.currentPassword === formValues.confirmPassword) {
      Message.warn($t('abp.user.newPasswordAndCurrentPasswordNotAlike'));
      return;
    }
    if (formValues.newPassword !== formValues.confirmPassword) {
      Message.warn($t('abp.user.newPasswordAndConfirmPasswordNotMatch'));
      return;
    }
    await postUsersChangePassword({ body: formValues });
    Message.success($t('common.editSuccess'));
    await resetPasswordApi.resetForm();
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.currentPassword'),
      },
      fieldName: 'currentPassword',
      label: $t('abp.user.currentPassword'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.currentPassword'),
      }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.newPassword'),
      },
      fieldName: 'newPassword',
      label: $t('abp.user.newPassword'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.newPassword'),
      }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.comfirmPassword'),
      },
      fieldName: 'confirmPassword',
      label: $t('abp.user.comfirmPassword'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.comfirmPassword'),
      }),
    },
  ],
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    content: '确认',
  },
  wrapperClass: 'grid-cols-1',
});

const [EnabledTwoFactorForm, enabledTwoFactorApi] = useVbenForm({
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
  handleSubmit: () => {},
  layout: 'vertical',
  schema: [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.code'),
      },
      fieldName: 'code',
      label: $t('abp.user.code'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.code'),
      }),
    },
  ],
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    show: false,
  },
  wrapperClass: 'grid-cols-1',
});

const [DisabledTwoFactorForm, disabledTwoFactorApi] = useVbenForm({
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
  handleSubmit: () => {},
  layout: 'horizontal',
  schema: [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('common.pleaseInput') + $t('abp.user.code'),
      },
      fieldName: 'code',
      label: $t('abp.user.code'),
      rules: z.string().min(1, {
        message: $t('common.pleaseInput') + $t('abp.user.code'),
      }),
    },
  ],
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    show: false,
  },
  wrapperClass: 'grid-cols-1',
});

onMounted(async () => {
  try {
    loading.value = true;
    const resp = await postUsersMyProfile();
    await profileFormApi.setValues({ ...resp.data });
  } finally {
    loading.value = false;
  }
});
const currentTab = ref(0);
const qrCode = ref('data:image/png;base64,');
const secret = ref(''); // 密钥
const enableTwoFactor = ref(false); // 当前账户是否已经开启了双因素验证
async function activeChange(e: any) {
  if (e !== 2) return;
  loading.value = true;
  // 双因素验证
  const canUseTwoFactor = await postUsersCanUseTwoFactor();
  enableTwoFactor.value = canUseTwoFactor.data as boolean;

  if (!enableTwoFactor.value) {
    // 如果双因素验证没有开启，则获取二维码。
    const qrCodeRes = await postUsersGetQrCode();
    qrCode.value = `data:image/png;base64,${qrCodeRes.data?.qrCode}` as string;
    secret.value = qrCodeRes.data?.secret as string;
  }
  loading.value = false;
}

/**
 * 开启双因素验证
 */
async function enabledTwoFactor() {
  try {
    loading.value = true;
    const validResult = await enabledTwoFactorApi.validate();
    if (!validResult.valid) {
      Message.warning($t('common.pleaseInput') + $t('abp.user.code'));
      return;
    }
    const formValues = await enabledTwoFactorApi.getValues();
    await postUsersEnabledTwoFactor({
      body: {
        ...formValues,
        secret: secret.value,
      },
    });
    enableTwoFactor.value = true;
    Message.info($t('abp.user.twoFactorEnabled'));
  } finally {
    await enabledTwoFactorApi.resetForm();
    loading.value = false;
  }
}

/**
 * 关闭双因素验证
 */
async function disabledTwoFactor() {
  try {
    loading.value = true;
    const validResult = await disabledTwoFactorApi.validate();
    if (!validResult.valid) {
      Message.warning($t('common.pleaseInput') + $t('abp.user.code'));
      return;
    }
    const formValues = await disabledTwoFactorApi.getValues();
    await postUsersDisabledTwoFactor({
      body: {
        ...formValues,
      },
    });
    Message.info($t('abp.user.twoFactorDisabled'));
  } finally {
    await disabledTwoFactorApi.resetForm();
    enableTwoFactor.value = false;
    loading.value = false;
    await activeChange(2);
  }
}
</script>

<template>
  <div>
    <Spin :spinning="loading" tip="loading...">
      <div class="bg-card px-8">
        <Tabs
          v-model:active-key="activeName"
          tab-position="left"
          @change="activeChange"
        >
          <TabPane :key="0" :tab="$t('abp.user.myProfile')">
            <ProfileForm />
          </TabPane>
          <TabPane :key="1" :tab="$t('abp.user.changePassword')">
            <ResetPasswordForm />
          </TabPane>
          <TabPane :key="2" :tab="$t('abp.user.twoFactor')">
            <div v-show="enableTwoFactor">
              <div style="margin-bottom: 5%">
                {{ $t('abp.user.twoFactorEnabledDesc') }}
              </div>
              <DisabledTwoFactorForm />
              <Button
                style="margin-left: 72%"
                type="primary"
                @click="disabledTwoFactor"
              >
                {{ $t('common.disabled') }}
              </Button>
            </div>

            <div v-show="!enableTwoFactor" class="mx-auto max-w-lg">
              <Steps :current="currentTab" class="steps">
                <Step title="Authenticator" />
                <Step :title="$t('abp.user.verifyAuthenticator')" />
              </Steps>
              <div style="margin-top: 30px; margin-left: 20px">
                <Row>
                  <Col :span="12">
                    <Image :src="qrCode" :width="200" />
                  </Col>
                  <Col :span="12">
                    <div>
                      {{ $t('abp.user.twoFactorDesc') }}
                      <EnabledTwoFactorForm />
                      <Button
                        style="margin-left: 55%"
                        type="primary"
                        @click="enabledTwoFactor"
                      >
                        {{ $t('common.enabled') }}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  </div>
</template>

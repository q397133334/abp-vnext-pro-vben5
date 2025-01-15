import { z } from '@vben/common-ui';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export const querySchema = [
  {
    component: 'Input',
    fieldName: 'filter',
    label: $t('abp.user.userName'),
  },
];

export const tableSchema: any = [
  { title: $t('common.seq'), type: 'seq', width: 50 },
  { field: 'userName', title: $t('abp.user.userName'), minWidth: '150' },
  { field: 'name', title: $t('abp.user.name'), minWidth: '150' },
  { field: 'email', title: $t('abp.user.email'), minWidth: '150' },
  {
    field: 'isActive',
    title: $t('abp.user.status'),
    minWidth: '150',
    slots: { default: 'isActive' },
  },
  {
    field: 'twoFactorEnabled',
    title: $t('abp.user.twoFactor'),
    minWidth: '150',
    slots: { default: 'twoFactorEnabled' },
  },
  { field: 'phoneNumber', title: $t('abp.user.phone'), minWidth: '150' },
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
    width: '150',
    slots: { default: 'action' },
  },
];

export const addUserFormSchema: any = [
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'userName',
    label: $t('abp.user.userName'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.userName') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'name',
    label: $t('abp.user.name'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.name') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'email',
    label: $t('abp.user.email'),
    rules: z.string().email($t('common.pleaseInput') + $t('abp.user.email')),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'phoneNumber',
    label: $t('abp.user.phone'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.phone') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'password',
    label: $t('abp.user.password'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.password') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'confirmPassword',
    label: $t('abp.user.comfirmPassword'),
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('abp.user.comfirmPassword'),
    }),
  },
];

export const editUserFormSchemaEdit: any = [
  {
    component: 'Input',
    fieldName: 'isActive',
    label: 'isActive',
    dependencies: {
      show: () => false,
      triggerFields: ['isActive'],
    },
  },
  {
    component: 'Input',
    componentProps: {},
    disabled: true,
    fieldName: 'userName',
    label: $t('abp.user.userName'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.userName') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'name',
    label: $t('abp.user.name'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.name') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'email',
    label: $t('abp.user.email'),
    rules: z.string().email($t('common.pleaseInput') + $t('abp.user.email')),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'phoneNumber',
    label: $t('abp.user.phone'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.user.phone') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'password',
    label: $t('abp.user.password'),
    // rules: z.string().min(1, { message: $t('common.pleaseInput') + $t('abp.user.password') }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'confirmPassword',
    label: $t('abp.user.comfirmPassword'),
    // rules: z
    //   .string()
    //   .min(1, { message: $t('common.pleaseInput') + $t('abp.user.comfirmPassword') }),
  },
];

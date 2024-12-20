import { z } from '@vben/common-ui';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export const querySchema = [
  {
    component: 'Input',
    fieldName: 'filter',
    label: $t('abp.code.projectName'),
  },
];

export const tableSchema: any = [
  { title: $t('common.seq'), type: 'seq', width: 50 },
  { field: 'companyName', title: $t('abp.code.companyName'), minWidth: '150' },
  {
    field: 'projectName',
    title: $t('abp.code.projectName'),
    minWidth: '150',
  },

  { field: 'nameSpace', title: $t('abp.code.namespace'), minWidth: '150' },
  {
    field: 'supportTenant',
    title: $t('abp.code.supportTenant'),
    minWidth: '150',
    slots: { default: 'supportTenant' },
  },
  { field: 'remark', title: $t('abp.code.remark'), minWidth: '150' },
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
    width: '250',
    slots: { default: 'action' },
  },
];

export const addFormSchema: any = [
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'companyName',
    label: $t('abp.code.companyName'),
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('abp.code.companyName'),
    }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'projectName',
    label: $t('abp.code.projectName'),
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('abp.code.projectEnglishName'),
    }),
  },
  // {
  //   component: 'Input',
  //   componentProps: {},
  //   fieldName: 'nameSpace',
  //   label: $t('abp.code.namespace'),
  //   rules: z
  //     .string()
  //     .min(1, { message: $t('common.pleaseInput') + $t('abp.code.namespace') }),
  // },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: $t('common.yes'),
          value: true,
        },
        {
          label: $t('common.no'),
          value: false,
        },
      ],
    },
    defaultValue: 0,
    fieldName: 'supportTenant',
    label: $t('abp.code.supportTenant'),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'remark',
    label: $t('abp.code.remark'),
  },
];

export const editFormSchema: any = [
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'id',
    label: 'id',
    dependencies: {
      show: () => false,
      triggerFields: ['id'],
    },
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'companyName',
    label: $t('abp.code.companyName'),
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('abp.code.companyName'),
    }),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'projectName',
    label: $t('abp.code.projectName'),
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('abp.code.projectEnglishName'),
    }),
  },
  // {
  //   component: 'Input',
  //   componentProps: {},
  //   fieldName: 'nameSpace',
  //   label: $t('abp.code.namespace'),
  //   rules: z
  //     .string()
  //     .min(1, { message: $t('common.pleaseInput') + $t('abp.code.namespace') }),
  // },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: $t('common.yes'),
          value: true,
        },
        {
          label: $t('common.no'),
          value: false,
        },
      ],
    },
    defaultValue: 0,
    fieldName: 'supportTenant',
    label: $t('abp.code.supportTenant'),
  },
  {
    component: 'Input',
    componentProps: {},
    fieldName: 'remark',
    label: $t('abp.code.remark'),
  },
];

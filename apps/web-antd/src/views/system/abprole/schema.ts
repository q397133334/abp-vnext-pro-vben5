import { z } from '@vben/common-ui';

import { $t } from '#/locales';

export const querySchema: any = [
  {
    component: 'Input',
    fieldName: 'filter',
    label: $t('abp.role.roleName'),
  },
];

export const tableSchema: any = [
  { title: $t('common.seq'), type: 'seq', width: 50 },
  { field: 'name', title: $t('abp.role.roleName'), minWidth: '150' },
  {
    field: 'isDefault',
    title: $t('abp.role.isDefault'),
    minWidth: '75',
    slots: { default: 'isDefault' },
  },
  {
    title: $t('common.action'),
    field: 'action',
    fixed: 'right',
    width: '200',
    slots: { default: 'action' },
  },
];

export const addRoleFormSchema: any = [
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('common.pleaseInput') + $t('abp.role.roleName'),
    },
    fieldName: 'name',
    label: $t('abp.role.roleName'),
    rules: z
      .string()
      .min(1, { message: $t('common.pleaseInput') + $t('abp.role.roleName') }),
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: $t('common.yes'),
          value: 1,
        },
        {
          label: $t('common.no'),
          value: 0,
        },
      ],
    },
    defaultValue: 0,
    fieldName: 'isDefault',
    label: $t('abp.role.isDefault'),
    rules: 'required',
  },
];

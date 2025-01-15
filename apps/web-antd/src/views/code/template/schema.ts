import { z } from '@vben/common-ui';

import { $t } from '#/locales';

export const querySchema = [
  {
    component: 'Input',
    fieldName: 'filter',
    label: $t('code.templateName'),
  },
];

export const tableSchema: any = [
  { title: $t('common.seq'), type: 'seq', width: 50 },
  { title: $t('code.templateName'), field: 'name', minWidth: '150' },
  { title: $t('code.remark'), field: 'remark', minWidth: '150' },
  {
    title: $t('common.action'),
    field: 'action',
    fixed: 'right',
    width: '300',
    slots: { default: 'action' },
  },
];

export const addFormSchema: any = [
  {
    fieldName: 'name',
    label: $t('code.templateName'),
    component: 'Input',
    componentProps: {},
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('code.templateName'),
    }),
  },
  {
    fieldName: 'remark',
    label: $t('code.remark'),
    component: 'Input',
    componentProps: {},
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('code.remark'),
    }),
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
    fieldName: 'name',
    label: $t('code.templateName'),
    component: 'Input',
    componentProps: {},
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('code.templateName'),
    }),
  },
  {
    fieldName: 'remark',
    label: $t('code.remark'),
    component: 'Input',
    componentProps: {},
    rules: z.string().min(1, {
      message: $t('common.pleaseInput') + $t('code.remark'),
    }),
  },
];

import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:tool-outlined',
      // order: 998,
      title: $t('textTemplate.templateManagement'),
      authority: ['AbpTemplateManagement'],
    },
    name: 'TextTemplate',
    path: '/TextTemplate',
    children: [
      {
        path: 'page',
        name: 'TextTemplatePage',
        component: () => import('#/views/textTemplate/index.vue'),
        meta: {
          icon: 'ant-design:file-markdown-filled',
          title: $t('textTemplate.templateList'),
          authority: ['AbpTemplateManagement.Template'],
        },
      },
    ],
  },
];

export default routes;

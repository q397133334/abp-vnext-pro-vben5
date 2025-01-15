import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 1,
      title: $t('abp.menu.system'),
      authority: ['AbpIdentity'],
    },
    name: 'system',
    path: '/system',
    children: [
      {
        name: 'abpUser',
        path: 'user',
        component: () => import('#/views/system/abpuser/index.vue'),
        meta: {
          // affixTab: true,
          icon: 'ph:user',
          title: $t('abp.menu.user'),
          authority: ['AbpIdentity.Users'],
        },
      },
      {
        name: 'abpRole',
        path: 'role',
        component: () => import('#/views/system/abprole/index.vue'),
        meta: {
          icon: 'oui:app-users-roles',
          title: $t('abp.menu.role'),
          authority: ['AbpIdentity.Roles'],
        },
      },
      {
        name: 'OrganizationUnit',
        path: 'organizationUnit',
        component: () => import('#/views/system/abporganizationunit/index.vue'),
        meta: {
          title: $t('abp.menu.organizationUnit'),
          authority: ['AbpIdentity.OrganizationUnitManagement'],
          icon: 'ant-design:team-outlined',
        },
      },
      {
        name: 'abpSetting',
        path: 'setting',
        component: () => import('#/views/system/abpsetting/index.vue'),
        meta: {
          icon: 'uil:setting',
          title: $t('abp.menu.setting'),
          authority: ['AbpIdentity.Setting'],
        },
      },
      {
        name: 'abpfeature',
        path: 'Feature',
        component: () => import('#/views/system/abpfeature/index.vue'),
        meta: {
          icon: 'ant-design:tool-outlined',
          title: $t('abp.menu.feature'),
          authority: ['AbpIdentity.FeatureManagement'],
        },
      },
      {
        name: 'AbpAuditLog',
        path: 'auditlog',
        component: () => import('#/views/system/abplog/audit.vue'),
        meta: {
          title: $t('abp.menu.auditLog'),
          authority: ['AbpIdentity.AuditLog'],
          icon: 'ant-design:snippets-twotone',
        },
      },
      {
        name: 'AbpLoginLog',
        path: 'loginlog',
        component: () => import('#/views/system/abplog/login.vue'),
        meta: {
          title: $t('abp.menu.loginLog'),
          authority: ['AbpIdentity.IdentitySecurityLogs'],
          icon: 'ant-design:file-protect-outlined',
        },
      },
      {
        name: 'AboLanguage',
        path: 'language',
        component: () => import('#/views/system/abplanguage/language.vue'),
        meta: {
          title: $t('abp.menu.language'),
          authority: ['AbpIdentity.Languages'],
          icon: 'ant-design:read-outlined',
        },
      },
      {
        name: 'AboLanguageText',
        path: 'languagetext',
        component: () => import('#/views/system/abplanguage/languagetext.vue'),
        meta: {
          title: $t('abp.menu.languageText'),
          authority: ['AbpIdentity.LanguageTexts'],
          icon: 'ant-design:font-size-outlined',
        },
      },
      {
        name: 'DataDictionary',
        path: 'data-dictionary',
        component: () => import('#/views/system/abpdatadictionary/index.vue'),
        meta: {
          title: $t('abp.menu.dataDictionary'),
          authority: ['AbpIdentity.DataDictionaryManagement'],
          icon: 'ant-design:table-outlined',
        },
      },
      {
        name: 'AbpNotification',
        path: 'notification',
        component: () =>
          import('#/views/system/abpnotification/notification.vue'),
        meta: {
          title: $t('abp.menu.notification'),
          authority: ['AbpIdentity.NotificationSubscriptionManagement'],
          icon: 'ant-design:comment-outlined',
        },
      },
      {
        name: 'AbpMessage',
        path: 'message',
        component: () => import('#/views/system/abpnotification/message.vue'),
        meta: {
          title: $t('abp.menu.message'),
          authority: ['AbpIdentity.NotificationManagement'],
          icon: 'ant-design:customer-service-twotone',
        },
      },
    ],
  },
];

export default routes;

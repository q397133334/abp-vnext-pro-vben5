<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  postTemplatesControlType,
  postTemplatesCreateDetail,
  postTemplatesUpdateDetail,
} from '#/api-client/index';
import { $t } from '#/locales';

const emit = defineEmits(['getTreeData']);

const data = ref<Record<string, any>>({});
const controlTypeList = ref<any[]>();
const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'Select',
      fieldName: 'templateType',
      label: '类型',
      componentProps: () => {
        return {
          options: [
            { label: '文件夹', value: 10 },
            { label: '文件', value: 20 },
          ],
        };
      },
    },
    {
      component: 'Select',
      fieldName: 'controlType',
      label: $t('code.templateType'),
      componentProps: () => {
        return {
          options: controlTypeList.value,
          fieldNames: { label: 'key', value: 'value' },
        };
      },
      dependencies: {
        triggerFields: ['templateType'],
        if: (values) => {
          return values.templateType === 20;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('code.name'),
      rules: 'required',
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: $t('code.desc'),
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-1',
  showDefaultActions: false,
});
const getControlTypeList = async () => {
  const { data = [] } = await postTemplatesControlType();
  controlTypeList.value = data;
};

const [Modal, modalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    if (isOpen) {
      data.value = modalApi.getData<Record<string, any>>();
      getControlTypeList();
      if (data.value.isEdit) {
        const { row } = data.value;
        formApi.setValues({
          ...row,
        });
      }
    }
  },
  onConfirm: async () => {
    try {
      modalApi.setState({ loading: true, confirmLoading: true });
      const { valid } = await formApi.validate();
      if (!valid) return;
      const formValues = await formApi.getValues();
      if (data.value.isEdit) {
        await postTemplatesUpdateDetail({
          body: {
            ...formValues,
            templateId: data.value.templateId,
            templateDetailId: data.value.templateDetailId,
          },
        });
        message.success($t('common.editSuccess'));
      } else {
        await postTemplatesCreateDetail({
          body: {
            ...formValues,
            templateId: data.value.templateId,
          },
        });
        message.success($t('common.addSuccess'));
      }
      modalApi.close();
      emit('getTreeData');
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
  },
});
</script>
<template>
  <Modal :title="data.isEdit ? $t('common.edit') : $t('common.add')">
    <Form />
  </Modal>
</template>

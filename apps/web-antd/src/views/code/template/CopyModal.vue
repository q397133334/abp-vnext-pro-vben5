<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal, z } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { postTemplatesCopy } from '#/api-client/index';
import { $t } from '#/locales';

const emit = defineEmits(['reload']);
const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: [
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
  ],
  wrapperClass: 'grid-cols-1',
});

const data = ref<any>();
const [Modal, modalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    if (isOpen) {
      data.value = modalApi.getData<Record<string, any>>();
    }
  },
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    try {
      modalApi.setState({ loading: true, confirmLoading: true });
      const values = await formApi.getValues();
      await postTemplatesCopy({ body: { ...values, id: data.value.id } });
      message.success($t('common.copySuccess'));
      emit('reload');
      modalApi.close();
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
  },
});
</script>
<template>
  <Modal title="复制模板组">
    <Form />
  </Modal>
</template>

<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { message } from '#/adapter/naive';
import { postTenantsAddOrUpdateConnectionString } from '#/api-client';
import { $t } from '#/locales';

const props = defineProps({
  id: String,
});
const emit = defineEmits(['reload']);
const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  schema: [
    {
      component: 'Input',
      componentProps: {},
      fieldName: 'name',
      label: $t('abp.tenant.connectionStringName'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {},
      fieldName: 'value',
      label: $t('abp.tenant.connectionString'),
      rules: 'required',
    },
  ],
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1',
});
const [Modal, modaApi] = useVbenModal({
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;
    try {
      const formValues = await formApi.getValues();
      modaApi.setState({ loading: true, confirmLoading: true });
      await postTenantsAddOrUpdateConnectionString({
        body: { ...formValues, id: props.id },
      });
      message.success($t('common.success'));
      modaApi.close();
      emit('reload');
    } finally {
      modaApi.setState({ loading: false, confirmLoading: false });
    }
  },
});
</script>
<template>
  <Modal :title="$t('abp.tenant.addorEdit')">
    <Form />
  </Modal>
</template>

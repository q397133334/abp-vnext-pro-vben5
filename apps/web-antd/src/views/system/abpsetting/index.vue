<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message as Message,
  Row,
  Spin,
  TabPane,
  Tabs,
} from 'ant-design-vue';

import { postSettingsAll, postSettingsUpdate } from '#/api-client';
import { $t } from '#/locales';

defineOptions({
  name: 'AbpSetting',
});
const activeName = ref(0);
const allSetting = ref();
const loading = ref(false);
/**
 * 后端返回的数据格式不是boolean类型，需要转换一下
 * @param data
 */
function processData(data: any) {
  data.forEach((group: any) => {
    group.settingItemOutput.forEach((setting: any) => {
      if (setting.type === 'CheckBox') {
        if (setting.value === 'true') {
          setting.convertvalue = true;
        } else if (setting.value === 'false') {
          setting.convertvalue = false;
        } else {
          setting.convertvalue = false;
        }
      }
    });
  });
  return data;
}
onMounted(async () => {
  try {
    loading.value = true;
    const resp = await postSettingsAll();
    if (resp.status === 200 || resp.status === 204) {
      const data = processData(resp.data);
      allSetting.value = data || [];
    }
  } finally {
    loading.value = false;
  }
});

const save = async (settingValue: Record<string, any>) => {
  const prefix = 'setting_';
  const params: Record<string, any> = {};
  settingValue.forEach((item: any) => {
    if (item.type === 'CheckBox') {
      params[prefix + item.name] = String(item.convertvalue);
    } else {
      params[prefix + item.name] = String(item.value);
    }
  });

  const resp = await postSettingsUpdate({ body: { values: params } });
  if (resp.status === 200 || resp.status === 204) {
    Message.success($t('common.editSuccess'));
  }
};
</script>

<template>
  <Page :title="$t('abp.menu.setting')" auto-content-heightclass="pb-5">
    <Spin :spinning="loading" tip="loading...">
      <div class="bg-card px-8">
        <Tabs v-model:active-key="activeName" tab-position="left">
          <TabPane
            v-for="(paneItem, index) in allSetting"
            :key="index"
            :tab="paneItem.groupDisplayName"
          >
            <Form
              :label-col="{ span: 6 }"
              :model="paneItem.settingItemOutput"
              style="max-width: 600px"
            >
              <Row style="margin-top: 10px">
                <Col :span="24">
                  <Form.Item
                    v-for="formItem in paneItem.settingItemOutput"
                    :key="formItem.name"
                    :label="formItem.displayName"
                    class="mb-3"
                  >
                    <Input
                      v-if="formItem.type === 'Text'"
                      v-model:value="formItem.value"
                    />
                    <InputNumber
                      v-else-if="formItem.type === 'Number'"
                      v-model:value="formItem.value"
                      :max="999999999"
                      :min="1"
                    />
                    <Checkbox
                      v-else-if="formItem.type === 'CheckBox'"
                      v-model:checked="formItem.convertvalue"
                    >
                      {{ formItem.description }}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row style="margin-bottom: 10px">
                <Col :offset="6">
                  <Button
                    type="primary"
                    @click="save(paneItem.settingItemOutput)"
                  >
                    {{ $t('common.save') }}
                  </Button>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  </Page>
</template>

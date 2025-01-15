<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message as Message,
  Row,
  Spin,
  TabPane,
  Tabs,
} from 'ant-design-vue';

import { postFeaturesList, postFeaturesUpdate } from '#/api-client';
import { $t } from '#/locales';

defineOptions({
  name: 'AbpFeature',
});
const activeName = ref(0);
const allFeature = ref();
const loading = ref(false);
/**
 * 后端返回的数据格式不是boolean类型，需要转换一下
 * @param data
 */
function processData(data: any) {
  data.groups.forEach((group: any) => {
    group.features.forEach((feature: any) => {
      if (feature.value === 'true') {
        feature.convertvalue = true;
      } else if (feature.value === 'false') {
        feature.convertvalue = false;
      }
    });
  });
  return data;
}
onMounted(async () => {
  try {
    loading.value = true;
    const resp = await postFeaturesList({ body: { providerName: 'T' } });

    if (resp.status === 200 || resp.status === 204) {
      const data = processData(resp.data);
      allFeature.value = data || [];
    }
  } finally {
    loading.value = false;
  }
});

const save = async (item: any) => {
  const features = item.features?.map((e) => {
    let value = e.value;
    if (e.valueType.name === 'ToggleStringValueType') {
      value = e.convertvalue.toString();
    }
    return {
      name: e.name,
      value,
    };
  });

  await postFeaturesUpdate({
    body: {
      providerName: 'T',
      updateFeaturesDto: {
        features,
      },
    },
  });
  Message.success($t('common.editSuccess'));
};
</script>

<template>
  <Page :title="$t('abp.menu.feature')" auto-content-height class="pb-5">
    <Spin :spinning="loading" tip="loading...">
      <div class="bg-card px-8">
        <Tabs v-model:active-key="activeName" tab-position="left">
          <TabPane
            v-for="(paneItem, index) in allFeature?.groups"
            :key="index"
            :tab="paneItem.displayName"
          >
            <Form
              :label-col="{ span: 6 }"
              :model="paneItem"
              style="max-width: 800px"
            >
              <Row style="margin-top: 10px">
                <Col :span="24">
                  <Form.Item
                    v-for="formItem in paneItem.features"
                    :key="formItem.name"
                    :label="formItem.displayName"
                    class="mb-4"
                  >
                    <Input
                      v-if="
                        formItem.valueType.name === 'FreeTextStringValueType'
                      "
                      v-model:value="formItem.value"
                    />

                    <Checkbox
                      v-else-if="
                        formItem.valueType.name === 'ToggleStringValueType'
                      "
                      v-model:checked="formItem.convertvalue"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style="margin-bottom: 10px">
                <Col :offset="6">
                  <Button type="primary" @click="save(paneItem)">
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

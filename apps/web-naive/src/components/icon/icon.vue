<script setup lang="ts">
import { IconifyIcon as VbenIcon } from '@vben/icons';

import { NIcon } from 'naive-ui';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <NIcon>
    <VbenIcon :icon="props.icon" />
  </NIcon>
</template>

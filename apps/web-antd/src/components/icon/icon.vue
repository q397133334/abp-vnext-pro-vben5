<script setup lang="ts">
import { computed, h } from 'vue';

import { IconifyIcon as VbenIcon } from '@vben/icons';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
});
const iconComp = computed(() => {
  if (props.icon.startsWith('http')) {
    return () => h('img', { src: props.icon, class: 'm-icon__' });
  }
  return '';
});
const styles = computed(() => {
  return {
    fontSize: props.size.toString().endsWith('px')
      ? props.size
      : `${props.size}px`,
  };
});
</script>

<template>
  <component :is="iconComp" v-if="iconComp" :style="styles" />
  <VbenIcon v-else :icon="props.icon" :style="styles" class="m-icon__" />
</template>
<style lang="less" scoped>
.m-icon__ {
  display: inline-flex;
  align-items: center;
  width: 1em;
  height: 1em;
  font-style: normal;
  line-height: 0;
  color: inherit;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

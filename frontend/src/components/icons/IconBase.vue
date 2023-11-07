<template>
  <svg :width="props.width" :height="props.height" :viewBox="props.viewBox" :fill="props.fill">
    <slot />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '800px',
  height: '800px',
  viewBox: '0 0 24 24',
  fill: 'none',
});
</script>

<template>
  <div class="my-[1.88rem] px-2 py-10">
    <p class="font-bold text-lg">{{ props.word }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  word: string;
}>();
</script>

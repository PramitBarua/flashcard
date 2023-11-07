<template>
  <div class="w-full px-7 py-10 bg-orange-100">
    <p class="font-bold">{{ props.word }}</p>
    <p class="my-2 text-neutral-500">{{ props.wordType }}</p>
    <p class="text-neutral-500">{{ props.exampleSentence }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  word: string;
  wordType: string;
  exampleSentence: string;
}>();
</script>

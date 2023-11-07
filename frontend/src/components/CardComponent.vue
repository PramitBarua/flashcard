<template>
  <div class="w-max-md">
    <button class="w-11/12 mx-auto flex flex-col justify-center items-center" @click="onFlip">
      <slot />
      <p class="text-sm">click to flip</p>
    </button>
    <div class="w-11/12 mx-auto flex gap-1 justify-evenly mt-6">
      <button class="py-2 w-full flex justify-center bg-orange-400" @click="onDecide(false)">
        <IconBase width="30px" height="30px" fill="#fff">
          <IconCross />
        </IconBase>
      </button>
      <button class="py-2 w-full flex justify-center bg-green-600" @click="onDecide(true)">
        <IconBase width="30px" height="30px">
          <IconCheck />
        </IconBase>
      </button>
    </div>
    <div class="mt-4 flex justify-center">
      <button @click="onReset">
        <IconBase width="32px" height="32px" viewBox="0 0 580 580" fill="#000">
          <IconArrowInCircle />
        </IconBase>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/components/icons/IconBase.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconArrowInCircle from '@/components/icons/IconArrowInCircle.vue';

const emit = defineEmits<{
  onFlip: [];
  onDecide: [value: boolean];
  onReset: [];
}>();

const onFlip = () => {
  emit('onFlip');
};

const onDecide = (decision: boolean) => {
  emit('onDecide', decision);
};

const onReset = () => {
  emit('onReset');
};
</script>

<template>
  <div class="mx-10 max-w-sm">
    <div v-for="moduleObj in moduleToDisplay" :key="moduleObj.name" class="mb-4">
      <button @click="onModuleHeaderClick(moduleObj.name)">{{ moduleObj.name }}</button>
      <div v-if="moduleObj.isOpen" class="flex flex-col">
        <RouterLink
          v-for="charpterName in chapterNames"
          :key="`${moduleObj.name}-${charpterName}`"
          class="border my-2 px-5 py-1 text-center"
          :to="`/flashcard/${moduleObj.name}/${charpterName}`"
        >
          <span>{{ moduleObj.name }}</span>
          <span> &nbsp;</span>
          <span>{{ charpterName.toUpperCase().replace('_', ' ') }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { modules, chapterNames } from '@/enums';
import { Ref, onMounted, ref } from 'vue';

interface IModuleToDisplay {
  name: string;
  isOpen: boolean;
}

const moduleToDisplay: Ref<IModuleToDisplay[]> = ref([]);

const onModuleHeaderClick = (moduleName: string) => {
  const targetModuleIndex = moduleToDisplay.value.findIndex((module) => module.name === moduleName);
  const targetModule = { ...moduleToDisplay.value[targetModuleIndex] };

  moduleToDisplay.value.splice(targetModuleIndex, 1, {
    ...targetModule,
    isOpen: !targetModule.isOpen,
  });
};

onMounted(() => {
  moduleToDisplay.value = modules.map((module) => {
    return {
      name: module,
      isOpen: false,
    };
  });
});
</script>

<template>
  <div class="mx-auto my-2 max-w-sm">
    <div class="flex justify-between items-center">
      <RouterLink class="m-2" to="/">back</RouterLink>
      <button @click="onCardSizeChange">
        <IconBase width="24px" height="24px" fill="#000">
          <IconArrowRightArrowLeft />
        </IconBase>
      </button>
    </div>

    <div v-if="flashCardData" class="mt-20">
      <CardComponent @onFlip="onFlip" @onDecide="onDecide" @onReset="onReset">
        <FrontSideComponent v-if="showFrontSide" :word="flashCardData.engMeaning" />
        <BackSideComponent
          v-if="!showFrontSide"
          :word="flashCardData.germanWord"
          :wordType="flashCardData.type"
          :exampleSentence="flashCardData.exampleSentence"
        />
      </CardComponent>
    </div>
    <div v-if="isError" class="mx-2 my-10 text-center">
      <p>An error occurred; please try again later!!</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { Ref, computed, onMounted, ref } from 'vue';
import { useApi } from '@/api';
import { getRandomNumber } from '@/helpers';
import IWord from '@/types/IWord';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrowRightArrowLeft from '@/components/icons/IconArrowRightArrowLeft.vue';
import CardComponent from '@/components/CardComponent.vue';
import FrontSideComponent from '@/components/FrontSideComponent.vue';
import BackSideComponent from '@/components/BackSideComponent.vue';

const route = useRoute();
const router = useRouter();
const { api } = useApi();
const isFrontSideFirst = ref(true);
const showFrontSide = ref(true);

const moduleName = route.params.module as string;
const chapterName = route.params.chapterName as string;
const storageKey = moduleName + '_' + chapterName;

const wordlist: Ref<IWord[]> = ref([]);
const wordListToDisplay: Ref<IWord[]> = ref([]);
const isError = ref(false);

const flashCardData = computed(() => {
  const index = getRandomNumber(0, wordListToDisplay.value.length);
  return wordListToDisplay.value[index];
});

const onCardSizeChange = () => {
  isFrontSideFirst.value = !isFrontSideFirst.value;
  showFrontSide.value = isFrontSideFirst.value;
};

const onFlip = () => {
  showFrontSide.value = !showFrontSide.value;
};

const onDecide = (decision: boolean) => {
  showFrontSide.value = isFrontSideFirst.value;
  let storedData: IWord[] = JSON.parse(localStorage.getItem(storageKey) || '');
  storedData = [
    ...storedData.filter((wordItem) => wordItem.id !== flashCardData.value.id),
    {
      ...flashCardData.value,
      isKnown: decision,
    },
  ];
  localStorage.setItem(storageKey, JSON.stringify(storedData));

  wordListToDisplay.value = wordListToDisplay.value.filter((wordItem) => wordItem.id !== flashCardData.value.id);
  if (wordListToDisplay.value.length === 0) {
    router.push({ name: 'home' });
  }
};

const onReset = () => {
  localStorage.removeItem(storageKey);
  window.location.reload();
};

onMounted(async () => {
  const storedData = localStorage.getItem(storageKey);
  if (typeof storedData === 'string') {
    wordlist.value = JSON.parse(storedData);
  } else {
    try {
      const res = await api.GET_WORDLIST({
        module: moduleName,
        chapterName,
      });
      wordlist.value = res.data.map((item) => {
        return {
          ...item,
          isKnown: false,
        };
      });
      localStorage.setItem(storageKey, JSON.stringify(wordlist.value));
    } catch (err) {
      isError.value = true;
      return;
    }
  }

  const unlearnedWords = wordlist.value.filter((word) => word.isKnown === false);
  if (unlearnedWords.length < 20) {
    wordListToDisplay.value = unlearnedWords;
  }

  wordListToDisplay.value = unlearnedWords.slice(0, 20);
});
</script>

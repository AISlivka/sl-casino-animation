<template>
  <div class="main-page">
    <div class="main-page__container">
      <component :is="steps[currentStep]" />
    </div>
    <div class="main-page__navigations">
      <button
        class="main-page__navigations-button"
        :disabled="currentStep === 0"
        @click="prevStep"
      >
        Предыдущий шаг
      </button>

      <button
        class="main-page__navigations-button"
        :disabled="currentStep === steps.length - 1"
        @click="nextStep"
      >
        Следующий шаг
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import CricketFirstAnimation from '@/components/CricketAnimation/CricketFirstAnimation.vue';
import CricketSecondAnimation from '@/components/CricketAnimation/CricketSecondAnimation.vue';

const steps = shallowRef([CricketFirstAnimation, CricketSecondAnimation]);

const currentStep = ref(0);

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
  }
};

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value += 1;
  }
};
</script>

<style lang="postcss" scoped>
.main-page__navigations {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.main-page__navigations-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

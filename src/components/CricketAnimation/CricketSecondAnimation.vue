<template>
  <div ref="cricketRef" class="cricket">
    <div class="cricket-container">
      <div class="cricket-container-ball">
        <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />
      </div>
      <div class="cricket-container-bat">
        <img ref="batRef" class="bat" src="@/assets/img/ImgBat.png" />
      </div>
    </div>
    <div class="cricket-active">
      <button class="cricket-active-button" @click="animateBall">
        Ударить мяч
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';

const ballRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);
const cricketRef = ref<HTMLElement | null>(null);

const animateBall = () => {
  if (!ballRef.value || !batRef.value || !cricketRef.value) {
    return;
  }

  const ball = ballRef.value;
  const bat = batRef.value;
  const cricket = cricketRef.value;
  const tl = gsap.timeline();

  // 1. Первая анимация мяча
  tl.to(ball, {
    x: '-30vw',
    y: '20vw',
    rotation: -500,
    duration: 0.6,
    ease: 'power1.in',
  });

  tl.to(
    bat,
    {
      rotation: 15,
      duration: 0.5,
      x: '3vw', // Небольшой сдвиг, чтобы компенсировать смену оси
      ease: 'power3.inOut',
    },
    '<', // Бита запускается одновременно со второй анимацией мяча
  );

  // 2. Вторая анимация мяча + Одновременное начало анимации биты
  tl.to(
    ball,
    {
      x: '-63vw',
      y: '5vw',
      rotation: -1000,
      duration: 0.6,
      ease: 'power1.out',
    },
    '>', // Запускаем сразу после первой анимации мяча
  );

  tl.to(
    bat,
    {
      x: '7vw',
      y: '-4vw',
      rotation: -190,
      duration: 0.6,
      scale: 1, // Возвращаем обратно
      ease: 'power3.in',
    },
    '<', // Бита запускается одновременно со второй анимацией мяча
  );

  tl.to(
    bat,
    {
      rotation: -360,
      duration: 0.3,
      ease: 'power2.out',
    },
    '>', // Происходит после основного удара биты
  );

  // 3. Отлет мяча сразу после удара (не ждёт конца анимации биты)
  tl.to(
    ball,
    {
      x: '0vw',
      y: '-25vw',
      duration: 0.5,
      ease: 'power3.out',
    },
    '<',
  );

  // 4. вращение мяча
  tl.to(
    ball,
    {
      rotation: 860,
      duration: 1.5,
      repeat: -1,
      ease: 'linear',
    },
    '<',
  );

  tl.to(
    bat,
    {
      x: '-100vw',
      y: '50vw',
      duration: 1.5,
      ease: 'power2.in',
      onStart: () => cricket.classList.add('is_active'),
    },
    '<',
  );
};
</script>

<style lang="postcss" scoped>
.cricket {
  position: relative;

  &.is_active {
    & .cricket-container {
      &::before {
        top: -100%;
        transform: none;
      }

      &::after {
        bottom: -100%;
      }
    }

    & .cricket-active {
      opacity: 0;
      visibility: hidden;
    }
  }
}

.cricket-container {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: #0e0901;

  &::before {
    content: '';
    background-image: url('@/assets/img/ImgBackPublic.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 23vw;
    transition: 1.5s ease-in-out;
  }

  &::after {
    content: '';
    background-image: url('@/assets/img/ImgBackField.png');
    background-position: bottom;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 29vw;
    transition: 1.5s ease-in-out;
  }
}

.cricket-container-ball {
  position: absolute;
  bottom: 35%;
  right: 5vw;
  width: 7vw;
  height: 7vw;
  z-index: 2;
}

.ball {
  width: 100%;
  height: 100%;
}

.cricket-container-bat {
  position: absolute;
  top: 50%;
  left: 3vw;
  transform: translateY(-52%);
  width: 18vw;
  height: auto;
  z-index: 1;
}

.bat {
  width: 100%;
  height: 100%;
}

.cricket-active {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  position: absolute;
  top: 16px;
  opacity: 1;
  visibility: visible;
  transition: 1s ease-in-out;
}

.cricket-active-button {
  padding: 12px;
}
</style>

<!--<template>-->
<!--  <div class="cricket">-->
<!--    <div class="cricket-container">-->
<!--      <div class="cricket-container-ball">-->
<!--        <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />-->
<!--      </div>-->
<!--      <div class="cricket-container-bat">-->
<!--        <img ref="batRef" class="bat" src="@/assets/img/ImgBat.png" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="cricket-active">-->
<!--      <button class="cricket-active-button" @click="animateBall">-->
<!--        Ударить мяч-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue';-->
<!--import gsap from 'gsap';-->

<!--const ballRef = ref<HTMLElement | null>(null);-->
<!--const batRef = ref<HTMLElement | null>(null);-->

<!--const animateBall = () => {-->
<!--  if (!ballRef.value || !batRef.value) {-->
<!--    return;-->
<!--  }-->

<!--  const ball = ballRef.value;-->
<!--  const bat = batRef.value;-->
<!--  const tl = gsap.timeline();-->

<!--  // 1. Первая анимация мяча-->
<!--  tl.to(ball, {-->
<!--    x: '-30vw',-->
<!--    y: '20vw',-->
<!--    rotation: -500,-->
<!--    duration: 0.6,-->
<!--    ease: 'power1.in',-->
<!--  });-->

<!--  tl.to(-->
<!--    bat,-->
<!--    {-->
<!--      rotation: 15,-->
<!--      duration: 0.5,-->
<!--      x: '3vw', // Небольшой сдвиг, чтобы компенсировать смену оси-->
<!--      ease: 'power3.inOut',-->
<!--    },-->
<!--    '<', // Бита запускается одновременно со второй анимацией мяча-->
<!--  );-->

<!--  // 2. Вторая анимация мяча + Одновременное начало анимации биты-->
<!--  tl.to(-->
<!--    ball,-->
<!--    {-->
<!--      x: '-63vw',-->
<!--      y: '5vw',-->
<!--      rotation: -1000,-->
<!--      duration: 0.6,-->
<!--      ease: 'power1.out',-->
<!--    },-->
<!--    '>', // Запускаем сразу после первой анимации мяча-->
<!--  );-->

<!--  tl.to(-->
<!--    bat,-->
<!--    {-->
<!--      x: '7vw',-->
<!--      y: '-4vw',-->
<!--      rotation: -190,-->
<!--      duration: 0.6,-->
<!--      scale: 1, // Возвращаем обратно-->
<!--      ease: 'power3.in',-->
<!--    },-->
<!--    '<', // Бита запускается одновременно со второй анимацией мяча-->
<!--  );-->

<!--  tl.to(-->
<!--    bat,-->
<!--    {-->
<!--      rotation: -360,-->
<!--      duration: 0.3,-->
<!--      ease: 'power2.out',-->
<!--    },-->
<!--    '>', // Происходит после основного удара биты-->
<!--  );-->

<!--  // 3. Отлет мяча сразу после удара (не ждёт конца анимации биты)-->
<!--  tl.to(-->
<!--    ball,-->
<!--    {-->
<!--      x: '0vw',-->
<!--      y: '-25vw',-->
<!--      rotation: 500,-->
<!--      duration: 0.5,-->
<!--      ease: 'power3.out',-->
<!--    },-->
<!--    '<',-->
<!--  );-->

<!--  // 4. мяч на исходную-->
<!--  tl.to(ball, {-->
<!--    x: 0,-->
<!--    y: 0,-->
<!--    duration: 0,-->
<!--  });-->

<!--  // 5. биту на исходную-->
<!--  tl.to(bat, {-->
<!--    x: 0,-->
<!--    y: 0,-->
<!--    rotation: 0,-->
<!--    duration: 0.8,-->
<!--    ease: 'power2.inOut',-->
<!--  });-->
<!--};-->
<!--</script>-->

<!--<style lang="postcss" scoped>-->
<!--.cricket {-->
<!--  position: relative;-->
<!--}-->

<!--.cricket-container {-->
<!--  position: relative;-->
<!--  aspect-ratio: 16 / 9;-->
<!--  overflow: hidden;-->
<!--  background-color: #0e0901;-->

<!--  &::before {-->
<!--    content: '';-->
<!--    background-image: url('@/assets/img/ImgBackPublic.png');-->
<!--    background-position: center;-->
<!--    background-size: contain;-->
<!--    background-repeat: no-repeat;-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    transform: translateY(-50%);-->
<!--    width: 100%;-->
<!--    height: 23vw;-->
<!--  }-->

<!--  &::after {-->
<!--    content: '';-->
<!--    background-image: url('@/assets/img/ImgBackField.png');-->
<!--    background-position: bottom;-->
<!--    background-size: contain;-->
<!--    background-repeat: no-repeat;-->
<!--    position: absolute;-->
<!--    bottom: 0;-->
<!--    width: 100%;-->
<!--    height: 29vw;-->
<!--  }-->
<!--}-->

<!--.cricket-container-ball {-->
<!--  position: absolute;-->
<!--  bottom: 35%;-->
<!--  right: 5vw;-->
<!--  width: 7vw;-->
<!--  height: 7vw;-->
<!--  z-index: 2;-->
<!--}-->

<!--.ball {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--.cricket-container-bat {-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  left: 3vw;-->
<!--  transform: translateY(-52%);-->
<!--  width: 18vw;-->
<!--  height: auto;-->
<!--  z-index: 1;-->
<!--}-->

<!--.bat {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--.cricket-active {-->
<!--  width: 100%;-->
<!--  margin-top: 20px;-->
<!--  text-align: center;-->
<!--  position: absolute;-->
<!--  top: 16px;-->
<!--}-->

<!--.cricket-active-button {-->
<!--  padding: 12px;-->
<!--}-->
<!--</style>-->

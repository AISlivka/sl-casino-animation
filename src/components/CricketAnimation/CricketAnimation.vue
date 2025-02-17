<template>
  <div class="video-container">
    <div class="video-container-ball">
      <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />
    </div>
    <div class="video-container-bat">
      <img ref="batRef" class="bat" src="@/assets/img/ImgBat.png" />
    </div>
  </div>
  <div class="active">
    <button class="active-button" @click="animateBall">Кнопка активации</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';

const ballRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);

const animateBall = () => {
  if (!ballRef.value || !batRef.value) {
    return;
  }

  const ball = ballRef.value;
  const bat = batRef.value;
  const tl = gsap.timeline();

  // 1. Первая анимация мяча
  tl.to(ball, {
    x: '-30vw',
    y: '20vw',
    rotation: -500,
    duration: 0.6,
    ease: 'power1.in',
  });

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
      ease: 'power3.in',
    },
    '<', // Бита запускается одновременно со второй анимацией мяча
  );

  // Добавляем инерционное движение биты после удара
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
      rotation: 500,
      duration: 0.5,
      ease: 'power3.out',
    },
    '<', // Запускаем одновременно с инерцией биты
  );

  // 4. Возвращаем мяч на исходную позицию
  tl.to(ball, {
    x: 0,
    y: 0,
    duration: 0,
  });

  // 5. Возвращаем биту на место после всего
  tl.to(bat, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.8,
    ease: 'power2.inOut',
  });
};
</script>

<style lang="postcss" scoped>
.video-container {
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
  }
}

.video-container-ball {
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

.video-container-bat {
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

.active {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.active-button {
  padding: 12px;
}
</style>

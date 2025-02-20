<template>
  <div class="cricket">
    <div ref="containerRef" class="cricket-container">
      <div class="cricket-container-bat">
        <img ref="batRef" class="bat" src="@/assets/img/ImgBat.png" />
      </div>
      <div class="cricket-container-ball">
        <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />
      </div>
    </div>
    <div class="cricket-active">
      <button class="cricket-active-button" @click="animateBall">
        Начать анимацию
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';

const ballRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const animateBall = () => {
  if (!ballRef.value || !batRef.value || !containerRef.value) {
    return;
  }

  // const ball = ballRef.value;
  const bat = batRef.value;
  const container = containerRef.value;
  const tl = gsap.timeline({
    onStart: () => container.classList.add('is_active'),
  });

  tl.to(bat, {
    x: '-100vw',
    y: '50vw',
    duration: 1,
    ease: 'power2.in',
  });
};
</script>

<style lang="postcss" scoped>
.cricket {
  position: relative;
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
    transition: 1s ease-in-out;
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
    transition: 1s ease-in-out;
  }

  &.is_active {
    &::before {
      top: -100%;
      transform: none;
    }

    &::after {
      bottom: -100%;
    }
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
}

.cricket-active-button {
  padding: 12px;
}
</style>

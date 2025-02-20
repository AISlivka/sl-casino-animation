<template>
  <div class="cricket-container">
    <div class="cricket-container-ball">
      <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />
    </div>
    <div class="cricket-container-bat">
      <img ref="batRef" class="bat" src="@/assets/img/ImgBat.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const ballRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (ballRef.value && batRef.value) {
    gsap.to(ballRef.value, {
      y: '-20vw',
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.out',
    });

    gsap.to(batRef.value, {
      y: '-1vw',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
});
</script>

<style lang="postcss" scoped>
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

.cricket-container-ball {
  position: absolute;
  bottom: 14vw;
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
</style>

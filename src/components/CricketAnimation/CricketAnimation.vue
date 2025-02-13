
<template>
  <div class="container">
    <button @click="animateBall">Запустить анимацию</button>
    <img ref="ballRef" class="ball"
         src="@/assets/img/ImgBall.png" />
    <img ref="batRef" class="bat"
         src="@/assets/img/ImgBat.png" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

// Ссылки на элементы
const ballRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);

// Исходные позиции мяча
const startX = window.innerWidth - 100;
const startY = 100;

// Функция анимации
const animateBall = () => {
  if (!ballRef.value || !batRef.value) return;

  const ball = ballRef.value;
  const bat = batRef.value;

  // Анимация движения мяча: диагональ вниз влево → отскок → вверх влево
  const tl = gsap.timeline();

// Бесконечное вращение мяча
  gsap.to(ball, {
    rotation: -360, // Полный оборот
    duration: 0.3, // Скорость вращения
    repeat: -1, // Бесконечный повтор
    ease: "linear", // Равномерное вращение
  });

  tl.to(ball, {
    x: -600, // Мяч летит влево
    y: 350, // Мяч летит вниз
    duration: 0.6,
    ease: "power1.in",
  })
    .to(ball, {
      x: -1100, // Еще левее
      y: 200, // Подпрыгивает вверх
      duration: 0.6,
      ease: "power1.out",
    })
    .to(ball, {
      x: -1240, // Еще левее
      y: 230, // Подпрыгивает вверх
      duration: 0.7,
      onStart: () => { // Исправлено: `toStart` → `onStart`
        gsap.to(bat, {
          rotation: -180,
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    })
    .to(ball, {
      x: 0, // Возвращается в начальное положение
      y: startY,
      duration: 1,
      ease: "power3.out",
    })
    .to(bat, {
      rotation: 0, // Возвращаем биту в исходное положение
      duration: 0.8,
      ease: "power2.inOut",
    })
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 500px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.ball {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 100px;
  top: 100px;
}

.bat {
  width: 150px;
  height: auto;
  position: absolute;
  top: 70px;
}
</style>

<template>
  <div ref="cricketRef" class="cricket">
    <div class="cricket-container">
      <div class="cricket-schedule">
        <svg
          ref="lineRef"
          class="trajectory"
          viewBox="0 0 250 180"
          width="100%"
          height="100%"
        >
          <path
            d="M1 150 Q 250 150, 260 0 L 260 180 L 1 180 Z"
            fill="#3E1111"
          />
          <path
            d="M1 150 Q 250 150, 260 0"
            stroke="#FE7E7E"
            fill="none"
            stroke-width="2"
            stroke-dasharray="330"
          />
        </svg>
      </div>
      <div class="cricket-container-ball">
        <img ref="ballRef" class="ball" src="@/assets/img/ImgBall.png" />
      </div>
      <div class="cricket-container-ball _boom">
        <img ref="ballBoomRef" class="ball" src="@/assets/img/ImgBoom.png" />
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
const ballBoomRef = ref<HTMLElement | null>(null);
const batRef = ref<HTMLElement | null>(null);
const cricketRef = ref<HTMLElement | null>(null);
const lineRef = ref<SVGSVGElement | null>(null);

const animateBall = () => {
  if (!ballRef.value || !batRef.value || !cricketRef.value || !lineRef.value) {
    return;
  }

  const ball = ballRef.value;
  const ballBoom = ballBoomRef.value;
  const bat = batRef.value;
  const cricket = cricketRef.value;
  const schedule = cricket.querySelector('.cricket-schedule');

  const tl = gsap.timeline();

  // 1. Первая анимация мяча
  tl.to(ball, {
    x: '-30vw',
    y: '20vw',
    rotation: -500,
    duration: 0.6,
    ease: 'power1.in',
  });

  // 2. Удар биты
  tl.to(
    bat,
    {
      rotation: 15,
      duration: 0.5,
      x: '3vw',
      ease: 'power3.inOut',
    },
    '<',
  );

  // 3. Вторая анимация мяча
  tl.to(
    ball,
    {
      x: '-63vw',
      y: '5vw',
      rotation: -1000,
      duration: 0.6,
      ease: 'power1.out',
    },
    '>',
  );

  // 4. Вращение биты
  tl.to(
    bat,
    {
      x: '7vw',
      y: '-4vw',
      rotation: -190,
      duration: 0.6,
      ease: 'power3.in',
    },
    '<',
  );

  // 5. Анимация появления графика
  if (schedule) {
    tl.to(
      schedule,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power2.out',
      },
      '>',
    );
  }

  // 6. Отлет мяча вверх
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

  // 7. Вращение мяча
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

  // 8. Скрытие биты / добавление класса is_active (скрытие фона и временной кнопки)
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

  // 9. Уменьшение мяча
  tl.to(
    ball,
    {
      scale: 0,
      duration: 0.2,
      ease: 'linear',
      delay: 2,
    },
    '>',
  );

  // 10. Появление взрыва
  tl.to(
    ballBoom,
    {
      scale: 1.7,
      duration: 1.2,
      ease: 'elastic.out(1, 0.25)',
    },
    '-=0.2',
  );
};
</script>

<style lang="postcss" scoped>
.trajectory {
  position: absolute;
  top: 0.7vw;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

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

  .cricket-schedule {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -9vw;
    clip-path: inset(0 100% 0 0);
    z-index: 1;
  }

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

.cricket-container-ball._boom {
  transform: translate3d(0vw, -25vw, 0px);

  & .ball {
    transform: scale(0);
  }
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

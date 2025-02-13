import { onMounted, onUnmounted, ref } from 'vue';
import { RESPONSE_WINDOW_WIDTH_MD } from '@/constants';

export default function useWindowResize(
  windowWidth = RESPONSE_WINDOW_WIDTH_MD,
) {
  const isMobile = ref(false);

  const currentWindowWidth = ref(0);

  const HANDLER_DELAY = 300;

  const resizeHandler = () => {
    currentWindowWidth.value = window.innerWidth;

    isMobile.value = window.innerWidth <= windowWidth;
  };

  const debouncedResizeHandler = debounce(resizeHandler, HANDLER_DELAY);

  onMounted(() => {
    resizeHandler();

    window.addEventListener('resize', debouncedResizeHandler);
  });

  onUnmounted(() => {
    window.addEventListener('resize', debouncedResizeHandler);
  });

  return {
    isMobile,
    currentWindowWidth,
  };
}

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
): ((...args: Parameters<any>) => ReturnType<any>) => {
  let timeout = 0;

  const debounced = (...args: any[]): void => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), waitFor);
  };

  return debounced as unknown as (...args: Parameters<any>) => ReturnType<any>;
};

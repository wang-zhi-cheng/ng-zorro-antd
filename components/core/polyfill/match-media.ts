import { isBrowser } from '../util';

function matchMediaFunc(): (mediaQuery: string) => MediaQueryList {
  if (!isBrowser()) {
    return () => null;
  }
  if (window.matchMedia) {
    return window.matchMedia.bind(window);
  } else {
    const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
      return {
        media  : mediaQuery,
        matches: false,
        addListener(): void {
        },
        removeListener(): void {
        },
      };
    };
    return matchMediaPolyfill;
  }
}

export const matchMedia = matchMediaFunc();

// @flow
const delay = (ms: number = 15): Promise<void> => {
  return new Promise(r => setTimeout(r, ms));
};

export default async (el: HTMLElement): (() => Promise<void>) => {
  const defaultTransition: string = getComputedStyle(el).transition;

  await delay();
  Object.assign(el.style, {
    webkitTransition: null,
    transition: null
  });
  await delay();

  return async () => {
    await delay();
    Object.assign(el.style, {
      webkitTransition: defaultTransition,
      transition: defaultTransition
    });
    await delay();
  };
};

import { atom } from 'recoil';

export const dynamicPaddingState = atom({
  key: 'dynamicPaddingState',
  default: '64',
});

export const darkToggleState = atom({
  key: 'darkToggleState',
  default: true,
});

export const backgroundColorState = atom({
  key: 'backgroundColorState',
  default: 'linear-gradient(140deg, rgb(257, 99, 99), rgb(115, 52, 52))',
});

export const elementRefAtom = atom<any>({
  key: 'elementRefAtom',
  default: null,
});

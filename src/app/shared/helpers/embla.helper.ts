// src/app/shared/helpers/embla.helper.ts
import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel';

export const initEmblaCarousel = (
  emblaNode: HTMLElement,
  options: EmblaOptionsType = { loop: true }
) => {
  return EmblaCarousel(emblaNode, options);
};

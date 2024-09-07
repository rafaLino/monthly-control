import brImg from '@/assets/br.png';
import enImg from '@/assets/en.png';
import esImg from '@/assets/es.png';
import { ComponentPropsWithoutRef, FC } from 'react';
import { LanguageOption } from '../types/languageOption';

const BrIcon: FC<ComponentPropsWithoutRef<'img'>> = (props) => <img src={brImg} alt="br" {...props} />;
const EnIcon: FC<ComponentPropsWithoutRef<'img'>> = (props) => <img src={enImg} alt="en" {...props} />;
const EsIcon: FC<ComponentPropsWithoutRef<'img'>> = (props) => <img src={esImg} alt="es" {...props} />;

const ICONS = {
  br: BrIcon,
  en: EnIcon,
  es: EsIcon
};

export const LanguageIcon: FC<ComponentPropsWithoutRef<'img'> & { name: LanguageOption }> = ({ name, ...props }) => {
  return ICONS[name] ? ICONS[name](props) : null;
};

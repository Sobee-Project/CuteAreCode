import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import * as de from './de';
import * as en from './en';
import * as es from './es';
import * as fil from './fil';
import * as fr from './fr';
import * as hi from './hi';
import * as id from './id';
import * as it from './it';
import * as ja from './ja';
import * as ko from './ko';
import * as ms from './ms';
import * as nl from './nl';
import * as pl from './pl';
import * as pt from './pt';
import * as ru from './ru';
import * as th from './th';
import * as tr from './tr';
import * as vi from './vi';
import * as zh from './zh';

type TupleUnion<U extends string, R extends unknown[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

const ns = Object.keys(en) as TupleUnion<keyof typeof en>;

export const defaultNS = ns[0];

i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    en,
    vi,
    es,
    fr,
    de,
    it,
    pt,
    ru,
    ja,
    ko,
    zh,
    hi,
    ms,
    fil,
    th,
    id,
    nl,
    pl,
    tr,
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;

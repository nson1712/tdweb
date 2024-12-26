import {makeAutoObservable} from 'mobx';
import moment from 'moment';
import 'moment/locale/vi';
import i18n from '../localization/i18n';

const DEFAULT_LANGUAGE = 'vi';

class LangStore {
  lang = DEFAULT_LANGUAGE;

  constructor() {
    makeAutoObservable(this);
    this.getLang();
  }

  getDefaultLanguage = () => {
    moment.locale(DEFAULT_LANGUAGE);
    return DEFAULT_LANGUAGE;
  };

  setDefaultLanguage = async () => {
    const lang = localStorage.getItem('LANG');
    if (!lang) {
      localStorage.setItem('LANG', DEFAULT_LANGUAGE);
    }
  };

  getLang = async () => {
    this.lang = localStorage.getItem('LANG') || DEFAULT_LANGUAGE
    if (this.lang === 'en') {
      moment.locale('en');
    }
  };

  changeLang = async lang => {
    moment.locale(lang);
    localStorage.setItem('LANG', lang);
    this.lang = lang;
    i18n.changeLanguage(lang);
  };
}

export default new LangStore();

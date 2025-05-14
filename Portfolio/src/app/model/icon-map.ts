// icon-map.ts
// Tento soubor vytvoří mapování mezi řetězcovými názvy ikon a skutečnými objekty FontAwesome
import {
  faCode, faDatabase, faFileCode
} from '@fortawesome/free-solid-svg-icons';

import {
  faJava, faPython, faJs,
  faPhp, faAngular, faNodeJs, faHtml5, faDocker,
  faGit, faJira, faLinux, faMicrosoft
} from '@fortawesome/free-brands-svg-icons';

// Definujeme rozhraní pro mapu ikon
export interface IconMap {
  [key: string]: any;
}

// Exportujeme mapu, kterou můžeme použít pro převod z řetězce na ikonu
export const iconMap: IconMap = {
  faCode,
  faDatabase,
  faJava,
  faPython,
  faJs,
  faPhp,
  faAngular,
  faNodeJs,
  faHtml5,
  faDocker,
  faGit,
  faJira,
  faFileCode,
  faLinux,
  faMicrosoft
};

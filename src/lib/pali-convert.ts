// CONSTANT

import { A, F, flow } from '@mobily/ts-belt';
import { match } from 'ts-pattern';

const charDict = (() => {
  const d = (kind: 'consonant' | 'vowel', thai: string, _pali: string, roman: string) => ({
    kind,
    roman,
    thai
  });
  return [
    d('consonant', 'ก', 'g', 'k'),
    d('consonant', 'ข', 'kh', 'kh'),
    d('consonant', 'ค', 'kh', 'g'),
    d('consonant', 'ฆ', 'kh', 'gh'),
    d('consonant', 'ง', 'ng', 'ng'),
    d('consonant', 'จ', 'j', 'c'),
    d('consonant', 'ฉ', 'ch', 'ch'),
    d('consonant', 'ช', 'ch', 'j'),
    d('consonant', 'ฌ', 'ch', 'jh'),
    d('consonant', 'ญ', 'y', 'ñ'),
    // d('consonant', 'ฎ', 'd', 'ṭ'),
    d('consonant', 'ฏ', 'dt', 'ṭ'),
    d('consonant', 'ฐ', 'th', 'ṭh'),
    d('consonant', 'ฑ', 'th', 'ḍ'),
    d('consonant', 'ฒ', 'th', 'ḍh'),
    d('consonant', 'ณ', 'n', 'ṇ'),
    // d('consonant', 'ด', 'd', 't'),
    d('consonant', 'ต', 'dt', 't'),
    d('consonant', 'ถ', 'th', 'th'),
    d('consonant', 'ท', 'th', 'd'),
    d('consonant', 'ธ', 'th', 'dh'),
    d('consonant', 'น', 'n', 'n'),
    d('consonant', 'ป', 'bp', 'p'),
    d('consonant', 'ผ', 'ph', 'ph'),
    d('consonant', 'พ', 'ph', 'b'),
    d('consonant', 'ภ', 'ph', 'bh'),
    d('consonant', 'ม', 'm', 'm'),
    d('consonant', 'ย', 'y', 'y'),
    d('consonant', 'ร', 'r', 'r'),
    d('consonant', 'ล', 'l', 'l'),
    d('consonant', 'ว', 'w', 'v'),
    d('consonant', 'ส', 's', 's'),
    d('consonant', 'ห', 'h', 'h'),
    d('consonant', 'ฬ', 'l', 'ḷ'),
    d('consonant', 'อ', '', ''),
    // d('consonant', 'อํ', 'ṃ', 'ṃ'),
    d('vowel', 'ะ', 'a', 'a'),
    d('vowel', 'า', 'ā', 'ā'),
    d('vowel', 'อิ', 'i', 'i'),
    d('vowel', 'อี', 'ī', 'ī'),
    d('vowel', 'อุ', 'u', 'u'),
    d('vowel', 'อู', 'ū', 'ū'),
    d('vowel', 'เ', 'e', 'e'),
    d('vowel', 'โ', 'o', 'o'),
    d('vowel', 'อํ', 'ṃ', 'ṃ'),
    d('vowel', 'อิํ', 'iṃ', 'iṃ'),
    d('vowel', 'อุํ', 'uṃ', 'uṃ')
  ].sort((l, r) => l.roman.length - r.roman.length);
})();
const ro2th = (ro: string) => charDict.find((i) => i.roman === ro)?.thai;

// Poli lang is [+(ะาอิอีอุอูอํอิํอุํเโ)(consonant)(endconsonant)?]

// ENCODE [??? to Poli]

export function paliToPoli(pali: string) {
  const out = pali.replace(
    /([เโ])?([ก-ฮ])(ํ|ิํ|ุํ|[ะิุาีู])?([ก-ฮ]ฺ)?/g,
    (m, vow1 = '', cons, vow2: string = '', endcons) => {
      const vow =
        vow1 ||
        match(vow2)
          .with('', () => 'ะ')
          .with('ะ', 'า', F.identity)
          .otherwise((v) => 'อ' + v);
      const w = `+${vow}${cons}${(endcons || '').replace('ฺ', '')}`;
      return w;
    }
  );
  return out;
}
//
// https://github.com/siongui/pali-transliteration?tab=readme-ov-file
// https://media.voog.com/0000/0037/7838/files/Pali-English%20Dictionary%20Free.pdf

function romanToPoli(roman: string): string {
  return roman
    .replace(/(iṃ|uṃ|ṃ|[aāiīuūeo])/g, '<$1>')
    .replace(/(|[kgncjṭḍtdpb]h?|[ñṇmyrlvshḷ])<(iṃ|uṃ|ṃ|[aāiīuūeo])>/g, (m, cons, vow) => {
      if (!ro2th(cons)) {
        console.log('NOT FONUND ro2th', cons, m);
      }
      return `+${ro2th(vow)}${ro2th(cons)}`;
    })
    .replace(/([kgncjṭḍtdpb]h?|[ñṇmyrlvshḷ])/g, (m, cons) => {
      return ro2th(cons)!;
    });
}

function thaiToPoli(thai: string): string {
  const out = thai
    .replaceAll(/(?!\+)([ก-ฮ])([ัิุ])ง(?![ก-ฮะ-โ])/g, '+%$2ํ$1')
    .replaceAll(/(?!\+)([ก-ฮ])([ะา])/g, '+$2$1')
    .replaceAll(/(?!\+)([ก-ฮ])([ุูิี])/g, '+%$2$1')
    .replaceAll(/([ก-ฮ])ั([ก-ฮ])/g, '+ะ$1$2')
    .replaceAll(/(?=\+)([ิีุู])/g, '%$1')
    .replaceAll(/%ัํ/g, '%ํ')
    .replaceAll('%', 'อ')

    .replaceAll(/([เโ])(.)/g, '+$1$2');

  return out;
}

// DECODE [Poli to ???]

export function poliToThai(poli: string): string {
  const res = poli.replaceAll(
    /\+(ะ|า|อิ|อี|อุ|อู|อํ|อิํ|อุํ|เ|โ)([ก-ฮ])([ก-ฮ])?/g,
    (m, vow, cons, endcons = '') => {
      const [v1, v2] = 'เโ'.includes(vow)
        ? [vow, '']
        : [
            '',
            vow
              .replace('อํ', 'ัง')
              .replace('อิํ', 'ิง')
              .replace('อุํ', 'ุํ')
              .replaceAll('ํ', 'ง')
              .replaceAll('อ', '')
              .replaceAll('ะ', endcons ? 'ั' : 'ะ')
          ];

      const out = [v1, cons, v2, endcons].join('');
      return out;
    }
  );
  return res;
}

export function poliToRoman(poli: string): string {
  return poli.replace(
    /\+(ะ|า|อิ|อี|อุ|อู|อํ|อิํ|อุํ|เ|โ)([ก-ฮ])([ก-ฮ])?/g,
    (m, vow, cons, endcons = '') => {
      const out = [
        charDict.find((i) => i.kind === 'consonant' && i.thai === cons)?.roman,
        charDict.find((i) => i.kind === 'vowel' && i.thai.includes(vow))?.roman,
        charDict.find((i) => i.kind === 'consonant' && i.thai === endcons)?.roman
      ].join('');
      return out;
    }
  );
}

function poliToPali(poli: string): string {
  const out = poli.replace(
    /\+(ะ|า|อิ|อี|อุ|อู|อํ|อิํ|อุํ|เ|โ)([ก-ฮ])([ก-ฮ])?/g,
    (m, vow: string, cons, endcons = '') => {
      if (vow == 'เ' || vow == 'โ') {
        return `${vow}${cons}${endcons ? endcons + 'ฺ' : ''}`;
      } else {
        return `${cons}${vow == 'ะ' ? '' : vow.replace('อ', '')}${endcons ? endcons + 'ฺ' : ''}`;
      }
    }
  );
  return out;
}

// Helper use Poli as middleman
export const paliToThai = flow(paliToPoli, poliToThai);
export const paliToRoman = flow(paliToPoli, poliToRoman);
export const thaiToPali = flow(thaiToPoli, poliToPali);
export const thaiToRoman = flow(thaiToPoli, poliToRoman);
export const romanToPali = flow(romanToPoli, poliToPali);
export const romanToThai = flow(romanToPoli, poliToThai);

// Another

export const thaiWithDash = (thai: string) => {
  return thai.replace(/([เโ][ก-ฮ]|[ก-ฮ][ะิุาิูั])/g, '-$1').replace(/(\s|^)-/g, '$1');
};

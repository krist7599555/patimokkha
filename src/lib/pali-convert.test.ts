import { expect, test } from 'bun:test';

import {
  paliToRoman,
  paliToThai,
  romanToPali,
  romanToThai,
  thaiToPali,
  thaiToRoman
} from './pali-convert';

function cyclePaliOnlyTest(pali: string) {
  expect(romanToPali(paliToRoman(pali))).toBe(pali);
  expect(thaiToPali(paliToThai(pali))).toBe(pali);
  expect(romanToPali(thaiToRoman(paliToThai(pali)))).toBe(pali);
  expect(thaiToPali(romanToThai(paliToRoman(pali)))).toBe(pali);
}

function test3lang(data: { pali?: string; roman?: string; thai?: string }) {
  if (data.pali && data.thai) expect(paliToThai(data.pali)).toBe(data.thai);
  if (data.thai && data.pali) expect(thaiToPali(data.thai)).toBe(data.pali);
  if (data.pali && data.roman) expect(paliToRoman(data.pali)).toBe(data.roman);
  if (data.roman && data.pali) expect(romanToPali(data.roman)).toBe(data.pali);
  if (data.thai && data.roman) expect(thaiToRoman(data.thai)).toBe(data.roman);
  if (data.roman && data.thai) expect(romanToThai(data.roman)).toBe(data.thai);
}

test('pali to thai normal case', () => {
  expect(paliToThai('นตฺถิ เม, สรณํ; อญฺญํ.')).toBe('นัตถิ เม, สะระณัง; อัญญัง.');
  expect(paliToThai('กิํ')).toBe('กิง');
  expect(paliToThai('ภูริกิจฺโจ')).toBe('ภูริกิจโจ');
  expect(paliToThai('ภูริกิจฺจ')).toBe('ภูริกิจจะ');
  expect(paliToThai('กญฺญา')).toBe('กัญญา');
  expect(paliToThai('เจว')).toBe('เจวะ');
  expect(paliToThai('เจวฺ')).toBe('เจว');
  expect(paliToThai('พุธฺโธ')).toBe('พุธโธ');
  expect(paliToThai('ยถาคตา')).toBe('ยะถาคะตา');
  expect(paliToThai('ยถาชฺช')).toBe('ยะถาชชะ');
  expect(paliToThai('อนุโมทนา')).toBe('อะนุโมทะนา');
});

test('thai to pali', () => {
  expect(thaiToPali('นัตถิ เม, สะระณัง; อัญญัง.')).toBe('นตฺถิ เม, สรณํ; อญฺญํ.');
  expect(thaiToPali('กิง')).toBe('กิํ');
  expect(thaiToPali('สังฆัง')).toBe('สงฺฆํ');
  expect(thaiToPali('ภูริกิจโจ')).toBe('ภูริกิจฺโจ');
  expect(thaiToPali('ภูริกิจจะ')).toBe('ภูริกิจฺจ');
  expect(thaiToPali('กัญญา')).toBe('กญฺญา');
  expect(thaiToPali('เจวะ')).toBe('เจว');
  expect(thaiToPali('เจว')).toBe('เจวฺ');
  expect(thaiToPali('พุธโธ')).toBe('พุธฺโธ');
  expect(thaiToPali('ยะถาคะตา')).toBe('ยถาคตา');
  expect(thaiToPali('ยะถาชชะ')).toBe('ยถาชฺช');
  expect(thaiToPali('อะนุโมทะนา')).toBe('อนุโมทนา');
});

test('pali test cycle roman thai', () => {
  cyclePaliOnlyTest('นตฺถิ เม, สรณํ; อญฺญํ.');
  cyclePaliOnlyTest('กิํ');
  cyclePaliOnlyTest('ภูริกิจฺโจ');
  cyclePaliOnlyTest('ภูริกิจฺจ');
  cyclePaliOnlyTest('กญฺญา');
  cyclePaliOnlyTest('เจว');
  cyclePaliOnlyTest('เจวฺ');
  cyclePaliOnlyTest('พุธฺโธ');
  cyclePaliOnlyTest('ยถาคตา');
  cyclePaliOnlyTest('ยถาชฺช');
  cyclePaliOnlyTest('อนุโมทนา');
});
test('bhikku', () => {
  test3lang({ pali: 'ภิกฺขูนํ', roman: 'bhikkhūnṃ', thai: 'ภิกขูนัง' });
});

test('pali to roman คิมฺโหตุ', () => {
  test3lang({ pali: 'อวสิฏฺฐนฺติ', roman: 'avasiṭṭhanti', thai: 'อะวะสิฏฐันติ' });
  test3lang({ pali: 'คิมฺโหตุ', roman: 'gimhotu' });
  test3lang({ pali: 'เหมนฺตคิมฺหวสฺสานานํ', roman: 'hemantagimhavassānānṃ' });
});

test('long sentense', () => {
  test3lang({
    pali: '๏ อุตุกฺขานํ นาม เอตฺตกํ อติกฺกนฺตํ, เอตฺตกํ อวสิฏฺฐนฺติ เอวํ อุตุอาจิกฺขนํ; อุตูนีธ ปน สาสเน เหมนฺตคิมฺหวสฺสานานํ วเสน ตีณิ โหนฺติ. อยํ (เหมนฺโตตุ|คิมฺโหตุ|วสฺสาโนตุ),',
    roman:
      '๏ utukkhānṃ nāma ettakṃ atikkantṃ, ettakṃ avasiṭṭhanti evṃ utuācikkhanṃ; utūnīdha pana sāsane hemantagimhavassānānṃ vasena tīṇi honti. ayṃ (hemantotu|gimhotu|vassānotu),',
    thai: '๏ อุตุกขานัง นามะ เอตตะกัง อะติกกันตัง, เอตตะกัง อะวะสิฏฐันติ เอวัง อุตุอาจิกขะนัง; อุตูนีธะ ปะนะ สาสะเน เหมันตะคิมหะวัสสานานัง วะเสนะ ตีณิ โหนติ. อะยัง (เหมันโตตุ|คิมโหตุ|วัสสาโนตุ),'
  });
  test3lang({
    pali: '๏ เหมนฺตคิมฺหวสฺสานานํ (เหมนฺโตตุ|คิมฺโหตุ|วสฺสาโนตุ),',
    roman: '๏ hemantagimhavassānānṃ (hemantotu|gimhotu|vassānotu),',
    thai: '๏ เหมันตะคิมหะวัสสานานัง (เหมันโตตุ|คิมโหตุ|วัสสาโนตุ),'
  });
});

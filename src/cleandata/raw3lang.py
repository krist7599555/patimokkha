import re
import sys
from pprint import pprint
from collections import defaultdict
from typing import List, Union
from itertools import groupby

f = list(open('./raw3lang.txt'))
f = f[365:-100]

out = []

toc: List[tuple[str, str, str, str]] = [
  ["pi", "01intro", "ภิกฺขุปาฏิโมกฺขปาลิ", 9],
  ["pi", "02bbkjn", "ปุพฺพกิจฺจานิ", 10],
  ["pi", "03nidan", "ภิกฺขุปาฏิโมกฺขปาลิ", 13],
  ["pi", "04parjk", "ปาราชิกุทฺเทโส", 14],
  ["pi", "05snkts", "สงฺฆาทิเสสุทฺเทโส", 15],
  ["pi", "06aniya", "อนิยตุทฺเทโส", 21],
  ["pi", "07nisak", "นิสฺสคฺคิยา ปาจิตฺติยา", 22],
  ["pi", "08pajit", "ปาจิตฺติยา", 30],
  ["pi", "09patit", "ปาฏิเทสนียา", 45],
  ["pi", "10sekiy", "เสขิยา", 47],
  ["pi", "11satta", "สตฺตาธิกรณสมถา", 53],
  ["pi", "12sajha", "สจฺจกิริยาคาถา", 55],
  ["pi", "13selau", "สีลุทฺเทสปาโฐ", 55],
  ["th", "14tayak", "ตายนคาถา", 56],
  ["th", "01intro", "พระภิกขุปาฏิโมกข์", 58],
  ["th", "02bbkjn", "บุพพกรณ์และบุพพกิจ", 59],
  ["th", "03start", "พระภิกขุปาฏิโมกข์", 62],
  ["th", "04parjk", "ปาราชิก ๔", 63],
  ["th", "05snkts", "สังฆาทิเสส ๑๓", 65],
  ["th", "06aniya", "อนิยต ๒", 71],
  ["th", "07nisak", "นิสสัคคียปาจิตตีย์ ๓๐", 73],
  ["th", "08pajit", "ปาจิตตีย์ ๙๒", 81],
  ["th", "09patit", "ปาฏิเทสนีย์ ๔", 97],
  ["th", "10sekiy", "เสขิยวัตร ๗๕", 99],
  ["th", "11satta", "อธิกรณสมถะ ๗", 107],
  ["th", "12sajha", "สัจจะกิริยาคาถา", 108],
  ["th", "13selau", "สีลุทเทสปาฐะ", 109],
  ["th", "14tayak", "ตายนกถา", 110],
  ["ro", "01intro", "BHIKKHUPĀṬIMOKKHA PĀLI", 112],
  ["ro", "02bbkjn", "PUBBAKICCAṀ", 120],
  ["ro", "03start", "BHIKKHUPĀṬIMOKKHAṀ", 123],
  ["ro", "04parjk", "PĀRĀJIKĀ", 124],
  ["ro", "05snkts", "SAṄGHĀDISESĀ", 125],
  ["ro", "06aniya", "ANIYATĀ", 132],
  ["ro", "07nisak", "NISSAGGIYĀ PĀCITTIYĀ", 133],
  ["ro", "08pajit", "PĀCITTIYĀ", 142],
  ["ro", "09patit", "PĀṬIDESANIYĀ", 157],
  ["ro", "10sekiy", "SEKHIYĀ", 159],
  ["ro", "11satta", "SATTĀDHIKARAṆASAMATHĀ", 167],
  ["ro", "12sajha", "SACCAKIRIYA GĀTHĀ", 169],
  ["ro", "13selau", "SĪLUDDESAPĀṬHO", 170],
  ["ro", "14tayak", "TĀYANAGĀTHĀ", 171],
]
def findHeaderFromPage(page: int):
  for t in reversed(toc):
    if page >= t[3]:
      return t
  return None


prevhh: Union[int, None] = None
global h2
hp: int = 0
curr_bullet: int = 0
ddic = defaultdict[List[str], str](list) # ["h1-h2-(th|pi|ro)"] = ""
ddich = defaultdict[List, str](list) # ["h1-h2-(th|pi|ro)"] = ""
d3 = defaultdict[tuple[str, str], list[tuple[str, str]]](list) # ["h1-h2-(th|pi|ro)"] = ""

curr_head = toc[0]
curr_page = 9
for line in f:
  line = line.strip()
  m = re.match(r'^([0-9]+)$', line)
  if m:
    curr_page = int(m.group(1)) + 1
    continue
  if line == "ภิกฺขุปาฏิโมกฺขปาลิ": continue
  if line == "BHIKKHUPĀṬIMOKKHA PĀLI": continue
  if line == "ภิกฺขุปาฏิโมกฺขปาลิ": continue
  line = line.translate(str.maketrans(dict(zip('๐๑๒๓๔๕๖๗๘๙', '0123456789'))))
  m = re.match(r'^(([0-9]+)\. )', line)
  if m:
    num = int(m.group(2))
    if num == 1:
      curr_head = findHeaderFromPage(curr_page)
      hp += 1
    curr_bullet = num
    line = line.replace(m.group(1), '')

  key = f"{curr_head[1]}-{curr_bullet:02d}-{curr_head[0]}-{hp:03d}"
  ddic[key].append(line)
  ddich[key] = curr_head
  d3[(curr_head[1], curr_bullet)].append((curr_head[0], line))
  

fdest = open('./raw3lang.tsv', 'w')
for key, val in sorted(ddic.items()):
  print(key, *ddich[key], ' '.join(val), sep='\t', file=fdest)
fdest.close()

fdest = open('./raw3lang2.tsv', 'w')
for key, lines in sorted(d3.items()):
  bylang = { k: list(v) for k, v in groupby(lines, key=lambda x: x[0]) }
  langs = { lang: ' '.join([l[1] for l in bylang.get(lang, [])]) for lang in ["pi", "th", "ro"] }
  tt = next((x[2] for x in toc[14:] if x[1] == key[0] ), '')
  print(key[0], key[1], tt, langs['pi'], langs['th'], langs['ro'], sep='\t', file=fdest)
fdest.close()
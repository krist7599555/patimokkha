import { A, D, F, G, O, pipe, S } from '@mobily/ts-belt';
import { match, P } from 'ts-pattern';

import { default as patimokeRawJson } from './patimokkha.json';

export class PaliNode {
  private parent: PaliNode | undefined = undefined;
  children: PaliNode[] = [];
  description = '';
  kind = <'paragraph' | 'section' | 'verse' | 'word'>'section';
  name = '';
  pali = '';
  thai = '';
  constructor(data: Partial<PaliNode>) {
    Object.assign(this, data);
  }
  addChild(node: PaliNode): PaliNode {
    node.parent = this;
    this.children.push(node);
    return node;
  }
  computeTokens() {
    return tokenizePaliText(this.pali);
  }
  findChildrenByName(name: string): O.Option<PaliNode> {
    return A.find(this.children, (c) => c.name === name);
  }
  findOrCreateSectionByName(name: string): PaliNode {
    return pipe(
      this.findChildrenByName(name),
      O.match(
        (ch) => ch,
        () => this.addChild(new PaliNode({ kind: 'section', name: name }))
      )
    );
  }
  get firstChild() {
    return pipe(this.children, A.get(0), O.toUndefined);
  }
  get lastChild() {
    return pipe(this.children, A.last, O.toUndefined);
  }
  get nextSibling() {
    return pipe(
      O.fromNullable(this.parent),
      O.mapNullable((it): PaliNode | undefined => {
        const idx = it.children.findIndex((i) => i === this);
        return idx + 1 < it.children.length ? it.children[idx + 1] : undefined;
      }),
      O.toUndefined
    );
  }
  get parentNode() {
    return this.parent;
  }
  get prevSibling() {
    return pipe(
      O.fromNullable(this.parent),
      O.mapNullable((it): PaliNode | undefined => {
        const idx = it.children.findIndex((i) => i === this);
        return idx > 0 ? it.children[idx - 1] : undefined;
      }),
      O.toUndefined
    );
  }
  get translate() {
    return {
      english:
        'https://palistudies.blogspot.com/2019/08/velthuis-to-diacritics-converter-pali.html',
      glosbe: `https://glosbe.com/pi/th/${encodeURIComponent(this.pali)}`,
      lao: 'https://skyknowledge.com/thai-pali.htm',
      learnPaliEnglish:
        'https://palistudies.blogspot.com/2018/05/pali-alphabet-using-ped-dictionary.html'
    };
  }
}

const cratePaliSymbol = (name: string, token: string) =>
  new PaliNode({
    children: [],
    description: name,
    kind: 'word',
    name,
    pali: token,
    thai: token
  });

const PaliSymbol = {
  apostrophe: cratePaliSymbol('apostrophe', "'"),
  colon: cratePaliSymbol('colon', ':'),
  comma: cratePaliSymbol('comma', ','),
  dash: cratePaliSymbol('dash', '-'),
  fullstop: cratePaliSymbol('fullstop', '.'),
  indent: cratePaliSymbol('indent', '_'),
  questionmark: cratePaliSymbol('questionmark', '?'),
  semicolon: cratePaliSymbol('semicolon', ';'),
  space: cratePaliSymbol('space', ' ')
} satisfies Record<string, PaliNode>;

export function createPatimokeAST(): PaliNode {
  // https://dev.to/balapriya/abstract-syntax-tree-ast-explained-in-plain-english-1h38
  const root = new PaliNode({
    children: [],
    description: '',
    kind: 'section',
    name: 'ปาฏิโมกข์'
  });

  for (const c of patimokeRawJson) {
    let it = root;
    for (const nest of c.breadcrumb.split(' / ')) {
      it = it.findOrCreateSectionByName(nest);
    }
    const pali = c.pali.replaceAll('_', '').trim();
    it.addChild(
      new PaliNode({
        children: pipe(
          [...'อฺญตรํ ทุพฺพณฺณกรณํ นวํ จีวรํ ปริภฺุเชยฺย, ปาจิตติยํ.'.matchAll(/( |,|\.|[ก-๛]+)/g)],
          A.map((it) => {
            const token = it[0];
            const out = pipe(
              D.values(PaliSymbol),
              A.find((sym) => sym.pali === token),
              O.match(F.identity, (): PaliNode => {
                return new PaliNode({
                  children: [],
                  description: '',
                  kind: 'word',
                  pali: token,
                  thai: ''
                });
              })
            );
            return out;
          })
        ),
        description: c.breadcrumb,
        kind: 'verse',
        pali: pali,
        thai: c.thai
      })
    );
  }

  return root;
}

export const tokenizePaliText = (paliText: string) =>
  pipe(
    paliText,
    S.trim,
    (str) => str.matchAll(/((?<bullet>[๐๑-๙]+\.)|(?<symbol>[ "';:-_,.])|(?<word>[ก-๛]+))/g),
    (iter) => [...iter],
    A.map((it) =>
      match(it.groups)
        .with({ bullet: P.select(P.string) }, (w) => ({ kind: 'bullet' as const, pali: w }))
        .with({ word: P.select(P.string) }, (w) => ({ kind: 'word' as const, pali: w }))
        .with({ symbol: P.select(P.string) }, (w) => ({ kind: 'symbol' as const, pali: w }))
        .otherwise(() => undefined)
    ),
    A.filter(G.isObject)
  );

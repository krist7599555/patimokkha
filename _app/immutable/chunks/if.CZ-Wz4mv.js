import{_ as P,$ as K,a0 as L,P as y,a1 as j,o as c,a2 as R,a3 as u,g as m,K as k,a4 as q,a5 as B,z as C,q as H,E as A,F as D,G as O,v as T,y as M,a6 as Y,H as z,B as G,w as U,C as S,D as Z}from"./runtime.FEzMjJc8.js";function g(i,b=null,x){if(typeof i!="object"||i===null||P in i)return i;const o=B(i);if(o!==K&&o!==L)return i;var f=new Map,d=C(i),v=y(0);d&&f.set("length",y(i.length));var l;return new Proxy(i,{defineProperty(n,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&j();var r=f.get(e);return r===void 0?(r=y(t.value),f.set(e,r)):c(r,g(t.value,l)),!0},deleteProperty(n,e){var t=f.get(e);if(t===void 0)e in n&&f.set(e,y(u));else{if(d&&typeof e=="string"){var r=f.get("length"),a=Number(e);Number.isInteger(a)&&a<r.v&&c(r,a)}c(t,u),F(v)}return!0},get(n,e,t){var _;if(e===P)return i;var r=f.get(e),a=e in n;if(r===void 0&&(!a||(_=R(n,e))!=null&&_.writable)&&(r=y(g(a?n[e]:u,l)),f.set(e,r)),r!==void 0){var s=m(r);return s===u?void 0:s}return Reflect.get(n,e,t)},getOwnPropertyDescriptor(n,e){var t=Reflect.getOwnPropertyDescriptor(n,e);if(t&&"value"in t){var r=f.get(e);r&&(t.value=m(r))}else if(t===void 0){var a=f.get(e),s=a==null?void 0:a.v;if(a!==void 0&&s!==u)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return t},has(n,e){var s;if(e===P)return!0;var t=f.get(e),r=t!==void 0&&t.v!==u||Reflect.has(n,e);if(t!==void 0||k!==null&&(!r||(s=R(n,e))!=null&&s.writable)){t===void 0&&(t=y(r?g(n[e],l):u),f.set(e,t));var a=m(t);if(a===u)return!1}return r},set(n,e,t,r){var I;var a=f.get(e),s=e in n;if(d&&e==="length")for(var _=t;_<a.v;_+=1){var h=f.get(_+"");h!==void 0?c(h,u):_ in n&&(h=y(u),f.set(_+"",h))}a===void 0?(!s||(I=R(n,e))!=null&&I.writable)&&(a=y(void 0),c(a,g(t,l)),f.set(e,a)):(s=a.v!==u,c(a,g(t,l)));var w=Reflect.getOwnPropertyDescriptor(n,e);if(w!=null&&w.set&&w.set.call(r,t),!s){if(d&&typeof e=="string"){var E=f.get("length"),N=Number(e);Number.isInteger(N)&&N>=E.v&&c(E,N+1)}F(v)}return!0},ownKeys(n){m(v);var e=Reflect.ownKeys(n).filter(a=>{var s=f.get(a);return s===void 0||s.v!==u});for(var[t,r]of f)r.v!==u&&!(t in n)&&e.push(t);return e},setPrototypeOf(){q()}})}function F(i,b=1){c(i,i.v+b)}function J(i,b,x,o=null,f=!1){T&&M();var d=i,v=null,l=null,n=null,e=f?Y:0;H(()=>{if(n===(n=!!b()))return;let t=!1;if(T){const r=d.data===z;n===r&&(d=G(),U(d),S(!1),t=!0)}n?(v?A(v):v=D(()=>x(d)),l&&O(l,()=>{l=null})):(l?A(l):o&&(l=D(()=>o(d))),v&&O(v,()=>{v=null})),t&&S(!0)},e),T&&(d=Z)}export{J as i,g as p};

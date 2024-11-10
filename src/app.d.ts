// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare global {
  namespace Belt {
    type UseMutableArrays = 1;
  }
}
declare module '*.csv' {
  export default Array<{ [key: string]: string }>;
}

export {};

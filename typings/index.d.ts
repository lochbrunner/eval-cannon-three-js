/// <reference path="./three-gltf-loader.d.ts" />
/// <reference path="./three-trackballcontrols.d.ts" />
/// <reference path="./three-to-cannon.d.ts" />


declare function require(name: string): any;

declare module '*.bin' {
  const content: any;
  export default content;
}


declare module '*.gltf' {
  const content: any;
  export default content;
}


declare module '*.scss' {
  const content: any;
  export default content;
}

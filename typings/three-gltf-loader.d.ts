
declare module 'three-gltf-loader' {
  class GLTFLoader {
    load(
        filename: string,
        onLoad: (gltf: {
          scene: THREE.Mesh,
          traverse: (callback: (node: THREE.Mesh) => void) => void
        }) => void,
        onProgress: (xhr: any) => void, onError: (error: any) => void): void;

    parse(data: any, path: any, onLoad: any, onError: (error: any) => void):
        void;

    setCrossOrigin(value: any): any;

    setDRACOLoader(dracoLoader: any): any;

    setPath(value: any): any;
  }
  export default GLTFLoader;
}
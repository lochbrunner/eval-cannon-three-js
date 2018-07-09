
declare module 'three-gltf-loader' {
  class GLTFLoader {
    load(
        filename: string,
        onLoad: (gltf: {
          scene: THREE.Mesh,
          traverse: (callback: (node: THREE.Mesh) => void) => void
        }) => void,
        progress: (xhr: any) => void, onError: (error: any) => void): void;
  }
  export default GLTFLoader;
}
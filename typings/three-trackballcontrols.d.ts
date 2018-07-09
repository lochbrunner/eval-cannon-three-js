declare module 'three-trackballcontrols' {
  class TrackballControls extends EventTarget {
    constructor(camera: THREE.Camera, dom: HTMLElement);
    update(): void;
  }

  export default TrackballControls;
}
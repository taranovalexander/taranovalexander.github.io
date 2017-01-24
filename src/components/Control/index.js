require('../../plugins/orbit-controls/orbit-controls');
import Camera from '../Camera';
import Renderer from '../Renderer';

const controlOpt = {
  target: {
    x: 0,
    y: 0,
    z: 0,
  }
};

const Control = new THREE.OrbitControls(Camera, Renderer.domElement);
Control.target.set(
    controlOpt.target.x,
    controlOpt.target.y,
    controlOpt.target.z
);

export default Control;

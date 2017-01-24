//if (module.hot) { module.hot.accept() }
const TWEEN = require('./plugins/Tween.js');

import { CLEAR_COLOR, SPLINE_SCALE } from './constants';
import Camera from './components/Camera';
import Ground from './components/Ground';
import Bear from './components/Bear';
import Lights from './components/Lights';
import Renderer from './components/Renderer';
//  import Control from './components/Control';
import Snow from './components/Snow';
import Spline from './components/Spline';
import InitPostprocessing from './components/Postprocessing';


let Postprocessing = InitPostprocessing();
let container;
let scene;
let material_depth;

const init = (target) => {
  container = target;
  scene = new THREE.Scene();
  material_depth = new THREE.MeshDepthMaterial();
  scene.fog = new THREE.Fog(CLEAR_COLOR, 0, 300);
  Bear.then((mesh) => {
    scene.add(Camera);
    scene.add(Ground);
    scene.add(mesh);
    Lights.forEach((light) => {
      scene.add(light);
    });
    Snow.forEach(item => scene.add(item));
  });
  container.appendChild(Renderer.domElement);
  Camera.position.copy(Spline.cameraCurve.parameters.path.getPointAt(0));

  //const tube = new THREE.TubeGeometry(Spline.path, 50, 2, 3, false);
  //const tubeMesh = new THREE.Mesh(tube, new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false }));
  //tubeMesh.scale.set(0.5, 0.5, 0.5)
  //scene.add(tubeMesh);
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

const render = () => {
  Snow.forEach((item, i) => {
    item.position.x -= i % 2 === 0 ? (i + 1) / 2 : -(i + 1) / 2;
    item.position.y -= 1 + i * Math.random();
    if (item.position.y <= -1000) {
      item.position.y = 0;
    }
    if (item.position.x <= -1000 || item.position.x >= 1000) {
      item.position.x = 0;
    }
  });
  TWEEN.update();
  Camera.lookAt(new THREE.Vector3(0, 0, 0));
  Renderer.clear();
  scene.overrideMaterial = null;
  Renderer.render(scene, Camera)
  Renderer.render(scene, Camera, Postprocessing.rtTextureColor, true);
  scene.overrideMaterial = material_depth;
  Renderer.render(scene, Camera, Postprocessing.rtTextureDepth, true);
  Renderer.render(Postprocessing.scene, Postprocessing.camera);
};

const moveCamera = (dest, speed, xCameraOffset, yCameraOffset) => {
  const animationSpeed = (Math.abs(dest - Spline.currentPos) / speed) * 1000;

  TWEEN.removeAll();
  _setView(xCameraOffset, yCameraOffset, animationSpeed);
  _serCameraPosition(dest, animationSpeed);
}

function _setView(xCameraOffset, yCameraOffset, animationSpeed) {
  let needUpdate = false;
  const cameraView = { ...Camera.view};
  const newCameraView = {
    width: window.innerWidth,
    height: window.innerHeight,
    fullWidth: xCameraOffset && _isNumeric(xCameraOffset) ? window.innerWidth * Math.abs(xCameraOffset) : window.innerWidth,
    fullHeight: yCameraOffset && _isNumeric(yCameraOffset) ? window.innerHeight * Math.abs(yCameraOffset) : window.innerHeight,
    offsetX: xCameraOffset && _isNumeric(xCameraOffset) ? window.innerWidth * ( Math.abs(xCameraOffset) - 1 ) : 0,
    offsetY: yCameraOffset && _isNumeric(yCameraOffset) ? window.innerHeight * ( Math.abs(xCameraOffset) - 1 ) : 0,
  }

  if (xCameraOffset < 0) { newCameraView.offsetX = -newCameraView.offsetX }
  if (yCameraOffset < 0) { newCameraView.offsetY = -newCameraView.offsetY }

  Object.keys(cameraView).forEach(key => {
    if (cameraView[key] !== newCameraView[key]) {
      needUpdate = true;
    }
  })

  if (needUpdate) {
    new TWEEN.Tween(cameraView)
      .to({ ...newCameraView }, animationSpeed)
      .start()
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function () {
        Camera.setViewOffset(
          this.fullWidth,
          this.fullHeight,
          this.offsetX,
          this.offsetY,
          this.width,
          this.height,
        );
      });
  }
}

function _serCameraPosition(dest, animationSpeed) {
  const from = { x: Spline.currentPos };
  const target = { x: dest };

  new TWEEN.Tween(from)
    .to({x: target.x}, animationSpeed)
    .start()
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function () {
      Camera.position.copy(Spline.cameraCurve.parameters.path.getPointAt(this.x).multiplyScalar( SPLINE_SCALE ));
      Spline.currentPos = this.x;
    });
}

function _isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

window.addEventListener('resize', () => {
  Camera.aspect = window.innerWidth / window.innerHeight;
  Camera.updateProjectionMatrix();
  Postprocessing = InitPostprocessing();
  Renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

export { init, animate, moveCamera };
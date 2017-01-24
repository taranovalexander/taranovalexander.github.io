const cameraOpt = {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 3000,
  position: {
    x: 80,
    y: 13,
    z: 40
  }
};

const Camera = new THREE.PerspectiveCamera(cameraOpt.fov, cameraOpt.aspect, cameraOpt.near, cameraOpt.far);
Camera.setViewOffset(
  window.innerWidth,
  window.innerHeight,
  0,
  0,
  window.innerWidth,
  window.innerHeight,
);
export default Camera;

import { CLEAR_COLOR } from '../../constants';

const rendererOpt = {
  antialias: false,
  alpha: true,
  clearColor: CLEAR_COLOR,
  gammaInput: true,
  gammaOutput: true,
};

const Renderer = new THREE.WebGLRenderer({ antialias: rendererOpt.antialias, alpha: rendererOpt.alpha });
Renderer.setClearColor(rendererOpt.clearColor);
Renderer.setPixelRatio(window.devicePixelRatio);
Renderer.setSize(window.innerWidth, window.innerHeight);
Renderer.gammaInput = rendererOpt.gammaInput;
Renderer.gammaOutput = rendererOpt.gammaOutput;
Renderer.shadowMap.enabled = true;
Renderer.shadowMap.type = THREE.PCFSoftShadowMap;
Renderer.sortObjects = false;
Renderer.autoClear = false;

export default Renderer;

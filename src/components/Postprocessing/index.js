import { DOF_SETTING } from '../../constants';
import Camera from '../Camera';
require('../../plugins/BokehShader2.js');

let Postprocessing = {};
const initPostprocessing = () => {
  const pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
  const bokeh_shader = THREE.BokehShader;

  Postprocessing.scene = new THREE.Scene();
  Postprocessing.camera = new THREE.OrthographicCamera(
      window.innerWidth / - 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / - 2,
      -1000,
      1000,
  );
  Postprocessing.camera.position.z = 100;
  Postprocessing.scene.add( Postprocessing.camera );
  Postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
  Postprocessing.rtTextureColor = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
  Postprocessing.bokeh_uniforms = THREE.UniformsUtils.clone( bokeh_shader.uniforms );
  Postprocessing.bokeh_uniforms['tColor'].value = Postprocessing.rtTextureColor.texture;
  Postprocessing.bokeh_uniforms['tDepth'].value = Postprocessing.rtTextureDepth.texture;
  Postprocessing.bokeh_uniforms['textureWidth'].value = window.innerWidth;
  Postprocessing.bokeh_uniforms['textureHeight'].value = window.innerHeight;
  Postprocessing.materialBokeh = new THREE.ShaderMaterial({
    uniforms: Postprocessing.bokeh_uniforms,
    vertexShader: bokeh_shader.vertexShader,
    fragmentShader: bokeh_shader.fragmentShader,
    defines: {
      RINGS: DOF_SETTING.rings,
      SAMPLES: DOF_SETTING.samples,
    },
  } );
  Postprocessing.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight ), Postprocessing.materialBokeh );
  Postprocessing.quad.position.z = - 500;
  Postprocessing.scene.add( Postprocessing.quad );
};

const matChanger = () => {
  for (var e in DOF_SETTING) {
    if (e in Postprocessing.bokeh_uniforms)
      Postprocessing.bokeh_uniforms[ e ].value = DOF_SETTING[ e ];
  }
  Postprocessing.enabled = DOF_SETTING.enabled;
  Postprocessing.bokeh_uniforms[ 'znear' ].value = Camera.near;
  Postprocessing.bokeh_uniforms[ 'zfar' ].value = Camera.far;
  Camera.setFocalLength(DOF_SETTING.focalLength);
};

function InitPostprocessing() {
  Postprocessing = {};
  initPostprocessing();
  matChanger();
  return Postprocessing;
}

export default InitPostprocessing;

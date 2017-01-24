import { FLOOR, CLEAR_COLOR } from '../../constants';

require('../../plugins/stl-loader/stl-loader');

const basePath = 'assets/models/bear/bear.stl';
const path = process.env.NODE_ENV === 'development' ? `src/${basePath}` : basePath;

const bearOpt = {
  path,
  scale: 0.5
};

const loader = new THREE.STLLoader();
const Bear = new Promise(function(resolve) {
  loader.load(bearOpt.path, function (geometry) {
    const material = new THREE.MeshPhongMaterial({
      metalness: 0.5,
      roughness: 2,
      color: 0xFFFFFF,
    });
    const mesh = new THREE.Mesh( geometry, material );

    mesh.rotation.set(-Math.PI / 2, 0, 0);
    mesh.castShadow = true;
    mesh.position.set(0, FLOOR, 0);
    mesh.scale.set(bearOpt.scale, bearOpt.scale, bearOpt.scale);
    resolve(mesh)
  });
});

export default Bear;

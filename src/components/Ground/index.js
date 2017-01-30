import { FLOOR } from '../../constants';
import normalTexture from './textures/normal.png';
import snowTexture from './textures/snow.jpg';

const textureLoader = new THREE.TextureLoader();
const texture_normal = textureLoader.load(normalTexture);
const texture_snow = textureLoader.load(snowTexture);

const makePlaneGeometry = function(width, height, widthSegments, heightSegments) {
  const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  const X_OFFSET_DAMPEN = 0.4;
  const Y_OFFSET_DAMPEN = 0.5;
  const Z_OFFSET_DAMPEN = 0.3;
  const randSign = function() { return (Math.random() > 0.5) ? 1 : -1; };

  for (let vertIndex = 0; vertIndex < geometry.vertices.length; vertIndex++) {
    geometry.vertices[vertIndex].x += Math.random() / X_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].y += Math.random() / Y_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].z += Math.random() / Z_OFFSET_DAMPEN * randSign();
  }

  geometry.dynamic = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.normalsNeedUpdate = true;
  return geometry;
};

const Ground = new THREE.Mesh(
  makePlaneGeometry(1000, 1000, 100, 100),
  new THREE.MeshPhongMaterial( {
  color: 0xffffff,
  metalness: 0,
  roughness: 10,
  shininess: 0,
  side: THREE.DoubleSide
  })
);

Ground.rotation.x = Math.PI / 2;
Ground.receiveShadow = true;
Ground.position.set(0, FLOOR, 0);

export default Ground;

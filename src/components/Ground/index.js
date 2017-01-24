import { FLOOR } from '../../constants';
import normalTexture from './textures/normal.png';
import snowTexture from './textures/snow.jpg';

const textureLoader = new THREE.TextureLoader();
const texture_normal = textureLoader.load(normalTexture);
const texture_snow = textureLoader.load(snowTexture);

texture_normal.wrapS = THREE.RepeatWrapping;
texture_normal.wrapT = THREE.RepeatWrapping;
texture_normal.repeat.set(1, 1);

texture_snow.wrapS = THREE.RepeatWrapping;
texture_snow.wrapT = THREE.RepeatWrapping;
texture_snow.repeat.set(25, 25);

const Ground = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 1, 2000),
      new THREE.MeshStandardMaterial( {
      color: 0xffffff,
      map: texture_snow,
      normalMap: texture_normal,
      normalScale: new THREE.Vector2(0.5, 0.5),
      metalness: 0,
      roughness: 10,
      shininess: 0,
      })
);

Ground.receiveShadow = true;
Ground.position.set(0, FLOOR, 0);

export default Ground;

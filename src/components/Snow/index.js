import { FLOOR, CLEAR_COLOR } from '../../constants';
import snowFlake1 from './textures/snowflake1.png';
import snowFlake2 from './textures/snowflake2.png';
import snowFlake3 from './textures/snowflake3.png';
import snowFlake4 from './textures/snowflake4.png';
import snowFlake5 from './textures/snowflake5.png';

const geometry = new THREE.Geometry();
const materials = [];
const Snow = [];
const textureLoader = new THREE.TextureLoader();
const texture_flake_1 = textureLoader.load(snowFlake1);
const texture_flake_2 = textureLoader.load(snowFlake2);
const texture_flake_3 = textureLoader.load(snowFlake3);
const texture_flake_4 = textureLoader.load(snowFlake4);
const texture_flake_5 = textureLoader.load(snowFlake5);

for (let i = 0; i < 5000; i++) {
  const vertex = new THREE.Vector3();
  vertex.x = Math.random() * 2000 - 1000;
  vertex.y = Math.random() * 2000 - 1000;
  vertex.z = Math.random() * 2000 - 1000;
  geometry.vertices.push(vertex);
}

const parameters = [
  [[1.0, 0.2, 0.5], texture_flake_2, 20],
  [[0.95, 0.1, 0.5], texture_flake_3, 15],
  [[0.90, 0.05, 0.5], texture_flake_1, 10],
  [[0.85, 0, 0.5], texture_flake_5, 8],
  [[0.80, 0, 0.5], texture_flake_4, 5],
];

for (let i = 0; i < parameters.length; i ++ ) {
  const color  = parameters[i][0];
  const sprite = parameters[i][1];
  const size   = parameters[i][2];
  const snow_color = new THREE.Color( 0xffffff );
  snow_color.setHSL(color[0], color[1], color[2]);

  materials[i] = new THREE.PointsMaterial({
    color: snow_color,
    size: size,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent : true,
    fog: false,
  });

  const particles = new THREE.Points(geometry, materials[i]);
  particles.rotation.x = Math.random() * 6;
  particles.rotation.y = Math.random() * 6;
  particles.rotation.z = Math.random() * 6;
  particles.position.set(i * 100, i * 100, i * 100);
  Snow.push(particles);
}

export default Snow;

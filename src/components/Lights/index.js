import { FLOOR, CLEAR_COLOR } from '../../constants';
import lensFlare0 from './textures/lensflare02.png';
import lensFlare2 from './textures/lensflare2.png';
import lensFlare3 from './textures/lensflare3.png';

let Lights = [];

function lensFlareUpdateCallback(object) {
  let flare;
  const fl = object.lensFlares.length;
  const vecX = -object.positionScreen.x * 2;
  const vecY = -object.positionScreen.y * 2;

  for(let f = 0; f < fl; f++ ) {
    flare = object.lensFlares[ f ];
    flare.x = object.positionScreen.x + vecX * flare.distance;
    flare.y = object.positionScreen.y + vecY * flare.distance;
    flare.rotation = 0;
  }
  object.lensFlares[2].y += 0.025;
  object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);
}

function addLight(h, s, l, x, y, z) {
  const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
  light.color.setHSL(h, s, l);
  light.position.set(x, y, z);
  light.castShadow = true;
  Lights.push(light);

  const flareColor = new THREE.Color( 0xffffff );
  flareColor.setHSL( h, s, l + 0.5 );

  const lensFlare = new THREE.LensFlare( textureFlare0, 300, 0.0, THREE.AdditiveBlending, flareColor );
  lensFlare.add(textureFlare2, 200, 0.0, THREE.AdditiveBlending);
  lensFlare.add(textureFlare2, 200, 0.0, THREE.AdditiveBlending);
  lensFlare.add(textureFlare2, 500, 0.0, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 40, 0.7, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 60, 0.9, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 40, 1.0, THREE.AdditiveBlending);
  lensFlare.customUpdateCallback = lensFlareUpdateCallback;
  lensFlare.position.copy(light.position);
  Lights.push(lensFlare);
}

const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(-150,150,-30);
//pointLight1.color.setHSL(0, 0.8, 0.5);
pointLight1.penumbra = 0.05;
pointLight1.decay = 2;
pointLight1.distance = 500;

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(70,60,50);
//pointLight2.color.setHSL(0.08, 0.8, 0.5);
pointLight2.angle = Math.PI / 4;
pointLight2.penumbra = 0.05;
pointLight2.decay = 2;
pointLight2.distance = 300;

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load(lensFlare0);
const textureFlare2 = textureLoader.load(lensFlare2);
const textureFlare3 = textureLoader.load(lensFlare3);
addLight(0, 0, 0.4, -500, 100, -200);

Lights.push(pointLight1);
Lights.push(pointLight2);
Lights.push(new THREE.AmbientLight( 0xffffff, 0.1 ));

export default Lights;


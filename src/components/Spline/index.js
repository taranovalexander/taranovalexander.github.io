const Spline = {
  path: new THREE.CatmullRomCurve3([
    new THREE.Vector3( 0, 0, 10 ),
    new THREE.Vector3( 0, 0, 3 ),
    new THREE.Vector3( 4, 0.4, 2 ),
    new THREE.Vector3( 4.5, 0.8, 0 ),
    new THREE.Vector3( 0, 0, -4 ),
    new THREE.Vector3( -3.5, 0, 0 ),
    new THREE.Vector3( 0, 0, 3 ),
    new THREE.Vector3( 3, -0.2, 0 ),
    new THREE.Vector3( 0, 0, -3 ),
    new THREE.Vector3( -3, 0, 0 ),
    new THREE.Vector3( -2, 0, 2 ),
    new THREE.Vector3( 0, 0, 1.3 ),

  ]),
  segments: 500,
  radius: 10,
  radiusSegments: 100,
  closed: false,
  currentPos: 0,
};

Spline.cameraCurve = new THREE.TubeGeometry(Spline.path, Spline.segments, Spline.radius, Spline.radiusSegments, Spline.closed);

export default Spline;

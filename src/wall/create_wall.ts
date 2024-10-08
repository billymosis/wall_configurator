import * as THREE from "three";

const createWall = (callback: Function): THREE.Mesh => {
  const texture = new THREE.TextureLoader().load(
    "/img/kilimanjaro.jpg",
    callback,
  );
  // const texture = new THREE.TextureLoader().load('../img/kilimanjaro.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  // material.map.wrapS = THREE.ClampToEdgeWrapping;
  // material.map.wrapT = THREE.ClampToEdgeWrapping;
  // material.map.minFilter = THREE.LinearFilter;

  const geom = new THREE.Geometry();
  const wall = new THREE.Mesh(geom, material);
  wall.castShadow = true;
  wall.receiveShadow = false;
  return wall;
};

export default createWall;


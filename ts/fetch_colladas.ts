// Loads windows and doors in JSON formats

import * as THREE from 'three';
import { ColladaModel } from './interfaces';

interface ResultType {
  name: string,
  model: THREE.Group,
};

let index = 0;

const colladaUrls:Array<string> = [
  './colladas/dubbele deur/DubbeleDeur.dae.json',
  './colladas/dubbele deur/DubbeleDeur-donkerbruin.dae.json',
  './colladas/dubbele deur/DubbeleDeur-grijs.dae.json',
  './colladas/dubbele deur/DubbeleDeur-zwart.dae.json',

  './colladas/enkele deur/EnkeleDeur.dae.json',
  './colladas/enkele deur/EnkeleDeur-donkerbruin.dae.json',
  './colladas/enkele deur/EnkeleDeur-grijs.dae.json',
  './colladas/enkele deur/EnkeleDeur-zwart.dae.json',

  './colladas/raam/Raam.dae.json',
  './colladas/raam/Raam100x70.dae.json',
  './colladas/raam/Raam100x100.dae.json',
  './colladas/raam/Raam100x200.dae.json',
];

const loader = new THREE.ObjectLoader();

const loadCollada = (url:string) => {
  // console.log(url);
  return new Promise((resolve:any, reject:any) => {
    loader.load(url,
      // load
      (model) => {
        const name = url.substring(url.lastIndexOf('/') + 1).replace('.dae.json', '');
        if (model.scene) {
          console.info('does this happen at all?');
          resolve({name, model: model.scene});
        } else {
          resolve({name, model});
        }
      },
      // progress
      () => {
      },
      // error
      () => {
        // console.error(`Collada ${url} could not be loaded`);
        resolve(null);
      });
  })
}

async function fetchColladas() {
  const promises = colladaUrls.map(c => loadCollada(c));
  const results:Array<any> = await Promise.all(promises);
  const colladas:{[key:string]: ColladaModel} = {};
  results.forEach((result) => {
    if (result !== null) {
      const {
        model,
        name,
      } = result;
      model.rotation.x = -Math.PI/2;
      const b = new THREE.Box3();
      b.setFromObject(model);
      const id = `collada-model-${index}`
      colladas[id] = {
        id,
        index,
        name,
        model,
        width: Math.round(-b.min.x + b.max.x),
        height: Math.round(-b.min.y + b.max.y),
        depth: Math.round(-b.min.z + b.max.z),
      };
      index += 1;
    }
  });
  return colladas;
}

export default fetchColladas;
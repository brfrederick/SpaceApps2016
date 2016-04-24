import { Mesh, BoxGeometry, MeshLambertMaterial, Object3D } from 'three';
import { removeMission, remove } from '../World';

const geom = new BoxGeometry(0.3, 0.2, 0.2);

const removeBlock = block => () => {

};

const makeTarget = (w, h) => {
  const mat = new MeshLambertMaterial({ color: 0x0055FF });
  mat.shading = 1;

  const container = new Object3D();
  container.blocks = [];

  let zOffset = 0;
  let yOffset = 0;

  // rows
  for (let i = 0; i < w; i++) {
    zOffset = 0.085 * i;

    // columns
    for (let k = 0; k < h; k++) {
      yOffset = 0.085 * k;

      const pivot = new Object3D();
      pivot.rotation.z = zOffset;
      pivot.rotation.y = yOffset;

      const mesh = new Mesh(geom, mat);
      mesh.position.set(2.2, 0, 0);
      mesh.remove = () => {
        container.blocks.remove(mesh);
        remove(mesh);
      };

      container.blocks.push(mesh);
      container.add(pivot);
      pivot.add(mesh);
    }
  }

  return container;
};

// m : mission
const update = m => dt => {
  if (m.target.blocks.length === 0) {
    // remove UI, mission is complete
    // remove mission from world
    console.log('mission complete');
  }
  else if (m.timeLeft <= 0) {
    // -- GAME OVER --
    console.log('=== GAME OVER ===');
  }
  else {
    // update progress
    // update time left
    m.timeLeft -= dt;

    // update UI
    console.log(m.timeLeft);
  }
};

const makeUI = () => {

};

export const makeMission = (rows = 2, columns = 5) => {
  // make game objects
  const target = makeTarget(rows, columns);

  // make ui elements
  const ui = makeUI(rows * columns);

  const mission = {
    startBlocks: rows * columns,
    progress: 0,
    timeLeft: 30000,
    ui,
    target,
  };

  target.update = update(mission);
  return target;
};

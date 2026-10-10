// Polyfill minimal browser DOM for Node.js GLTFExporter
global.window = global;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.ImageData = class ImageData {
  constructor(data, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
};
global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    this.result = blob instanceof ArrayBuffer ? blob : (blob.buffer || new Uint8Array().buffer);
    if (this.onload) this.onload();
  }
  readAsDataURL(blob) {
    this.result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    if (this.onload) this.onload();
  }
};
global.document = {
  createElement: (type) => {
    if (type === 'canvas') {
      return {
        width: 16,
        height: 16,
        getContext: () => ({
          drawImage: () => {},
          getImageData: (x, y, w, h) => new global.ImageData(new Uint8ClampedArray(w * h * 4), w, h),
          putImageData: () => {},
          createImageData: (w, h) => new global.ImageData(new Uint8ClampedArray(w * h * 4), w, h)
        }),
        toDataURL: () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        toBlob: (callback) => {
          const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 213, 196, 203, 0, 0, 0, 10, 73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
          callback(pngHeader.buffer);
        }
      };
    }
    return {};
  }
};

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility to create a DataTexture with pixel arrays
function createPixelTexture(width, height, pixelFn) {
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = pixelFn(x, y, width, height);
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a !== undefined ? a : 255;
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

// Helper colors
const hexToRgb = (hex) => {
  const num = parseInt(hex.replace('#', ''), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

console.log("Generating Voxel Character Textures...");

// 1. Light Blue Checkered Shirt Texture (32x32)
const shirtTexture = createPixelTexture(32, 32, (x, y) => {
  // Center line buttons (x around 15,16)
  if (x >= 14 && x <= 17) {
    if (y % 8 >= 3 && y % 8 <= 4) return [255, 255, 255, 255]; // Button
    return [110, 160, 220, 255]; // Placket border
  }
  // Pocket detail (x 20 to 26, y 18 to 26)
  if (x >= 20 && x <= 26 && y >= 18 && y <= 26) {
    if (y === 26 || x === 20 || x === 26) return [100, 150, 210, 255];
  }
  // Checkered pattern
  const isAlt = ((Math.floor(x / 4) + Math.floor(y / 4)) % 2 === 0);
  const baseHex = isAlt ? '#94c4f5' : '#73a9e6';
  const noise = ((x * 7 + y * 13) % 15) - 7;
  const [r, g, b] = hexToRgb(baseHex);
  return [
    Math.min(255, Math.max(0, r + noise)),
    Math.min(255, Math.max(0, g + noise)),
    Math.min(255, Math.max(0, b + noise)),
    255
  ];
});

// 2. Charcoal Pants Texture (16x16)
const pantsTexture = createPixelTexture(16, 16, (x, y) => {
  const isAlt = ((Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0);
  const baseHex = isAlt ? '#36393e' : '#282a2e';
  const noise = ((x * 5 + y * 11) % 11) - 5;
  const [r, g, b] = hexToRgb(baseHex);
  return [
    Math.min(255, Math.max(0, r + noise)),
    Math.min(255, Math.max(0, g + noise)),
    Math.min(255, Math.max(0, b + noise)),
    255
  ];
});

// 3. Skin Texture (8x8)
const skinTexture = createPixelTexture(8, 8, (x, y) => {
  const baseHex = '#e5a873';
  const noise = ((x * 3 + y * 7) % 9) - 4;
  const [r, g, b] = hexToRgb(baseHex);
  return [
    Math.min(255, Math.max(0, r + noise)),
    Math.min(255, Math.max(0, g + noise)),
    Math.min(255, Math.max(0, b + noise)),
    255
  ];
});

// 4. Face Front Texture (16x16)
const faceTexture = createPixelTexture(16, 16, (x, y) => {
  // y=0 top, y=15 bottom
  // Eyes at y=8, x=3..4 (left eye), x=11..12 (right eye)
  if (y === 8 && ((x >= 3 && x <= 4) || (x >= 11 && x <= 12))) {
    return [45, 30, 20, 255]; // Dark iris
  }
  if (y === 8 && (x === 2 || x === 10)) {
    return [240, 240, 240, 255]; // White sclera
  }
  // Eyebrows at y=10
  if (y === 10 && ((x >= 2 && x <= 5) || (x >= 10 && x <= 13))) {
    return [30, 24, 20, 255];
  }
  // Nose block at y=6, x=7..8
  if (y === 6 && (x === 7 || x === 8)) {
    return [205, 140, 95, 255];
  }
  // Mouth / Stubble Beard (y=2 to 5)
  if (y >= 2 && y <= 5 && x >= 3 && x <= 12) {
    if (y === 4 && x >= 6 && x <= 9) {
      return [140, 75, 55, 255]; // Lips
    }
    const isBeardAlt = (x + y) % 2 === 0;
    return isBeardAlt ? [65, 50, 42, 255] : [110, 85, 70, 255]; // Beard stubble
  }
  // Standard Skin
  const baseHex = '#e5a873';
  const noise = ((x * 3 + y * 7) % 7) - 3;
  const [r, g, b] = hexToRgb(baseHex);
  return [
    Math.min(255, Math.max(0, r + noise)),
    Math.min(255, Math.max(0, g + noise)),
    Math.min(255, Math.max(0, b + noise)),
    255
  ];
});

// 5. Shoes Texture (8x8)
const shoeTexture = createPixelTexture(8, 8, (x, y) => {
  if (y === 0 || y === 1) return [180, 185, 190, 255]; // Sole edge
  const baseHex = '#f0f2f5';
  const noise = ((x * 3 + y * 5) % 7) - 3;
  const [r, g, b] = hexToRgb(baseHex);
  return [
    Math.min(255, Math.max(0, r + noise)),
    Math.min(255, Math.max(0, g + noise)),
    Math.min(255, Math.max(0, b + noise)),
    255
  ];
});

// Materials
const matShirt = new THREE.MeshStandardMaterial({ color: 0x73a9e6, roughness: 0.7 });
const matPants = new THREE.MeshStandardMaterial({ color: 0x36393e, roughness: 0.8 });
const matSkin = new THREE.MeshStandardMaterial({ color: 0xe5a873, roughness: 0.6 });
const matFace = new THREE.MeshStandardMaterial({ color: 0xe5a873, roughness: 0.6 });
const matHair = new THREE.MeshStandardMaterial({ color: 0x241c18, roughness: 0.9 });
const matShoes = new THREE.MeshStandardMaterial({ color: 0xf0f2f5, roughness: 0.5 });

// Build 3D Character Hierarchical Scene
const characterGroup = new THREE.Group();
characterGroup.name = "VoxelCharacter_Harish";

// Root pivot at feet origin (0, 0, 0)
const rootNode = new THREE.Group();
rootNode.name = "Root";
characterGroup.add(rootNode);

// 1. Torso Box (Width 0.9, Height 1.1, Depth 0.5)
const torsoGroup = new THREE.Group();
torsoGroup.name = "Torso";
torsoGroup.position.set(0, 1.45, 0);

const torsoMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 1.1, 0.5),
  matShirt
);
torsoMesh.castShadow = true;
torsoGroup.add(torsoMesh);
rootNode.add(torsoGroup);

// Collar detail
const collarL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.1), matShirt);
collarL.position.set(-0.2, 0.55, 0.22);
collarL.rotation.z = -0.2;
torsoGroup.add(collarL);

const collarR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.1), matShirt);
collarR.position.set(0.2, 0.55, 0.22);
collarR.rotation.z = 0.2;
torsoGroup.add(collarR);

// 2. Head Group (Pivot at neck top: 0, 0.6, 0 relative to torso)
const headGroup = new THREE.Group();
headGroup.name = "Head";
headGroup.position.set(0, 0.65, 0);

// Multi-material box for head: front has faceTexture, others skin/hair
const headMaterials = [
  matSkin, // Right
  matSkin, // Left
  matHair, // Top
  matSkin, // Bottom
  matFace, // Front (+Z)
  matHair  // Back (-Z)
];

const headMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.7, 0.7, 0.7),
  headMaterials
);
headMesh.position.set(0, 0.35, 0);
headMesh.castShadow = true;
headGroup.add(headMesh);

// Voxel Hair Top & Front Strands (3D blocky hair layers)
const hairTop = new THREE.Mesh(
  new THREE.BoxGeometry(0.74, 0.22, 0.74),
  matHair
);
hairTop.position.set(0, 0.65, 0);
headGroup.add(hairTop);

// Hair fringe voxel blocks
const hairFringe1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.1), matHair);
hairFringe1.position.set(-0.2, 0.55, 0.36);
headGroup.add(hairFringe1);

const hairFringe2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.1), matHair);
hairFringe2.position.set(0.05, 0.53, 0.37);
headGroup.add(hairFringe2);

const hairFringe3 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.1), matHair);
hairFringe3.position.set(0.25, 0.57, 0.36);
headGroup.add(hairFringe3);

// Nose block
const noseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.08), matSkin);
noseMesh.position.set(0, 0.32, 0.38);
headGroup.add(noseMesh);

torsoGroup.add(headGroup);

// 3. Left Arm Group (Pivot at shoulder: -0.6, 0.45, 0)
const leftArmGroup = new THREE.Group();
leftArmGroup.name = "LeftArm";
leftArmGroup.position.set(-0.6, 0.45, 0);

// Upper sleeve (shirt material)
const leftSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.3), matShirt);
leftSleeve.position.set(0, -0.3, 0);
leftArmGroup.add(leftSleeve);

// Lower arm / hand (skin material)
const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), matSkin);
leftHand.position.set(0, -0.75, 0);
leftArmGroup.add(leftHand);

torsoGroup.add(leftArmGroup);

// 4. Right Arm Group (Pivot at shoulder: 0.6, 0.45, 0)
const rightArmGroup = new THREE.Group();
rightArmGroup.name = "RightArm";
rightArmGroup.position.set(0.6, 0.45, 0);

// Upper sleeve
const rightSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.3), matShirt);
rightSleeve.position.set(0, -0.3, 0);
rightArmGroup.add(rightSleeve);

// Lower arm / hand
const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), matSkin);
rightHand.position.set(0, -0.75, 0);
rightArmGroup.add(rightHand);

torsoGroup.add(rightArmGroup);

// 5. Left Leg Group (Pivot at hip: -0.22, 0.9, 0)
const leftLegGroup = new THREE.Group();
leftLegGroup.name = "LeftLeg";
leftLegGroup.position.set(-0.22, 0.9, 0);

const leftPants = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.75, 0.38), matPants);
leftPants.position.set(0, -0.375, 0);
leftLegGroup.add(leftPants);

const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.48), matShoes);
leftShoe.position.set(0, -0.81, 0.04);
leftLegGroup.add(leftShoe);

rootNode.add(leftLegGroup);

// 6. Right Leg Group (Pivot at hip: 0.22, 0.9, 0)
const rightLegGroup = new THREE.Group();
rightLegGroup.name = "RightLeg";
rightLegGroup.position.set(0.22, 0.9, 0);

const rightPants = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.75, 0.38), matPants);
rightPants.position.set(0, -0.375, 0);
rightLegGroup.add(rightPants);

const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.48), matShoes);
rightShoe.position.set(0, -0.81, 0.04);
rightLegGroup.add(rightShoe);

rootNode.add(rightLegGroup);

console.log("Exporting to GLTF / GLB...");

const exporter = new GLTFExporter();
exporter.parse(
  characterGroup,
  (gltf) => {
    const publicDir = path.resolve(__dirname, '../public');
    const modelsDir = path.resolve(publicDir, 'models');
    if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

    if (gltf instanceof ArrayBuffer) {
      const buffer = Buffer.from(gltf);
      fs.writeFileSync(path.join(modelsDir, 'harish_voxel_character.glb'), buffer);
      fs.writeFileSync(path.join(publicDir, 'harish_voxel_character.glb'), buffer);
      console.log("Successfully exported harish_voxel_character.glb! Size:", buffer.length, "bytes");
    } else {
      const output = JSON.stringify(gltf, null, 2);
      fs.writeFileSync(path.join(modelsDir, 'harish_voxel_character.gltf'), output);
      fs.writeFileSync(path.join(publicDir, 'harish_voxel_character.gltf'), output);
      fs.writeFileSync(path.join(modelsDir, 'harish_voxel_character.glb'), Buffer.from(output));
      fs.writeFileSync(path.join(publicDir, 'harish_voxel_character.glb'), Buffer.from(output));
      console.log("Successfully exported harish_voxel_character.gltf and GLB!");
    }
    process.exit(0);
  },
  (error) => {
    console.error("An error occurred during GLTF export:", error);
    process.exit(1);
  },
  { binary: false }
);

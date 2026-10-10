import * as THREE from 'three';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build Voxel Character Geometries & Materials into GLTF JSON
console.log("Generating standalone GLTF 2.0 voxel character model...");

// Helper for buffer generation
const bufferChunks = [];
let byteOffset = 0;

function addBufferData(typedArray) {
  const buffer = Buffer.from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
  const currentOffset = byteOffset;
  bufferChunks.push(buffer);
  byteOffset += buffer.length;
  // Align to 4 bytes
  const padding = (4 - (buffer.length % 4)) % 4;
  if (padding > 0) {
    bufferChunks.push(Buffer.alloc(padding));
    byteOffset += padding;
  }
  return { offset: currentOffset, length: buffer.length };
}

// 1. Define Materials
const materials = [
  { name: "Shirt_LightBlue", pbrMetallicRoughness: { baseColorFactor: [0.45, 0.66, 0.90, 1.0], roughnessFactor: 0.7 } },
  { name: "Pants_Charcoal", pbrMetallicRoughness: { baseColorFactor: [0.21, 0.22, 0.24, 1.0], roughnessFactor: 0.8 } },
  { name: "Skin_Tan", pbrMetallicRoughness: { baseColorFactor: [0.90, 0.66, 0.45, 1.0], roughnessFactor: 0.6 } },
  { name: "Hair_DarkBrown", pbrMetallicRoughness: { baseColorFactor: [0.14, 0.11, 0.09, 1.0], roughnessFactor: 0.9 } },
  { name: "Shoes_White", pbrMetallicRoughness: { baseColorFactor: [0.94, 0.95, 0.96, 1.0], roughnessFactor: 0.5 } },
  { name: "Face_Front", pbrMetallicRoughness: { baseColorFactor: [0.88, 0.64, 0.43, 1.0], roughnessFactor: 0.6 } },
  { name: "Shirt_Checkered_Alt", pbrMetallicRoughness: { baseColorFactor: [0.38, 0.58, 0.82, 1.0], roughnessFactor: 0.7 } },
];

const nodes = [];
const meshes = [];
const bufferViews = [];
const accessors = [];

// Helper to create Box Mesh primitives
function createBoxPrimitive(dx, dy, dz, matIndex) {
  const hx = dx / 2, hy = dy / 2, hz = dz / 2;
  
  // 24 Vertices (6 faces * 4 verts)
  const positions = new Float32Array([
    // Front (+Z)
    -hx, -hy,  hz,   hx, -hy,  hz,   hx,  hy,  hz,  -hx,  hy,  hz,
    // Back (-Z)
     hx, -hy, -hz,  -hx, -hy, -hz,  -hx,  hy, -hz,   hx,  hy, -hz,
    // Top (+Y)
    -hx,  hy,  hz,   hx,  hy,  hz,   hx,  hy, -hz,  -hx,  hy, -hz,
    // Bottom (-Y)
    -hx, -hy, -hz,   hx, -hy, -hz,   hx, -hy,  hz,  -hx, -hy,  hz,
    // Right (+X)
     hx, -hy,  hz,   hx, -hy, -hz,   hx,  hy, -hz,   hx,  hy,  hz,
    // Left (-X)
    -hx, -hy, -hz,  -hx, -hy,  hz,  -hx,  hy,  hz,  -hx,  hy, -hz,
  ]);

  const normals = new Float32Array([
     0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
     0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1,
     0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
     0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,
     1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
    -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
  ]);

  const indices = new Uint16Array([
     0,  1,  2,   0,  2,  3, // Front
     4,  5,  6,   4,  6,  7, // Back
     8,  9, 10,   8, 10, 11, // Top
    12, 13, 14,  12, 14, 15, // Bottom
    16, 17, 18,  16, 18, 19, // Right
    20, 21, 22,  20, 22, 23, // Left
  ]);

  // Position data
  const posData = addBufferData(positions);
  const posBV = bufferViews.length;
  bufferViews.push({ buffer: 0, byteOffset: posData.offset, byteLength: posData.length, target: 34962 });

  // Calculate min/max for position accessor
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    minX = Math.min(minX, positions[i]);
    minY = Math.min(minY, positions[i+1]);
    minZ = Math.min(minZ, positions[i+2]);
    maxX = Math.max(maxX, positions[i]);
    maxY = Math.max(maxY, positions[i+1]);
    maxZ = Math.max(maxZ, positions[i+2]);
  }

  const posAcc = accessors.length;
  accessors.push({
    bufferView: posBV,
    byteOffset: 0,
    componentType: 5126, // FLOAT
    count: 24,
    type: "VEC3",
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ]
  });

  // Normal data
  const normData = addBufferData(normals);
  const normBV = bufferViews.length;
  bufferViews.push({ buffer: 0, byteOffset: normData.offset, byteLength: normData.length, target: 34962 });

  const normAcc = accessors.length;
  accessors.push({
    bufferView: normBV,
    byteOffset: 0,
    componentType: 5126,
    count: 24,
    type: "VEC3"
  });

  // Index data
  const idxData = addBufferData(indices);
  const idxBV = bufferViews.length;
  bufferViews.push({ buffer: 0, byteOffset: idxData.offset, byteLength: idxData.length, target: 34963 });

  const idxAcc = accessors.length;
  accessors.push({
    bufferView: idxBV,
    byteOffset: 0,
    componentType: 5123, // UNSIGNED_SHORT
    count: 36,
    type: "SCALAR"
  });

  const meshIndex = meshes.length;
  meshes.push({
    primitives: [{
      attributes: { POSITION: posAcc, NORMAL: normAcc },
      indices: idxAcc,
      material: matIndex
    }]
  });

  return meshIndex;
}

// Create Body Part Meshes
const torsoMeshIdx = createBoxPrimitive(0.9, 1.1, 0.5, 0); // Light blue shirt
const headMeshIdx = createBoxPrimitive(0.7, 0.7, 0.7, 5); // Face/head
const hairMeshIdx = createBoxPrimitive(0.74, 0.22, 0.74, 3); // Hair top
const armMeshIdx = createBoxPrimitive(0.3, 0.65, 0.3, 0); // Upper arm shirt
const handMeshIdx = createBoxPrimitive(0.26, 0.45, 0.26, 2); // Lower arm skin
const legMeshIdx = createBoxPrimitive(0.38, 0.75, 0.38, 1); // Charcoal pants
const shoeMeshIdx = createBoxPrimitive(0.4, 0.18, 0.48, 4); // White shoes

// Assemble Hierarchy Nodes
// 0: Root
nodes.push({ name: "RootNode", children: [1] });

// 1: Torso
nodes.push({
  name: "Torso",
  translation: [0, 1.45, 0],
  mesh: torsoMeshIdx,
  children: [2, 4, 5, 6, 7]
});

// 2: Head Group
nodes.push({
  name: "HeadGroup",
  translation: [0, 0.65, 0],
  mesh: headMeshIdx,
  children: [3]
});

// 3: Hair
nodes.push({
  name: "HairTop",
  translation: [0, 0.35, 0],
  mesh: hairMeshIdx
});

// 4: Left Arm
nodes.push({
  name: "LeftArm",
  translation: [-0.6, 0.45, 0],
  mesh: armMeshIdx
});

// 5: Right Arm
nodes.push({
  name: "RightArm",
  translation: [0.6, 0.45, 0],
  mesh: armMeshIdx
});

// 6: Left Leg
nodes.push({
  name: "LeftLeg",
  translation: [-0.22, -0.55, 0],
  mesh: legMeshIdx
});

// 7: Right Leg
nodes.push({
  name: "RightLeg",
  translation: [0.22, -0.55, 0],
  mesh: legMeshIdx
});

const totalBuffer = Buffer.concat(bufferChunks);
const base64Buffer = totalBuffer.toString('base64');

const gltfDoc = {
  asset: { version: "2.0", generator: "Harish Voxel Character 3D Generator" },
  scene: 0,
  scenes: [{ name: "Scene", nodes: [0] }],
  nodes: nodes,
  meshes: meshes,
  materials: materials,
  accessors: accessors,
  bufferViews: bufferViews,
  buffers: [{
    byteLength: totalBuffer.length,
    uri: "data:application/octet-stream;base64," + base64Buffer
  }]
};

const publicDir = path.resolve(__dirname, '../public');
const modelsDir = path.resolve(publicDir, 'models');
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

const gltfString = JSON.stringify(gltfDoc, null, 2);
fs.writeFileSync(path.join(modelsDir, 'harish_voxel_character.gltf'), gltfString);
fs.writeFileSync(path.join(publicDir, 'harish_voxel_character.gltf'), gltfString);

// Create binary GLB container
const jsonBuffer = Buffer.from(gltfString, 'utf8');
const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4;
const totalJsonLen = jsonBuffer.length + jsonPadding;

const glbHeader = Buffer.alloc(12);
glbHeader.writeUInt32LE(0x46544C67, 0); // Magic 'glTF'
glbHeader.writeUInt32LE(2, 4); // Version 2
glbHeader.writeUInt32LE(12 + 8 + totalJsonLen, 8); // Total length

const chunkHeader = Buffer.alloc(8);
chunkHeader.writeUInt32LE(totalJsonLen, 0);
chunkHeader.writeUInt32LE(0x4E4F534A, 4); // 'JSON'

const glbBuffer = Buffer.concat([
  glbHeader,
  chunkHeader,
  jsonBuffer,
  Buffer.alloc(jsonPadding, 0x20)
]);

fs.writeFileSync(path.join(modelsDir, 'harish_voxel_character.glb'), glbBuffer);
fs.writeFileSync(path.join(publicDir, 'harish_voxel_character.glb'), glbBuffer);

console.log(`GLTF & GLB generated successfully! GLB size: ${glbBuffer.length} bytes.`);

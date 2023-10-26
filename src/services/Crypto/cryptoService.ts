import { lib as cryptoLib } from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import { MerkleTree } from 'merkletreejs';

import { readFile } from '~/services/File/fileService';

export const blobToSha256 = (target: Blob | File, callback: (buffer: cryptoLib.WordArray) => void) => {
  readFile<number[]>(target, (res) => {
    if (!res) return;

    const worldArray = cryptoLib.WordArray.create(res);
    const hex = sha256(worldArray);

    callback(hex);
  });
};

export const createMerkleRoot = (values: (File | Blob)[], callback: (hex: string) => void) => {
  const leaves: cryptoLib.WordArray[] = [];
  const lastIdx = values.length - 1;

  for (const [idx, value] of values.entries()) {
    blobToSha256(value, (arrayBuffer) => {
      leaves.push(arrayBuffer);

      if (idx === lastIdx) {
        const tree = new MerkleTree(leaves, sha256);
        const root = tree.getHexRoot();

        callback(root);
      }
    });
  }
};

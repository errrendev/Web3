import { create } from "ipfs-http-client";

let ipfsClient;

function getIpfsClient() {
  if (ipfsClient) return ipfsClient;

  const projectId = import.meta.env.VITE_IPFS_PROJECT_ID;
  const projectSecret = import.meta.env.VITE_IPFS_PROJECT_SECRET;

  if (!projectId || !projectSecret) {
    throw new Error(
      "IPFS credentials missing: set VITE_IPFS_PROJECT_ID and VITE_IPFS_PROJECT_SECRET"
    );
  }

  const auth =
    "Basic " + btoa(`${projectId}:${projectSecret}`);

  ipfsClient = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  return ipfsClient;
}

export async function uploadFileToIPFS(file) {
  if (!file) throw new Error("No file provided for IPFS upload");

  const client = getIpfsClient();

  // ipfs-http-client can accept a Blob/File directly in the browser
  const added = await client.add(file);

  const cid = added.cid?.toString?.() || added.path;
  const url = `https://ipfs.io/ipfs/${cid}`;

  return { cid, url };
}


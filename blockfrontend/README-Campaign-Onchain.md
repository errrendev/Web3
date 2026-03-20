# Create Campaign On-Chain (Frontend + Solidity)

This project uses IPFS (Pinata) for the campaign image, then stores the resulting `cid` on-chain when you create a campaign.

## 1) Smart contracts (what’s deployed)

In `blockchain/src/campaign.sol` there are 2 contracts:

- `campaignFactory`
  - Has `createCampaign(string campaignTitle, uint requireCampaignAmount, string imgUrl, string campaignCategory, string campaignStory)`
  - Deploys a new `Campaign` contract per campaign
  - Emits `campaignCreated(...)`
- `Campaign`
  - Stores `title`, `requiredAmount`, `image` (string), `story`, and `owner`
  - Has `donate()` which uses `msg.value` (wei)

## 2) Deploy `campaignFactory` (Foundry)

1. Go to the blockchain folder:

```bash
cd "blockchain"
```

2. Compile:

```bash
forge build
```

3. Deploy to your target chain (example: Polygon Amoy):

```bash
forge script script/DeployCampaign.sol:DeployCampaign \
  --rpc-url <YOUR_POLYGON_AMOY_RPC_URL> \
  --private-key <YOUR_PRIVATE_KEY> \
  --broadcast
```

Deployment script: `blockchain/script/DeployCampaign.sol`

4. After broadcast, copy the deployed factory address from:

`blockchain/broadcast/DeployCampaign.sol/<chainId>/run-latest.json`

Look for:

```json
"contractName": "campaignFactory",
"contractAddress": "<FACTORY_ADDRESS>"
```

## 3) Get the ABI (for frontend calls)

The frontend uses the ABI from:

`blockchain/out/campaign.sol/campaignFactory.json`

We only need the `abi` field (specifically `createCampaign(...)` + the emitted event).

In the frontend, the minimal ABI is already added to:

- `blockfrontend/src/contracts/campaignFactoryAbi.js`

## 4) Configure the frontend

Set the deployed factory address and target chain in your frontend env:

```bash
VITE_CAMPAIGN_FACTORY_ADDRESS=<FACTORY_ADDRESS>
VITE_TARGET_CHAIN=<polygonAmoy|sepolia>
```

Restart the dev server after updating `.env`.

## 5) What the frontend does now

1. IPFS upload:
   - `blockfrontend/src/pages/CreateCampaign.jsx`
   - Uploads the selected image to Pinata via `pinata.upload.public.file(...)`
   - Stores the returned `cid` in state and uses it as `imgUrl` in the submit payload

2. On-chain create:
   - `blockfrontend/src/context/CrowdfundContext.jsx`
   - `createCampaign(form)` creates an `ethers.Contract` for `campaignFactory`
   - Calls:
     - `createCampaign(campaignTitle, requiredWei, imgUrl, campaignCategory, campaignStory)`
   - Important: the UI collects ETH, but the contract compares against `msg.value` (wei), so the frontend converts:
     - `requiredWei = ethers.parseEther(form.requireCampaignAmount)`

## 6) Test checklist

- Upload image to IPFS (CID appears, “View Image” works)
- Submit campaign
- MetaMask prompts for a transaction
- After success:
  - tx hash should be visible in Polygonscan
  - `campaignFactory` should emit `campaignCreated`


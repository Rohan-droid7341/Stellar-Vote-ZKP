#!/bin/bash

# === CONFIG ===
WASM_PATH="target/wasm32v1-none/release/hello_world.wasm"
DEPLOYER_NAME="alice"  # change if needed
DEPLOYER_ADDRESS=$(stellar keys address $DEPLOYER_NAME)
NETWORK="testnet"

# === DEPLOY ===
echo "🚀 Deploying contract using $DEPLOYER_NAME ($DEPLOYER_ADDRESS) on $NETWORK..."

# Run deploy command and capture contract ID
CONTRACT_ID=$(stellar contract deploy \
  --wasm $WASM_PATH \
  --source-account $DEPLOYER_NAME \
  --network $NETWORK)

# Check success
if [ $? -ne 0 ]; then
  echo "❌ Deployment failed"
  exit 1
fi

# === SAVE INFO ===
INFO_FILE="contract_info.json"

echo "📄 Writing deployment info to $INFO_FILE"
cat <<EOF > $INFO_FILE
{
  "contract_id": "$CONTRACT_ID",
  "deployer_name": "$DEPLOYER_NAME",
  "deployer_address": "$DEPLOYER_ADDRESS",
  "network": "$NETWORK",
  "date": "$(date --iso-8601=seconds)"
}
EOF

echo "✅ Deployment complete!"
echo "   Contract ID: $CONTRACT_ID"
echo "   Info saved to $INFO_FILE"

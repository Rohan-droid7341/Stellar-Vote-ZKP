#!/bin/bash
set -e

KEY1="key1"
KEY2="key2"
USERKEY="key1"

# 1. Build contract
echo "📦 Building contract..."
stellar contract build

# 2. Deploy contract
echo "🚀 Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source-account alice \
  --network testnet \
  --alias hello_world)
echo "✅ Contract deployed at: $CONTRACT_ID"

# 3. Create a workspace
echo "🛠️ Creating workspace..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account alice \
  --network testnet \
  -- \
  create_workspace --name "HackathonWS" --description "Testing workspace"

# 4. Query workspace back
echo "🔍 Fetching workspace..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account alice \
  --network testnet \
  -- \
  get_workspace --id 1

# 5. Register keys for the workspace
echo "🔑 Registering passkeys..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account alice \
  --network testnet \
  -- \
  register_keys --workspace_id 1 --key_hashes "[\"key1\",\"key2\"]"




# 6. User2 joins workspace with valid passkey
echo "👥 User2 joins with passkey..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account bob \
  --network testnet \
  -- \
  join_workspace_with_key --workspace_id 1 --key_hash "$USERKEY" --user bob


# 7. Check membership status
echo "🔎 Checking if User2 is member..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account bob \
  --network testnet \
  -- \
  is_member --workspace_id 1 --user bob

# 8. User1 creates an event
echo "📅 Creating event..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account alice \
  --network testnet \
  -- \
  create_event --workspace_id 1 --title "Vote on Pizza" --options "[\"Yes\",\"No\"]"

# 9. User2 votes
echo "🗳️ User2 votes..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account bob \
  --network testnet \
  -- \
  vote --event_id 1 --voter bob --choice "Yes"

# 10. Query results
echo "📊 Fetching event results..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account alice \
  --network testnet \
  -- \
  get_event --id 1

echo "🎉 Full workflow test complete!"

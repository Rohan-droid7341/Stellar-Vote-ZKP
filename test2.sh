#!/bin/bash
set -e

# --- Users
ALICE=alice
BOB=bob
CHARLIE=charlie

# --- Passkeys as strings
KEY1="key1"
KEY2="key2"
KEY3="key3"

# --- 1. Build contract
echo "📦 Building contract..."
stellar contract build

# --- 2. Deploy contract
echo "🚀 Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source-account $ALICE \
  --network testnet \
  --alias hello_world)
echo "✅ Contract deployed at: $CONTRACT_ID"

# --- 3. Create workspace
echo "🛠️ Creating workspace..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $ALICE \
  --network testnet \
  -- \
  create_workspace --name "HackathonWS" --description "Testing workspace"

# --- 4. Query workspace
echo "🔍 Fetching workspace..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $ALICE \
  --network testnet \
  -- \
  get_workspace --id 1

# --- 5. Register passkeys
echo "🔑 Registering passkeys..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $ALICE \
  --network testnet \
  -- \
  register_keys --workspace_id 1 --key_hashes "[\"$KEY1\",\"$KEY2\"]"

# --- 6. User2 joins workspace with valid passkey
echo "👥 BOB joins with valid passkey..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $BOB \
  --network testnet \
  -- \
  join_workspace_with_key --workspace_id 1 --key_hash "$KEY1" --user $BOB

# --- 7. Check membership status
echo "🔎 Checking membership..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $BOB \
  --network testnet \
  -- \
  is_member --workspace_id 1 --user $BOB

# --- 8. Negative test: invalid passkey
echo "❌ CHARLIE tries invalid passkey..."
set +e
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $CHARLIE \
  --network testnet \
  -- \
  join_workspace_with_key --workspace_id 1 --key_hash "$KEY3" --user $CHARLIE
set -e

# --- 9. Create event with options
echo "📅 Creating event..."
OPTIONS='["Pizza","Burger","Pasta"]'
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $ALICE \
  --network testnet \
  -- \
  create_event --workspace_id 1 --title "Lunch Vote" --options "$OPTIONS"

# --- 10. User2 votes
echo "🗳️ BOB votes Pizza..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $BOB \
  --network testnet \
  -- \
  vote --event_id 1 --voter $BOB --choice "Pizza"

# --- 11. Negative test: BOB tries to vote again
echo "❌ BOB tries to vote again..."
set +e
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $BOB \
  --network testnet \
  -- \
  vote --event_id 1 --voter $BOB --choice "Burger"
set -e

# --- 12. Negative test: vote with invalid choice
echo "❌ CHARLIE tries to vote with invalid choice..."
set +e
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $CHARLIE \
  --network testnet \
  -- \
  vote --event_id 1 --voter $CHARLIE --choice "Sushi"
set -e

# --- 13. Query event results
echo "📊 Fetching event results..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $ALICE \
  --network testnet \
  -- \
  get_event --id 1

echo "🎉 All test cases executed!"


# --- Extra 1: CHARLIE tries to create a workspace (should work only if allowed)
echo "❌ CHARLIE tries to create a workspace..."
set +e
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $CHARLIE \
  --network testnet \
  -- \
  create_workspace --name "CharliesWS" --description "Should fail if permissions are restricted"
set -e

# --- Extra 2: BOB tries to vote again (already voted)
echo "❌ BOB tries to vote again on same event..."
set +e
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $BOB \
  --network testnet \
  -- \
  vote --event_id 1 --voter $BOB --choice "Pizza"
set -e

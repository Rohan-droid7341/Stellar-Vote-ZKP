// import {
//   Keypair,
//   TransactionBuilder,
//   Networks,
//   BASE_FEE,
//   Contract,
//   scVal,
// } from 'stellar-sdk';
// import { signTransaction } from '@stellar/freighter-api';

// const RPC_URL = 'https://soroban-testnet.stellar.org:443';
// const NETWORK_PASSPHRASE = Networks.TESTNET;
// const server = new StellarSdk.rpc.Server(RPC_URL, { allowHttp: true });

// // Replace with your actual contract ID
// const CONTRACT_ID = 'CBKT6XXUIJFVIINO7IJ7WDLQRX4WKKRHIQT3AIDUXLXAABIUM42IEW35';

// const createTx = async (userKey, fee) => {
//   const source = await server.getAccount(userKey);
//   return new TransactionBuilder(source, {
//     fee,
//     networkPassphrase: NETWORK_PASSPHRASE,
//   });
// };

// const signTx = async (tx, userKey) => {
//   const signedTx = await signTransaction(tx.toXDR(), { publicKey: userKey });
//   return TransactionBuilder.fromXDR(signedTx, NETWORK_PASSPHRASE);
// };

// const submitTx = async (tx) => {
//   const sendTx = await server.sendTransaction(tx);
//   // Poll for transaction completion
//   let getTx = await server.getTransaction(sendTx.hash);
//   while (getTx.status === 'PENDING') {
//     getTx = await server.getTransaction(sendTx.hash);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   }
//   return getTx;
// };

// // --- Function Implementations ---

// export const createWorkspace = async (name, description, userKey) => {
//   const contract = new Contract(CONTRACT_ID);

//   const txBuilder = await createTx(userKey, BASE_FEE);
//   const operation = contract.call(
//     'create_workspace',
//     scVal.fromString(name),
//     scVal.fromString(description)
//   );
//   txBuilder.addOperation(operation);
  
//   const builtTx = txBuilder.build();
//   const signedTx = await signTx(builtTx, userKey);
//   const result = await submitTx(signedTx);

//   if (result.status === 'SUCCESS') {
//     return scVal.fromXDR(result.returnValue).u32();
//   } else {
//     throw new Error('Transaction failed.');
//   }
// };

// export const getWorkspace = async (id) => {
//     const contract = new Contract(CONTRACT_ID);
//     const operation = contract.call('get_workspace', scVal.u32(id));
    
//     // For read-only operations, we can simulate the transaction
//     const simulated = await server.simulateTransaction(operation);
    
//     if (simulated.result) {
//         return scVal.fromXDR(simulated.result.xdr).value();
//     }
//     return null;
// };
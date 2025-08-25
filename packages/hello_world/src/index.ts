import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAFP4VRL3JT7ADS4KI46XG4Y4QSZLBOB4B7J6X5VU65RBIJPSKUSRCGX",
  }
} as const


export interface Workspace {
  description: string;
  id: u32;
  name: string;
}


export interface Event {
  id: u32;
  options: Array<string>;
  title: string;
  votes: Map<string, u32>;
  workspace_id: u32;
}

export type DataKey = {tag: "Workspace", values: readonly [u32]} | {tag: "WorkspaceCount", values: void} | {tag: "Event", values: readonly [u32]} | {tag: "EventCount", values: void} | {tag: "Vote", values: readonly [u32, string]} | {tag: "Member", values: readonly [u32, string]} | {tag: "KeyAllowed", values: readonly [u32, string]} | {tag: "KeyUsed", values: readonly [u32, string]};

export interface Client {
  /**
   * Construct and simulate a create_workspace transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_workspace: ({name, description}: {name: string, description: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_workspace transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_workspace: ({id}: {id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<Workspace>>>

  /**
   * Construct and simulate a create_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_event: ({workspace_id, title, options}: {workspace_id: u32, title: string, options: Array<string>}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_event: ({id}: {id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<Event>>>

  /**
   * Construct and simulate a register_keys transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_keys: ({workspace_id, key_hashes}: {workspace_id: u32, key_hashes: Array<string>}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a join_workspace_with_key transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  join_workspace_with_key: ({workspace_id, key_hash, user}: {workspace_id: u32, key_hash: string, user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a is_member transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_member: ({workspace_id, user}: {workspace_id: u32, user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a vote transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  vote: ({event_id, voter, choice}: {event_id: u32, voter: string, choice: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACVdvcmtzcGFjZQAAAAAAAAMAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAAmlkAAAAAAAEAAAAAAAAAARuYW1lAAAAEA==",
        "AAAAAQAAAAAAAAAAAAAABUV2ZW50AAAAAAAABQAAAAAAAAACaWQAAAAAAAQAAAAAAAAAB29wdGlvbnMAAAAD6gAAABAAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAFdm90ZXMAAAAAAAPsAAAAEAAAAAQAAAAAAAAADHdvcmtzcGFjZV9pZAAAAAQ=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACAAAAAEAAAAAAAAACVdvcmtzcGFjZQAAAAAAAAEAAAAEAAAAAAAAAAAAAAAOV29ya3NwYWNlQ291bnQAAAAAAAEAAAAAAAAABUV2ZW50AAAAAAAAAQAAAAQAAAAAAAAAAAAAAApFdmVudENvdW50AAAAAAABAAAAAAAAAARWb3RlAAAAAgAAAAQAAAATAAAAAQAAAAAAAAAGTWVtYmVyAAAAAAACAAAABAAAABMAAAABAAAAAAAAAApLZXlBbGxvd2VkAAAAAAACAAAABAAAABAAAAABAAAAAAAAAAdLZXlVc2VkAAAAAAIAAAAEAAAAEA==",
        "AAAAAAAAAAAAAAAQY3JlYXRlX3dvcmtzcGFjZQAAAAIAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAANZ2V0X3dvcmtzcGFjZQAAAAAAAAEAAAAAAAAAAmlkAAAAAAAEAAAAAQAAA+gAAAfQAAAACVdvcmtzcGFjZQAAAA==",
        "AAAAAAAAAAAAAAAMY3JlYXRlX2V2ZW50AAAAAwAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAAdvcHRpb25zAAAAA+oAAAAQAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAJZ2V0X2V2ZW50AAAAAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6AAAB9AAAAAFRXZlbnQAAAA=",
        "AAAAAAAAAAAAAAANcmVnaXN0ZXJfa2V5cwAAAAAAAAIAAAAAAAAADHdvcmtzcGFjZV9pZAAAAAQAAAAAAAAACmtleV9oYXNoZXMAAAAAA+oAAAAQAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAXam9pbl93b3Jrc3BhY2Vfd2l0aF9rZXkAAAAAAwAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAIa2V5X2hhc2gAAAAQAAAAAAAAAAR1c2VyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAJaXNfbWVtYmVyAAAAAAAAAgAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAEdXNlcgAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAEdm90ZQAAAAMAAAAAAAAACGV2ZW50X2lkAAAABAAAAAAAAAAFdm90ZXIAAAAAAAATAAAAAAAAAAZjaG9pY2UAAAAAABAAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_workspace: this.txFromJSON<u32>,
        get_workspace: this.txFromJSON<Option<Workspace>>,
        create_event: this.txFromJSON<u32>,
        get_event: this.txFromJSON<Option<Event>>,
        register_keys: this.txFromJSON<u32>,
        join_workspace_with_key: this.txFromJSON<null>,
        is_member: this.txFromJSON<boolean>,
        vote: this.txFromJSON<null>
  }
}
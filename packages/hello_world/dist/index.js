import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAFP4VRL3JT7ADS4KI46XG4Y4QSZLBOB4B7J6X5VU65RBIJPSKUSRCGX",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAACVdvcmtzcGFjZQAAAAAAAAMAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAAmlkAAAAAAAEAAAAAAAAAARuYW1lAAAAEA==",
            "AAAAAQAAAAAAAAAAAAAABUV2ZW50AAAAAAAABQAAAAAAAAACaWQAAAAAAAQAAAAAAAAAB29wdGlvbnMAAAAD6gAAABAAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAFdm90ZXMAAAAAAAPsAAAAEAAAAAQAAAAAAAAADHdvcmtzcGFjZV9pZAAAAAQ=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACAAAAAEAAAAAAAAACVdvcmtzcGFjZQAAAAAAAAEAAAAEAAAAAAAAAAAAAAAOV29ya3NwYWNlQ291bnQAAAAAAAEAAAAAAAAABUV2ZW50AAAAAAAAAQAAAAQAAAAAAAAAAAAAAApFdmVudENvdW50AAAAAAABAAAAAAAAAARWb3RlAAAAAgAAAAQAAAATAAAAAQAAAAAAAAAGTWVtYmVyAAAAAAACAAAABAAAABMAAAABAAAAAAAAAApLZXlBbGxvd2VkAAAAAAACAAAABAAAABAAAAABAAAAAAAAAAdLZXlVc2VkAAAAAAIAAAAEAAAAEA==",
            "AAAAAAAAAAAAAAAQY3JlYXRlX3dvcmtzcGFjZQAAAAIAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAANZ2V0X3dvcmtzcGFjZQAAAAAAAAEAAAAAAAAAAmlkAAAAAAAEAAAAAQAAA+gAAAfQAAAACVdvcmtzcGFjZQAAAA==",
            "AAAAAAAAAAAAAAAMY3JlYXRlX2V2ZW50AAAAAwAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAAdvcHRpb25zAAAAA+oAAAAQAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAJZ2V0X2V2ZW50AAAAAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6AAAB9AAAAAFRXZlbnQAAAA=",
            "AAAAAAAAAAAAAAANcmVnaXN0ZXJfa2V5cwAAAAAAAAIAAAAAAAAADHdvcmtzcGFjZV9pZAAAAAQAAAAAAAAACmtleV9oYXNoZXMAAAAAA+oAAAAQAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAXam9pbl93b3Jrc3BhY2Vfd2l0aF9rZXkAAAAAAwAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAIa2V5X2hhc2gAAAAQAAAAAAAAAAR1c2VyAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJaXNfbWVtYmVyAAAAAAAAAgAAAAAAAAAMd29ya3NwYWNlX2lkAAAABAAAAAAAAAAEdXNlcgAAABMAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAAEdm90ZQAAAAMAAAAAAAAACGV2ZW50X2lkAAAABAAAAAAAAAAFdm90ZXIAAAAAAAATAAAAAAAAAAZjaG9pY2UAAAAAABAAAAAA"]), options);
        this.options = options;
    }
    fromJSON = {
        create_workspace: (this.txFromJSON),
        get_workspace: (this.txFromJSON),
        create_event: (this.txFromJSON),
        get_event: (this.txFromJSON),
        register_keys: (this.txFromJSON),
        join_workspace_with_key: (this.txFromJSON),
        is_member: (this.txFromJSON),
        vote: (this.txFromJSON)
    };
}

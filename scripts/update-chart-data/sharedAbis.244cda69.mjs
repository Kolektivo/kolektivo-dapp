const e = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseUri",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "TransferDisabled",
    type: "error"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "string",
        name: "uri",
        type: "string"
      }
    ],
    name: "TokenUriUpdated",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      },
      {
        indexed: !1,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "string",
        name: "value",
        type: "string"
      },
      {
        indexed: !0,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "URI",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      }
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      }
    ],
    name: "burnFromMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      }
    ],
    name: "mintToMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseUri",
        type: "string"
      }
    ],
    name: "setBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "newUri",
        type: "string"
      }
    ],
    name: "setUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "tokenUris",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
], t = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_avatar",
        type: "address"
      },
      {
        internalType: "address",
        name: "_target",
        type: "address"
      },
      {
        internalType: "address",
        name: "_badger",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ArraysDifferentLength",
    type: "error"
  },
  {
    inputs: [],
    name: "ModuleTransactionFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "NoMembership",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guard_",
        type: "address"
      }
    ],
    name: "NotIERC165Compliant",
    type: "error"
  },
  {
    inputs: [],
    name: "RedundantUpdateOfState",
    type: "error"
  },
  {
    inputs: [],
    name: "SetUpModulesAlreadyCalled",
    type: "error"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousAvatar",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newAvatar",
        type: "address"
      }
    ],
    name: "AvatarSet",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "badgerAddress",
        type: "address"
      }
    ],
    name: "BadgerUpdated",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "guard",
        type: "address"
      }
    ],
    name: "ChangedGuard",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "initiator",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "avatar",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "RolesModSetup",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "multisendAddress",
        type: "address"
      }
    ],
    name: "SetMultisendAddress",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousTarget",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newTarget",
        type: "address"
      }
    ],
    name: "TargetSet",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "enum ExecutionOptions",
        name: "options",
        type: "uint8"
      }
    ],
    name: "allowTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "avatar",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "badger",
    outputs: [
      {
        internalType: "contract IBadger",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      }
    ],
    name: "execTransactionFromModule",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      }
    ],
    name: "execTransactionFromModuleReturnData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getGuard",
    outputs: [
      {
        internalType: "address",
        name: "_guard",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "guard",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "multisend",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      }
    ],
    name: "revokeTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "enum ExecutionOptions",
        name: "options",
        type: "uint8"
      }
    ],
    name: "scopeAllowFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "bool[]",
        name: "isParamScoped",
        type: "bool[]"
      },
      {
        internalType: "enum ParameterType[]",
        name: "paramType",
        type: "uint8[]"
      },
      {
        internalType: "enum Comparison[]",
        name: "paramComp",
        type: "uint8[]"
      },
      {
        internalType: "bytes[]",
        name: "compValue",
        type: "bytes[]"
      },
      {
        internalType: "enum ExecutionOptions",
        name: "options",
        type: "uint8"
      }
    ],
    name: "scopeFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "enum ExecutionOptions",
        name: "options",
        type: "uint8"
      }
    ],
    name: "scopeFunctionExecutionOptions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "uint256",
        name: "paramIndex",
        type: "uint256"
      },
      {
        internalType: "enum ParameterType",
        name: "paramType",
        type: "uint8"
      },
      {
        internalType: "enum Comparison",
        name: "paramComp",
        type: "uint8"
      },
      {
        internalType: "bytes",
        name: "compValue",
        type: "bytes"
      }
    ],
    name: "scopeParameter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "uint256",
        name: "paramIndex",
        type: "uint256"
      },
      {
        internalType: "enum ParameterType",
        name: "paramType",
        type: "uint8"
      },
      {
        internalType: "bytes[]",
        name: "compValues",
        type: "bytes[]"
      }
    ],
    name: "scopeParameterAsOneOf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      }
    ],
    name: "scopeRevokeFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      }
    ],
    name: "scopeTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_avatar",
        type: "address"
      }
    ],
    name: "setAvatar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_guard",
        type: "address"
      }
    ],
    name: "setGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_multisend",
        type: "address"
      }
    ],
    name: "setMultisend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address"
      }
    ],
    name: "setTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initParams",
        type: "bytes"
      }
    ],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "target",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "badgeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "uint8",
        name: "paramIndex",
        type: "uint8"
      }
    ],
    name: "unscopeParameter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newBadger",
        type: "address"
      }
    ],
    name: "updateBadger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
], n = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "initiator",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ScopeGuardSetup",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "SetDelegateCallAllowedOnTarget",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "SetFallbackAllowedOnTarget",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "SetFunctionAllowedOnTarget",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "SetTargetAllowed",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "scoped",
        type: "bool"
      }
    ],
    name: "SetTargetScoped",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "SetValueAllowedOnTarget",
    type: "event"
  },
  {
    stateMutability: "nonpayable",
    type: "fallback"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowedTargets",
    outputs: [
      {
        internalType: "bool",
        name: "allowed",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "scoped",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "delegateCallAllowed",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "fallbackAllowed",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "valueAllowed",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    name: "checkAfterExecution",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address payable",
        name: "",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "checkTransaction",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      }
    ],
    name: "isAllowedFunction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "isAllowedTarget",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "isAllowedToDelegateCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "isScoped",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "isValueAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "isfallbackAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "functionSig",
        type: "bytes4"
      },
      {
        internalType: "bool",
        name: "allow",
        type: "bool"
      }
    ],
    name: "setAllowedFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bool",
        name: "allow",
        type: "bool"
      }
    ],
    name: "setDelegateCallAllowedOnTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bool",
        name: "allow",
        type: "bool"
      }
    ],
    name: "setFallbackAllowedOnTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bool",
        name: "scoped",
        type: "bool"
      }
    ],
    name: "setScoped",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bool",
        name: "allow",
        type: "bool"
      }
    ],
    name: "setTargetAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initializeParams",
        type: "bytes"
      }
    ],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bool",
        name: "allow",
        type: "bool"
      }
    ],
    name: "setValueAllowedOnTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
], a = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_avatar",
        type: "address"
      },
      {
        internalType: "address",
        name: "_target",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_cooldown",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "AlreadyDisabledModule",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "AlreadyEnabledModule",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "InvalidModule",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "NotAuthorized",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guard_",
        type: "address"
      }
    ],
    name: "NotIERC165Compliant",
    type: "error"
  },
  {
    inputs: [],
    name: "RedundantUpdateOfState",
    type: "error"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousAvatar",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newAvatar",
        type: "address"
      }
    ],
    name: "AvatarSet",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "guard",
        type: "address"
      }
    ],
    name: "ChangedGuard",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "initiator",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "avatar",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "DelaySetup",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "DisabledModule",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "EnabledModule",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ExecutionFromModuleFailure",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ExecutionFromModuleSuccess",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "uint256",
        name: "queueIndex",
        type: "uint256"
      },
      {
        indexed: !0,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32"
      },
      {
        indexed: !1,
        internalType: "string",
        name: "uri",
        type: "string"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "salt",
        type: "uint256"
      }
    ],
    name: "SecretTransactionAdded",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        indexed: !1,
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_salt",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "txIndex",
        type: "uint256"
      }
    ],
    name: "SecretTransactionExecuted",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousTarget",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newTarget",
        type: "address"
      }
    ],
    name: "TargetSet",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "uint256",
        name: "queueIndex",
        type: "uint256"
      },
      {
        indexed: !0,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32"
      },
      {
        indexed: !1,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        indexed: !1,
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      }
    ],
    name: "TransactionAdded",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        indexed: !1,
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "txIndex",
        type: "uint256"
      }
    ],
    name: "TransactionExecuted",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "uint256",
        name: "startingApprovedTrxNonce",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "numberOfTrxApproved",
        type: "uint256"
      }
    ],
    name: "TransactionsApproved",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "uint256",
        name: "startingVetoedTrxNonce",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "numberOfTrxVetoed",
        type: "uint256"
      }
    ],
    name: "TransactionsVetoed",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_transactions",
        type: "uint256"
      }
    ],
    name: "approveNext",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "approved",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "avatar",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "prevModule",
        type: "address"
      },
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "disableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "enableModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hashedTransaction",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "uri",
        type: "string"
      }
    ],
    name: "enqueueSecretTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      }
    ],
    name: "execTransactionFromModule",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      }
    ],
    name: "execTransactionFromModuleReturnData",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "returnData",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "_salt",
        type: "uint256"
      }
    ],
    name: "executeNextSecretTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      }
    ],
    name: "executeNextTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getGuard",
    outputs: [
      {
        internalType: "address",
        name: "_guard",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "start",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "pageSize",
        type: "uint256"
      }
    ],
    name: "getModulesPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "array",
        type: "address[]"
      },
      {
        internalType: "address",
        name: "next",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "_salt",
        type: "uint256"
      }
    ],
    name: "getSecretTransactionHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8"
      }
    ],
    name: "getTransactionHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "getTxCreatedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "getTxHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "guard",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address"
      }
    ],
    name: "isModuleEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "queuePointer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "salt",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_avatar",
        type: "address"
      }
    ],
    name: "setAvatar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_guard",
        type: "address"
      }
    ],
    name: "setGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address"
      }
    ],
    name: "setTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cooldown",
        type: "uint256"
      }
    ],
    name: "setTxCooldown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256"
      }
    ],
    name: "setTxExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initParams",
        type: "bytes"
      }
    ],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "skipExpired",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "target",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "txCooldown",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "txCreatedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "txExpiration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "txHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "txNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newTxNonce",
        type: "uint256"
      }
    ],
    name: "vetoTransactionsTill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newTxNonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_transactions",
        type: "uint256"
      }
    ],
    name: "vetoTransactionsTillAndApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
], s = {
  Badger: e,
  BACRoles: t,
  ScopeGuard: n,
  SecretDelay: a
};
export {
  t as BACRoles,
  e as Badger,
  n as ScopeGuard,
  a as SecretDelay,
  s as default
};
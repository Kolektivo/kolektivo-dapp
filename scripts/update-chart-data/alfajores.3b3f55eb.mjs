const e = "alfajores", n = "44787", t = {
  GeoNFT: {
    address: "0x3d088f32d7d83FD7868620f76C80604106b74702",
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string"
          },
          {
            internalType: "string",
            name: "_symbol",
            type: "string"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [],
        name: "GeoNFT__InvalidIdentifier",
        type: "error"
      },
      {
        inputs: [],
        name: "GeoNFT__InvalidLatitude",
        type: "error"
      },
      {
        inputs: [],
        name: "GeoNFT__InvalidLongitude",
        type: "error"
      },
      {
        inputs: [],
        name: "GeoNFT__InvalidRecipient",
        type: "error"
      },
      {
        inputs: [],
        name: "GeoNFT__InvalidTokenId",
        type: "error"
      },
      {
        inputs: [],
        name: "InvalidPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByPendingOwner",
        type: "error"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "owner",
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
        name: "NewOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "previousPendingOwner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newPendingOwner",
            type: "address"
          }
        ],
        name: "NewPendingOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "TokenModified",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
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
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
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
            internalType: "uint256",
            name: "id",
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
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "getApproved",
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
            name: "",
            type: "address"
          },
          {
            internalType: "address",
            name: "",
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
            name: "to",
            type: "address"
          },
          {
            internalType: "int32",
            name: "latitude",
            type: "int32"
          },
          {
            internalType: "int32",
            name: "longitude",
            type: "int32"
          },
          {
            internalType: "string",
            name: "identifier",
            type: "string"
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
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "int32",
            name: "latitude",
            type: "int32"
          },
          {
            internalType: "int32",
            name: "longitude",
            type: "int32"
          },
          {
            internalType: "string",
            name: "identifier",
            type: "string"
          }
        ],
        name: "modify",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "name",
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
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "pendingOwner",
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
            name: "operator",
            type: "address"
          },
          {
            internalType: "bool",
            name: "approved",
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
            internalType: "address",
            name: "pendingOwner_",
            type: "address"
          }
        ],
        name: "setPendingOwner",
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
        inputs: [],
        name: "symbol",
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
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "tokenData",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          },
          {
            internalType: "int32",
            name: "",
            type: "int32"
          },
          {
            internalType: "int32",
            name: "",
            type: "int32"
          },
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
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "tokenURI",
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
          }
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ]
  },
  Oracle: {
    address: "0x0000000000000000000000000000000000000000",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "reportExpirationTime_",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "reportDelay_",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumProviders_",
            type: "uint256"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [],
        name: "InvalidPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByPendingOwner",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "invalidProvider",
            type: "address"
          }
        ],
        name: "Oracle__InvalidProvider",
        type: "error"
      },
      {
        inputs: [],
        name: "Oracle__NewReportTooSoonAfterPastReport",
        type: "error"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldMinimumProviders",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newMinimumProviders",
            type: "uint256"
          }
        ],
        name: "MinimumProvidersChanged",
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
        name: "NewOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "previousPendingOwner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newPendingOwner",
            type: "address"
          }
        ],
        name: "NewPendingOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [],
        name: "OracleMarkedAsInvalid",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [],
        name: "OracleMarkedAsValid",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "ProviderAdded",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "ProviderRemoved",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "provider",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "payload",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        name: "ProviderReportPushed",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "purger",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "ProviderReportsPurged",
        type: "event"
      },
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "addProvider",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "getData",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          },
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
        name: "isValid",
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
        name: "minimumProviders",
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
        name: "pendingOwner",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "providerReports",
        outputs: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "payload",
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
        name: "providers",
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
        name: "providersSize",
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
        name: "purgeReports",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "purgeReportsFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "payload",
            type: "uint256"
          }
        ],
        name: "pushReport",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "provider",
            type: "address"
          }
        ],
        name: "removeProvider",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "reportDelay",
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
        name: "reportExpirationTime",
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
            internalType: "bool",
            name: "isValid_",
            type: "bool"
          }
        ],
        name: "setIsValid",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "minimumProviders_",
            type: "uint256"
          }
        ],
        name: "setMinimumProviders",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "pendingOwner_",
            type: "address"
          }
        ],
        name: "setPendingOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ]
  },
  Reserve: {
    address: "0x9f4995f6a797Dd932A5301f22cA88104e7e42366",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "token_",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOracle_",
            type: "address"
          },
          {
            internalType: "address",
            name: "vestingVault_",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "minBacking_",
            type: "uint256"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [],
        name: "InvalidPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20BalanceNotSufficient",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20BondingLimitExceeded",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20NotBondable",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20NotRedeemable",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20NotRegistered",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC20RedeemLimitExceeded",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC721IdNotBondable",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC721IdNotRedeemable",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__ERC721IdNotRegistered",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__InvalidAmount",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__InvalidOracle",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__InvalidRecipient",
        type: "error"
      },
      {
        inputs: [],
        name: "Reserve__MinimumBackingLimitExceeded",
        type: "error"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldBacking",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newBacking",
            type: "uint256"
          }
        ],
        name: "BackingUpdated",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "erc20sBonded",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "tokensMinted",
            type: "uint256"
          }
        ],
        name: "BondedERC20",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
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
            name: "tokensMinted",
            type: "uint256"
          }
        ],
        name: "BondedERC721",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "DebtIncurred",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "DebtPaid",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20DelistedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20DelistedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20Deregistered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20ListedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20ListedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "enum IReserve.AssetType",
            name: "assetType",
            type: "uint8"
          }
        ],
        name: "ERC20Registered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdDelistedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdDelistedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdDeregistered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdListedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdListedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdRegistered",
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
        name: "NewOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "previousPendingOwner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newPendingOwner",
            type: "address"
          }
        ],
        name: "NewPendingOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "erc20sRedeemed",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "tokensBurned",
            type: "uint256"
          }
        ],
        name: "RedeemedERC20",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
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
            name: "tokensBurned",
            type: "uint256"
          }
        ],
        name: "RedeemedERC721Id",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldDiscount",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newDiscount",
            type: "uint256"
          }
        ],
        name: "SetERC20BondingDiscount",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldLimit",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newLimit",
            type: "uint256"
          }
        ],
        name: "SetERC20BondingLimit",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldVestingDuration",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newVestingDuration",
            type: "uint256"
          }
        ],
        name: "SetERC20BondingVesting",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oldOracle",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newOracle",
            type: "address"
          }
        ],
        name: "SetERC20Oracle",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldLimit",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newLimit",
            type: "uint256"
          }
        ],
        name: "SetERC20RedeemLimit",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
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
            name: "oldDiscount",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newDiscount",
            type: "uint256"
          }
        ],
        name: "SetERC721IdBondingDiscount",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
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
            name: "oldVestingDuration",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newVestingDuration",
            type: "uint256"
          }
        ],
        name: "SetERC721IdBondingVesting",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oldOracle",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newOracle",
            type: "address"
          }
        ],
        name: "SetERC721IdOracle",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldMinBacking",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newMinBacking",
            type: "uint256"
          }
        ],
        name: "SetMinBacking",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "oldOracle",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newOracle",
            type: "address"
          }
        ],
        name: "SetTokenOracle",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "oldVestingVault",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newVestingVault",
            type: "address"
          }
        ],
        name: "SetVestingVault",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "erc20sWithdrawn",
            type: "uint256"
          }
        ],
        name: "WithdrewERC20",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        name: "WithdrewERC721Id",
        type: "event"
      },
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "allRegisteredERC20s",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "allRegisteredERC721Ids",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "erc721",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256"
              }
            ],
            internalType: "struct IReserve.ERC721Id[]",
            name: "",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "assetTypeOfERC20",
        outputs: [
          {
            internalType: "enum IReserve.AssetType",
            name: "",
            type: "uint8"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "erc20Amount",
            type: "uint256"
          }
        ],
        name: "bondERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "bondERC20All",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          }
        ],
        name: "bondERC20AllFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "bondERC20AllFromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "bondERC20AllTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "erc20Amount",
            type: "uint256"
          }
        ],
        name: "bondERC20From",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
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
            name: "erc20Amount",
            type: "uint256"
          }
        ],
        name: "bondERC20FromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "erc20Amount",
            type: "uint256"
          }
        ],
        name: "bondERC20To",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "bondERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          }
        ],
        name: "bondERC721IdFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "bondERC721IdFromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "bondERC721IdTo",
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
          }
        ],
        name: "bondingDiscountPerERC20",
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
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "bondingDiscountPerERC721Id",
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
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "bondingLimitPerERC20",
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
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "bondingVestingDurationPerERC20",
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
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "bondingVestingDurationPerERC721Id",
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
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "delistERC20AsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "delistERC20AsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "delistERC721IdAsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "delistERC721IdAsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "deregisterERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "deregisterERC721Id",
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
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        name: "executeTx",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "incurDebt",
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
          }
        ],
        name: "isERC20Bondable",
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
            name: "",
            type: "address"
          }
        ],
        name: "isERC20Redeemable",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "isERC721IdBondable",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "isERC721IdRedeemable",
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
            name: "erc20",
            type: "address"
          }
        ],
        name: "listERC20AsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "listERC20AsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "listERC721IdAsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "listERC721IdAsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "minBacking",
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
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes"
          }
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4"
          }
        ],
        stateMutability: "pure",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "oraclePerERC20",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "oraclePerERC721Id",
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
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "payDebt",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "pendingOwner",
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
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "redeemERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "redeemERC20All",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          }
        ],
        name: "redeemERC20AllFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "redeemERC20AllFromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "redeemERC20AllTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "redeemERC20From",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
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
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "redeemERC20FromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256"
          }
        ],
        name: "redeemERC20To",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "redeemERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          }
        ],
        name: "redeemERC721IdFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "redeemERC721IdFromTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "redeemERC721IdTo",
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
          }
        ],
        name: "redeemLimitPerERC20",
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
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          },
          {
            internalType: "enum IReserve.AssetType",
            name: "assetType",
            type: "uint8"
          }
        ],
        name: "registerERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "registerERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "registeredERC20s",
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
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "registeredERC721Ids",
        outputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "reserveStatus",
        outputs: [
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
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "discount",
            type: "uint256"
          }
        ],
        name: "setBondingDiscountForERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "discount",
            type: "uint256"
          }
        ],
        name: "setBondingDiscountForERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256"
          }
        ],
        name: "setBondingVestingForERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256"
          }
        ],
        name: "setBondingVestingForERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setERC20BondingLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setERC20RedeemLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "minBacking_",
            type: "uint256"
          }
        ],
        name: "setMinBacking",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "pendingOwner_",
            type: "address"
          }
        ],
        name: "setPendingOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenOracle_",
            type: "address"
          }
        ],
        name: "setTokenOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "vestingVault_",
            type: "address"
          }
        ],
        name: "setVestingVault",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "discount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256"
          }
        ],
        name: "setupAndListERC20Bond",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setupAndListERC20Redemption",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "discount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256"
          }
        ],
        name: "setupAndListERC721IdBond",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "setupAndListERC721IdRedemption",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "token",
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
        name: "tokenOracle",
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
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "updateOracleForERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "updateOracleForERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "vestingVault",
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
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "withdrawERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        name: "withdrawERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ]
  },
  Treasury: {
    address: "0xEAc68B2e33fA3dbde9bABf3edF17ed3437f3D992",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [],
        name: "InvalidAmount",
        type: "error"
      },
      {
        inputs: [],
        name: "InvalidPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "InvalidRecipient",
        type: "error"
      },
      {
        inputs: [],
        name: "MaxSupplyReached",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByPendingOwner",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "Treasury__ERC20BondingLimitExceeded",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "Treasury__ERC20IsNotBondable",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "Treasury__ERC20IsNotRedeemable",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "Treasury__ERC20IsNotRegistered",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "Treasury__ERC20RedeemLimitExceeded",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "Treasury__ERC721IdIsNotBondable",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "Treasury__ERC721IdIsNotRedeemable",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "Treasury__ERC721IdIsNotRegistered",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "Treasury__StaleERC20PriceDeliveredByOracle",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "Treasury__StaleERC721IdPriceDeliveredByOracle",
        type: "error"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "value",
            type: "uint256"
          }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20DelistedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20DelistedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20ListedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20ListedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "address",
            name: "oldOracle",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "address",
            name: "newOracle",
            type: "address"
          }
        ],
        name: "ERC20OracleUpdated",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oracle",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldPrice",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newPrice",
            type: "uint256"
          }
        ],
        name: "ERC20PriceUpdated",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oracle",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "enum Treasury.AssetType",
            name: "assetType",
            type: "uint8"
          }
        ],
        name: "ERC20Registered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "ERC20Unregistered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "erc20sWithdrawn",
            type: "uint256"
          }
        ],
        name: "ERC20Withdrawn",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "who",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "kttsMinted",
            type: "uint256"
          }
        ],
        name: "ERC20sBonded",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "who",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "kttsBurned",
            type: "uint256"
          }
        ],
        name: "ERC20sRedeemed",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdDelistedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdDelistedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdListedAsBondable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdListedAsRedeemable",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "address",
            name: "oldOracle",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "address",
            name: "newOracle",
            type: "address"
          }
        ],
        name: "ERC721IdOracleUpdated",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oracle",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldPrice",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newPrice",
            type: "uint256"
          }
        ],
        name: "ERC721IdPriceUpdated",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "ERC721IdRegistered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "ERC721IdUnregistered",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        name: "ERC721IdWithdrawn",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "who",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "kttsMinted",
            type: "uint256"
          }
        ],
        name: "ERC721IdsBonded",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "who",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "kttsBurned",
            type: "uint256"
          }
        ],
        name: "ERC721IdsRedeemed",
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
        name: "NewOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "previousPendingOwner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newPendingOwner",
            type: "address"
          }
        ],
        name: "NewPendingOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "uint256",
            name: "epoch",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newScalar",
            type: "uint256"
          }
        ],
        name: "Rebase",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldLimit",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newLimit",
            type: "uint256"
          }
        ],
        name: "SetERC20BondingLimit",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "oldLimit",
            type: "uint256"
          },
          {
            indexed: !1,
            internalType: "uint256",
            name: "newLimit",
            type: "uint256"
          }
        ],
        name: "SetERC20RedeemLimit",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
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
            name: "value",
            type: "uint256"
          }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
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
        name: "EIP712_DOMAIN",
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
        name: "EIP712_REVISION",
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
        inputs: [],
        name: "PERMIT_TYPEHASH",
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
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "allRegisteredERC20s",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "allRegisteredERC721Ids",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "erc721",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256"
              }
            ],
            internalType: "struct Treasury.ERC721Id[]",
            name: "",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner_",
            type: "address"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          }
        ],
        name: "allowance",
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
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256"
          }
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "",
            type: "address"
          }
        ],
        name: "assetTypeOfERC20",
        outputs: [
          {
            internalType: "enum Treasury.AssetType",
            name: "",
            type: "uint8"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "who",
            type: "address"
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
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "bondERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "bondERC721Id",
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
          }
        ],
        name: "bondingLimitPerERC20",
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
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256"
          }
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "erc20",
            type: "address"
          }
        ],
        name: "delistERC20AsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "delistERC20AsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "delistERC20AsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "delistERC721IdAsBondable",
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
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        name: "executeTx",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256"
          }
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "",
            type: "address"
          }
        ],
        name: "isERC20Bondable",
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
            name: "",
            type: "address"
          }
        ],
        name: "isERC20Redeemable",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "isERC721IdBondable",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "isERC721IdRedeemable",
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
            name: "erc20",
            type: "address"
          }
        ],
        name: "listERC20AsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          }
        ],
        name: "listERC20AsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "listERC721IdAsBondable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "listERC721IdAsRedeemable",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "name",
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
            name: "who",
            type: "address"
          }
        ],
        name: "nonces",
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
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "address",
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes"
          }
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4"
          }
        ],
        stateMutability: "pure",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "oraclePerERC20",
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
            name: "",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "oraclePerERC721Id",
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
        name: "pendingOwner",
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
            name: "owner",
            type: "address"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8"
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32"
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32"
          }
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "rebase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "kttWad",
            type: "uint256"
          }
        ],
        name: "redeemERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "redeemERC721Id",
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
          }
        ],
        name: "redeemLimitPerERC20",
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
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          },
          {
            internalType: "enum Treasury.AssetType",
            name: "assetType",
            type: "uint8"
          }
        ],
        name: "registerERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "registerERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "registeredERC20s",
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
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "registeredERC721Ids",
        outputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
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
            name: "who",
            type: "address"
          }
        ],
        name: "scaledBalanceOf",
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
        name: "scaledTotalSupply",
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
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setERC20BondingLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setERC20RedeemLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "pendingOwner_",
            type: "address"
          }
        ],
        name: "setPendingOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setupAndListERC20Bond",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "limit",
            type: "uint256"
          }
        ],
        name: "setupAndListERC20Redemption",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "symbol",
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
        inputs: [],
        name: "totalSupply",
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
        name: "totalValuation",
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
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256"
          }
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
          }
        ],
        name: "transferAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          }
        ],
        name: "transferAllFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "tokens",
            type: "uint256"
          }
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
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
            name: "erc20",
            type: "address"
          }
        ],
        name: "unregisterERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "unregisterERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "updateERC20Oracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "oracle",
            type: "address"
          }
        ],
        name: "updateERC721IdOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc20",
            type: "address"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "withdrawERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "erc721",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        name: "withdrawERC721Id",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ]
  },
  "Kolektivo Curacao Token": {
    address: "0x799aC807A4163899c09086A6C69490f6AecD65Cb",
    abi: "ERC20"
  },
  "Kolektivo Treasury Token": {
    address: "0xEAc68B2e33fA3dbde9bABf3edF17ed3437f3D992",
    abi: "ERC20"
  },
  "Test Token #1": {
    address: "0x8E7Af361418CDAb43333c6Bd0fA6906285C0E272",
    abi: "ERC20"
  },
  "Test Token #2": {
    address: "0x57f046C697B15D0933605F12152c5d96cB6f9cc5",
    abi: "ERC20"
  },
  "Test Token #3": {
    address: "0x32dB9295556D2B5193FD404253a4a3fD206B754b",
    abi: "ERC20"
  },
  "GeoNFT #1": {
    address: "0x3d088f32d7d83FD7868620f76C80604106b74702",
    id: 1,
    abi: "ERC721"
  },
  "GeoNFT #2": {
    address: "0x3d088f32d7d83FD7868620f76C80604106b74702",
    id: 2,
    abi: "ERC721"
  },
  VestingVault: {
    address: "0x0000000000000000000000000000000000000000",
    abi: [
      {
        inputs: [],
        name: "InvalidPendingOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByOwner",
        type: "error"
      },
      {
        inputs: [],
        name: "OnlyCallableByPendingOwner",
        type: "error"
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
        name: "NewOwner",
        type: "event"
      },
      {
        anonymous: !1,
        inputs: [
          {
            indexed: !0,
            internalType: "address",
            name: "previousPendingOwner",
            type: "address"
          },
          {
            indexed: !0,
            internalType: "address",
            name: "newPendingOwner",
            type: "address"
          }
        ],
        name: "NewPendingOwner",
        type: "event"
      },
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256"
          }
        ],
        name: "depositFor",
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
        name: "pendingOwner",
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
            name: "pendingOwner_",
            type: "address"
          }
        ],
        name: "setPendingOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "token",
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
            name: "recipient",
            type: "address"
          }
        ],
        name: "unvestedFor",
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
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        name: "vestedFor",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ]
  }
}, a = {
  name: e,
  chainId: n,
  contracts: t
};
export {
  n as chainId,
  t as contracts,
  a as default,
  e as name
};
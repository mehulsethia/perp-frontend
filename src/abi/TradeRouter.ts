export const TradeRouterABI = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "profitToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSL",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct TradeRouter.DecreasePositionRequest",
        name: "request",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cancelTime",
        type: "uint256",
      },
    ],
    name: "CancelDecreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "multiplier",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct TradeRouter.IncreasePositionRequest",
        name: "request",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cancelTime",
        type: "uint256",
      },
    ],
    name: "CancelIncreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSL",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accountIndex",
        type: "uint256",
      },
    ],
    name: "CreateDecreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accountIndex",
        type: "uint256",
      },
    ],
    name: "CreateIncreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
    ],
    name: "EditDecreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
    ],
    name: "EditIncreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "profitToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSL",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct TradeRouter.DecreasePositionRequest",
        name: "request",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionTime",
        type: "uint256",
      },
    ],
    name: "ExecuteDecreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "multiplier",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct TradeRouter.IncreasePositionRequest",
        name: "request",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionTime",
        type: "uint256",
      },
    ],
    name: "ExecuteIncreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "maxIncreasePositionDelay",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maxDecreasePositionDelay",
        type: "uint256",
      },
    ],
    name: "MaxDelayUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "oldMinExecutionFee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "newMinExecutionFee",
        type: "uint256",
      },
    ],
    name: "MinExecutionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldManager",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newManager",
        type: "address",
      },
    ],
    name: "TradeManagerSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allowedTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "cancelDecreasePosition",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "cancelIncreasePosition",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tpPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
    ],
    name: "createDecreasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tpPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
    ],
    name: "createIncreasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "pythUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limitPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
    ],
    name: "decreasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "decreasePositionKeyStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "decreasePositionRequestKeys",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "decreasePositionRequests",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isSL",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "decreasePositionsIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "newExecutionPrice",
        type: "uint256",
      },
    ],
    name: "editDecreasePosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "newExecutionPrice",
        type: "uint256",
      },
    ],
    name: "editIncreasePosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "pythUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "feeReceiver",
        type: "address",
      },
    ],
    name: "executeDecreasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "executeDecreasePositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "pythUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "feeReceiver",
        type: "address",
      },
    ],
    name: "executeIncreasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "executeIncreasePositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getRequestKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserDecreaseRequests",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "profitToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSL",
            type: "bool",
          },
        ],
        internalType: "struct TradeRouter.DecreasePositionRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserIncreaseRequests",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint32",
            name: "assetIndex",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "multiplier",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        internalType: "struct TradeRouter.IncreasePositionRequest[]",
        name: "requests",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "pythUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limitPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "increasePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "increasePositionKeyStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "increasePositionRequestKeys",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "increasePositionRequests",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "increasePositionsIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tradeManager",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "pythUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "liquidatePosition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxDecreasePositionDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxIncreasePositionDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minExecutionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxIncreasePositionDelay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxDecreasePositionDelay",
        type: "uint256",
      },
    ],
    name: "setMaxDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minExecutionFee",
        type: "uint256",
      },
    ],
    name: "setMinExecutionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tradeManager",
        type: "address",
      },
    ],
    name: "setTradeManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenIsAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeManager",
    outputs: [
      {
        internalType: "contract ITradeManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

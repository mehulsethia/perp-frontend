export const TradeManagerABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
    ],
    name: "AssetAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
    ],
    name: "AssetRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allowIncrease",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allowDecrease",
        type: "bool",
      },
    ],
    name: "AssetUpdated",
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
        internalType: "bool",
        name: "isAuthorized",
        type: "bool",
      },
    ],
    name: "AuthorizationUpdated",
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
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
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
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateralReleased",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "profitToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profitReleased",
        type: "uint256",
      },
    ],
    name: "DecreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "baseCloseFees",
        type: "uint256",
      },
    ],
    name: "FeesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "fundingRate",
        type: "int256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "fundingInterval",
        type: "uint256",
      },
    ],
    name: "FundingRateParametersUpdated",
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
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
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
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "IncreasePosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "positionHolder",
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
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "LiquidatedPosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "liquidationPercent",
        type: "uint256",
      },
    ],
    name: "LiquidationPercentUpdated",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    name: "PriceFeedSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "rolloverCoefficient",
        type: "uint256",
      },
    ],
    name: "RolloverCoefficientUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32[]",
        name: "assetIndexes",
        type: "uint32[]",
      },
      {
        internalType: "uint256[]",
        name: "rolloverCoefficients",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_priceFeeds",
        type: "address[]",
      },
    ],
    name: "addAssets",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assetFeeMap",
    outputs: [
      {
        internalType: "int256",
        name: "fundingFeeAccrued",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "rolloverFeeAccrued",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rolloverCoefficient",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rolloverLastUpdate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundingLastUpdate",
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
    name: "assetList",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "assetMap",
    outputs: [
      {
        internalType: "uint256",
        name: "sumLong",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sumShort",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "allowIncrease",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "allowDecrease",
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
    name: "authorized",
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
    name: "baseCloseFees",
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
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_rolloverCoefficient",
        type: "uint256",
      },
    ],
    name: "changeRolloverCoefficient",
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
    name: "collateralOI",
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
        name: "account",
        type: "address",
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
        internalType: "bool",
        name: "isSL",
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
    name: "decreasePositionFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingInterval",
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
    name: "fundingRate",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAssetData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "sumLong",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sumShort",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "allowIncrease",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "allowDecrease",
            type: "bool",
          },
        ],
        internalType: "struct TradeManager.Asset[]",
        name: "assets",
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
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "getCollateralOI",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateral",
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
    name: "getDecreasePositionResult",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToRelease",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "profitAccrued",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolFees",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
    ],
    name: "getFundingFee",
    outputs: [
      {
        internalType: "int256",
        name: "fundingFee",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "positionKeys",
        type: "bytes32[]",
      },
    ],
    name: "getLiquidationPrices",
    outputs: [
      {
        internalType: "uint256[]",
        name: "liquidationPrices",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "positionKeys",
        type: "bytes32[]",
      },
    ],
    name: "getMultipleUserPositions",
    outputs: [
      {
        components: [
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
            name: "avgPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "units",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "entryRolloverFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "entryFundingFee",
            type: "int256",
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
            name: "account",
            type: "address",
          },
        ],
        internalType: "struct TradeManager.UserPosition[]",
        name: "positions",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "assetIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
    ],
    name: "getPositionKey",
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
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getPositionKeys",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "positionKeys",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
    ],
    name: "getPrice",
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
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
    ],
    name: "getRolloverFee",
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
        components: [
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
            name: "avgPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "units",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "entryRolloverFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "entryFundingFee",
            type: "int256",
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
            name: "account",
            type: "address",
          },
        ],
        internalType: "struct TradeManager.UserPosition",
        name: "userPosition",
        type: "tuple",
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
    ],
    name: "getUserFundingFees",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getUserPositionData",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "positionKeys",
        type: "bytes32[]",
      },
      {
        components: [
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
            name: "avgPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "units",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "entryRolloverFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "entryFundingFee",
            type: "int256",
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
            name: "account",
            type: "address",
          },
        ],
        internalType: "struct TradeManager.UserPosition[]",
        name: "positions",
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
        name: "account",
        type: "address",
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
    name: "increasePositionFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_liquidityManager",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidationPercent",
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
    name: "liquidityManager",
    outputs: [
      {
        internalType: "contract ILiquidityManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLeverageMultiplier",
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
    name: "maxProfitMultiplier",
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
    name: "minCollateral",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "positionKeyList",
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
    name: "positionKeyMap",
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
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "priceFeeds",
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
        internalType: "uint256",
        name: "listIndex",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "assetIndex",
        type: "uint32",
      },
    ],
    name: "removeAsset",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isAuthorized",
        type: "bool",
      },
    ],
    name: "setAuthorizedAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseCloseFees",
        type: "uint256",
      },
    ],
    name: "setFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_fundingRate",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "_fundingInterval",
        type: "uint256",
      },
    ],
    name: "setFundingRateParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_liquidationPercent",
        type: "uint256",
      },
    ],
    name: "setLiquidationPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_liquidityManager",
        type: "address",
      },
    ],
    name: "setLiquidityManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxLeverageMultiplier",
        type: "uint256",
      },
    ],
    name: "setMaxLeverageMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxProfitMultiplier",
        type: "uint256",
      },
    ],
    name: "setMaxProfitMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minCollateral",
        type: "uint256",
      },
    ],
    name: "setMinCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_assetIndex",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    name: "setPriceFeed",
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
    inputs: [],
    name: "unpause",
    outputs: [],
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
        internalType: "bool",
        name: "allowIncrease",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "allowDecrease",
        type: "bool",
      },
    ],
    name: "updateAsset",
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userPositionKeyList",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "userPositionKeyMap",
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
        name: "",
        type: "bytes32",
      },
    ],
    name: "userPositions",
    outputs: [
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
        name: "avgPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "units",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entryRolloverFee",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "entryFundingFee",
        type: "int256",
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
        name: "account",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        name: "limitPrice",
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
    name: "validateDecreasePosition",
    outputs: [
      {
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
        name: "limitPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "multiplier",
        type: "uint256",
      },
    ],
    name: "validateIncreasePosition",
    outputs: [
      {
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

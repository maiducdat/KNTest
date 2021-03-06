const CONSTANTS = {
  PRECISION: 6,
  TIME_TO_UPDATE_RATE: 10000,
  NETWORK_MIN_ACCEPT_AMOUNT: 0.5,
  NETWORK_ADDRESS: "0x818E6FECD516Ecc3849DAf6845e3EC868087B755",
  WRAPPER_ADDRESS: "0x665d34f192f4940da4e859ff7768c0a80ed3ae10",
  KYBER_NETWORK: [{ "constant": false, "inputs": [{ "name": "alerter", "type": "address" }], "name": "removeAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "enabled", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOperators", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "destAddress", "type": "address" }, { "name": "maxDestAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }, { "name": "walletId", "type": "address" }, { "name": "hint", "type": "bytes" }], "name": "tradeWithHint", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapTokenToEther", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "maxGasPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAlerter", "type": "address" }], "name": "addAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kyberNetworkContract", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "user", "type": "address" }], "name": "getUserCapInWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapTokenToToken", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "claimAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapEtherToToken", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdminQuickly", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAlerters", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "src", "type": "address" }, { "name": "dest", "type": "address" }, { "name": "srcQty", "type": "uint256" }], "name": "getExpectedRate", "outputs": [{ "name": "expectedRate", "type": "uint256" }, { "name": "slippageRate", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "user", "type": "address" }, { "name": "token", "type": "address" }], "name": "getUserCapInTokenWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOperator", "type": "address" }], "name": "addOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_kyberNetworkContract", "type": "address" }], "name": "setKyberNetworkContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "operator", "type": "address" }], "name": "removeOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "field", "type": "bytes32" }], "name": "info", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "destAddress", "type": "address" }, { "name": "maxDestAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }, { "name": "walletId", "type": "address" }], "name": "trade", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "token", "type": "address" }, { "name": "user", "type": "address" }], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_admin", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "trader", "type": "address" }, { "indexed": false, "name": "src", "type": "address" }, { "indexed": false, "name": "dest", "type": "address" }, { "indexed": false, "name": "actualSrcAmount", "type": "uint256" }, { "indexed": false, "name": "actualDestAmount", "type": "uint256" }], "name": "ExecuteTrade", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newNetworkContract", "type": "address" }, { "indexed": false, "name": "oldNetworkContract", "type": "address" }], "name": "KyberNetworkSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "TokenWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "EtherWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pendingAdmin", "type": "address" }], "name": "TransferAdminPending", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAdmin", "type": "address" }, { "indexed": false, "name": "previousAdmin", "type": "address" }], "name": "AdminClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAlerter", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "AlerterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newOperator", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "OperatorAdded", "type": "event" }],
  KYBER_WRAPPER: [{ "constant": true, "inputs": [{ "name": "x", "type": "bytes14" }, { "name": "byteInd", "type": "uint256" }], "name": "getInt8FromByte", "outputs": [{ "name": "", "type": "int8" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [{ "name": "reserve", "type": "address" }, { "name": "tokens", "type": "address[]" }], "name": "getBalances", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "pricingContract", "type": "address" }, { "name": "TOKEN_LIST", "type": "address[]" }], "name": "getTokenIndicies", "outputs": [{ "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "x", "type": "bytes14" }, { "name": "byteInd", "type": "uint256" }], "name": "getByteFromBytes14", "outputs": [{ "name": "", "type": "bytes1" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [{ "name": "network", "type": "address" }, { "name": "sources", "type": "address[]" }, { "name": "dests", "type": "address[]" }, { "name": "qty", "type": "uint256[]" }], "name": "getExpectedRates", "outputs": [{ "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "pricingContract", "type": "address" }, { "name": "TOKEN_LIST", "type": "address[]" }], "name": "getTokenRates", "outputs": [{ "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "int8[]" }, { "name": "", "type": "int8[]" }, { "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }],
  TOKEN_LIST: [
    {
      "symbol": "ETH",
      "name": "Ethereum",
      "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "decimals": 18,
      "cg_id": "ethereum",
      "gasLimit": "0",
      "rate": 0,
      "minRate": 0,
      "rateEth": "1000000000000000000",
      "minRateEth": "970000000000000000",
      "balance": 0,
      "rateUSD": "593.623300"
    },
    {
      "symbol": "KNC",
      "name": "KyberNetwork",
      "address": "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6",
      "decimals": 18,
      "cg_id": "kyber-network",
      "rate": "2603919999999999",
      "minRate": "2525802399999999",
      "rateEth": "368905346628000000000",
      "minRateEth": "357838186229160000000",
      "balance": 0,
      "rateUSD": "1.545748"
    },
    {
      "symbol": "OMG",
      "name": "OmiseGO",
      "address": "0x4bfba4a8f28755cb2061c413459ee562c6b9c51b",
      "decimals": 18,
      "cg_id": "omisego",
      "rate": "19928400000000000",
      "minRate": "19330548000000000",
      "rateEth": "49612610068000000000",
      "minRateEth": "48124231765960000000",
      "balance": 0,
      "rateUSD": "11.82996"
    },
    {
      "symbol": "EOS",
      "name": "Eos",
      "address": "0xd5b4218b950a53ff07985e2d88346925c335eae7",
      "decimals": 18,
      "cg_id": "eos",
      "rate": "25367500000000000",
      "minRate": "24606475000000000",
      "rateEth": "39377157428000000000",
      "minRateEth": "38195842705160000000",
      "balance": 0,
      "rateUSD": "15.05874"
    },
    {
      "symbol": "SNT",
      "name": "Status",
      "address": "0xbf5d8683b9be6c43fca607eb2a6f2626a18837a6",
      "decimals": 18,
      "cg_id": "status",
      "rate": "174589999999999",
      "minRate": "169352299999999",
      "rateEth": "5686465434648000000000",
      "minRateEth": "5515871471608560000000",
      "balance": 0,
      "rateUSD": "0.103641"
    },
    {
      "symbol": "ELF",
      "name": "Aelf",
      "address": "0x9fcc27c7320703c43368cf1a4bf076402cd0d6b4",
      "decimals": 18,
      "cg_id": "aelf",
      "rate": "1890569999999999",
      "minRate": "1833852899999999",
      "rateEth": "527089716465000000000",
      "minRateEth": "511277024971050000000",
      "balance": 0,
      "rateUSD": "1.122286"
    },
    {
      "symbol": "POWR",
      "name": "Power Ledger",
      "address": "0xa577731515303f0c0d00e236041855a5c4f114dc",
      "decimals": 6,
      "cg_id": "power-ledger",
      "rate": "580350000000000",
      "minRate": "562939500000000",
      "rateEth": "1687429990000000000000",
      "minRateEth": "1636807090300000000000",
      "balance": 0,
      "rateUSD": "0.344509"
    },
    {
      "symbol": "MANA",
      "name": "Mana",
      "address": "0x72fd6c7c1397040a66f33c2ecc83a0f71ee46d5c",
      "decimals": 18,
      "cg_id": "decentraland",
      "rate": "178479999999999",
      "minRate": "173125599999999",
      "rateEth": "5576535187251000000000",
      "minRateEth": "5409239131633470000000",
      "balance": 0,
      "rateUSD": "0.105950"
    },
    {
      "symbol": "BAT",
      "name": "Basic Attention Token",
      "address": "0xdb0040451f373949a4be60dcd7b6b8d6e42658b6",
      "decimals": 18,
      "cg_id": "basic-attention-token",
      "rate": "484449999999999",
      "minRate": "469916499999999",
      "rateEth": "2061100215235000000000",
      "minRateEth": "1999267208777950000000",
      "balance": 0,
      "rateUSD": "0.287581"
    },
    {
      "symbol": "REQ",
      "name": "Request",
      "address": "0xb43d10bbe7222519da899b72bf2c7f094b6f79d7",
      "decimals": 18,
      "cg_id": "request-network",
      "rate": "251549999999999",
      "minRate": "244003499999999",
      "rateEth": "3945935199206000000000",
      "minRateEth": "3827557143229820000000",
      "balance": 0,
      "rateUSD": "0.149326"
    },
    {
      "symbol": "GTO",
      "name": "Gifto",
      "address": "0xe55c607d58c53b2b06a8e38f67f4c0fcaeed2c31",
      "decimals": 5,
      "cg_id": "gifto",
      "rate": "437280000000000",
      "minRate": "424161600000000",
      "rateEth": "2273829100000000000000",
      "minRateEth": "2205614227000000000000",
      "balance": 0,
      "rateUSD": "0.259580"
    },
    {
      "symbol": "RDN",
      "name": "Raiden",
      "address": "0x5422ef695ed0b1213e2b953cfa877029637d9d26",
      "decimals": 18,
      "cg_id": "raiden-network",
      "rate": "2438649999999999",
      "minRate": "2365490499999999",
      "rateEth": "406618411304000000000",
      "minRateEth": "394419858964880000000",
      "balance": 0,
      "rateUSD": "1.447639"
    },
    {
      "symbol": "APPC",
      "name": "AppCoins",
      "address": "0x2799f05b55d56be756ca01af40bf7350787f48d4",
      "decimals": 18,
      "cg_id": "appcoins",
      "rate": "626579999999999",
      "minRate": "607782599999999",
      "rateEth": "1585591624900000000000",
      "minRateEth": "1538023876153000000000",
      "balance": 0,
      "rateUSD": "0.371952"
    },
    {
      "symbol": "ENG",
      "name": "Enigma",
      "address": "0x95cc8d8f29d0f7fcc425e8708893e759d1599c97",
      "decimals": 8,
      "cg_id": "enigma",
      "rate": "3470390000000000",
      "minRate": "3366278300000000",
      "rateEth": "287229963400000000000",
      "minRateEth": "278613064498000000000",
      "balance": 0,
      "rateUSD": "2.060104"
    },
    {
      "symbol": "SALT",
      "name": "Salt",
      "address": "0xb47f1a9b121ba114d5e98722a8948e274d0f4042",
      "decimals": 8,
      "cg_id": "salt",
      "rate": "3519120000000000",
      "minRate": "3413546400000000",
      "rateEth": "280922503700000000000",
      "minRateEth": "272494828589000000000",
      "balance": 0,
      "rateUSD": "2.089032"
    },
    {
      "symbol": "BQX",
      "name": "Ethos",
      "address": "0x9504a86a881f63da06302fb3639d4582022097db",
      "decimals": 8,
      "cg_id": "ethos",
      "rate": "4061950000000000",
      "minRate": "3940091500000000",
      "rateEth": "245251668700000000000",
      "minRateEth": "237894118639000000000",
      "balance": 0,
      "rateUSD": "2.411268"
    },
    {
      "symbol": "ADX",
      "name": "AdEx",
      "address": "0x499990db50b34687cdafb2c8dabae4e99d6f38a7",
      "decimals": 4,
      "cg_id": "adex",
      "rate": "1085140000000000",
      "minRate": "1052585800000000",
      "rateEth": "921540000000000000000",
      "minRateEth": "893893800000000000000",
      "balance": 0,
      "rateUSD": "0.644164"
    },
    {
      "symbol": "AST",
      "name": "AirSwap",
      "address": "0xef06f410c26a0ff87b3a43927459cce99268a2ef",
      "decimals": 4,
      "cg_id": "airswap",
      "rate": "485930000000000",
      "minRate": "471352100000000",
      "rateEth": "2047002000000000000000",
      "minRateEth": "1985591940000000000000",
      "balance": 0,
      "rateUSD": "0.288459"
    },
    {
      "symbol": "RCN",
      "name": "Ripio Credit Network",
      "address": "0x99338aa9218c6c23aa9d8cc2f3efaf29954ea26b",
      "decimals": 18,
      "cg_id": "ripio-credit-network",
      "rate": "155230000000000",
      "minRate": "150573100000000",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.092148"
    },
    {
      "symbol": "ZIL",
      "name": "Zilliqa",
      "address": "0xad78afbbe48ba7b670fbc54c65708cbc17450167",
      "decimals": 12,
      "cg_id": "zilliqa",
      "rate": "199130000000000",
      "minRate": "193156100000000",
      "rateEth": "5009792601928000000000",
      "minRateEth": "4859498823870160000000",
      "balance": 0,
      "rateUSD": "0.118208"
    },
    {
      "symbol": "DAI",
      "name": "DAI",
      "address": "0xad6d458402f60fd3bd25163575031acdce07538d",
      "decimals": 18,
      "cg_id": "dai",
      "rate": "1684570000000000",
      "minRate": "1634032900000000",
      "rateEth": "593623300000000000000",
      "minRateEth": "575814601000000000000",
      "balance": 0,
      "rateUSD": "1.000000"
    },
    {
      "symbol": "LINK",
      "name": "Chain Link",
      "address": "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      "decimals": 18,
      "cg_id": "chainlink",
      "rate": "624000000000000",
      "minRate": "605280000000000",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.370421"
    },
    {
      "symbol": "STORM",
      "name": "Storm",
      "address": "0x8fff7de21de8ad9c510704407337542073fdc44b",
      "decimals": 18,
      "cg_id": "storm",
      "listing_time": 1539077021,
      "rate": "58419999999999",
      "minRate": "56667399999999",
      "rateEth": "17117425540000000000000",
      "minRateEth": "16603902773800000000000",
      "balance": 0,
      "rateUSD": "0.034679"
    },
    {
      "symbol": "COFI",
      "name": "ConFi",
      "address": "0xb91786188f8d4e35d6d67799e9f162587bf4da03",
      "decimals": 18,
      "cg_id": "coinfi",
      "rate": "0",
      "minRate": "0",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.000000"
    },
    {
      "symbol": "BITX",
      "name": "BitScreenerToken",
      "address": "0x7a17267576318efb728bc4a0833e489a46ba138f",
      "decimals": 18,
      "cg_id": "bitscreener",
      "rate": "0",
      "minRate": "0",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.000000"
    },
    {
      "symbol": "MOC",
      "name": "Moss Land",
      "address": "0x1742c81075031b8f173d2327e3479d1fc3feaa76",
      "decimals": 18,
      "cg_id": "mossland",
      "rate": "0",
      "minRate": "0",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.000000"
    },
    {
      "symbol": "MAS",
      "name": "MidasProtocol Ropsten",
      "address": "0xc2c37d1a2cdd601ce665c4a785074670657f83ac",
      "decimals": 18,
      "cg_id": "midas-protocol",
      "rate": "0",
      "minRate": "0",
      "rateEth": "0",
      "minRateEth": "0",
      "balance": 0,
      "rateUSD": "0.000000"
    },
    {
      "symbol": "KAT",
      "name": "Kambria Token",
      "address": "0xef75e34c50c1b109fe65ee696f12225de508b9f2",
      "decimals": 18,
      "cg_id": "kambria",
      "rate": "30222448779916",
      "minRate": "29315775316518",
      "rateEth": "32899781582281756245250",
      "minRateEth": "31912788134813303557892",
      "balance": 0,
      "rateUSD": "0.017941"
    },
    {
      "symbol": "UPP",
      "name": "Sentinel Protocol",
      "address": "0xade0e0ed3ec60c7124ddc88c410af671493dc949",
      "decimals": 18,
      "cg_id": "sentinel-protocol",
      "rate": "110461917243626",
      "minRate": "107148059726317",
      "rateEth": "8998709580231418165090",
      "minRateEth": "8728748292824475620137",
      "balance": 0,
      "rateUSD": "0.065573"
    },
    {
      "symbol": "SPN",
      "name": "Sapien Network",
      "address": "0x7f7992a21e333baeeab065d54829122173caceb7",
      "decimals": 6,
      "cg_id": "sapien",
      "rate": "10040865262796",
      "minRate": "9739639304912",
      "rateEth": "99026521890000000000000",
      "minRateEth": "96055726233300000000000",
      "balance": 0,
      "rateUSD": "0.005960"
    },
    {
      "symbol": "HKN",
      "name": "Hacken",
      "address": "0x4aefa5bded67f5842ade8f025a738cb3363b7499",
      "decimals": 8,
      "cg_id": "hacken",
      "rate": "70946919193976",
      "minRate": "68818511618156",
      "rateEth": "14010681848400000000000",
      "minRateEth": "13590361392948000000000",
      "balance": 0,
      "rateUSD": "0.042116"
    }
  ]
};

export default CONSTANTS;
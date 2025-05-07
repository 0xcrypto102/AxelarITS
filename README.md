## Run the `newInterchainToken.js` script to deploy to BSC

```
FUNCTION_NAME=registerAndDeploy npx hardhat run newInterchainToken.js --network bsc
```

Result

```
Deployed Token ID: 0x5a482747c9ec017a79049622f29da25b498a5570558881125c78ad8833105d24,
Token Address: 0x80288bcC567de55fc13a2dAA2650E8b59eE48904,
Transaction Hash: 0x481818691c8cfeb7970ab9be29f661cf8a2436d534cd44acfd24e4ede917396b,
salt: 0x076bf543d47a1c734acfc0876fd0e87c7bc75e1b6f2cd00474d767d28ebd8588,
Expected Token Manager Address: 0x41dAFB4C9FDfb8DfE03950713D253d1e8a68A09a,
```

[View Transaction on BscScan](https://testnet.bscscan.com/tx/0x481818691c8cfeb7970ab9be29f661cf8a2436d534cd44acfd24e4ede917396b)

## Run the `newInterchainToken`.js script to deploy to Moonbeam

```
FUNCTION_NAME=deployToRemoteChain npx hardhat run newInterchainToken.js --network bsc
```

Result

```
Transaction Hash: 0x0bf4e565c82d58a16390c7099ca55720255b4f70d70d4eae68a84184dd7a5ec4
```

[Axelarscan testnet scanner](https://testnet.axelarscan.io/gmp/0x0bf4e565c82d58a16390c7099ca55720255b4f70d70d4eae68a84184dd7a5ec4)


## Run the `newInterchainToken.js` script to transfer tokens

```
FUNCTION_NAME=transferTokens npx hardhat run newInterchainToken.js --network bsc
```

Result

```
Transfer Transaction Hash: 0x03caad7443302dd190e70195211a9a42896b8ddfc88656232b93f8061f806a05
```

[Axelarscan testnet scanner](https://testnet.axelarscan.io/gmp/0x03caad7443302dd190e70195211a9a42896b8ddfc88656232b93f8061f806a05)


## NIT(Test Token) Token Amount in wallet

```
https://moonbase.moonscan.io/token/0x80288bcc567de55fc13a2daa2650e8b59ee48904?a=0x2f3f295370de918Dab1B17E46d572443A0310e81


https://testnet.bscscan.com/token/0x80288bcc567de55fc13a2daa2650e8b59ee48904
```


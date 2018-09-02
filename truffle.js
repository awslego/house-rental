const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeysECS = ["afd2168f63635b5235cc8b4d69730faa4ffbea5cfcfab7b7d7625f91656e7d9f"]; // private keys
const privateKeysDocker = ["6a6bcb35fe927a5f4efd6e9ca7def47cae3a0d2d0a757ef1cd2c6f28c3b5ebcf"]; // private keys
const privateKeysNode = ["446fbba87648ed7cbfb410e1fdc97ceb8a79b8f69e5094a1befd9b248cdc9175"]; // private keys


module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        awsNetwork: {
                provider: () => {
                return new HDWalletProvider(privateKeysECS, "http://52.24.70.179:8082/private-ethereum-prd")
            },
            network_id: 1234,
            gasLimit: 9999999999,
            gas: 300000,
            gasPrice: 65000000000
        }
    }
};

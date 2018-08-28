const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = ["afd2168f63635b5235cc8b4d69730faa4ffbea5cfcfab7b7d7625f91656e7d9f"]; // private keys

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        awsNetwork: {
            provider: () => {
                return new HDWalletProvider(privateKeys, "http://52.24.70.179:8082/private-ethereum-prd")
            },
            network_id: 1500,
            gas: 300000
        }
    }
};

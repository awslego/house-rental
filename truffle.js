const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
var mnemonic = "right limb chimney safe slam fan proof swim solar someone bottom winner";
const privateKeys = ["63346cd6e6a6fc5acf5a5d3d7efe0b51160f7fdee06c567c8e50f52c61bbac38"]; // private keys

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        awsNetwork: {
            provider: () => {
                return new HDWalletProvider(privateKeys, "http://127.0.0.1")
            },
            port: 8545,
            network_id: 1234
        }
    }
};

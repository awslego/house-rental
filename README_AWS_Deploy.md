# 'House Rental' dApp 
이더리움 dApp개발을 위한 truffle 튜토리얼 중 pet-shop을 기반으로 로컬 개발환경에서 Smart Contract 개발, 컨트랙트 테스트를 한뒤, 
운영 환경인 AWS에 마이그레이션하는 실습입니다.

## Part 5: AWS 운영 환경에 배포하기 

### 5.1. Truffle HDWallet Provider Private Key 설치하기  

```
npm install truffle-hdwallet-provider-privkey
```

### 5.2. truffle.js 파일에 AWS 네트워크 추가하기
```
$ vi truffle.js
```

코드를 아래와 같이 수정하세요.
```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = ["446fbba87648ed7cbfb410e1fdc97ceb8a79b8f69e5094a1befd9b248cdc9175"]; // private keys

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        awsNetwork: {
            provider: () => {
                return new HDWalletProvider(privateKeys, "http://<your-public-IP>:8545")
            },
            network_id: "*",
            gas: 300000
        }
    }
};
```

### 5.3. Smart Contract를 AWS Blockchain에 배포하기  
```
$ truffle migrate --network awsNetwork
```

✔︎ 다음과 같은 결과가 출력됩니다.
```
Using network 'awsNetwork'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xbf7fbfbd756c8c04125d3c3f408b4678834bd399d1b300f3c723d45ca8a2dde2
  Migrations: 0x0244afc4f2ccd12a4f7b5bc038ccc74962c96a57
Saving successful migration to network...
  ... 0x6d04ddaf491eeb04f3ccbc1e751e3033487ed156f703d2107cef8a12456b0c6d
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying LeaseProperty...
  ... 0x5f8c09ec0cd0420650b4721f17419f23d8001c96c6121fce64ac41a4bb39dc34
  LeaseProperty: 0xed32872236e066b1a20e051abfd378cc50457374
Saving artifacts...
```
✔ AWS Blockchain에 Smart Contract 배포가 완료되었습니다.

## Part 6: AWS Blockchain 에서 Dapp 이용하기
### 6.1 MetaMask에서 AWS Blockchain의 계정 Import
- MetaMask 화면에서 우측 상단 메뉴에서 'Import Account'을 클릭합니다. 
- PrivateKey를 입력하는 상자에 446fbba87648ed7cbfb410e1fdc97ceb8a79b8f69e5094a1befd9b248cdc9175를 입력하고 'Import'를 클릭합니다.
- MetaMask를 AWS Blockchain에 연결합니다. 'Main Network'가 표시된 메뉴를 클릭하고 Custom RPC를 선택하십시오.
- 'New RPC URL'상자에  http://< your-public-IP >:8545 를 입력하고 'Save'를 클릭합니다.
- 'Setting'옆에 있는 왼쪽 화살표를 클릭하여 페이지를 닫고 계정 페이지로 돌아갑니다.
![Alt text](img/metamask_prd_setting.png)

### 6.2 app.js 파일의 initWeb3 수정하기 
```
$ vi src/js/app.js
```
코드를 아래와 같이 수정하세요.
```javascript
 initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://< your-public-IP >:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  } 
```

### 6.3 House Rental 서비스 접속하기 
- dev 서버가 실행되고 dapp이 포함된 새 브라우저 탭이 자동으로 열립니다.
- dapp을 사용하기 위해 원하는 Lease 버튼을 클릭하세요.
로컬 웹 서버를 다시 시작합니다.
```
$ npm run dev
```


## And we're all done!


##
## [별첨] 7. AWS Ethereum Template(ECS) 설치하기
### 7.1. AWS Blockchain Template Prerequisites 
아래 사전 작업을 진행합니다.
- Create an Elastic IP Address
- Create a VPC and Subnets
- Create Security Groups
- Create an IAM Role for Amazon ECS and EC2 Instance Profile
- Create a Bastion Host

> AWS Ethereum Template 설치 가이드 https://github.com/awslego/www/blob/master/data/HOL_BLOCKCHAIN_TEMPLATE.pdf

> AWS Ethereum Template 바로가 https://docs.aws.amazon.com/ko_kr/blockchain-templates/latest/developerguide/blockchain-template-getting-started-prerequisites.html
### 7.2. AWS Blockchain Cloudformation 템플릿 실행하기  
AWS Blockchain CloudFormation 다운로드 및 실행합니다. 

https://aws-blockchain-templates-us-east-1.s3.us-east-1.amazonaws.com/ethereum/templates/latest/ethereum-network.template.yaml

### 7.3. Truffle HDWallet Provider Private Key 설치하기  

```
npm install truffle-hdwallet-provider-privkey
```

### 7.4. truffle.js 파일에 운영환경 네트워크 추가하기
```
$ vi truffle.js
```

코드를 아래와 같이 수정하세요.
```javascript
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
```

### 7.5. Smart Contract를 AWS Blockchain에 마이그레이션하기 (운영환경)
```
$ truffle migrate --network awsNetwork
```

✔︎ 다음과 같은 결과가 출력됩니다.
```
Using network 'awsNetwork'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xbf7fbfbd756c8c04125d3c3f408b4678834bd399d1b300f3c723d45ca8a2dde2
  Migrations: 0x0244afc4f2ccd12a4f7b5bc038ccc74962c96a57
Saving successful migration to network...
  ... 0x6d04ddaf491eeb04f3ccbc1e751e3033487ed156f703d2107cef8a12456b0c6d
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying LeaseProperty...
  ... 0x5f8c09ec0cd0420650b4721f17419f23d8001c96c6121fce64ac41a4bb39dc34
  LeaseProperty: 0xed32872236e066b1a20e051abfd378cc50457374
Saving artifacts...
```

### 7.6 House Rental 서비스 접속하기 
다음 House Rental 서비 링크를 클릭하세요. http://52.24.70.179:8082

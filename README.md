# GeneratedArtFrameNFT
### 1. 安裝 nodejs
``` bash
sudo apt update
sudo apt -y install nodejs
sudo apt -y install npm 
```

### 2. 安裝依賴庫
``` bash
npm i
```

### 3. Usage
``` bash
# 設定環境變數
export infuraPolygonEndpoint=https://polygon-mainnet.infura.io/v3/ff89...<infura_api_key>
export pvtKey=8efdb...<your_wallet_private_key>
```
* infura API KEY 註冊：https://www.infura.io/ （記得要開啟polygon mainnet）
* 簡易錢包生成工具：https://mct.xyz/create-wallet?chain=matic（建議勿使用於生產環境）

##### 3.1 直接執行
``` bash
node app.js
```

##### 3.2 背景執行
``` bash
sudo npm install forever -g
forever start app.js
```

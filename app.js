// Author: Darren K.J. Chen
// Date: 2023-12-12
// Make for IoT course in NTNU

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const Web3 = require('web3'); 
require('dotenv');

// init: Web3
const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.infuraPolygonEndpoint)
); console.log('Add web3!!!');
const account = web3.eth.accounts.privateKeyToAccount(process.env.pvtKey);
web3.eth.accounts.wallet.add(account);

const contractAddress = '0x08247E59Efb62e05E80f46EB68802DCB930De8cF';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function genNFT(to_addr) {
    try {
        const receipt = await contract.methods.mint(to_addr).send({ 
            from: account.address,
            gas: '123456',
            gasPrice: '888888888888'
        }); console.log(receipt);
    } catch (error) {console.error('Error in write operation:', error);}
}

let nftQueue = [];
async function processQueue() {
    while (nftQueue.length > 0) {
        const to_addr = nftQueue.shift();  // 取出隊列中的第一個地址
        await genNFT(to_addr);  // 調用 genNFT 並等待完成
    }
} setInterval(processQueue, 1000);

app.use(express.json({ limit: '88mb' }));
app.use(express.static('metadata'));

app.post('/genNFT', (req, res) => {
    try {
        const data = req.body;
        if (
            data.name && data.image  &&
            data && data.description &&
            data.animation_url && data.to
        ) {
            const imgBase64 = data.image;
            const mscBase64 = data.animation_url;

            const imgPath   = "metadata/img";
            const mscPath   = "metadata/music";
            const uriPath   = "metadata";

            // const img_files = fs.readdirSync(imgPath);
            // const newImgIdx = img_files.length;

            // const msc_files = fs.readdirSync(mscPath);
            // const newMscIdx = msc_files.length;

            const uri_files = fs.readdirSync(uriPath);
            const newUriIdx = uri_files.length - 2;
            const newMscIdx = newUriIdx; const newImgIdx = newUriIdx;

            var base64Data  = imgBase64.replace(/^data:image\/\w+;base64,/, "");
            var buffer      = Buffer.from(base64Data, 'base64');
            var filePath    = path.join(imgPath, `${newImgIdx}.png`);
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    console.error('img save err:', err);
                    return res.status(500).send('img save err');
                } 
            });

            base64Data = mscBase64.replace(/^data:audio\/\w+;base64,/, "");
            buffer     = Buffer.from(base64Data, 'base64');
            filePath   = path.join(mscPath, `${newMscIdx}.mp3`);
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    console.error('音樂保存失敗', err);
                    return res.status(500).send('音樂保存失敗');
                }
            });

            data.image         = `https://artframe.kjchen.cloud/img/${newImgIdx}.png`;
            data.animation_url = `https://artframe.kjchen.cloud/music/${newMscIdx}.mp3`;
            data.os_url        = `https://opensea.io/assets/matic/0x08247e59efb62e05e80f46eb68802dcb930de8cf/${newUriIdx}`
            
            const uriData = JSON.stringify(data, null, 4);
            filePath      = path.join(uriPath, `${newUriIdx}.json`);
            fs.writeFile(filePath, uriData, (err) => {
                if (err) {
                    console.error('寫入文件時發生錯誤:', err);
                    res.status(500).send('無法將數據寫入文件');
                } else {
                    console.log(`json data has been save to: ${filePath}`);
                    console.log(uriData);               
                } 
            }); // genNFT(data.to); 
            nftQueue.push(data.to); res.status(200).send(uriData);
        } else res.status(400).send('錯誤的請求格式');
    } catch (error) {console.error('API ERROR:', error);}
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

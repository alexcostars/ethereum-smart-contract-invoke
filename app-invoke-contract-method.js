const fs = require('fs')
const Contract = require('web3-eth-contract')

const prividerAddress = 'http://localhost:8545'
Contract.setProvider(prividerAddress);

const CounterABI = JSON.parse(fs.readFileSync('./abis/CounterABI.json'))
// necessário passar o ABI (Application Binary Interface) do contrato (gerado durante a compilação) e o endereço do mesmo dentro da Blockchain
var CounterContract = new Contract(CounterABI, '0xF0A0D87253fC4DA1c4d798A82e1DA87A1AAbd9E7')

// utilize CALL para invocar um método do contrato que não modifique seu estado
// from corresponde à entidade que está invocando o método
CounterContract.methods.getCounter().call({from: '0x00C384009a9e7EA57D78B03a359C68402D5391e8'})
.then(function(receipt){
    //retorna o valor do 'return'
    console.log(receipt)
});

// utilize SEND para invocar um método do contrato que modifique seu estado
CounterContract.methods.setCounter(5).send({from: '0x00C384009a9e7EA57D78B03a359C68402D5391e8'})
.then(function(receipt){
    //retorna a transação de confirmação na blockchain
    console.log(receipt)
});

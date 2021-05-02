>> # Blockchain & Solidity Fundamentals

>* Blockchain peer to peer network of nodes talking to one  another a distributed environment.

>* all nodes have data and code of blockchain on their system.

>* All nodes participate to make the Distributed ledger secure.

>* All the code in the blockchain is contained in the smart contracts.

>* Docs - https://docs.soliditylang.org/en/v0.8.3/

>* Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs which govern the behaviour of accounts within the Ethereum state.

>* Solidity is statically typed, supports inheritance, libraries and complex user-defined types among other features.

>* With Solidity you can create contracts for uses such as voting, crowdfunding, blind auctions, and multi-signature wallets.


>> # Smart Contract

>* The code that executed on the Blockchain.

>* This tutorial we will be writing a To do List in blockchain.

>* Code written in Smart Contract is Immutable.

>* Smart Contract are like microservice.

>* Once you deploy your smart Contract it cannot be changed.

> # Traditional Apps vs Blokchain Smart Contract

>* Traditionally

  web browser---> client side application/API---> backend(Business logic) ----> database.

>* Smart Contracts

  web browser ---> client side application/API ---> talk directly to blockchain.

  and the blockchain has code written in Ethereum smart contract which will contain all the Business logic.

  And Blockchain itself will act as database.

***
> # Building the first blockchain

> ### Need personal blockchain tool Ganache https://www.trufflesuite.com/ganache

> ## Tools that come in handy while developing Smart contracts.

> #### Ganache

>- It is a personal blockchain network that simulates real blockchain network.

>- so it runs on our computer locally and is in the closed network.  

>- We can use Ganache to test, develop smart contracts, develop application that talk to this blockchain.

> #### Truffle Framework

>- to develop smart contracts with Ethereum Programming languages.
>- Install truffle by npm ****npm i -g truffle@5.0.2****
>- truffle also helps to test and deploy smart contract to blockchain.
>- helps to develop client side application in the smart contract.

> #### Metamask chrome extension

>- Since blockchain is a network we need a special browser so that we can connect to that network.

>- it helps us to connect to the blockchain and develop smart contract.

>- Make sure you get this metamask enabled in chrome extensions.


***
> # Project setup

>- Create a seperate directory like to_do_app_solidity.
>- cd to_do_app_solidity
>- Create a truffle project ****check the truffle version before this by typing truffle -version****

>- ****truffle init**** to initialize the truffle project.
>- ****touch package.json**** create package.json file inside the project directory and copy the contents of package.json to your project.
>- npm install to install all the dependancies.


> ## The File Organization

>- you will already have folders named contracts, migrations & test by now.
>- Navigate to contracts ->Migrations.sol and open it.
>- now make a new file named as ToDoList.sol in the contract directory.

> ## Basics Solidity

> #### Step-1 :
****Specify solidity version****
>- open ToDoList.sol in code editor and first line specify the version we will be using for solidity as

        pragma solidity ^0.5.0;

> #### Step-2 :
****declare the smart contract with contract keyword.****

>- make sure the contract name is same as the .sol file where your are working currently.

        contract ToDoList{
          /*Here goes the code for the smart Contract*/
        }

> #### Step-3 :

****Declaring a state variable in solidity****

>- Note that ****state variables in the blockchain are actually written into blockchain.****
        contract ToDoList{
          uint public taskCount=0;
        }


>- ****Now the state of the smart contract will change whenever the taskCount state variable changes.****

>- ****The scope of these state variable is to entire smart contract and not just the function****

>- ****To access this taskCount variable when we specify public solidity gives us automatically a function to access this taskCount state variable****

> #### Step-4 :
****Compiling the smart contract.****

>- in the terminal being in the project directory.
            truffle compile
>- will compile or project and create a build directory for us and we will get ToDoList.json in ****build->contracts->ToDoList.json it is a representation of smart contract in json****

>- Inside this ToDoList.json we have ****abi abstract binary interface which is used to talk to the smart contract in javascript****

>- We see the ****bytecode**** that runs on the Ethereum Virtual Machine and a lot more usefull information.

> #### Step-5 :

****Now to Connect to the blockchain we need to configure truffle-config.js file in the root directory of our project.****

> - ****So the idea is to export an object as network key that basically has config that will help us to connect with the blockchain netwok.****

      module.exports = {
        networks: {
          development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
          }
          },
          solc: {
            optimizer: {
              enabled: true,
              runs: 200
            }
          }
        }
> - Here ****development-> host(connecting to localhost Ganache on our local machine and the port we are using to connect to it)****

> - ****You can open Ganache quickstart and see the info host and port at which the local blockchain is running****

> #### Step-6 :

****Create a migeration file to get the smart contract on the blockchain (Deploying smart contract on blockchain)****

> - ****go to migerations->initialmigerations****
> - ****create a new file inside migerations named 2_deploy_contracts.js***

> ## ========= What is Migerations (IMPORTANT)===============

> ###  Consider you have a database and you are changing the schema the row and column structure of the database I.E THE STATE OF THE DATABASE IS ALTERED ,

> ### So migerations in Solidity is the same so when we are deploying smart contract to the blockchain we are changing the state of the blockchain as BLOCKCHAIN IS ITSELF A DATABASE.

> ### WHENEVER WE DEPLOY A SMART CONTRACT ON BLOCKCHAIN WE ARE ACTUALLY UPDATING STATE OF THE BLOCKCHAIN/DATABASE AND DO THAT WE NEED MIGERATIONS.

> ### Make sure your place 2 in the starting of the name that basically tells truffle in which order that states need to be deployed to blockchain.

> ## ----------------Code in 2_deploy_contracts.js----------------

     const ToDoList = artifacts.require("./ToDoList.sol");

     module.exports = function(deployer) {
       deployer.deploy(ToDoList);
     };

> - ****require the artificats and then export that to deploy the smart contract with a callback function****

> - ****Heres the artifacts refer to the ToDoList.json in the build directory.****
> - ****So it is basically a abstraction of the smart contract that we will put in the blockchain.****

> ### Finally running and deploying the smart contract on the blockchain make sure the config is right and the Ganache is running.

         truffle migrate

> ### Inspecting the Ganache

> - We will see that the ****Balance for the first entry is reduced.****
> - ****This is because deploying the smart contracts on blockchain costs ether.****

> - ****truffle by default uses the first account on the wallet to pay the deployement fees****

> ### Inspecting the smart contract that we just deployed on the blockchain and RETRIEVING THAT SC(Smart Contract).

       truffle console
       truffle(developement)>todoList=await ToDoList.deployed()

> - ****ToDoList is the name of the SC we created in the migeration.****

> - ****the smart contract now is retrieved and stored in todoList variable.****

> - ****Note we need to interact with the blockchain in asynchronous fashion just like javascript /Node.js applications.****

      todoList

> - ****todoList will show us the smart contract that is currently on the local blockchain Ganache.****

      todoList.address

> - ****.address will give us the address of the SC i.e where it is located on the blockchain.****

      todoList.taskCount()

> - ****We can see the taskCount state var value we defined inside our SC. By default it will show it as Big number like <BN: 0> or BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }****

      taskCount=await taskCount()
      taskCount.toNumber()

> - ****Will give use the 0 and not the big BN Default return.****

> - ****ctrl+d to exit out of truffle console****

> ## IMPORTANT: Steps to follow eachtime u make changes to Smart contract

    truffle compile
- make sure ganache is running in background.
      truffle migrate --reset // the reset flag will deploy new copy of the smart contract if their already exist a SC in blockchain.

      truffle console

      todoList=await ToDoList.deployed()

      todoList.address // returns with long string of address that means everything is good!

> ## Accessing tasks inside truffle console

- ****Note that mapping cannot be iterated over & then accessed as the original size of the mapping is not know as it is dynamic anc changes as more tasks are added. that is the reason we use taskCount and we have a id uint****

      task = await todoList.tasks(1) // to access the first task in the tasks list and then we can use task to access the attributes like content,completed.

***

> # IMPORTANT: Connecting blockchain to Client Side Application in Browser

- [x] Steps to follow

   - [ ] connect browser to blockchain via metamask
    - [x] in metamask browser set up network a/c to ganache RPC Server and chain id.
    - [x] open ganache -> the first entry in ganache as it is through which smart contract is deployed show key (keysymbol) -> copy the key -> in the browser go to metamask via extension -> private network -> localhost 127.0.0.1:7545 -> accounts menu->import account -> type private key and paste the private key ->import


   - [ ] connect client side application to blockchain via web3.js

- ****refer https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8****

- Browser sync is used as a part of lite server
- in package.json lite server will be used to run the client side application in the browser.
- ****we need to configure the lite-server via bs-config to tell it where the src directory and where are the dependancies****

      {
        "server":{
          "baseDir":[
          "./src",
          "./build/contracts"
          ],
          "routes":{
            "/vendor":"./node_modules"
          }
        }
      }
- ****basically exposing the src and build to the lite server and then the dependancies can now be refferenced via the /vendor routes.****





Timestamp https://www.youtube.com/watch?v=coQ5dg8wM2o
45:00

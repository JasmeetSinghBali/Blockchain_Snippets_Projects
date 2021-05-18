App = {
  loading:false,
  contracts:{

  },
  load:async() => {
    // Load App
    //console.log('app loading...')

    // in order to connect application  to blockchain we need metamask & web3 liberary
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  loadWeb3: async() => {
    if (typeof web3 !== 'undefined'){
      App.web3Provider=web3.currentProvider
      web3=new Web3(web3.currentProvider)
    }else{
      window.alert("Please Connect to metamask.")
    }

    // Modern Dapp browsers
    if(window.ethereum){
      window.web3=new Web3(ethereum)
      try{
        await ethereum.enable()
        web3.eth.sendTransaction({/***...***/})
      }catch(err){
        // User denied account access
      }

    }

    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  },
  // to load the first ganache address account to verify that client side application ,browser and blockchain are really connected
   loadAccount: async()=>{
     App.account=web3.eth.accounts[0];// will give us the first account. where eth is an object that contains all the accounts of ganache
     //console.log(App.account);// will give us the account address in ganache to which we connected.
   },

   // to load the SC(Smart Contract) from the blockchain to our client side application

   loadContract:async()=>{

     // grab the SC JSON file
     const todoList=await $.getJSON('ToDoList.json'); // we can import the json from contract as in bs-config we have exposed the build-contract directory.
     //console.log(todoList);

     // Truffle contracts(create a javascript version of the SC) so that we can interact with the contract.
     App.contracts.ToDoList=TruffleContract(todoList);
     App.contracts.ToDoList.setProvider(App.web3Provider);// now we can use the smart contract function in the frontend.

     // grab the deployed copy of SC just like we do in truffle console.
     App.todoList=await App.contracts.ToDoList.deployed()
   },

   // Render the info in frontend application
   render : async()=>{
     //Prevent double rendering i.e the render() will not called while the loading is loading is true
     if(App.loading){
       return
     }
     App.setLoading(true);
     // render account ID in html top right in the nav bar
     $('#account').html(App.account);// note that a tag in index.html should be thier with id as account so that this renders the account in that html tag.

     // Render tasks from renderTask function
     await App.renderTasks();

     App.setLoading(false);
   },

   // render tasks
   renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    console.log(taskCount)
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  // create new task via form
  createTask:async()=>{

    web3.eth.defaultAccount=web3.eth.accounts[0];
    console.log(web3.eth.defaultAccount);

    App.setLoading(true);
    const content =$('#newTask').val();// grab the new val of the task

    // pass the form content to the todoList.createTask with content
    await App.todoList.createTask(content);

    window.location.reload();// will refresh the page so to avoid double rendering issue
  },

   // shows and hide the loader,content(in html) when the render function is executing
   setLoading:(boolean)=>{
     App.loading=boolean
     const loader=$('#loader')
     const content=$('#content')

     if(boolean){
       loader.show()
       content.hide()
     }
     else{
       loader.hide()
       content.show()
     }
   }

}

// selector function with callback that loads the above App object as the window loads i.e when we refresh page the App object load function is executed.
$(()=>{
  $(window).load(()=>{
    App.load()
  })
})

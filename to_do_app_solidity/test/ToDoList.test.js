const ToDoList=artifacts.require('./ToDoList.sol');// grab the SC

// test cases toverify that all task listed properly and SC is initialized properly.
contract('ToDoList',(accounts)=>{
  // so before each task run we will have a copy of task in the this.todoList
  before(async()=>{
    this.todoList=await ToDoList.deployed();
  })

  // test cases

  // to check the SC was deployed properly
  it('deploys successfully',async()=>{
    const address=await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  })

  // to check the tasklist contains the same number of task as the taskCount mentioned in the SC
  it('Lists Tasks',async()=>{
    const taskCount=await this.todoList.taskCount();
    const task=await this.todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(),taskCount.toNumber());
  })

  // to check Content and props of the Listed task correct or not
  it('Check Props(content,completed) of the Listed task',async()=>{
    const taskCount=await this.todoList.taskCount();
    const task=await this.todoList.tasks(taskCount);
    assert.equal(task.content,'Check Out Solidity & Blockchain');
    assert.equal(task.completed,false);
    assert.equal(taskCount.toNumber(),1);
  })

  // to check the createTask event-emit works right i.e the craete task event is triggered!
  it('Check Wheather Create new task event is triggered via logs and the event values(id,content,completed) via the args prop inside the logs.',async()=>{
    const result=await this.todoList.createTask('A new task');
    const taskCount=await this.todoList.taskCount();
    assert.equal(taskCount,2);
    console.log(result);
    const event=result.logs[0].args
    assert.equal(event.id.toNumber(),2);
    assert.equal(event.content,'A new task');
    assert.equal(event.completed,false);
  })
});

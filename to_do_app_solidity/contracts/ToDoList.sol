pragma solidity ^0.5.0;

contract ToDoList{
 uint public taskCount=0;// the state variables in solidity tells the state of the smart contracts.

 // user defined data type with struct

 struct Task{
 uint id; // id for each task where unsigned int i.e it cannot be negative
 string content; // for task description
 bool completed; // checkbox for the task
}

 // to make a storage in the blockchain that holds Task
 // mapping is kind of associative array or hash in other programming languages.
 // here we are declaring the data type for key i.e unint that is mapped to the Task struct we define earlier
 // this mapping will kinda act as a database where we can access different task with the unint as id -1,2,3

 mapping(uint => Task) public tasks; // public will provide a reader function to access this mapping out of the scope of this mapping also.

 // event that gets triggered when a new task is created
 event TaskCreated(
  uint id,
  string content,
  bool completed
 );

 // Complete task event
 event TaskCompleted(
   uint id,
   bool completed
 );

 // constructor called when SC is deployed for the first time to populate the tasks mapping.
 constructor() public{
     createTask("Check Out Solidity & Blockchain");
 }

 // to put Task inside the mapping we will define a function

 function createTask(string memory _content) public {
      taskCount ++;

      // this will put Task with taskCount as id , content as _content and checkbox as false and put it inside the mapping tasks with taskCount as index.
      tasks[taskCount]=Task(taskCount,_content,false);

      // Broadcast an event when a task was created
      emit TaskCreated(taskCount, _content, false);
      }

 // to add or remove the checked/unchecked task in and out of completed list
 // the _task means that it is a local variable not a state variable it is a convention way of reffering to local variables over state variables
 function toggleCompleted(uint _id) public{
    Task memory _task=tasks[_id];
    _task.completed=!_task.completed;
    tasks[_id]=_task;

    emit TaskCompleted(_id, _task.completed);
 }

}

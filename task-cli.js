const { log } = require("console");
const fs = require("fs");
const path = require("path");

const tasks_file = path.join(__dirname, "tasks.json");

//logic to fetch tasks from file
function loadtasks() {
  try {
    const taskdata = fs.readFileSync(tasks_file, "utf-8");
    if (!taskdata.trim()) return [];
    return JSON.parse(taskdata);
  } catch (err) {
    return [];
  }
}
// saving task to file
function saveTasks(tasks) {
  fs.writeFileSync(tasks_file, JSON.stringify(tasks, null, 2));
}

//read cli arguments
const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(
    `Usage:
  node task-cli.js add "Task description"
  node task-cli.js update <id> "New description"
  node task-cli.js delete <id>
  node task-cli.js mark-in-progress <id>
  node task-cli.js mark-done <id>
  node task-cli.js list
  node task-cli.js list todo
  node task-cli.js list in-progress
  node task-cli.js list done:`
  );
}
function addTask(description) {
  if (!description) {
    console.log("description is required");
    return;
  }
  const tasks = loadtasks();

  // generate id and date stamp for tasks
  const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const now = new Date().toISOString();

  const newTask = {
    id: newId,
    description,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log(`Task added succesfully (ID:${newId})`);
}

switch (command) {
  case "add":
    const description = args[1];
    addTask(description);
    break;
  case "update":{
    const id = parseInt(args[1],10);
    const newDescription = args[2];
if(isNaN(id)){
  console.log(`${id} is not a number`)
} else{
  updateTask(id,newDescription)
}

break;
  }

  case "mark-done":{
    const id = parseInt(args[1],10);
  if(isNaN(id)){
    console.log(`enter a valid input | must be a number`);
  } else{
    updatedStatus(id,"mark-done");
  }
  break;
  }



  case "mark-in-progress":{
    const id = parseInt(args[1],10);
  if(isNaN(id)){
    console.log(`enter a valid number| must be a number`);
  } else{
    updatedStatus(id,"in-progress");
  }
  break;
  }

  case "delete":{
    const id = parseInt(args[1],10);
    if(isNaN(id)){
      console.log(`${id} must be a valid number`);
    } else{
      deleteTask(id);
    }
    break;
  }

  case "list": {
    const statusArgs = args[1];
    if (statusArgs && !["todo", "in-progress", "done"].includes(statusArgs)) {
      console.log("invalid status ,use: todo| in-progress| done");
    } else {
      listTasks(statusArgs);
    }
    break;
  }
  default:
    console.log("unknown-command");
    showHelp();
}

function listTasks(filterStatus) {
  const tasks = loadtasks();

  let filtered = tasks;
  if (filterStatus) {
    filtered = tasks.filter((task) => task.status === filterStatus);
  }

  if (filtered.length === 0) {
    console.log("no task found");
    return;
  }

  filtered.forEach(task => {
    console.log(
      `[${task.id}] (${task.status}) (${task.description}) ${task.createdAt}`
    );
  });
}

function updateTask(id,newDescription){
 const tasks = loadtasks();
 const task = tasks.find(t=>t.id ==id);

 if(!task){
  console.log(`task with ${id} is not found`);
  return;
 }

 if(!newDescription){
  console.log(`new description required`);
  return;
 }

 task.description = newDescription;
 task.updatedAt = new Date().toISOString();

 saveTasks(tasks);
 console.log(`task with ${id} is updated succesfully`);
}

function updatedStatus(id, newStatus){
  const tasks = loadtasks();
  const task = tasks.find(t=>t.id === id);

  if(!task){
    console.log("task with ${id} is not found");
    return;
  }

  task.status = newStatus;
  task.updatedAt= new Date().toISOString();

  saveTasks(tasks);
  console.log(`task status updated succesfully`);
}

function deleteTask(id) {
  if (isNaN(id)) {
    console.log(`${id} is not a number`);
    return;
  }

  const tasks = loadtasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  const newTasks = tasks.filter(t => t.id !== id);

  saveTasks(newTasks);

  console.log(`Task ${id} deleted successfully.`);
}

Task Tracker CLI

A simple Command Line Interface (CLI) application to manage your tasks. You can add, update, delete, and list tasks. Tasks are stored locally in a JSON file using only native filesystem modules.
https://github.com/rishabhsoni13/task-tracker-cli-based
https://roadmap.sh/projects/task-tracker
🚀 Features

Add new tasks

Update existing tasks

Delete tasks

Mark tasks as todo, in-progress, or done

List all tasks

List tasks filtered by status (todo, in-progress, done)

Data stored persistently in tasks.json

No external libraries — uses pure Node.js

📂 Project Structure task-tracker-cli/ │ ├── task-cli.js # Main CLI script └── tasks.json # Stores tasks in JSON format

🛠️ Installation & Setup

Clone or download this project.

Ensure Node.js is installed:

node -v

Navigate into the project folder:

cd task-tracker-cli

Make sure tasks.json exists:

echo "[]" > tasks.json

🧠 Usage

Run commands using Node.js:

➕ Add a Task node task-cli.js add "Buy groceries"

Output:

Task added successfully (ID: 1)

📝 Update a Task node task-cli.js update 1 "Buy groceries and cook dinner"

🗑️ Delete a Task node task-cli.js delete 1

🔄 Mark a Task as In Progress node task-cli.js mark-in-progress 1

✅ Mark a Task as Done node task-cli.js mark-done 1

📋 List All Tasks node task-cli.js list

🎯 List Tasks by Status Done node task-cli.js list done

Todo node task-cli.js list todo

In Progress node task-cli.js list in-progress

🗃️ Task Object Structure

Each task in tasks.json looks like this:

{ "id": 1, "description": "Buy groceries", "status": "todo", "createdAt": "2025-12-05T10:00:00.000Z", "updatedAt": "2025-12-05T10:00:00.000Z" }

🧩 How It Works

CLI arguments are read using process.argv

Tasks are loaded from tasks.json

Based on the command:

The task list is modified

Updated tasks are written back to tasks.json

This Read → Modify → Save cycle is core to the project.

🛡️ Error Handling

The app gracefully handles:

Invalid IDs

Missing descriptions

Non-existing tasks

Incorrect command usage

📘 Learning Goals

This project helps you practice:

CLI argument handling

Reading/writing JSON files

Using Node.js filesystem (fs) module

Basic CRUD operations

Clean code structure and modular functions

Real-world logic building

🧪 Future Improvements (Optional)

Add due dates

Implement task search

Add colored terminal output

Improve argument parsing

Export/import tasks

👨‍💻 Author

Made as a learning project to strengthen logic, programming fundamentals, and CLI development skills.


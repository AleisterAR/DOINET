import eel
import json
import os
from datetime import datetime
import uuid

TASKS_FILE = 'todolist.json'
eel.init("web")

def sort_tasks(tasks):
    return sorted(tasks, key=lambda x: (not x['completed'], datetime.strptime(x['date'], "%Y-%m-%d")), reverse=True)

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as file:
            tasks = json.load(file)
            return sort_tasks(tasks)
    return []

def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as file:
        json.dump(tasks, file, indent=4)

tasks = load_tasks()

@eel.expose
def add_task(task):
    task['id'] = str(uuid.uuid4())
    tasks.append(task)
    tasks_sorted = sort_tasks(tasks)
    save_tasks(tasks_sorted)
    eel.loadTasks()

@eel.expose
def remove_task(index):
    global tasks
    tasks = [task for task in tasks if task['id'] != index]
    tasks_sorted = sort_tasks(tasks)
    save_tasks(tasks_sorted)
    eel.loadTasks()

@eel.expose
def toggle_task(index):
    for task in tasks:
        if task['id'] == index:
            task['completed'] = not task['completed']
            break
    tasks_sorted = sort_tasks(tasks)
    save_tasks(tasks_sorted)
    eel.loadTasks() 

@eel.expose
def get_tasks():
    return sort_tasks(tasks)

eel.start("main.html")
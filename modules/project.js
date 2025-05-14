// project.js
export function createProject(name) {
    const tasks = [];

    function orderTasks() {
        tasks.sort((a, b) => a.priority - b.priority)
    }

    return { 
        name,
        
        id: crypto.randomUUID(),

        getTasks() {
            return tasks;
        },

        addTask(task) {
            tasks.push(task);
            orderTasks();
        },

        removeTask(taskName) {
            const index = tasks.findIndex(task => task.name === taskName);
            if (index != -1) {
                tasks.splice(index, 1);
            }
            orderTasks();
        },
    }
}
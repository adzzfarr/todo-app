// task.js
export function createTask(name, description, dueDate, priority) {
    return {
        name,
        id: crypto.randomUUID(),
        description,
        dueDate,
        priority,
        completionStatus: false,
        toggleCompletion() {
            this.completionStatus = !this.completionStatus;
        },
    }
}
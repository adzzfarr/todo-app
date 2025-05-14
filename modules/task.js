// task.js
export function createTask(name, description, dueDate, priority) {
    return {
        name,
        description,
        dueDate,
        priority,
        completionStatus: false,
        toggleCompletion() {
            this.completionStatus = !this.completionStatus;
        },
    }
}
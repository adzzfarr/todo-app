// task.js
export function createTask(name, description, dueDate, priority, completionStatus = false, id = crypto.randomUUID(),) {
    return {
        name,
        id,
        description,
        dueDate,
        priority,
        completionStatus,        
        toggleCompletion() {
            this.completionStatus = !this.completionStatus;
        },
        showDetails: false,
    }
}
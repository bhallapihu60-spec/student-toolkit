let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");


function saveTasks() {
    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed
            ? "task completed"
            : "task";

        li.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <span>${escapeHTML(task.text)}</span>
            </label>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                ×
            </button>
        `;

        taskList.appendChild(li);
    });


    const remaining = tasks.filter(
        task => !task.completed
    ).length;

    taskCount.textContent =
        remaining === 1
            ? "1 task left"
            : `${remaining} tasks left`;
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();

    taskInput.focus();
}


function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}


function clearCompleted() {

    tasks = tasks.filter(
        task => !task.completed
    );

    saveTasks();
    renderTasks();
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function goHome() {

    window.location.href = "index.html";
}


taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    }
);


renderTasks();

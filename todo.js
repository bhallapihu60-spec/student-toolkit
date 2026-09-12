let tasks =
    JSON.parse(
        localStorage.getItem("studentTasks")
    ) || [];


let currentFilter = "all";


const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const progressNumber =
    document.getElementById("progressNumber");

const progressFill =
    document.getElementById("progressFill");



/* SAVE */

function saveTasks() {

    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );

}



/* ADD TASK */

function addTask() {

    const text =
        taskInput.value.trim();


    if (text === "") {

        taskInput.focus();

        return;

    }


    tasks.unshift({

        text: text,

        completed: false,

        id: Date.now()

    });


    taskInput.value = "";


    saveTasks();

    renderTasks();

    taskInput.focus();

}



/* COMPLETE TASK */

function toggleTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();

    renderTasks();

}



/* DELETE */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    renderTasks();

}



/* FILTER */

function setFilter(filter, button) {

    currentFilter = filter;


    document
        .querySelectorAll(".filter")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    renderTasks();

}



/* RENDER */

function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    if (currentFilter === "pending") {

        filteredTasks =
            tasks.filter(
                task => !task.completed
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(
                task => task.completed
            );

    }


    filteredTasks.forEach(task => {

        const card =
            document.createElement("div");


        card.className =
            task.completed
                ? "task-card completed"
                : "task-card";


        card.innerHTML = `

            <button
                class="big-checkbox"
                onclick="toggleTask(${task.id})"
                aria-label="Complete task">

                ${task.completed ? "✓" : ""}

            </button>


            <div class="task-content">

                <h3>
                    ${escapeHTML(task.text)}
                </h3>

                <span class="task-tag">
                    ${task.completed ? "Completed" : "Study"}
                </span>

            </div>


            <button
                class="task-delete"
                onclick="deleteTask(${task.id})">

                ×

            </button>

        `;


        taskList.appendChild(card);

    });


    updateEmptyState(filteredTasks);

    updateProgress();

}



/* EMPTY STATE */

function updateEmptyState(filteredTasks) {

    if (filteredTasks.length === 0) {

        emptyState.style.display = "flex";

    } else {

        emptyState.style.display = "none";

    }

}



/* PROGRESS */

function updateProgress() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    progressNumber.textContent =
        `${completed} / ${total}`;


    let percentage = 0;


    if (total > 0) {

        percentage =
            (completed / total) * 100;

    }


    progressFill.style.width =
        `${percentage}%`;

}



/* INPUT ENTER */

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);



/* FLOATING BUTTON */

function focusTaskInput() {

    taskInput.focus();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* HOME */

function goHome() {

    window.location.href =
        "index.html";

}



/* SECURITY */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}



/* START */

renderTasks();

// ========================================
// STUDENT TOOLKIT - MAIN SCRIPT
// ========================================


// ----------------------------------------
// THEME TOGGLE
// ----------------------------------------

function toggleTheme() {

    document.body.classList.toggle("dark");

    // Save theme preference
    if (document.body.classList.contains("dark")) {

        localStorage.setItem("studentTheme", "dark");

    } else {

        localStorage.setItem("studentTheme", "light");

    }

}


// Load saved theme when page opens
function loadTheme() {

    const savedTheme =
        localStorage.getItem("studentTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

}


// ----------------------------------------
// OPEN TOOLS
// ----------------------------------------

function openTool(tool) {

    if (tool === "planner") {

        window.location.href = "planner.html";

    }

    else if (tool === "todo") {

        window.location.href = "todo.html";

    }

    else if (tool === "timer") {

        window.location.href = "timer.html";

    }

    else if (tool === "notes") {

        window.location.href = "notes.html";

    }

    else if (tool === "calculator") {

        window.location.href = "calculator.html";

    }

    else if (tool === "progress") {

        window.location.href = "progress.html";

    }

}


// ----------------------------------------
// PAGE LOAD
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();

    }
);

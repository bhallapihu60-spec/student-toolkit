// ========================================
// STUDY PLANNER
// ========================================


let studySessions =
    JSON.parse(
        localStorage.getItem("studySessions")
    ) || [];


// ----------------------------------------
// ELEMENTS
// ----------------------------------------

const subjectInput =
    document.getElementById("subjectInput");

const topicInput =
    document.getElementById("topicInput");

const studySessionsContainer =
    document.getElementById("studySessions");

const plannerEmpty =
    document.getElementById("plannerEmpty");

const sessionCount =
    document.getElementById("sessionCount");


// ----------------------------------------
// SAVE
// ----------------------------------------

function saveSessions() {

    localStorage.setItem(
        "studySessions",
        JSON.stringify(studySessions)
    );

}


// ----------------------------------------
// ADD STUDY SESSION
// ----------------------------------------

function addStudyTask() {

    const subject =
        subjectInput.value.trim();

    const topic =
        topicInput.value.trim();


    if (subject === "") {

        subjectInput.focus();

        return;

    }


    studySessions.unshift({

        id: Date.now(),

        subject: subject,

        topic: topic || "Study session",

        completed: false

    });


    subjectInput.value = "";

    topicInput.value = "";


    saveSessions();

    renderSessions();

    subjectInput.focus();

}


// ----------------------------------------
// COMPLETE SESSION
// ----------------------------------------

function toggleSession(id) {

    const session =
        studySessions.find(
            item => item.id === id
        );


    if (!session) return;


    session.completed =
        !session.completed;


    saveSessions();

    renderSessions();

}


// ----------------------------------------
// DELETE SESSION
// ----------------------------------------

function deleteSession(id) {

    studySessions =
        studySessions.filter(
            item => item.id !== id
        );


    saveSessions();

    renderSessions();

}


// ----------------------------------------
// RENDER
// ----------------------------------------

function renderSessions() {

    studySessionsContainer.innerHTML = "";


    studySessions.forEach(session => {

        const card =
            document.createElement("div");


        card.className =
            session.completed
                ? "study-session completed"
                : "study-session";


        card.innerHTML = `

            <button
                class="session-check"
                onclick="toggleSession(${session.id})">

                ${session.completed ? "✓" : ""}

            </button>


            <div class="session-info">

                <h3>
                    ${escapeHTML(session.subject)}
                </h3>

                <p>
                    ${escapeHTML(session.topic)}
                </p>

            </div>


            <button
                class="session-delete"
                onclick="deleteSession(${session.id})">

                ×

            </button>

        `;


        studySessionsContainer.appendChild(card);

    });


    updateSessionCount();

    updateEmptyState();

}


// ----------------------------------------
// SESSION COUNT
// ----------------------------------------

function updateSessionCount() {

    const count =
        studySessions.length;


    if (count === 1) {

        sessionCount.textContent =
            "1 session";

    } else {

        sessionCount.textContent =
            `${count} sessions`;

    }

}


// ----------------------------------------
// EMPTY STATE
// ----------------------------------------

function updateEmptyState() {

    if (studySessions.length === 0) {

        plannerEmpty.style.display =
            "flex";

    } else {

        plannerEmpty.style.display =
            "none";

    }

}


// ----------------------------------------
// GO HOME
// ----------------------------------------

function goHome() {

    window.location.href =
        "index.html";

}


// ----------------------------------------
// ESCAPE HTML
// ----------------------------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ----------------------------------------
// ENTER KEY
// ----------------------------------------

subjectInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addStudyTask();

        }

    }
);


topicInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addStudyTask();

        }

    }
);


// ----------------------------------------
// INITIAL LOAD
// ----------------------------------------

renderSessions();

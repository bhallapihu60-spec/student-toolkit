/* =========================================================
   STUDY PLANNER JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   LOAD SAVED SESSIONS
   --------------------------------------------------------- */

let sessions =
    JSON.parse(
        localStorage.getItem("studySessions")
    ) || [];


let selectedPriority = "Important";


/* ---------------------------------------------------------
   ELEMENTS
   --------------------------------------------------------- */

const subjectInput =
    document.getElementById("subjectInput");

const topicInput =
    document.getElementById("topicInput");

const timeInput =
    document.getElementById("timeInput");

const durationInput =
    document.getElementById("durationInput");

const sessionList =
    document.getElementById("sessionList");

const sessionCount =
    document.getElementById("sessionCount");

const plannerEmpty =
    document.getElementById("plannerEmpty");

const todayDate =
    document.getElementById("todayDate");


/* ---------------------------------------------------------
   TODAY'S DATE
   --------------------------------------------------------- */

function showToday() {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    todayDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


/* ---------------------------------------------------------
   SAVE
   --------------------------------------------------------- */

function saveSessions() {

    localStorage.setItem(
        "studySessions",
        JSON.stringify(sessions)
    );

}


/* ---------------------------------------------------------
   SELECT PRIORITY
   --------------------------------------------------------- */

function selectPriority(button) {

    document
        .querySelectorAll(".priority")
        .forEach(option => {

            option.classList.remove("active");

        });


    button.classList.add("active");


    selectedPriority =
        button.dataset.priority;

}


/* ---------------------------------------------------------
   ADD SESSION
   --------------------------------------------------------- */

function addSession() {

    const subject =
        subjectInput.value.trim();

    const topic =
        topicInput.value.trim();

    const time =
        timeInput.value;

    const duration =
        durationInput.value;


    /* Check required fields */

    if (
        subject === "" ||
        topic === ""
    ) {

        alert(
            "Please enter the subject and topic."
        );

        return;

    }


    /* Create session */

    const session = {

        id: Date.now(),

        subject: subject,

        topic: topic,

        time: time || "Anytime",

        duration: duration,

        priority: selectedPriority,

        completed: false

    };


    sessions.push(session);


    saveSessions();


    /* Clear form */

    subjectInput.value = "";

    topicInput.value = "";

    timeInput.value = "";


    renderSessions();

}


/* ---------------------------------------------------------
   COMPLETE SESSION
   --------------------------------------------------------- */

function toggleSession(id) {

    const session =
        sessions.find(
            item => item.id === id
        );


    if (!session) return;


    session.completed =
        !session.completed;


    saveSessions();


    renderSessions();

}


/* ---------------------------------------------------------
   DELETE SESSION
   --------------------------------------------------------- */

function deleteSession(id) {

    sessions =
        sessions.filter(
            item => item.id !== id
        );


    saveSessions();


    renderSessions();

}


/* ---------------------------------------------------------
   FORMAT TIME
   --------------------------------------------------------- */

function formatTime(time) {

    if (
        !time ||
        time === "Anytime"
    ) {

        return "Anytime";

    }


    const [hours, minutes] =
        time.split(":");


    const date =
        new Date();

    date.setHours(
        Number(hours)
    );

    date.setMinutes(
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


/* ---------------------------------------------------------
   PRIORITY CLASS
   --------------------------------------------------------- */

function priorityClass(priority) {

    if (priority === "Important") {

        return "priority-important";

    }


    if (priority === "Normal") {

        return "priority-normal";

    }


    return "priority-low";

}


/* ---------------------------------------------------------
   RENDER
   --------------------------------------------------------- */

function renderSessions() {

    sessionList.innerHTML = "";


    /* Sort sessions by time */

    const sortedSessions =
        [...sessions].sort(
            (a, b) => {

                if (
                    a.time === "Anytime"
                ) {
                    return 1;
                }

                if (
                    b.time === "Anytime"
                ) {
                    return -1;
                }

                return a.time.localeCompare(
                    b.time
                );

            }
        );


    sortedSessions.forEach(
        session => {

            const card =
                document.createElement("div");


            card.className =
                session.completed
                    ? "study-session completed"
                    : "study-session";


            card.innerHTML = `

                <div class="session-time">

                    <span>
                        ${formatTime(session.time)}
                    </span>

                    <div class="time-line"></div>

                </div>


                <div class="session-card">

                    <div class="session-top">

                        <span
                            class="session-priority
                            ${priorityClass(session.priority)}">

                            ${session.priority}

                        </span>


                        <button
                            class="session-delete"
                            onclick="deleteSession(${session.id})">

                            ×

                        </button>

                    </div>


                    <h3>
                        ${escapeHTML(session.subject)}
                    </h3>


                    <p>
                        ${escapeHTML(session.topic)}
                    </p>


                    <div class="session-bottom">

                        <span class="duration-pill">
                            ◷ ${session.duration} min
                        </span>


                        <button
                            class="complete-session"
                            onclick="toggleSession(${session.id})">

                            ${session.completed
                                ? "✓ Done"
                                : "Mark done"}

                        </button>

                    </div>

                </div>

            `;


            sessionList.appendChild(card);

        }
    );


    updateSessionCount();


    if (sessions.length === 0) {

        plannerEmpty.style.display =
            "flex";

    } else {

        plannerEmpty.style.display =
            "none";

    }

}


/* ---------------------------------------------------------
   COUNT
   --------------------------------------------------------- */

function updateSessionCount() {

    const total =
        sessions.length;


    sessionCount.textContent =
        total;

}


/* ---------------------------------------------------------
   SECURITY
   --------------------------------------------------------- */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* ---------------------------------------------------------
   HOME
   --------------------------------------------------------- */

function goHome() {

    window.location.href =
        "index.html";

}


/* ---------------------------------------------------------
   START
   --------------------------------------------------------- */

showToday();

renderSessions();

function openTool(tool) {
    alert(tool + " is coming soon!");
}


function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button = document.querySelector(".theme-btn");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "☾";
    } else {
        button.textContent = "☼";
    }

}

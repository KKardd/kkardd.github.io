function spread(count) {
    let submenu = document.getElementById("submenu-" + count);
    if (submenu) {
        if (submenu.classList.contains("hide")) submenu.classList.remove("hide");
        else submenu.classList.add("hide");
    }

    let spreadIcon = document.getElementById("spread-icon-" + count);
    if (spreadIcon) {
        if (spreadIcon.innerHTML == "") {
            spreadIcon.innerHTML = "";
            spreadIcon.style.color = "grey";
        } else {
            spreadIcon.innerHTML = "";
            spreadIcon.style.color = "white";
        }
    }
}

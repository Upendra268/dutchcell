(function () {
    "use strict";

    const menuArea = document.getElementById("header-sticky");
    const arrivalFilm = document.getElementById("arrivalFilm");
    const filmStage = document.querySelector(".swarna-film-stage");
    const filmControl = document.getElementById("filmControl");
    const bookingForm = document.getElementById("bookingForm");
    let restartTimer;

    window.addEventListener("scroll", function () {
        menuArea.classList.toggle("swarna-compact", window.scrollY > 80);
    });

    arrivalFilm.addEventListener("ended", function () {
        filmStage.classList.add("show-still");
        filmControl.classList.add("paused");
        filmControl.setAttribute("aria-label", "Play arrival film");

        restartTimer = window.setTimeout(function () {
            arrivalFilm.currentTime = 0;
            const playback = arrivalFilm.play();

            if (playback) {
                playback.then(function () {
                    window.setTimeout(function () {
                        filmStage.classList.remove("show-still");
                        filmControl.classList.remove("paused");
                        filmControl.setAttribute("aria-label", "Pause arrival film");
                    }, 120);
                }).catch(function () {
                    filmControl.classList.add("paused");
                });
            }
        }, 2000);
    });

    filmControl.addEventListener("click", function () {
        window.clearTimeout(restartTimer);

        if (arrivalFilm.paused) {
            arrivalFilm.play();
            filmStage.classList.remove("show-still");
            filmControl.classList.remove("paused");
            filmControl.setAttribute("aria-label", "Pause arrival film");
        } else {
            arrivalFilm.pause();
            filmControl.classList.add("paused");
            filmControl.setAttribute("aria-label", "Play arrival film");
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const button = bookingForm.querySelector("button");
            button.querySelector("span").textContent = "Thank You";
            button.disabled = true;
        });
    }
}());

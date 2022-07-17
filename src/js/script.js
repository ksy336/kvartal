"use strict";

// add new info
const addNewInfo = (e) => {
    const descriptions = document.querySelectorAll(".city-description");
    const invisibleText = document.querySelectorAll(".info-invisible");
    descriptions.forEach((card) => {
        card.addEventListener("click", function (e) {
                // invisibleText.style.display = (invisibleText.style.display = "none") ? "inline-block" : "none";
             console.log(e.target)
            invisibleText.forEach((text) => {
                text.classList.toggle("visible");
            })
        });
    })
}
addNewInfo();

// slider
const slider = () => {
    const slides = document.querySelectorAll(".slider__content"); // div
    const slider = document.querySelector(".slider-content"); // container
    const dotsContainer = document.querySelector(".dots");
    let currSlide = 0;
    let maxSlideLength = slides.length;


//создаем кнопки внизу слайдера
    const createDots = () => {
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML("beforeend", `
        <button class="dots__dot" data-slide="${i}"></button>`)
        })
    }

// делаем кнопку другого цвета на активном слайде
    const activateDot = (slide) => {
        document.querySelectorAll(".dots__dot").forEach((btn, i) => {
            btn.classList.remove("dots__dot--active");
        });
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add("dots__dot--active")
    }

    const goToSlide = (slide) => {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        })
    }
// по умолчанию у каждого слайда выставляем translateX: 0%, 100%, 200%, 300%

// когда кликаем по правой кнопке-выставляем новый трансформ
    const nextSlide = () => {
        if (currSlide === maxSlideLength - 1) {
            currSlide = 0;
        } else {
            currSlide++;
        }
        goToSlide(currSlide);
        activateDot(currSlide);
    }
// кликаем по левой кнопке
    const prevSlide = () => {
        if (currSlide === 0) {
            currSlide = maxSlideLength - 1;
        } else {
            currSlide--;
        }
        goToSlide(currSlide);
        activateDot(currSlide);
    }
    const init = () => {
        createDots();
        activateDot(0);
        goToSlide(0);
    }
    init();
// Event handlers

    document.addEventListener("keydown", function (e) {
        // console.log(e);
        e.key === "ArrowLeft" && prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });

    dotsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dots__dot")) {
            // console.log("Dot");
            const {slide} = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    })
}
slider();
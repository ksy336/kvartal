"use strict";

// modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('button');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function (e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
    btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// add new info
const addNewInfo = () => {
    const container = document.querySelector(".info-layout");
    const description = document.querySelectorAll(".city-description");
    console.log(description)
    container.addEventListener("click", function (e) {
        const parent = e.target.closest('.city-description');
        const text = parent.querySelectorAll('.info-invisible');
        if (text) {
            text.forEach((textItem) => {
                textItem.classList.toggle("visible");
            })
        }

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
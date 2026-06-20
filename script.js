// JavaScript source code
//POPUP VIDEO
const openVideo = document.getElementById("openVideo");
const closeVideo = document.getElementById("closeVideo");

const videoModal = document.getElementById("videoModal");
const resortVideo = document.getElementById("resortVideo");



openVideo.addEventListener("click", function(e){

    e.preventDefault();

    videoModal.classList.add("active");

    resortVideo.play();

});



closeVideo.addEventListener("click", function(){

    videoModal.classList.remove("active");

    resortVideo.pause();

    resortVideo.currentTime = 0;

});



videoModal.addEventListener("click", function(e){

    if(e.target === videoModal){

        videoModal.classList.remove("active");

        resortVideo.pause();

        resortVideo.currentTime = 0;

    }

});



document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        videoModal.classList.remove("active");

        resortVideo.pause();

        resortVideo.currentTime = 0;

    }

});

// ================================
// BOOKING POPUP
// ================================

const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");

const closeBooking = document.querySelector(".close-booking");
const bookingButtons = document.querySelectorAll(".open-booking");

let bookingSource = "";


// ================================
// MỞ POPUP
// ================================

bookingButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        bookingSource =
        this.dataset.source || "Unknown";

        bookingModal.classList.add("active");

    });

});


// ================================
// ĐÓNG POPUP
// ================================

if (closeBooking) {

    closeBooking.addEventListener("click", () => {

        bookingModal.classList.remove("active");

    });

}


// ================================
// CLICK NỀN ĐỂ ĐÓNG
// ================================

if (bookingModal) {

    bookingModal.addEventListener("click", (e) => {

        if (e.target === bookingModal) {

            bookingModal.classList.remove("active");

        }

    });

}


// ================================
// ESC ĐỂ ĐÓNG
// ================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        bookingModal.classList.remove("active");

    }

});


// ================================
// NGÀY NHẬN PHÒNG >= HÔM NAY
// ================================

const dateInput =
document.querySelector('input[name="checkin"]');

if (dateInput) {

    const today =
    new Date().toISOString().split("T")[0];

    dateInput.min = today;

}


// ================================
// SĐT CHỈ ĐƯỢC NHẬP SỐ
// ================================

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {

    // Chỉ cho nhập số
    let value = this.value.replace(/\D/g, "");

    // Tối đa 10 số
    value = value.slice(0, 10);

    this.value = value;

});
// const phone = formData.get("phone").trim();

// if (!/^0\d{9}$/.test(phone)) {

//     phoneInput.focus();

//     alert(
//         "Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số và bắt đầu bằng số 0."
//     );

//     return;

// }





    // ================================
// SUBMIT FORM
// ================================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const submitBtn =
            bookingForm.querySelector(
                ".submit-btn"
            );

            const formData =
            new FormData(bookingForm);

            const name =
            formData.get("name").trim();

            const phone =
            formData.get("phone").trim();

            const checkinRaw =
                formData.get("checkin");

            const [year, month, day] =
                checkinRaw.split("-");

            const checkin =
                `${day}/${month}/${year}`;

            const guest =
            formData.get("guest");


            // =================
            // VALIDATE
            // =================

            if (name.length < 2) {

                alert(
                    "Vui lòng nhập họ tên hợp lệ."
                );

                return;

            }

            if (!/^0\d{9}$/.test(phone)) {

                alert(
                    "Số điện thoại phải gồm đúng 10 chữ số."
                );

                return;

            }

            if (!checkin) {

                alert(
                    "Vui lòng chọn ngày nhận phòng."
                );

                return;

            }

            if (!guest) {

                alert(
                    "Vui lòng chọn số khách."
                );

                return;

            }


            // =================
            // DATA
            // =================
            const now = new Date();

            const submitDate =
                `${String(now.getDate()).padStart(2, '0')}/` +
                `${String(now.getMonth() + 1).padStart(2, '0')}/` +
                `${now.getFullYear()} ` +
                `${String(now.getHours()).padStart(2, '0')}:` +
                `${String(now.getMinutes()).padStart(2, '0')}:` +
                `${String(now.getSeconds()).padStart(2, '0')}`;

            const bookingData = {

                date: submitDate,

                source:
                bookingSource,

                name:
                name,

                phone:
                phone,

                checkin:
                checkin,

                guest:
                guest,

                note:
                formData.get("note")

            };


            // =================
            // LOADING
            // =================

            submitBtn.disabled = true;

            submitBtn.textContent =
            "Đang gửi...";


            try {
                const successModal =
                    document.getElementById("successModal");

                const response =
                await fetch(
                    "https://script.google.com/macros/s/AKfycbyhG0hW163qgm9TlRugfHE-t8AbcC4kl7JdBtcn47Jkfj53kDCRheYM4k2OO-9--OSK6w/exec",
                    {
                        method: "POST",
                        body: JSON.stringify(
                            bookingData
                        )
                    }
                );

                const result =
                await response.json();

                console.log(result);


                // Thành công

                bookingForm.reset();

                bookingModal.classList.remove(
                    "active"
                );

                successModal.classList.add(
                    "active"
                );
                setTimeout(() => {

                    successModal.classList.remove(
                        "active"
                    );

                }, 3000);

            }

            catch (error) {

                console.error(error);

                alert(
                    "Có lỗi xảy ra. Vui lòng thử lại."
                );

            }

            finally {

                submitBtn.disabled = false;

                submitBtn.textContent =
                "Gửi Yêu Cầu";

            }

        }
    );

}

// ===========================
// TESTIMONIAL MOBILE SLIDER
// ===========================
if (window.innerWidth <= 768) {

    new Swiper(".testimonial-swiper", {

        slidesPerView: 1,

        spaceBetween: 20,

        loop: true,

        speed: 800,

        autoplay: {

            delay: 5000,

            disableOnInteraction: false

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        }

    });

}


//====FAQ=====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


//====BACK TO TOP=====
const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
/* ==========================
   RESET SCROLL POSITION
========================== */

history.scrollRestoration = "manual";

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

});

/* ==========================
REVEAL ON SCROLL
========================== */

const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

function revealOnScroll() {

    reveals.forEach(item => {

        const top =
            item.getBoundingClientRect().top;

        const trigger =
            window.innerHeight - 100;

        if (top < trigger) {

            item.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();
$(document).ready(function () {
  // sticky nav
  var btn = $(".navbar");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("sticky");
    } else {
      btn.removeClass("sticky");
    }
  });

  // sticky nav
  // coutup
  $(".counter-count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          //chnage count up speed here
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
  // filtering
  // Bind the change event handler
  $(".event-type-select").change(function () {
    var selectedEventType = this.value;
    // Hide all dropdowns initially
    $(".collectionFilterResult div").addClass("hidden");
    // Show the dropdown for the selected event type
    $(
      '.collectionFilterResult div[data-eventtype="' + selectedEventType + '"]'
    ).removeClass("hidden");
  });

  // Trigger the change event to set the default filter to "men"
  $(".event-type-select").val("men").change();

  // hero slider

  // Params
  var sliderSelector = ".mySwiper",
    options = {
      init: false,
      loop: true,
      speed: 800,
      slidesPerView: "auto", // or 'auto'
      // spaceBetween: 10,
      grabCursor: true,
      parallax: true,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        993: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 2,
        },
        300: {
          slidesPerView: 1,
        },
      },
      // Events
      on: {
        imagesReady: function () {
          this.el.classList.remove("loading");
        },
      },
    };
  var mySwiper = new Swiper(sliderSelector, options);

  // logoSlider
  var swiper = new Swiper(".logoSlider", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: false,
    breakpoints: {
      993: {
        slidesPerView: 4,
      },
      300: {
        slidesPerView: 3,
      },
    },
  });

  // home car slider
  var swiper = new Swiper(".home-car-slider", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    spaceBetween: 30,
    breakpoints: {
      993: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });

  // home car slider
  var swiper = new Swiper(".dreamCar", {
    spaceBetween: 16,
    grabCursor: true,
    parallax: true,
    pagination: false,
    navigation: false,
    breakpoints: {
      993: {
        slidesPerView: 4,
      },
      600: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });


  // product-img slider
  var swiper = new Swiper(".product-img", {
    spaceBetween: 16,
    slidesPerView: 1,
    grabCursor: true,
    parallax: true,
    pagination: false,
    navigation: false,
  });

  // Initialize slider
  mySwiper.init();
  // country code
  var telInput = $("#phone"),
    errorMsg = $("#error-msg"),
    validMsg = $("#valid-msg");

  // initialise plugin
  telInput.intlTelInput({
    allowExtensions: true,
    formatOnDisplay: true,
    autoFormat: true,
    autoHideDialCode: true,
    autoPlaceholder: true,
    defaultCountry: "auto",
    ipinfoToken: "yolo",

    nationalMode: false,
    numberType: "MOBILE",
    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    preferredCountries: ["sa", "ae", "qa", "om", "bh", "kw", "ma"],
    preventInvalidNumbers: true,
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
        resp
      ) {
        var countryCode = resp && resp.country ? resp.country : "";
        callback(countryCode);
      });
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js",
  });

  var reset = function () {
    telInput.removeClass("error");
    errorMsg.addClass("hide");
    validMsg.addClass("hide");
  };

  // on blur: validate
  telInput.blur(function () {
    reset();
    if ($.trim(telInput.val())) {
      if (telInput.intlTelInput("isValidNumber")) {
        validMsg.removeClass("hide");
      } else {
        telInput.addClass("error");
        errorMsg.removeClass("hide");
      }
    }
  });

  // on keyup / change flag: reset
  telInput.on("keyup change", reset);

  // email sending
  document
    .getElementById("emailForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("emailInput").value;
      const message = document.getElementById("messageInput").value;

      const data = { email, message };

      fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          // Handle success or error responses from the backend
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors that occur during the fetch
        });
    });
});

// multiple question select
// Initialize an array to store selected options for each question
const selectedOptions = [];

function selectOption(option, questionIndex) {
  // Remove 'active' class and hide checkmark icon from all options in this question
  const options = document
    .querySelectorAll(".question-container")
    [questionIndex].querySelectorAll(".option");
  options.forEach((opt) => {
    opt.classList.remove("active");
    opt.querySelector(".fa-check").style.display = "none";
  });

  // Add 'active' class and display checkmark for the selected option
  option.classList.add("active");
  option.querySelector(".fa-check").style.display = "inline-block";

  // Update the selected option in the array
  selectedOptions[questionIndex] = option.textContent.trim();

  // Log the selected options (you can do something else with them)
  console.log(
    `Selected options for question ${questionIndex}: ${selectedOptions[questionIndex]}`
  );
}

// drag & drop
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

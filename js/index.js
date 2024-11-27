let quote = document.getElementById("quote");
let name = document.getElementById("name");
let copy = document.getElementById("copy");
let love = document.getElementById("love");
let content = document.getElementById("content");
let clear = document.getElementById("clear");
let carouselInnerEl = document.getElementById("carousel-inner");
let carouselIndicators = document.getElementById("carousel-indicators");
// console.log(carouselInnerEl, carouselIndicators);

(function () {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
})();

let quotes = [
  {
    id: 1,
    fav: false,
    quote: "Be yourself; everyone else is already taken.",
    name: "― Oscar Wilde",
  },
  {
    id: 2,
    fav: false,

    quote:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    name: "― Marilyn Monroe",
  },
  {
    id: 3,
    fav: false,

    quote: "So many books, so little time.",
    name: "― Frank Zappa",
  },
  {
    id: 4,
    fav: false,

    quote: "A room without books is like a body without a soul.",
    name: "― Marcus Tullius Cicero",
  },

  {
    id: 5,
    fav: false,

    quote:
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    name: "― Bernard M. Baruch",
  },
];

/*
 <div class="carousel-item active">
                    <div class="content-carousel text-center py-5">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, quas!</p>
                      <h2>__Ahmed</h2>
                    </div>
                  </div>



                   <button
                    type="button"
                    data-bs-target="#carousel_1"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
*/

// ${idx == 0 ? "active" : ""}
(function () {
  carouselInnerEl.innerHTML = "";
  carouselIndicators.innerHTML = "";
  quotes.forEach((e, idx) => {
    carouselInnerEl.innerHTML += `<div data-bs-interval="1500" class="carousel-item   ${idx == 0 ? "active" : ""}">
                    <div class="content-carousel pt-5  w-50 mx-auto text-center py-5">
                      <p> 
    <i class="fa-solid text-info fa-quote-left"></i>${
      e.quote
    } <i class="fa-solid text-info fa-quote-right"></i>
</p>
                      <h2>${e.name}</h2>
                    </div>
                  </div>`;
    carouselIndicators.innerHTML += ` <button
                    type="button"
                    data-bs-target="#carousel_1"
                    data-bs-slide-to="${idx}"
                    class=${idx == 0 ? "active" : ""}
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>`;
  });
})();

quote.innerHTML = `
<i class="fa-solid text-info fa-quote-left"></i>
${quotes[0].quote} 
<i class="fa-solid text-info fa-quote-right"></i>
`;
name.dataset.id = quotes[0].id;
name.innerHTML = quotes[0].name;
let favArray =
  localStorage.getItem("favArr") == null ? [] : JSON.parse(localStorage.getItem("favArr"));
if (localStorage.getItem("favArr") != null) {
  favArray.forEach((e1) => {
    quotes.forEach((e2) => {
      if (e1.id == e2.id) {
        e2.fav = true;
      }
    });
  });
}
let flags = -1;
function generateQuote() {
  let idx;
  do {
    idx = Math.trunc(Math.random() * quotes.length);
  } while (idx == flags);
  flags = idx;
  quote.innerHTML = `
    <i class="fa-solid text-info fa-quote-left"></i>
    ${quotes[idx].quote} 
    <i class="fa-solid text-info fa-quote-right"></i>
    `;
  if (quotes[idx].fav) {
    love.classList.add("red");
  } else {
    love.classList.remove("red");
  }
  name.dataset.id = quotes[idx].id;
  name.innerHTML = quotes[idx].name;
}

love.addEventListener("click", (e) => {
  const n = document.querySelector("#name").dataset.id;

  const objFav = quotes.find((e) => {
    return e.id == n;
  });
  console.log(objFav);
  if (objFav.fav) {
    objFav.fav = false;
    favArray = favArray.filter((e) => {
      return e.id != objFav.id;
    });
    Toastify({
      text: "remove from Favorite 💔",
      duration: 2000,
      stopOnFocus: false,
    }).showToast();
  } else {
    favArray.push(objFav);
    Toastify({
      text: "add to Favorite 🤍",
      duration: 2000,
      stopOnFocus: false,
    }).showToast();
    // localStorage.setItem("favArr", JSON.stringify(favArray));
    objFav.fav = true;
  }
  localStorage.setItem("favArr", JSON.stringify(favArray));
  e.target.classList.toggle("red");
  console.log(favArray);
});

copy.addEventListener("click", (e) => {
  const n = document.querySelector("#quote").textContent;
  e.target.classList.add("text-info");
  setTimeout((el) => {
    e.target.classList.remove("text-info");
  }, 1500);
  console.log(n);
  navigator.clipboard
    .writeText(n)
    .then(() => {
      Toastify({
        text: "Copy done",
        duration: 1500,
        stopOnFocus: false,
      }).showToast();
    })
    .catch((err) => {
      console.log("Error");
    });
});

function listFn() {
  if (favArray.length == 0) {
    content.innerHTML = "<h1 class='text-center'>No Quotes</h1>";
    clear.classList.add("d-none");
  } else {
    clear.classList.remove("d-none");

    let box = "";
    favArray.forEach((e, i) => {
      box += `
    <div class="box-content">
              <p>
                <span class="fw-bold text-info fs-4">${i + 1}.</span> ${e.quote}
              </p>
              <h6 class="text-end">${e.name}</h6>
            </div>
  `;
    });
    content.innerHTML = box;
  }
}

clear.addEventListener("click", (e) => {
  favArray.forEach((e) => {
    if (e.fav == true) {
      e.fav = false;
    }
  });
  love.classList.remove("red");

  favArray.splice(0);
  localStorage.setItem("favArr", JSON.stringify(favArray));
  listFn();
});

function shareWatsApp() {
  let message = document.querySelector("#quote").textContent;

  let whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
}

function speakFn(ele) {
  const text = document.getElementById("quote").textContent;
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.onstart = () => {
    ele.classList.add("text-info");
  };

  utterance.onend = () => {
    ele.classList.remove("text-info");
  };

  // Use SpeechSynthesis to speak the text
  window.speechSynthesis.speak(utterance);
}

/*

 navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("Text copied to clipboard successfully!");
  }).catch(err => {
    console.error("Failed to copy text: ", err);
  });

*/

let quote = document.getElementById("quote");
let name = document.getElementById("name");
let copy = document.getElementById("copy");
let love = document.getElementById("love");
let content = document.getElementById("content");
let clear = document.getElementById("clear");

// let arr = [
//   { a: "Ahmed", b: "Maram" },
// //   { a: "mm", b: "bb" },
// ];
// let arr2 = [{ a: "Mahmoud", b: "Mousa" }];
// const newa = [...arr, ...arr2];
// console.log(newa);

// let a = [{ a: "Ahmed", b: "Mousa", f: true }];
// let b = [{ a: "Maram", b: "basyone" }];
// let c = [...a, ...b];
// console.log(c);

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
  } else {
    favArray.push(objFav);
    // localStorage.setItem("favArr", JSON.stringify(favArray));
    objFav.fav = true;
  }
  localStorage.setItem("favArr", JSON.stringify(favArray));
  e.target.classList.toggle("red");
  console.log(favArray);
});

copy.addEventListener("click", (e) => {
  console.log(e.target);
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
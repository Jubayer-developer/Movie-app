let left_btn = document.getElementsByClassName("fa-chevron-left")[0];
let right_btn = document.getElementsByClassName("fa-chevron-right")[0];

let cards = document.getElementsByClassName("cards")[0];

let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");

left_btn.addEventListener("click", () => {
  cards.scrollLeft -= 190;
  console.log("coming");
});

right_btn.addEventListener("click", () => {
  cards.scrollLeft += 190;
  console.log("going");
});

//  for  fetching  data  dynamically
let json_url = "movie.json";

fetch(json_url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url, rating } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url;
      card.innerHTML = `
       <img src="${sposter}"  alt="${name}" class="poster"/>
           <div  class="rest_card">
             <img src="${bposter}"/>
              <div class="cont">
                 <h4>${name}</h4>
                 <div class="sub">
                   <p>${genre}, ${date}</p>
                   <h3><span>IMDB</span><i class="fa-solid fa-star"></i>${imdb}</h3>
                 </div>
              </div>
           </div>
        `;

      cards.appendChild(card);
      let title = document.getElementById("title");
      title.innerText = data[1].name;

      let gen = document.getElementById("gen");
      gen.innerText = data[1].genre;

      document.getElementById("date").innerText = data[1].date;

      document.getElementById(
        "rate"
      ).innerHTML = `<span>IMDB</span><i class="fa-solid fa-star"></i> ${data[1].imdb}`;
    });

    // search data load
    data.forEach((ele, i) => {
      let { name, imdb, date, bposter, sposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url;
      card.innerHTML = `
              <img src="${bposter} alt="${name}" />
              <div class="cont">
                <h3>${name}</h3>
                <p>
                  ${genre}, ${date}, <span>IMDB</span
                  ><i class="fa-solid fa-star"></i> ${imdb}
                </p>
              </div>
       `;
      search.appendChild(card);
    });

    //search filtering  logic

    search_input.addEventListener("keyup", () => {
      let filter = search_input.value.toUpperCase();

      let a = document.getElementsByTagName("a");

      for (let i = 0; i < a.length; i++) {
        let b = a[i].getElementsByClassName("cont")[0];
        console.log(b);

        let textValue = b?.textContent || b?.innerText;
        if (textValue?.toUpperCase()?.includes(filter)) {
          a[i].style.display = "flex";
          search.style.visibility = "visible";
          search.style.opacity = 1;
        } else {
          a[i].style.display = "none";
        }
        if (search_input.value === "") {
          search.style.visibility = "hidden";
          search.style.opacity = 0;
        }
      }
    });
  });

search_input.addEventListener("keyup", () => {
  let filter = search_input.value.toUpperCase();
});

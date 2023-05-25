document.addEventListener("DOMContentLoaded", () => {
  // check if value is stored in local storage
  if (localStorage.getItem("searches")) {
    // get the value from local storage
    const searches = localStorage.getItem("searches");
    // set the value to the input
    const inputField = document.getElementById("searches");
    inputField.value = searches;
  }

  // get the form
  const form = document.getElementById("myForm");
  // add event listener to the form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // get the search count and store it in local storage
    const searches = document.getElementById("searches").value;
    localStorage.setItem("searches", searches);
    // check if the search count is valid
    if (searches > 0 && searches <= 40) {
      // loop through the search count
      fetch(`https://random-word-api.vercel.app/api?words=${searches}`)
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < searches; i++) {
            // create a link
            const a = document.createElement("a");
            a.href = "https://www.bing.com/search?q=" + data[i];
            a.referrerPolicy = "no-referrer";
            a.textContent = data[i];
            a.target = "_blank";
            const div = document.createElement("div");
            div.append(a);
            document.body.append(div);
            a.click();
            div.style.display = "none";
          }
        });
    } else {
      alert("Please enter a valid search count");
    }
  });
});

import reddit from "./redditApi";

// DOM vars
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form Listeners
searchForm.addEventListener("submit", e => {
  // GET word from input field
  const searchTerm = searchInput.value;
  // GET the exact checked checkbox
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // GET selected option value
  const searchLimit = document.getElementById("limit").value;

  // Validate User Input
  if (searchTerm === "") {
    showMessage("Please type something in to search", "alert-danger");
  }

  // Clear Input Field
  searchInput.value = "";

  // Search Reddit API
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';

    console.log("Reddit API results: ", results);

    results.forEach(post => {
      // TEST IF post has image URL at all (API console results)
      const img = post.preview
        ? post.preview.images[0].source.url
        : "http://kidcrusher.com/wp-content/uploads/2017/01/reddit-squarelogo-1428963840284.png";

      output += `
          <div class="card">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href=${
                post.url
              } target="_blank" class="btn btn-primary">Read more...</a>
            </div>
          </div>
        `;
    });
    output += "<div>";

    // RENDER 'output' in HTML
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

// Show Alert in Form Validation
function showMessage(msg, className) {
  const div = document.createElement("div");

  div.className = `alert ${className}`; // Dynamic Classname
  // Add msg text to div
  div.appendChild(document.createTextNode(msg));

  // GET parent of div
  const searchContainer = document.getElementById("search-container");
  const searchCard = document.getElementById("search-card");
  //RENDER the msg text
  searchContainer.insertBefore(div, searchCard);

  // Remove  alert msg  in time
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Truncate Function
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit); // IF does not match a space return = -1;

  if (shortened === -1) return text;

  //RETURN text  0-limit
  return text.substring(0, shortened);
}

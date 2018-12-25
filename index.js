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
    results.forEach(post => {
      output += `
          <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
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

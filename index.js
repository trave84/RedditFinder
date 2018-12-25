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
}

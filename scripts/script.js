// Function to fetch dog image from dog API
async function fetchDogImage(dogBreed) {
  if (!dogBreed) { throw new Error("Dog breed was not provided.") };
  // Fetch image of dog from dog API
  return fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`).then((response) => {
    // Parse response
    if (!response.ok) { throw new Error(`Failed to fetch image for ${dogBreed}.`); }
    return response.json();
  }).then((data) => {
    // Return image
    if (!data) { throw new Error(`Failed to parse response for image of ${dogBreed}.`); }
    return data.message; 
  });
}
  
// Function for fetching a description of a dog breed from wikipedia API
async function fetchDogDescription(dogBreed) {
  if (!dogBreed) { throw new Error("Dog breed was not provided.") };
  // Construct url 
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${dogBreed}`; 
  // Fetch dog description from Wikipedia
  return fetch(url).then((response) => {
    // Parse response
    if (!response) { throw new Error(`Failed to fetch description for ${dogBreed}.`) };
    return response.json();
  }).then((data) => {
    // Return description
    if (!data) { throw new Error(`Failed to parse response for description of ${dogBreed}.`) };
    return data.extract;
  });
}

// Function to create a new wiki item
function addWikiItem(dogBreed, dogDescription, dogImage) {
  // Create a wiki item
  const wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");
  // Create a header for the wiki item
  const wikiHeader = document.createElement("h1");
  wikiHeader.classList.add("wiki-header");
  wikiHeader.textContent = dogBreed; 
  // Create a container for the content
  const wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");
  // Create a paragraph for the description
  const wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  wikiText.textContent = dogDescription;
  // Create container for the image 
  const wikiImageContainer = document.createElement("div");
  wikiImageContainer.classList.add("img-container");
  // Create an image
  const wikiImage = document.createElement("img");
  wikiImage.classList.add("wiki-img");
  wikiImage.src = dogImage; 
  // Add the elements to the wiki item
  wikiImageContainer.appendChild(wikiImage); // Add image to image container
  wikiContent.appendChild(wikiImageContainer); // Add image container to content container
  wikiContent.appendChild(wikiText); // Add description text to content container
  wikiItem.appendChild(wikiHeader); // Add header to item
  wikiItem.appendChild(wikiContent); // Add content container to item
  // Add wiki item to the page
  const wikiContainer = document.getElementById("wiki-container");
  wikiContainer.appendChild(wikiItem); 
}

// Function to add dog breeds to the page
async function addDogBreed(dogBreed) {
  if (!dogBreed) { throw new Error("Dog breed was not provided.") }; 
  dogBreed = dogBreed.trim().toLowerCase(); 
  try {
    // Get dog description and image
    const dogImage = await fetchDogImage(dogBreed);
    const dogDescription = await fetchDogDescription(dogBreed);
    // Add dog breed to the page
    addWikiItem(dogBreed, dogDescription, dogImage);
  } catch(error) {
    console.error(`Failed to add ${dogBreed}`, error)
    return; 
  }
}

// Add event listener for page load that populates the page
document.addEventListener("DOMContentLoaded", () => { 
  console.log("Populating page...")
  // Default dog breeds
  const dogBreeds = ["hound", "akita", "beagle", "malamute", "husky"];
  // Generate and populate wiki items for each breed
  dogBreeds.forEach((dogBreed) => {
    addDogBreed(dogBreed);
  });
});

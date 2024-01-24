const api = 'http://localhost:8080';

const state = {
  pets: [],
};

const fetchAllPets = async () => {
  try {
    const response = await fetch(`${api}/pets`);
    const data = await response.json();
    renderAllPets(data);
  } catch (err) {
    console.log("Whoops, all the pets got out and we can't catch them!", err.message);
  }
};

const $main = document.querySelector("main");

const createCard = ({
  name,
  breed,
  age, 
  owner,
  telephone,
}) => {
  const card = document.createElement("section");
  const div = document.createElement("div");
  const nameHeader = document.createElement("h2");
  const breedInfo = document.createElement("p");
  const ageInfo = document.createElement("p");
  const ownerInfo = document.createElement("p");
  const telephoneInfo = document.createElement("p");

  card.className = "card";

  const elements = [
    { element: nameHeader, info: `Name: ${name}` },
    { element: breedInfo, info: `Breed: ${breed}`},
    { element: ageInfo, info: `Age: ${age}`},
    { element: ownerInfo, info: `Owner: ${owner}`},
    { element: telephoneInfo, info: `Owner: ${telephone}` }
  ]

  elements.forEach(({ element, info}) => {
    if ( element !== name ) {
      element.textContent = info;
    }
    div.appendChild(element); 
  })

  card.appendChild(div);
  return card;

}



const renderAllPets = (petList) => {
  $main.replaceChildren();

  if(petList.length < 1) {
    const message = document.createElement("h2")
    message.textContent = "No pets found";
    $main.appendChild(message);
    return;
  }

  petList.forEach((pet) => {
    const card = createCard(pet);
    $main.appendChild(card);
  })

}

const render = async () => {
  await fetchAllPets();
}

render();

//You can edit ALL of the code here
// Global variable 
const allEpisodes = getAllEpisodes(); // this is the defaut episode function to be display when the page it load 
let getShows = getAllShows();     // This is the function that should be call (API) when we click the "select Show" with the id "selectingShow"
let accessTheCount = document.getElementById("displayNumberOfEpisodes");
const rootElem = document.getElementById("root");

// this is the function that would load my HTML page, 
async function setup() {
  makePageForEpisodes(allEpisodes);    // make the page for all the episodes when the page is load
  createSelectElementForEpisode(allEpisodes);    // create the select element when the page is load
  createSearchBar();              // create a search bar function when the page is load
  addTheShowSelectElement(getShows);      // create the select element for the Show element
}

/**********Minimal features level 100*********/
// This create a div and display all the episode in the page- level 100
function makePageForEpisodes(ListOfEpisodes) {
  // For each episode in getAllEpisodes() create a div and append it in the rootElement Container and have the class card
  ListOfEpisodes.forEach((oneEpisode) => {
    let createContainer = document.createElement("div");
    rootElem.appendChild(createContainer);
    createContainer.className = "card";

    // let create the heading for each episode
    let headingDiv = document.createElement("div");
    headingDiv.setAttribute("id", "headingContainer");
    let headingElement = document.createElement("h2");
    headingElement.innerText = oneEpisode.name;
    headingDiv.appendChild(headingElement);
    createContainer.appendChild(headingDiv);

    // let create the second heading indicating the episode code
    let episodeCodeHeading = document.createElement("h3");
    episodeCodeHeading.innerHTML = `-- S0${oneEpisode.season}E0${oneEpisode.number}`;
    headingDiv.appendChild(episodeCodeHeading);

    //create an image element for each episode
    let imagesContainer = document.createElement("div");
    imagesContainer.setAttribute("class", "imageContainer");
    let createImageElement = document.createElement("img");
    createImageElement.src = oneEpisode.image.medium;
    imagesContainer.appendChild(createImageElement);
    createContainer.appendChild(imagesContainer);

    //create a paragraph element containing the summary found in the getAllEpisode object
    let createParagraph = document.createElement("p");
    createParagraph.innerHTML = oneEpisode.summary;
    imagesContainer.appendChild(createParagraph);
  });
  return ListOfEpisodes;
}

/**********Add Search Bar level 200*********/

// create a search bar functionality level 200(Add an Episode Selector)
//-AccessInput is the input where the user would have to type the value the would like to search
function createSearchBar() {
  let accessInput = document.querySelector(".input");
  accessInput.addEventListener("keyup", function (event) {
    let accessTheCardDiv = document.querySelectorAll("#root .card ");
    let searchItems = event.target.value.toLowerCase();
    accessTheCardDiv.forEach(function (cardDiv) {
      // accessTheCount.innerHTML = `Displaying ${numberOfEpisodes}/${allEpisodes.length} episodes`;
      if (cardDiv.textContent.toLowerCase().indexOf(searchItems) != -1) {
        cardDiv.style.display = "block";
      } else {
        cardDiv.style.display = "none";
      }
    });
  });
}

/**********Add an Episode Selector level 300*********/

// create the select element functionality-level 300
function createSelectElementForEpisode(episodes) {
  let accessSelectElement = document.querySelector("#selectingSeries");
  let accessOption = document.getElementById("defaultSeries");

  episodes.forEach((el) => {
    let createOption = document.createElement("option");
    createOption.innerText = `S0${el.season}E0${el.number}-- ${el.name}`;
    createOption.setAttribute("id", el.id);
    // createOption.setAttribute('value',`S0${el.season}E0${el.number}-- ${el.name}`)
    createOption.setAttribute("value", `${el.id}`);

    accessSelectElement.appendChild(createOption);
    //createContainer.setAttribute('selectEvent',`S0${el.season}E0${el.number}-- ${el.name}`)
  });
  accessSelectElement.addEventListener("change", (event) => {
    let accessTheCardDiv = document.querySelectorAll("#root .card ");

    let convertIntoArray = Array.from(accessTheCardDiv); // this convert the node object into array
    if (event.target.options[event.target.selectedIndex].index === 0) {
      convertIntoArray.forEach((container) => {
        // let numberOfEpisodes = convertIntoArray.length;
        //accessTheCount.innerHTML = `Displaying ${numberOfEpisodes}/${convertIntoArray.length} episodes`;
        container.style.display = "";
      });
    } else {
      convertIntoArray.forEach((container, episodesIndex) => {
        if (
          episodesIndex ===
          event.target.options[event.target.selectedIndex].index - 1
        ) {
          // this check if the current episode index is equal to the index
          container.style.display = "block";
        } else {
          container.style.display = "none";
        }
      });
    }
  });
  return accessSelectElement;
}


/**********Switch to fetching live data! level 350*********/

///create a select show
function addTheShowSelectElement(listOfShow) {
  accessTheShowSelectElement = document.getElementById("selectingShow");
  listOfShow.forEach((elementINShow) => {
    let createOption = document.createElement("option");
    createOption.textContent = `${elementINShow.name}`;

    accessTheShowSelectElement.appendChild(createOption);
  });
   //accessAPI(listOfShow);   
}

let accessShowSelector = document.getElementById("selectingShow");
async function accessAPI(episodeNumber) {
  fetch(`https://api.tvmaze.com/shows/${episodeNumber}/episodes`)             // 82 is the id number found in the getAllShows array
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log(response.json());
      } else {
        throw new Error(
          `Whoops What Had you done ${response.status} ${response.statusText}`
        );
      }
    })
    .then((fetchEpisodes) => {
      makePageForEpisodes(fetchEpisodes);        // make the page of episodes for each selected show
    })
    .catch((err) => {
      console.log(err);
    });
  accessShowSelector.addEventListener("change",  selectingEachShow); // here I am adding an event listener(change) that occur when the users select different value from the dropdown list
}
//accessAPI(getShows);         // I am calling the getShows variable that have the value of the getAllShow  assign to it

// function that would read the show's value that the users would select from the drowndown list
function selectingEachShow(eachShow) {
  console.log(eachShow.target.value);
  const selectedShow = eachShow.target.value;
  const selectedSeason = selectedShow.substring(0, selectedShow);
  console.log(selectedSeason);
  const selectedEpisode =selectedShow.substring(selectedShow + 1);
  console.log(selectedEpisode);
  if (eachShow.target.options[eachShow.target.selectedIndex].index === 0){
    getShows.filter(epi =>{
    setup(epi);
    })
  }
 

 // makePageForEpisodes(getShows); // I am calling the makePageForEpisodes function that create the page for each episodes
}



  

// const addCounter=()=>{
//   let createCounterElement=document.createElement('div');
//   createCounterElement.setAttribute('class','display')
//   rootElem.appendChild(createCounterElement)
//   return createCounterElement;
// }
// function counter(numberOfMovies,TotalOfMovie){
//  let tvDisplay;
//  if(accessSelectElement.style.display==='none'){
//    tvDisplay="episode";
//  }
//  else{
//    tvDisplay='tvShow';
//  }
//  let counterDisplay = document.querySelector('.display');
//  counterDisplay.innerHTML = `Displaying ${numberOfMovies.length}/${allEpisodes.length} episodes`;
// }


// create the footer of the page
let accessBody = document.getElementById("theBodyOfThePage");
let createFooter = document.createElement("footer");
createFooter.innerHTML = `
<div>
<p>This Data were originally came from 
<a href="https://www.tvmaze.com/" target="_blank"> TVMaze.com
</a>
</p>
</div>
`;
accessBody.appendChild(createFooter);
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }
//

window.onload = setup();

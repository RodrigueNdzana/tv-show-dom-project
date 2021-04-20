//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

let accessTheCount=document.getElementById('displayNumberOfEpisodes');
const rootElem = document.getElementById("root");
function setup() {
  makePageForEpisodes();
  createSearchBar()
  createSelect()
}

// This create a div an display all the episode in the page- level 100
function makePageForEpisodes(){
  // For each episode in getAllEpisode() create a div and append it in the rootElement Container and have the class card
  return allEpisodes.forEach(oneEpisode =>{

    let createContainer=document.createElement('div')
    rootElem.appendChild(createContainer);
    createContainer.className='card';
    
    // let create the heading for each episode
    let headingDiv=document.createElement('div');
    headingDiv.setAttribute('id','headingContainer')
    let headingElement=document.createElement('h2');
    headingElement.innerText=oneEpisode.name;
    headingDiv.appendChild(headingElement)
    createContainer.appendChild(headingDiv)
  
    // let create the second heading indicating the episode code
    let episodeCodeHeading=document.createElement('h3');
    episodeCodeHeading.innerHTML=`-- S0${oneEpisode.season}E0${oneEpisode.number}`
    headingDiv.appendChild(episodeCodeHeading);
  
    //create an image element for each episode
    let imagesContainer=document.createElement('div');
    imagesContainer.setAttribute('class','imageContainer')
    let createImageElement=document.createElement('img');
    createImageElement.src=oneEpisode.image.medium;
    imagesContainer.appendChild(createImageElement)
    createContainer.appendChild(imagesContainer)

    //create a paragraph element containing the summary found in the getAllEpisode object
    let createParagraph=document.createElement('p');
    createParagraph.innerHTML=oneEpisode.summary;
    imagesContainer.appendChild(createParagraph);
  })
    
}

// create a search bar functionality level 200(Add an Episode Selector)
function createSearchBar(){
  let accessInput=document.querySelector('.input');
  accessInput.addEventListener('keyup',function(event){
    let accessTheCardDiv=document.querySelectorAll('#root .card ');
    let searchItems=event.target.value.toLowerCase();
    accessTheCardDiv.forEach(function(cardDiv){
      
      // accessTheCount.innerHTML = `Displaying ${numberOfEpisodes}/${allEpisodes.length} episodes`;
      if(cardDiv.textContent.toLowerCase().indexOf(searchItems) != -1){
      cardDiv.style.display = "block"; 
       
    }
    else {
      cardDiv.style.display = "none";
  
    
    }
    let numberCount=0
    for (let eachCarDiv in allEpisodes){
      accessTheCount.innerHTML = `Displaying ${accessTheCardDiv[eachCarDiv].length}/${allEpisodes.length} episodes`;
      
    }
    
  })
 
  //let numberOfEpisodes = Array.from(cardDiv);
 //accessTheCount.innerHTML = `Displaying ${cardDiv.length}/${allEpisodes.length} episodes`;
  

  
})
}

// create the select element functionality-level 300
let accessSelectElement=document.querySelector("#selectingSeries");
let accessOption=document.getElementById('defaultSeries')
function createSelect(){
allEpisodes.forEach(el =>{
  let createOption=document.createElement('option');
  createOption.innerText=`S0${el.season}E0${el.number}-- ${el.name}`
  createOption.setAttribute('id',el.id)
  // createOption.setAttribute('value',`S0${el.season}E0${el.number}-- ${el.name}`)
    createOption.setAttribute('value',`${el.id}`)

  accessSelectElement.appendChild(createOption);
  //createContainer.setAttribute('selectEvent',`S0${el.season}E0${el.number}-- ${el.name}`)
      
})
accessSelectElement.addEventListener('change',(event)=>{
  let accessTheCardDiv=document.querySelectorAll('#root .card ');
  
  
  let convertIntoArray=Array.from(accessTheCardDiv) // this convert the node object into array
  if(event.target.options[event.target.selectedIndex].index===0){
    convertIntoArray.forEach((container)=>{
      let numberOfEpisodes = convertIntoArray.length;
      accessTheCount.innerHTML = `Displaying ${numberOfEpisodes}/${convertIntoArray.length} episodes`;
      container.style.display="";
    });
  }
  else{
    convertIntoArray.forEach((container,episodesIndex)=>{
      if(episodesIndex === event.target.options[event.target.selectedIndex].index -1){ // this check if the current episode index is equal to the index
        container.style.display='block';
      }
      else{
        container.style.display="none";
      }
    })
  
  }
})
return accessSelectElement;
}

// create the footer of the page
let accessBody=document.getElementById('theBodyOfThePage');
let createFooter=document.createElement('footer');
createFooter.innerHTML=`
<div>
<p>This Data were originally came from 
<a href="https://www.tvmaze.com/" target="_blank"> TVMaze.com
</a>
</p>
</div>
`
accessBody.appendChild(createFooter);
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;




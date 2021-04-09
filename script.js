//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
function setup() {
  const rootElem = document.getElementById("root");
return allEpisodes.forEach(episodeList =>{
    
    let createContainer=document.createElement('div');
    rootElem.appendChild(createContainer);
    createContainer.className='card';

     // let create the heading 
     let headingDiv=document.createElement('div');
    headingDiv.setAttribute('id','headingContainer')
    let headingElement=document.createElement('h2');
    headingElement.innerText=episodeList.name;
    headingDiv.appendChild(headingElement)
    createContainer.appendChild(headingDiv)

    // let create the second heading indicating the episode code
     let episodeCodeHeading=document.createElement('h3');
     episodeCodeHeading.innerHTML=`-- S0${episodeList.season}E0${episodeList.number}`
     headingDiv.appendChild(episodeCodeHeading)


    //create an image element
    let imagesContainer=document.createElement('div');
    imagesContainer.setAttribute('class','imageContainer')
    let createImageElement=document.createElement('img');
    createImageElement.src=episodeList.image.medium;
    imagesContainer.appendChild(createImageElement)
    createContainer.appendChild(imagesContainer)
    //create a paragraph element
  let createParagraph=document.createElement('p');
  createParagraph.innerHTML=episodeList.summary;
  imagesContainer.appendChild(createParagraph);
  })
  

}
// create a search bar
let accessInput=document.querySelector('.input');
accessInput.addEventListener('keyup',function(event){
  let accessTheCardDiv=document.querySelectorAll('#root .card ');
   let searchItems=event.target.value.toLowerCase();
  accessTheCardDiv.forEach(function(cardDiv){
    if(cardDiv.textContent.toLowerCase().indexOf(searchItems) != -1){
      cardDiv.style.display = "block";
    }
    else {
      cardDiv.style.display = "none";
    }
  })
})
// create the select element functionality
let accessSelectElement=document.querySelector("#selectingSeries");
allEpisodes.forEach(el =>{
  const createOption=document.createElement('option');
  createOption.innerText=`S0${el.season}E0${el.number}-- ${el.name}`
  createOption.setAttribute('class','options')
  createOption.setAttribute('value',`S0${el.season}E0${el.number}-- ${el.name}`)
  accessSelectElement.appendChild(createOption);
  accessSelectElement.addEventListener('change',() =>{
  let getOption=document.querySelectorAll('.options')
  if(getOption.value ===`S0${el.season}E0${el.number}-- ${el.name}`){
    console.log('hi')
  }
})
})


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




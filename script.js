const timeheads = document.querySelector("#timeheads")
const datedivs = document.querySelector("#datediv")
const jokediv = document.querySelector("#jokediv")
const storyDiv = document.querySelector('#story');

const getTime = () => {
    let dt = new Date()
    timeheads.textContent = dt.toLocaleTimeString('en-US', { hour12: true, 
        hour: "numeric", 
        minute: "numeric"});
    var days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let html = `<p id="dateheads">
     ${dt.toLocaleDateString().split("/")[0]+"/"+dt.toLocaleDateString().split("/")[1]}
      <span id="day">${days[dt.getDay()]}</span>
    </p>`;

    datedivs.innerHTML = html
}

const storyNode = (story) => {
  var template = document.createElement('template');
  template.innerHTML = story;
  return template.content.childNodes[0];
}

const addStories = (stories) => {
  for(var x = 0;x<5;x++){
    const story = stories[x];
    const newhtml = `<div id="blogsubdiv">
    <img id="blogimg" src="${story.mainImage}" />
    <a href="https://www.hackernoon.com/${story.slug}" id="subtext">${story.title}</a>
    </div>`
    storyDiv.appendChild(storyNode(newhtml)); 
  }
}

const addJokes = (joke) => {
      const newhtml = `<div>
      <p id="jokeQ">${joke.body[0]["setup"]}</p>
      <p id="jokeA">${joke.body[0]["punchline"]}</p>
      </div>`
    jokediv.innerHTML = newhtml
  }


getTime()

if(localStorage.jokes && localStorage.lastJokeFetch && (Math.abs(new Date().getMinutes() - localStorage.lastJokeFetch)<30))
{
    addJokes(JSON.parse(localStorage.jokes))
}else{
    if (localStorage.jokes) {
        addJokes(JSON.parse(localStorage.jokes));
      }
    
    fetch('https://dad-jokes.p.rapidapi.com/random/joke',{
      method: 'GET',
      mode: 'cors',
      type: 'programming',
      headers:{
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        'X-RapidAPI-Key': 'd55392ca3amsh7bec22cd54629dfp1e5035jsne4dc330c2c3b'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (!localStorage.joke) {
        addJokes(data);
      }

      localStorage.setItem("jokes", JSON.stringify(data));
      localStorage.setItem("lastJokeFetch", new Date().getMinutes());
    });
}



if (localStorage.lastFetch && localStorage.stories && (new Date() - localStorage.lastFetch) < (1000*60*60)) {
    addStories(JSON.parse(localStorage.stories));
  } else {
    if (localStorage.stories) {
      addStories(JSON.parse(localStorage.stories));
    }
  
    fetch('https://api.hackernoon.com/featured-stories',{
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (!localStorage.stories) {
          addStories(data);
        }
  
        localStorage.setItem("stories", JSON.stringify(data));
        localStorage.setItem("lastFetch", new Date()-1);
      });
  }

document.querySelector("#specialBtn").addEventListener("click",
function(e){
    e.preventDefault()
    window.open('https://mail.google.com/mail/u/0/')
    window.open('https://deere.cloud.databricks.com/');
    window.open('https://deere-edl.cloud.databricks.com/');
    window.open('https://data-catalog.deere.com/catalog');
    window.open('https://teams.microsoft.com/')
    window.open('https://app.powerbi.com/datahub/datasets')    
    window.open('https://johndeerejira.atlassian.net/browse/ADA')

}
)
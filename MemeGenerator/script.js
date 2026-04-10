let meme= document.getElementById("meme");
let title = document.getElementById("title");
let getMemeBtn = document.getElementById("get-meme-btn");

//API URL 
let url= "https://meme-api.com/gimme/";

//array of subreddits of your choice
let subreddits = ["catmemes" ,
                "wholesomemes",
                "dogmemes",
                "me_irl"];

let getMeme =()=>{
    //choose a random subreddits from the subreddits array
    let randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    //fetch data from teh api
    fetch(url + randomSubreddit).then(resp =>
        resp.json()).then(data=>{
            let memeImg =  new Image();
            //Display meme image and title only after  the image load
            memeImg.onload = () =>{
                meme.src = data.url;  
                title.innerHTML =  data.title;  
            }
            memeImg.src =  data.url;
        });

};

//Call the getMeme() on button click and on window  load
getMemeBtn.addEventListener("click", getMeme);
window.addEventListener("load",getMeme);




const score= JSON.parse(localStorage.getItem("score"))
const players= JSON.parse(localStorage.getItem("players")) || []
const scoreEle=document.querySelector("p");
const button=document.querySelector("button");
const input=document.querySelector("input");

console.log(score)
scoreEle.innerText = score;

const saveHandler=()=>{
    if(!score|| !input.value){
        alert("Invalid username or score")
    } else {
        const finalDetails={ name:input.value, score:score}
        // console.log(players)
        players.push(finalDetails);
        players.sort((a, b)=>{b.score - a.score})
        players.splice(10);
        // console.log(localStorage.getItem("scores"))
        localStorage.setItem("players", JSON.stringify(players))
        window.location.assign("/")
    
    }
}

button.addEventListener("click", saveHandler)
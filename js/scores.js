const scores= JSON.parse(localStorage.getItem("players")) || []
const container = document.querySelector("ol")

const list= scores.map((score, index) =>{

    return `<li><span>${index + 1}</span><p>${score.name}</p> <span>${score.score}</span></li>`
        ;
});

console.log(list)

container.innerHTML=list.join(" ");

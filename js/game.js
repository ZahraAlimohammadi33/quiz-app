const loader= document.getElementById("loader")
const container=document.getElementById("container")
const questionText= document.getElementById("question-text")
const answerList= document.getElementsByClassName("answer-text")
const scoreText=document.getElementById("score")
const level= localStorage.getItem("level") || "medium"
const questionNumber= document.getElementById("question-num")
const nextButton=document.getElementById("next-button")
const finishButton=document.getElementById("finish-button")
const URL =`https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`
let formattedData = null;
let questionIndex=0;
let correctAnswerIndex=null;
let score= 0;
let isAccepted = true;


const formatData=(data)=>{
   const result = data.map((item)=>{
        const answers =[...item.incorrect_answers]
        const correctIndex= Math.floor(Math.random()*4);
        answers.splice(correctIndex, 0, item.correct_answer);
        questionObject = {
            question : item.question
            , answers: answers,
            index: correctIndex
        }
        return questionObject
    });
    return result
}


const fetchData = async ()=>{
    const data = await fetch(URL,{ method:"GET"});
    const json= await data.json();
    formattedData=formatData(json.results);
    start();
} 

const start = ()=>{
    showQuestion();
    loader.style.display="none";
    container.style.display="block";
}

const showQuestion=()=>{
    questionNumber.innerText=questionIndex+1;
    correctAnswerIndex= formattedData[questionIndex].index
    console.log(correctAnswerIndex)
    questionText.innerText = formattedData[questionIndex].question
    for(let i=0; i<answerList.length; i++){
        answerList[i].innerText=formattedData[questionIndex].answers[i]
    }
}

const checkAnswer=(e, index)=>{
    if(!isAccepted){return}
    isAccepted=false
 if(index===correctAnswerIndex){
    e.target.classList.add("correct")
    score +=10;
    scoreText.innerText=score;
 } else{
    e.target.classList.add("incorrect")
    answerList[correctAnswerIndex].classList.add("correct")
 }
}

const nextHandler=()=>{
    
    if(questionIndex < formattedData.length-1){
        questionIndex++;
        for(let i=0; i<answerList.length; i++){
            answerList[i].className="answer-text"
        }
        showQuestion();
        isAccepted=true;
    } else{
       finishHandler()
    }
}

const finishHandler=()=>{
    localStorage.setItem("score", JSON.stringify(score))
    window.location.assign("end.html")
}


window.addEventListener("load", fetchData)
for(let i=0; i<answerList.length; i++){
    answerList[i].addEventListener("click", (e)=>checkAnswer(e, i))
}
nextButton.addEventListener("click", nextHandler)
finishButton.addEventListener("click", finishHandler)
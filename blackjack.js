var dealerScore=0;
var yourScore=0;

var dealerAces=0;
var yourAces=0;

var hidden;
var deck;

var canHit=true;

window.onload = function() {
    buildDeck();
    shuffleCards();
    deal();

    //add buttons
    document.getElementById("hit").addEventListener('click', hit);
    document.getElementById("stand").addEventListener('click', stand);
    



}

function buildDeck(){
    let values = ["A", "2", "3", "4","5","6","7","8","9","10","J","Q","K"];
    let suits= ["C", "D", "H", "S"];
    deck=[];

    for(let i = 0; i<suits.length; i++){
        for(let j=0; j<values.length; j++){
            deck.push(values[j] + suits[i])
        }
    }
}

function shuffleCards(){
    for(let i=0; i<deck.length; i++){
        let j= Math.floor(Math.random()* deck.length);
        let temp= deck[i];
        deck[i]= deck[j];
        deck[j]= temp;
    }
    
}

function deal(){

    //add dealers hidden card and keep score 
    hidden= deck.pop();
    dealerScore += getValue(hidden);
    dealerAces += checkAce(hidden);

    //deal to dealer
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../cards/"+ card +".png";
        dealerScore += getValue(card);
        dealerAces += checkAce(card);
        document.getElementById("dealerCards").append(cardImg);
    //deal to player
    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../cards/"+ card +".png";
        yourScore += getValue(card);
        yourAces += checkAce(card);
        document.getElementById("yourCards").append(cardImg);
    }

    if(yourScore==21){
        stand();
    }

    //show scores
    document.getElementById("yourScore").innerText= recount(yourScore, yourAces);
    document.getElementById("dealerScore").innerText= dealerScore- (getValue(hidden));

    document.getElementById("hit").addEventListener('click', hit);
    document.getElementById("stand").addEventListener('click', stand);
}

function hit(){

    if(!canHit){
        return;
    }

    //deal card
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "../cards/"+ card +".png";
    yourScore += getValue(card);
    yourAces += checkAce(card);
    document.getElementById("yourCards").append(cardImg);


    //if hit and bust
    if(recount(yourScore, yourAces) > 21){
        document.getElementById("yourScore").innerText= recount(yourScore, yourAces);
        document.getElementById("dealerScore").innerText= recount(dealerScore, dealerAces);
        canHit = false;
        stand();
    }
    //show scores
    document.getElementById("yourScore").innerText= recount(yourScore, yourAces);
    document.getElementById("dealerScore").innerText= dealerScore - (getValue(hidden));
    
    document.getElementById("hit").addEventListener('click', hit);
    document.getElementById("stand").addEventListener('click', stand);
}

function stand(){
    //count scores
    dealerScore = recount(dealerScore, dealerAces);
    yourScore = recount(yourScore, yourAces);

    canHit=false;

    while(dealerScore < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../cards/"+ card +".png";
        dealerScore += getValue(card);
        dealerAces += checkAce(card);
        document.getElementById("dealerCards").append(cardImg);
    }

    //show dealers hidden card
    document.getElementById("hidden").src= "../cards/" + hidden + ".png";



    //show message of who won
    let message = "";
    if (yourScore > 21){
        message= "You Lose!";
    }
    else if (dealerScore > 21){
        message= "You Win!";
    }
    else if (dealerScore == yourScore){
        message= "PUSH";

    }else if (dealerScore < yourScore){
        message= "You Win!";
    }
    else if (dealerScore > yourScore){
        message= "You Lose!";
    }

    //show scores and message
    document.getElementById("yourScore").innerText= recount(yourScore, yourAces);
    document.getElementById("dealerScore").innerText= recount(dealerScore, dealerAces);
    document.getElementById("resultMessage").innerText= message;



}

//get int value of a card
function getValue(card){
    if(card.charAt(1)==0){
        return 10;
    }
    value = card.charAt(0);

    if(isNaN(value)){
        if(value=="A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

//check if card is an ace
function checkAce(card){
    if(card[0]=="A"){
        return 1;
    }
    else
    return 0;
}

//recalculate score if player had aces and is over 21
function recount(yourScore, yourAces){
    while(yourScore > 21 && yourAces > 0){
        yourScore -=10;
        yourAces -=1;
    }
    return yourScore;
}
const versions = ["✊", "🤚", "🖖", "🖕"];

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }
}

class Card {
  constructor(version) {
    this.version = version;
  }
}

function freshDeck() {
  let deck = [];

  for (let i = 0; i < 3; i++) {
    versions.slice(0, 3).forEach((version) => {
      deck.push(new Card(version));
    });
  }
  deck.push(new Card(versions[3]));

  return deck;
}

const newDeck = new Deck();

// const rockTotal = document.getElementById('rockTotal');
// const paperTotal = document.getElementById('paperTotal');
// const scissorsTotal = document.getElementById('scissorsTotal');
// const wildcardTotal = document.getElementById('wildcardTotal');
// const cardsTotal = document.getElementById('cardsTotal');

const remainingRock = document.getElementById('remainingRock');
const remainingPaper = document.getElementById('remainingPaper');
const remainingScissors = document.getElementById('remainingScissors');
const remainingWildcard = document.getElementById('remainingWildcard');
let numOfCom = 6;

function newGame() {

  const gameInterface = document.getElementById("gameUI");
  const hideRules = document.getElementById('rules');
  
  const scoreDisplay = document.getElementById("scoreBoard");
  scoreDisplay.style.display = 'none';
 
  const endingScreen = document.getElementById('gameOverScreen');
  endingScreen.style.display = 'none';

  player.choicesLeft = freshDeck();
  player.currentChoice = null;
  player.playerPoints = 0;

  gameInterface.style.display = 'block';
  hideRules.style.display = 'none';

  remainingRock.innerText = 3;
  remainingPaper.innerText = 3;
  remainingScissors.innerText = 3;
  remainingWildcard.innerText = 1;
 

  const totalplayers = numOfCom + 1

  console.log(numOfCom);

  // rockTotal.innerText = countCardsByVersion(newDeck.cards, "✊") * totalplayers;
  // paperTotal.innerText = countCardsByVersion(newDeck.cards, "🤚")* totalplayers;
  // scissorsTotal.innerText = countCardsByVersion(newDeck.cards, "🖖")* totalplayers;
  // wildcardTotal.innerText = countCardsByVersion(newDeck.cards, "🖕")* totalplayers;
  // cardsTotal.innerText = newDeck.cards.length * totalplayers;;

  console.log(newDeck.cards);

  initializeComputer(numOfCom);

  console.log(computer);

}

function countCardsByVersion(cards, version) {
  return cards.filter(card => card.version === version).length;
}
const player = {
  currentChoice: null,
  choicesLeft: [],
  playerPoints: 0,
};

const computer = []

function initializeComputer(numOfCom) {
  
  computer.length = 0;

  for (let i = 0; i < numOfCom; i++) {
    computer.push({
      currentChoice: null,
      choicesLeft: freshDeck(),
      comPoints: 0,
    });
  }
}

document.getElementById("rock").addEventListener("click", () => makePlayerChoice("✊"));
document.getElementById("paper").addEventListener("click", () => makePlayerChoice("🤚"));
document.getElementById("scissors").addEventListener("click", () => makePlayerChoice("🖖"));
document.getElementById("wildcard").addEventListener("click", () => makePlayerChoice("🖕"));


function makePlayerChoice(choice) {
  const remainingCards = countCardsByVersion(player.choicesLeft, choice);

    if (remainingCards > 0) {
      player.currentChoice = choice;

      const index = player.choicesLeft.findIndex(card => card.version === choice);

      player.choicesLeft.splice(index, 1);

      const computerChoices = computerChoiceSelection();
      calculateRoundResults(player.currentChoice, computerChoices); 

      updateUI();
    } else {
    alert("You don't have any more cards of this version.");
  }
}

function computerChoiceSelection() {
  const computerChoices = [];

  for (let i = 0; i < numOfCom; i++) {
    const comRemainingChoices = computer[i].choicesLeft.filter(card => card.version && card.version.length > 0);

    if (comRemainingChoices.length > 0) {
      const randomIndex = Math.floor(Math.random() * comRemainingChoices.length);
      const comChoiceObject = comRemainingChoices[randomIndex];
      const comChoice = comChoiceObject.version;

      if (comChoice) {
      
        const choiceIndex = computer[i].choicesLeft.findIndex(card => card.version === comChoice);

      
        computer[i].choicesLeft.splice(choiceIndex, 1);

  
        computer[i].currentChoice = comChoice;
        computer[i].choicesLeft[comChoice]--;

        // console.log(`Computer ${i + 1} chose: ${comChoice}`);
        computerChoices.push(comChoice);
      }

      // console.log("Choices left for Computer", i + 1, ":", computer[i].choicesLeft);
    }
  }
  return computerChoices;
}


function updateUI() {
  console.log("Player chose:", player.currentChoice);
  console.log("Remaining cards on hand:", player.choicesLeft);

  document.getElementById("remainingRock").innerText = countCardsByVersion(player.choicesLeft, "✊");
  document.getElementById("remainingPaper").innerText = countCardsByVersion(player.choicesLeft, "🤚");
  document.getElementById("remainingScissors").innerText = countCardsByVersion(player.choicesLeft, "🖖");
  document.getElementById("remainingWildcard").innerText = countCardsByVersion(player.choicesLeft, "🖕");

  let computerRockCount = 0;
  let computerPaperCount = 0;
  let computerScissorsCount = 0;
  let computerWildcardCount = 0;

  for (let i = 0; i < numOfCom; i++) {
    computerRockCount += countCardsByVersion(computer[i].choicesLeft, "✊");
    computerPaperCount += countCardsByVersion(computer[i].choicesLeft, "🤚");
    computerScissorsCount += countCardsByVersion(computer[i].choicesLeft, "🖖");
    computerWildcardCount += countCardsByVersion(computer[i].choicesLeft, "🖕");
  }

  // rockTotal.innerText = countCardsByVersion(player.choicesLeft, "✊") + computerRockCount;
  // paperTotal.innerText = countCardsByVersion(player.choicesLeft, "🤚") + computerPaperCount;
  // scissorsTotal.innerText = countCardsByVersion(player.choicesLeft, "🖖") + computerScissorsCount;
  // wildcardTotal.innerText = countCardsByVersion(player.choicesLeft, "🖕") + computerWildcardCount;

  // const total = parseInt(rockTotal.innerText) + parseInt(paperTotal.innerText) +
  //   parseInt(scissorsTotal.innerText) + parseInt(wildcardTotal.innerText);

  // cardsTotal.innerText = total;

  displayTotalPoints()
}

function displayTotalPoints() {
  const scoreDisplay = document.getElementById("scoreBoard");
  scoreDisplay.style.display = 'block';

  const pointsContainer = document.getElementById("PointsContainer");
  pointsContainer.innerHTML = ""; 

  const allPoints = [{ name: "Player", points: player.playerPoints }];

  for (let i = 0; i < numOfCom; i++) {
    allPoints.push({ name: "Computer " + (i + 1), points: computer[i].comPoints });
  }

  allPoints.sort((a, b) => b.points - a.points);

 allPoints.forEach((entry, index) => {
    const totalPointsElement = document.createElement("p");
    totalPointsElement.innerText = `${entry.name}: ${entry.points}`;
    pointsContainer.appendChild(totalPointsElement);
  });

  if (player.choicesLeft.length === 0){
    const endingScreen = document.getElementById('gameOverScreen');
    const gameInterface = document.getElementById("gameUI");
    const comChoiceSummary = document.getElementById("computerSummary");
    endingScreen.style.display = 'block';
    gameInterface.style.display = 'none';
    comChoiceSummary.style.display = 'none';

    const endingText = document.getElementById("endingText");
    endingText.innerHTML = "";
    
    const winner = allPoints[0]; 
    const winDeclaration = document.createElement("p");

    winDeclaration.innerText = `Game Over! All cards have been played.${winner.name} wins with ${winner.points} points.`
    
    endingText.appendChild(winDeclaration);
    }
}

function calculateRoundResults(playerChoice, computerChoices) {
  // Calculate wildcard count
  let wildcardCount = 0;
  if (playerChoice === "🖕") {
    wildcardCount++;
  }
  for (let i = 0; i < numOfCom; i++) {
    const comChoice = computerChoices[i];
    if (comChoice === "🖕") {
      wildcardCount++;
    }
  }

// Wildcard Logic
if (wildcardCount === 1) {
  if (playerChoice === "🖕") {
    player.playerPoints += 10; 
  } else {
    for (let i = 0; i < numOfCom; i++) {
      const comChoice = computerChoices[i];
      if (comChoice === "🖕") {
        computer[i].comPoints += 10; 
      }
    }
  }
}

  // Normal logic
  for (let i = 0; i < numOfCom; i++) {
    const comChoice = computerChoices[i];
    console.log(`Computer ${i + 1} chose: ${comChoice}`);

    if ((playerChoice === "✊" && comChoice === "✊") ||
    (playerChoice === "🤚" && comChoice === "🤚") ||
    (playerChoice === "🖖" && comChoice === "🖖")
    ) {
      player.playerPoints += 1;
      computer[i].comPoints += 1;
    } else if (
      (playerChoice === "✊" && comChoice === "🖖") ||
      (playerChoice === "🤚" && comChoice === "✊") ||
      (playerChoice === "🖖" && comChoice === "🤚")
    ) {
      player.playerPoints += 3;
      computer[i].comPoints -= 1;
    } else if (
      (playerChoice === "🖖" && comChoice === "✊") ||
      (playerChoice === "✊" && comChoice === "🤚") ||
      (playerChoice === "🤚" && comChoice === "🖖")
    ) {
      player.playerPoints -= 1;
      computer[i].comPoints += 3;
    }
    console.log(`Computer ${i + 1} points: ${computer[i].comPoints}`);
  }

  // Play against other computers
  for (let i = 0; i < numOfCom; i++) {
    for (let j = 0; j < numOfCom; j++) {
      if ((j-i)>0) {
        const com1Choice = computerChoices[i];
        const com2Choice = computerChoices[j];

        if ((com1Choice === "✊" && com2Choice === "✊") ||
        (com1Choice === "🤚" && com2Choice === "🤚") ||
        (com1Choice === "🖖" && com2Choice === "🖖" )) {
          computer[i].comPoints += 1;
          computer[j].comPoints += 1;
        } else if (
          (com1Choice === "✊" && com2Choice === "🖖") ||
          (com1Choice === "🤚" && com2Choice === "✊") ||
          (com1Choice === "🖖" && com2Choice === "🤚")
        ) {
          computer[i].comPoints += 3;
          computer[j].comPoints -= 1;
        } else if (
          (com1Choice === "🖖" && com2Choice === "✊") ||
          (com1Choice === "✊" && com2Choice === "🤚") ||
          (com1Choice === "🤚" && com2Choice === "🖖")
        ) {
          computer[j].comPoints += 3;
          computer[i].comPoints -= 1;
        }
      }
    }
  }
  showComputerSelection(playerChoice, wildcardCount);
  displayTotalPoints();

}

function showComputerSelection(playerChoice, wildcardCount) {
  const displayHeader = document.getElementById("computerSummary");
  const roundLogic = document.getElementById("roundLogic");
  roundLogic.style.display = 'grid';
  displayHeader.style.display = 'block';

  roundLogic.innerHTML = "";

  for (let i = 0; i < numOfCom; i++) {
    const comChoice = computer[i].currentChoice;

    // Create logicGrid div for each computer
    const logicGridDiv = document.createElement("div");
    logicGridDiv.classList.add("logicGridItem"); // Add a class for styling, if needed

    // Create h3 element with Computer label
    const h3Element = document.createElement("h3");
    h3Element.innerText = `Com ${i + 1}`;

    // Create p element with computer's current choice
    const pElement = document.createElement("p");
    pElement.innerText = `Choice: ${comChoice}`;

    // Create p element with Player points
    const pointsElement = document.createElement("p");
    if ((playerChoice === "✊" && comChoice === "✊") ||
    (playerChoice === "🤚" && comChoice === "🤚") ||
    (playerChoice === "🖖" && comChoice === "🖖")
    ) {
      pointsElement.innerText = "Tie! \n+1 Points"
      
    } else if (
      (playerChoice === "✊" && comChoice === "🖖") ||
      (playerChoice === "🤚" && comChoice === "✊") ||
      (playerChoice === "🖖" && comChoice === "🤚")
    ) {
      pointsElement.innerText = "You Win! \n+3 Points"
    } else if (
      (playerChoice === "🖖" && comChoice === "✊") ||
      (playerChoice === "✊" && comChoice === "🤚") ||
      (playerChoice === "🤚" && comChoice === "🖖")
    ) {
      pointsElement.innerText = "You Lose! \n-1 Points"
    } else if (
      (playerChoice === "🖕" && wildcardCount === 1)
    ) {
      pointsElement.innerText = "Wildcard won!"
    } else if (
      (playerChoice !== "🖕" && wildcardCount === 1)
    ) {
      pointsElement.innerText = "Computer Wildcard won!"
    } else if (
      (playerChoice === "🖕" && wildcardCount > 1) ||
      (comChoice === "🖕" && wildcardCount > 1)
    ) {
      pointsElement.innerText = "This Wildcard is worth 0 Points!"
    } 

    // Append h3 and p to logicGridDiv
    logicGridDiv.appendChild(h3Element);
    logicGridDiv.appendChild(pElement);
    logicGridDiv.appendChild(pointsElement);

    // Append elements to roundLogic
    roundLogic.appendChild(logicGridDiv);
  }

  console.log(computer);
}


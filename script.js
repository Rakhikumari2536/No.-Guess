import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// Async function to handle ready() call properly
async function initializeSDK() {
    try {
        if (typeof sdk !== "undefined") {
            console.log("Farcaster SDK loaded.");
            await sdk.actions.ready({ disableNativeGestures: true });
            console.log("SDK is ready!");
        } else {
            console.log("Farcaster SDK is not available, using mock SDK.");
            const mockSDK = {
                actions: {
                    ready: () => console.log("Mock SDK ready() triggered."),
                },
            };
            sdk = mockSDK;
        }
    } catch (error) {
        console.error("Error during SDK initialization:", error);
    }
}

// Call initializeSDK when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeSDK();  // Initialize SDK after everything is loaded

    // List of winning messages
    const winMessages = [
        "Wow! You guessed it! 🎉 You're a genius!",
        "You nailed it! 🏆 The number was correct!",
        "Amazing! You guessed it right! 🤩",
        "You're on fire! 🔥 You got it right!",
        "Congratulations! 🎉 You've won! 🎉",
        "Brilliant! You guessed it! 👏",
        "You did it! 🎯 The number was correct!",
        "Superb! You're the guessing master! 💥",
        "Spot on! 🎯 You’re amazing!",
        "Perfect guess! 🏅 You're a pro!"
    ];

    // List of losing messages
    const loseMessages = [
        "Oops! You lost. The number was {0}. Better luck next time, Einstein! 😜",
        "Not quite right! The number was {0}. Try again next time! 🤭",
        "So close! The number was {0}. Don't worry, you'll get it next time! 💡",
        "Oops! Wrong guess. The number was {0}. Better luck next time! 😅",
        "Ahh, you missed it! The number was {0}. No worries, try again! 😆"
    ];

    let number = Math.floor(Math.random() * 3) + 1;

    const buttons = document.querySelectorAll(".buttons button");
    const resultParagraph = document.getElementById("result");
    const playAgainButton = document.getElementById("playAgain");
    const buttonContainer = document.querySelector(".buttons");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            console.log(`Button ${button.innerText} clicked.`);
            const guess = parseInt(button.innerText);

            if (guess === number) {
                resultParagraph.innerHTML = randomChoice(winMessages);
            } else {
                resultParagraph.innerHTML = randomChoice(loseMessages).replace("{0}", number);
            }

            buttonContainer.style.display = "none";  // Hide the buttons
            playAgainButton.style.display = "inline-block";  // Show the play again button
        });
    });

    playAgainButton.addEventListener("click", function() {
        console.log("Play Again button clicked.");
        number = Math.floor(Math.random() * 3) + 1;  // Generate a new number
        resultParagraph.innerHTML = "";
        buttonContainer.style.display = "block";  // Show the buttons again
        playAgainButton.style.display = "none";  // Hide the play again button
    });

    function randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
});

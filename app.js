// Original keyboard glow functionality - modified for uppercase only
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  const keyDiv = document.querySelector(`.key[data-key="${key}"]`);

  if (keyDiv) {
    keyDiv.classList.add("glow");
    setTimeout(() => keyDiv.classList.remove("glow"), 200);
  }

  // NEW: Track user typing for color feedback - uppercase only
  if (isTypingStarted && currentSentence) {
    // Start timer on first keystroke
    if (!startTime) {
      startTime = Date.now();
    }

    if (e.key.length === 1) {
      // Regular characters - convert to uppercase
      userTypedText += e.key.toUpperCase();
      updateColors(); // Update colors when user types
    } else if (e.key === " ") {
      // Space character
      userTypedText += " ";
      updateColors();
    } else if (e.key === "Backspace") {
      userTypedText = userTypedText.slice(0, -1);
      updateColors(); // Update colors when user deletes
    }
  }
});

// Original sentences array - converted to uppercase
const sentences = [
  "TYPING EFFICIENTLY IS A SKILL THAT DEVELOPS WITH CONSISTENT PRACTICE AND PATIENCE, ALLOWING YOU TO WORK FASTER, COMMUNICATE BETTER, AND COMPLETE YOUR TASKS WITHOUT UNNECESSARY DELAYS OR MISTAKES.",
  "DISCIPLINE IN LEARNING TO TYPE CORRECTLY MEANS YOU WILL NOT ONLY REDUCE YOUR ERRORS OVER TIME, BUT ALSO IMPROVE YOUR ABILITY TO FOCUS ON YOUR THOUGHTS RATHER THAN THE KEYBOARD.",
  "EACH KEYSTROKE IN A TYPING TEST CONTRIBUTES TO BUILDING MUSCLE MEMORY, WHICH IS ESSENTIAL FOR ACHIEVING BOTH ACCURACY AND SPEED IN REAL-WORLD WRITING OR CODING SITUATIONS.",
  "TO BECOME A PROFICIENT TYPIST, IT'S IMPORTANT TO PRACTICE REGULARLY WITH LONG PASSAGES, FOCUSING ON MAINTAINING RHYTHM, MINIMIZING BACKSPACES, AND TYPING EACH WORD WITH FULL ATTENTION.",
  "TYPING IS NOT JUST ABOUT HITTING KEYS QUICKLY - IT IS ABOUT FORMING A DEEP CONNECTION BETWEEN YOUR THOUGHTS AND YOUR FINGERS, TURNING IDEAS INTO WORDS EFFORTLESSLY AND SMOOTHLY.",
  "IMPROVING TYPING SPEED REQUIRES MORE THAN REPETITION; IT INVOLVES ANALYZING YOUR WEAKNESSES, SLOWING DOWN WHEN NECESSARY, AND STRIVING FOR CONSISTENT IMPROVEMENT WITH EACH TYPING SESSION.",
  "MANY PROFESSIONALS OVERLOOK THE POWER OF TYPING WELL, BUT THOSE WHO MASTER IT OFTEN FIND THEMSELVES MORE PRODUCTIVE, ORGANIZED, AND ABLE TO MEET DEADLINES WITH LESS STRESS.",
  "WHEN YOU CAN TYPE FAST AND ACCURATELY, YOU OPEN UP MORE TIME FOR CREATIVE THINKING AND PROBLEM SOLVING, RATHER THAN GETTING BOGGED DOWN IN BASIC INPUT TASKS.",
  "FAST TYPISTS ARE NOT BORN WITH MAGICAL FINGERS - THEY ARE SIMPLY PEOPLE WHO TOOK THE TIME TO PRACTICE DAILY, FIX THEIR MISTAKES, AND BUILD SOLID HABITS OVER TIME.",
  "THE ART OF TYPING IS A FOUNDATION OF DIGITAL COMMUNICATION, AND MASTERING IT GIVES YOU A QUIET SUPERPOWER THAT YOU WILL USE EVERY DAY OF YOUR LIFE, OFTEN UNCONSCIOUSLY.",
];

// Original variables
const textDiv = document.querySelector(".text");
const sentenceElement = document.getElementById("sentence");
const startBtn = document.getElementById("startBtn");

let currentSentence = ""; // ✅ declare here
let index = 0;
let timeoutId = null;

// NEW: Variables for color feedback
let userTypedText = "";
let isTypingStarted = false;

// NEW: Variables for statistics
let startTime = null;
let endTime = null;
let totalCharacters = 0;
let correctCharacters = 0;
let incorrectCharacters = 0;
let isTestCompleted = false;

// NEW: Function to update colors based on user input
function updateColors() {
  let html = "";
  correctCharacters = 0;
  incorrectCharacters = 0;

  for (let i = 0; i < index; i++) {
    // Only update characters that have been revealed
    const char = currentSentence[i];
    const userChar = userTypedText[i];

    if (userChar !== undefined) {
      // User has typed this character
      if (userChar === char) {
        html += `<span class="correct">${char}</span>`;
        correctCharacters++;
      } else {
        html += `<span class="incorrect">${char}</span>`;
        incorrectCharacters++;
      }
    } else {
      // User hasn't typed this character yet
      html += char;
    }
  }

  sentenceElement.innerHTML = html;

  // Check if test is complete
  if (userTypedText.length >= currentSentence.length && !isTestCompleted) {
    completeTest();
  }
}

// Modified typeWriter function
function typeWriter() {
  if (index < currentSentence.length) {
    index++;
    updateColors(); // Update display with colors
    timeoutId = setTimeout(typeWriter, 75);
  }
}

// NEW: Function to calculate and display statistics
function completeTest() {
  endTime = Date.now();
  isTestCompleted = true;
  isTypingStarted = false;

  // Calculate time in minutes
  const timeInMinutes = (endTime - startTime) / 1000 / 60;

  // Calculate words (assuming average word length of 5 characters)
  const wordsTyped = userTypedText.length / 5;
  const wpm = Math.round(wordsTyped / timeInMinutes);

  // Calculate accuracy
  const accuracy = Math.round((correctCharacters / userTypedText.length) * 100);

  // Count total words in sentence
  const totalWords = currentSentence.trim().split(/\s+/).length;
  const typedWords = userTypedText.trim().split(/\s+/).length;

  // Display results
  setTimeout(() => {
    alert(
      `🎉 TYPING TEST COMPLETED! 🎉\n\n` +
        `📊 YOUR RESULTS:\n` +
        `⚡ Words Per Minute: ${wpm} WPM\n` +
        `🎯 Accuracy: ${accuracy}%\n` +
        `✅ Correct Characters: ${correctCharacters}\n` +
        `❌ Incorrect Characters: ${incorrectCharacters}\n` +
        `📝 Total Characters Typed: ${userTypedText.length}\n` +
        `⏱️ Time Taken: ${Math.round(timeInMinutes * 60)} seconds\n` +
        `📖 Words Completed: ${typedWords}/${totalWords}\n\n` +
        `Click "CLICK HERE TO START" to try again!`
    );
  }, 500);
}

// Modified start button event listener
startBtn.addEventListener("click", () => {
  startBtn.blur(); // This removes focus so spacebar won't retrigger
  clearTimeout(timeoutId);
  sentenceElement.innerHTML = ""; // Changed from textContent to innerHTML
  index = 0;
  userTypedText = ""; // NEW: Reset user input
  isTypingStarted = true; // NEW: Enable typing tracking

  // NEW: Reset statistics
  startTime = null;
  endTime = null;
  correctCharacters = 0;
  incorrectCharacters = 0;
  isTestCompleted = false;

  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  totalCharacters = currentSentence.length;
  typeWriter();
});
// Add these variables at the top with your other variables
const resultsOverlay = document.getElementById("resultsOverlay");
const closeResults = document.getElementById("closeResults");

// Replace your completeTest() function with this:
function completeTest() {
  endTime = Date.now();
  isTestCompleted = true;
  isTypingStarted = false;

  // Calculate time in minutes
  const timeInMinutes = (endTime - startTime) / 1000 / 60;
  const timeInSeconds = Math.round((endTime - startTime) / 1000);

  // Calculate words (assuming average word length of 5 characters)
  const wordsTyped = userTypedText.length / 5;
  const wpm = Math.round(wordsTyped / timeInMinutes);

  // Calculate accuracy
  const accuracy = Math.round((correctCharacters / userTypedText.length) * 100);

  // Update modal with results
  document.getElementById("wpmValue").textContent = wpm;
  document.getElementById("accuracyValue").textContent = accuracy + "%";
  document.getElementById("timeValue").textContent = timeInSeconds + "s";
  document.getElementById("charactersValue").textContent = userTypedText.length;

  // Show results modal
  setTimeout(() => {
    resultsOverlay.classList.add("show");
  }, 500);
}

// Add these event listeners at the end of your JavaScript:
// Close results modal
closeResults.addEventListener("click", () => {
  resultsOverlay.classList.remove("show");
});

// Close modal when clicking outside
resultsOverlay.addEventListener("click", (e) => {
  if (e.target === resultsOverlay) {
    resultsOverlay.classList.remove("show");
  }
});

// Also add this line in your start button event listener to hide modal when restarting:
// Add this line inside your startBtn event listener, after startBtn.blur():
resultsOverlay.classList.remove("show");

// Device restriction - only allow desktop/laptop
function checkDevice() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Block if mobile device OR screen too small
  if (isMobile || isTablet || screenWidth < 1100 || screenHeight < 600) {
    showDesktopOnlyMessage();
    return false;
  }
  return true;
}
function showDesktopOnlyMessage() {
  document.body.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color:black;
      font-family: 'Montserrat', sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div style="
        background: white;
        padding: 40px;
        border: 2px solid black;
        max-width: 500px;
        width: 90%;
      ">
        <h1 style="font-size: 2.5rem; font-weight: 600; margin-bottom: 20px; color: black;">
           DESKTOP ONLY
        </h1>
        <p style="font-size: 1.2rem; font-weight: 200; margin-bottom: 20px; color: black;">
          THIS TYPING TEST IS DESIGNED FOR DESKTOP AND LAPTOP COMPUTERS ONLY.
        </p>
        <p style="font-size: 1rem; color: #666;">
          PLEASE ACCESS THIS WEBSITE FROM A DESKTOP OR LAPTOP COMPUTER WITH A PHYSICAL KEYBOARD FOR THE BEST EXPERIENCE.
        </p>
        <div style="margin-top: 30px; font-size: 3rem;">
        </div>
      </div>
    </div>
  `;
}
if (!checkDevice()) {
  // Stop loading the rest of the page
  throw new Error("Device not supported");
}

// Check device on page load
if (!checkDevice()) {
  // Stop loading the rest of the page
  throw new Error("Device not supported");
}

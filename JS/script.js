//An array to hold the elements to be typed
const sequence = [
  { element: document.querySelector("#typed-heading .typed-text"), text: "Hello, I'm Kyle Johnson," },
  { element: document.querySelector("#typed-title .typed-text"), text: "Software Developer" }
];

let current = 0;//Keeps track of which element is currently being typed
let charIndex = 0;//Keeps track of which character is curently being typed
let interval = null;

const cursor = document.createElement("span");
cursor.textContent = "|";
cursor.classList.add("cursor");

//Adding a blinking style with CSS for the cursor
const style = document.createElement("style");
style.textContent = `
  .cursor {
    display: inline-block;
    margin-left: 3px;
    color: #b0b0b0;
    animation: blink 1s step-start infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

document.head.appendChild(style);//Adding the style to the page

//Function to move the cursor right after the currently typed element
function moveCursorAfter(element) {
  element.insertAdjacentElement("afterend", cursor);
}

function type() {
  const { element, text } = sequence[current];
  moveCursorAfter(element);

  // Append one char
  element.textContent += text.charAt(charIndex);
  charIndex++;

  if (charIndex >= text.length) {
    clearInterval(interval);
    setTimeout(() => {
      if (current < sequence.length - 1) {
        current++;
        charIndex = 0;
        interval = setInterval(type, 60);
      } else {
        setTimeout(() => {
          cursor.style.animation = "none";
          cursor.style.opacity = "0";
        }, 1500);
      }
    }, 2000); // Cursor blinks during this pause
  }
}

document.addEventListener("DOMContentLoaded", () => {
  interval = setInterval(type, 60);
});
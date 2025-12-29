const container = document.getElementById("array-container");
const sizeSlider = document.getElementById("arraySize");
const speedSlider = document.getElementById("speed");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");

let array = [];
let delay = 100;

// Generate random array
function generateArray() {
    container.innerHTML = "";
    array = [];

    for (let i = 0; i < sizeSlider.value; i++) {
        const value = Math.floor(Math.random() * 350) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    }
}

// Delay function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            await sleep(delay);

            if (array[j] > array[j + 1]) {
                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                await sleep(delay);

                // Swap values
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].classList.remove("compare", "swap");
            bars[j + 1].classList.remove("compare", "swap");
        }

        bars[array.length - i - 1].classList.add("sorted");
    }
    bars[0].classList.add("sorted");
}

// Event Listeners
generateBtn.addEventListener("click", generateArray);

sortBtn.addEventListener("click", () => {
    delay = 310 - speedSlider.value;
    bubbleSort();
});

sizeSlider.addEventListener("input", generateArray);

// Initial Load
generateArray();

let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
    numOfBars = slider.value;
    maxRange = slider.value;
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});


speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
    algotouse = select_algo.value;
});

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor ="rgb(100, 143, 143)";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "orange";
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "yellow";
                await sleep(speedFactor);
            }
        }
        
        await sleep(speedFactor);
    }
    enable_buttons();
    return array;
}

async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "orange";
            await sleep(speedFactor);
            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "rgb(100, 143, 143)";
                }
            }
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "yellow";
        await sleep(speedFactor);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "rgb(100, 143, 143)";
    }
    enable_buttons();
    return array;
}

async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex];
    bars[pivotIndex].style.backgroundColor = "lightgreen";

    for (let i = 0; i < bars.length; i++) {
        if (i != pivotIndex) {
            bars[i].style.backgroundColor = "rgb(100, 143, 143)";
        }
    }
    (i = left),
        (j = right);
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(items, i, j, bars);
            i++;
            j--;
        }
    }
    return i;
}

async function quick(array) {
    await quickSort(array, 0, array.length - 1);
    enable_buttons();
}
async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
        index = await partition(items, left, right);
        if (left < index - 1) {
            await quickSort(items, left, index - 1);
        }
        if (index < right) {
            await quickSort(items, index, right);
        }
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "rgb(100, 143, 143)";
    }
    return items;
}

async function HeapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        await heapify(array, array.length, i);
    }
    for (let i = array.length - 1; i >= 0; i--) {
        await swap(array, 0, i, bars);
        await heapify(array, i, 0);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "rgb(100, 143, 143)";
        await sleep(speedFactor);
    }
    enable_buttons();
    return array;
}

async function heapify(array, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest != i) {
        await swap(array, i, largest, bars);
        await heapify(array, n, largest);
    }
}

async function swap(array, i, j, bars) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    bars[i].style.height = array[i] * heightFactor + "px";
    bars[j].style.height = array[j] * heightFactor + "px";
    bars[i].style.backgroundColor = "orange";
    bars[j].style.backgroundColor = "yellow";
    await sleep(speedFactor);

    for (let k = 0; k < bars.length; k++) {
        if (k != i && k != j) {
            bars[k].style.backgroundColor = "rgb(100, 143, 143)";
        }
    }
    return array;
}

async function Merge(array)
{
    let bars = document.getElementsByClassName("bar");
    await mergeSort(bars,0,array.length-1);
    enable_buttons();
}

async function merge(bars, low, mid, high){
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await sleep(speedFactor);
        bars[low + i].style.background = 'orange';
        left[i] = bars[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await sleep(speedFactor);
        bars[mid + 1 + i].style.background = 'yellow';
        right[i] = bars[mid + 1 + i].style.height;
    }
    await sleep(speedFactor);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await sleep(speedFactor);
        if(parseInt(left[i]) <= parseInt(right[j])){
            if((n1 + n2) === bars.length){
                bars[k].style.background = 'rgb(100, 143, 143)';
            }
            else{
                bars[k].style.background = 'lightgreen';
            }
            
            bars[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            if((n1 + n2) === bars.length){
                bars[k].style.background = 'rgb(100, 143, 143)';
            }
            else{
                bars[k].style.background = 'lightgreen';
            } 
            bars[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await sleep(speedFactor);
        if((n1 + n2) === bars.length){
            bars[k].style.background = 'rgb(100, 143, 143)';
        }
        else{
            bars[k].style.background = 'lightgreen';
        }
        bars[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await sleep(speedFactor);
        if((n1 + n2) === bars.length){
            bars[k].style.background = 'rgb(100, 143, 143)';
        }
        else{
            bars[k].style.background = 'lightgreen';
        }
        bars[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(bars, l, r){
    if(l >= r){
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(bars, l, m);
    await mergeSort(bars, m + 1, r);
    await merge(bars, l, m, r);
}

function disable_buttons() {
    randomize_array.disabled = true;
    slider.disabled = true;
    sort_btn.disabled = true;
    select_algo.disabled=true;
}
function enable_buttons() {
    randomize_array.disabled = false;
    slider.disabled = false;
    sort_btn.disabled = false;
    select_algo.disabled=false;
}
sort_btn.addEventListener("click", function () {
    disable_buttons();
    switch (algotouse) {
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "merge":
            Merge(unsorted_array);
            break;
        case "heap":
            HeapSort(unsorted_array);
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        case "quick":
            quick(unsorted_array);
            break;
        default:
            bubbleSort(unsorted_array);
            break;
    }
});

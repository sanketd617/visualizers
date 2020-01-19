let moves = null;
let viewMap = null;
let array = [15, 8, 11, 17, 13, 5, 6, 4, 10];
let maxWidth = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("width"));
let maxHeight = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("height"));
viewMap = Sorter.createViews(array, maxWidth, maxHeight);
Sorter.layoutViews("sorter", viewMap, array.length);

function startVisualization() {
    console.log(viewMap)
    for (let i = 0; i < array.length; i++) {
        document.getElementById("sorter").removeChild(viewMap[i]);
    }

    array = [15, 8, 11, 17, 13, 5, 6, 4, 10];

    maxWidth = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("width"));
    maxHeight = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("height"));
    viewMap = Sorter.createViews(array, maxWidth, maxHeight);
    Sorter.layoutViews("sorter", viewMap, array.length);
    let type = parseInt(document.getElementById("algoSelector").value)
    moves = Sorter.sort(array, type);
    animate(array, type);
}

function onSliderChange() {
    for (let i = 0; i < array.length; i++) {
        viewMap[i].style.transitionDuration = document.getElementById('slider').value + 's';
    }
}

function animate(array, type) {
    switch (type) {
        case Sorter.type.bubble:
            bubbleSortAnimate(array);
            break;
        case Sorter.type.insertion:
            insertionSortAnimate(array);
            break;
        case Sorter.type.selection:
            selectionSortAnimate(array);
            break;
        case Sorter.type.merge:
            break;
        case Sorter.type.quick:
            quickSortAnimate(array);
            break;
    }
}

function quickSortAnimate(array) {
    let index = 0;
    let first = -1;
    let second = -1;
    let pivot = null;

    function animateInternally() {
        if (first !== -1) {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
        }

        if (second !== -1) {
            viewMap[second].classList.remove('active');
            viewMap[second].classList.remove('moving');
        }

        let move = moves[index];


        switch (move.type) {
            case Sorter.moveType.pivot:
                if (pivot !== null) {
                    console.log("removing", viewMap[pivot].innerHTML)
                    viewMap[pivot].classList.remove('pivot');
                }
                pivot = move.first;
                viewMap[pivot].classList.add('pivot');
                break;
            case Sorter.moveType.next:
                first = move.first;
                second = move.second;
                viewMap[first].classList.add('active');
                viewMap[first].classList.add('moving');
                viewMap[second].classList.add('active');
                viewMap[second].classList.add('moving');

                break;
            case Sorter.moveType.swap:
                first = move.first;
                second = move.second;
                if(pivot === first) {
                    pivot = second;
                }
                else if(pivot === second) {
                    pivot = first;
                }
                viewMap[first].classList.add('active');
                viewMap[first].classList.add('moving');
                viewMap[second].classList.add('active');
                viewMap[second].classList.add('moving');

                let fx = viewMap[first].style.left;
                let sx = viewMap[second].style.left;

                viewMap[first].style.left = sx;
                viewMap[second].style.left = fx;

                let t = viewMap[first];
                viewMap[first] = viewMap[second];
                viewMap[second] = t;
                break;
        }

        index++;

        if (index < moves.length) {
            setTimeout(animateInternally, document.getElementById("slider").value * 1000);
        } else {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
            viewMap[pivot].classList.remove('pivot');
        }
    }

    animateInternally();
}

function insertionSortAnimate(array) {
    let index = 0;
    let first = -1;
    let selected = null;
    let height = null;
    let top = null;

    function animateInternally() {
        if (first !== -1) {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
        }

        if (selected) {
            selected.classList.add('active');
        }

        let move = moves[index];


        switch (move.type) {
            case Sorter.moveType.temporary:
                selected = viewMap[move.first];
                first = move.first;
                viewMap[first].classList.add('active');
                height = viewMap[first].style.height;
                top = viewMap[first].style.top;
                viewMap[first].style.height = viewMap[first].style.width;
                viewMap[first].style.top = '25px';

                break;
            case Sorter.moveType.select:
                first = move.first;
                viewMap[first].classList.add('active');

                break;
            case Sorter.moveType.shift:
                first = move.first;
                viewMap[first].classList.add('active');
                viewMap[first].classList.add('moving');

                let fx = viewMap[first].style.left;
                viewMap[first].style.left = selected.style.left;
                selected.style.left = fx;
                viewMap[first + 1] = viewMap[first];
                break;
            case Sorter.moveType.insert:
                first = move.first;
                selected.style.top = top;
                selected.style.height = height;
                viewMap[first] = selected;
                selected = null;
                break;
        }

        index++;

        if (index < moves.length) {
            setTimeout(animateInternally, document.getElementById("slider").value * 1000);
        } else {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
        }
    }

    animateInternally();
}

function selectionSortAnimate(array) {
    let index = 0;
    let first = -1;
    let second = -1;
    let minIndex = -1;

    function animateInternally() {
        if (first !== -1) {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
        }

        if (second !== -1) {
            viewMap[second].classList.remove('active');
            viewMap[second].classList.remove('moving');
        }

        let move = moves[index];

        switch (move.type) {
            case Sorter.moveType.next:
                first = move.first;
                second = move.second;
                viewMap[first].classList.add('active');
                viewMap[second].classList.add('active');
                break;
            case Sorter.moveType.swap:
                first = move.first;
                second = move.second;
                viewMap[first].classList.add('active');
                viewMap[first].classList.add('moving');
                viewMap[minIndex].classList.add('moving');

                let fx = viewMap[first].style.left;
                let sx = viewMap[second].style.left;

                viewMap[first].style.left = sx;
                viewMap[second].style.left = fx;

                let t = viewMap[first];
                viewMap[first] = viewMap[second];
                viewMap[second] = t;

                break;
            case Sorter.moveType.minimum:
                if (minIndex !== -1) {
                    viewMap[minIndex].classList.remove('minimum');
                }
                viewMap[first].classList.add('active');
                viewMap[second].classList.add('active');
                first = move.first;
                second = move.second;
                minIndex = first;
                viewMap[first].classList.add('minimum');
                break;
        }

        index++;

        if (index < moves.length) {
            setTimeout(animateInternally, document.getElementById("slider").value * 1000);
        } else {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
            viewMap[second].classList.remove('active');
            viewMap[second].classList.remove('moving');
            viewMap[second].classList.add('minimum');
            viewMap[array.length - 1].classList.add('minimum');
        }
    }

    animateInternally();
}

function bubbleSortAnimate(array) {
    let index = 0;
    let first = -1;
    let second = -1;

    function animateInternally() {
        if (first !== -1 && second !== -1) {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
            viewMap[second].classList.remove('active');
            viewMap[second].classList.remove('moving');
        }
        let move = moves[index];

        switch (move.type) {
            case Sorter.moveType.next:
                first = move.first;
                second = move.second;
                viewMap[first].classList.add('active');
                viewMap[second].classList.add('active');
                break;
            case Sorter.moveType.swap:
                first = move.first;
                second = move.second;
                viewMap[first].classList.add('active');
                viewMap[second].classList.add('active');
                viewMap[first].classList.add('moving');
                viewMap[second].classList.add('moving');

                let fx = viewMap[first].style.left;
                let sx = viewMap[second].style.left;

                viewMap[first].style.left = sx;
                viewMap[second].style.left = fx;

                let t = viewMap[first];
                viewMap[first] = viewMap[second];
                viewMap[second] = t;

                break;
        }

        index++;

        if (index < moves.length) {
            setTimeout(animateInternally, document.getElementById("slider").value * 1000);
        } else {
            viewMap[first].classList.remove('active');
            viewMap[first].classList.remove('moving');
            viewMap[second].classList.remove('active');
            viewMap[second].classList.remove('moving');
        }
    }

    animateInternally();
}


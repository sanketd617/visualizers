let array = [15, 8, 11, 17, 13, 5, 6, 4, 10];
// let array = ['a', 'e', 'f', 'b', 'c', 'd', 'g', 'h', 'i'];

console.log(array)

let bubbleMoves = Sorter.sort(array, Sorter.type.bubble);

// window.getComputedStyle()
let maxWidth = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("width"));
let maxHeight = parseInt(window.getComputedStyle(document.getElementById("sorter"), null).getPropertyValue("height"));
let viewMap = Sorter.createViews(array, maxWidth, maxHeight);
Sorter.layoutViews("sorter", viewMap, array.length);

animate(array, Sorter.type.bubble);

function onSliderChange() {
    console.log("changed")
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

            break;
        case Sorter.type.selection:
            selectionSortAnimate(array);
            break;
        case Sorter.type.merge:

            break;
        case Sorter.type.quick:

            break;
    }
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

        let move = bubbleMoves[index];

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

        if (index < bubbleMoves.length) {
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
        let move = bubbleMoves[index];

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

        if (index < bubbleMoves.length) {
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


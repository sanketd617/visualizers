class QuickVisualizer {
    static visualize(moves, viewMap) {
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






}

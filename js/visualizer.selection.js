class SelectionVisualizer {
    static speed;
    static visualize(array, moves, viewMap, slider, onEnd) {
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

                    if(minIndex !== -1) {
                        viewMap[minIndex].classList.add('moving');
                    }

                    let fx = viewMap[first].style.left;
                    let sx = viewMap[second].style.left;

                    viewMap[first].style.left = sx;
                    viewMap[second].style.left = fx;

                    let t = viewMap[first];
                    viewMap[first] = viewMap[second];
                    viewMap[second] = t;

                    setTimeout(() => {
                        viewMap[first].classList.remove('minimum');
                    }, SelectionVisualizer.speed);

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
                setTimeout(animateInternally, SelectionVisualizer.speed);
            } else {
                onEnd();
                for(let index of Object.keys(viewMap)) {
                    viewMap[index].classList.remove('active');
                    viewMap[index].classList.remove('moving');
                    viewMap[index].classList.remove('minimum');
                }
            }
        }

        animateInternally();
    }
}

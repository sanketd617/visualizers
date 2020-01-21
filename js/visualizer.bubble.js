class BubbleVisualizer {
    static speed;
    static visualize(moves, viewMap, slider, onEnd) {
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
                setTimeout(animateInternally, BubbleVisualizer.speed);
            } else {
                onEnd();
                viewMap[first].classList.remove('active');
                viewMap[first].classList.remove('moving');
                viewMap[second].classList.remove('active');
                viewMap[second].classList.remove('moving');
            }
        }

        animateInternally();
    }
}

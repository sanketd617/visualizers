class InsertionVisualizer {
    static visualize(moves, viewMap) {
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
}

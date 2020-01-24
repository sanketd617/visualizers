class MergeVisualizer {
    static speed;
    static visualize(array, moves, viewMap, slider, onEnd) {
        let index = 0;
        let first = -1;
        let second = -1;
        let tempViews = [];
        let positionMap = {};
        let heights = [];
        let tops = [];
        for(let i = 0; i < array.length; i++) {
            positionMap[i] = viewMap[i].style.left;
        }

        function animateInternally() {
            let move = moves[index];

            switch (move.type) {
                case Sorter.moveType.merge_shrink:
                    first = move.first;
                    second = move.second;
                    tempViews.push(viewMap[first]);
                    heights.push(viewMap[first].style.height);
                    tops.push(viewMap[first].style.top);
                    viewMap[first].style.left = positionMap[second];
                    viewMap[first].style.top = '25px';
                    viewMap[first].style.height = viewMap[first].style.width;
                    viewMap[first].classList.add('active');
                    viewMap[first].classList.add('moving');

                    break;
                case Sorter.moveType.merge_grow:
                    first = move.first;
                    for(let i = 0; i < tempViews.length; i++) {
                        viewMap[first + i] = tempViews[i];
                        tempViews[i].style.top = tops[i];
                        tempViews[i].style.height = heights[i];
                        tempViews[i].classList.remove('active');
                        tempViews[i].classList.remove('moving');
                    }

                    heights = [];
                    tops = [];
                    tempViews = [];
                    break;
            }

            index++;

            if (index < moves.length) {
                setTimeout(animateInternally, MergeVisualizer.speed);
            } else {
                onEnd();
                for(let index of Object.keys(viewMap)) {
                    viewMap[index].classList.remove('active');
                    viewMap[index].classList.remove('moving');
                    viewMap[index].classList.remove('pivot');
                }
            }
        }

        animateInternally();
    }
}

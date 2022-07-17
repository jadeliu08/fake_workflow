function handleClickDoubleClick(clickCallback, doubleClickCallback, delay = 500) {
    let timer, clickCount = 0;

    function inner(event) {
        if (timer) {
            clearTimeout(timer);
        }
        clickCount += 1;
        timer = setTimeout(function () {
            let isDouble = clickCount > 1;
            clickCount = 0;
            clearTimeout(timer);
            if (isDouble) {
                doubleClickCallback(event);
            } else {
                clickCallback(event);
            }
        }, delay);
    }

    return inner;
}

export {handleClickDoubleClick};
self.addEventListener("message", function () {
    setInterval(function () {
        self.postMessage(parseInt(Math.random() * 100));
    }, 5000);
});
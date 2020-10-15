function onButtonPushed() {
    Push.clear();
    fetch("http://localhost:4201/getNotification")
        .then(data=>data.json())
        .then(res=>{
            Push.create(res.title, {
                body: res.body,
                icon: '../images/icon.png',
                timeout: 3000,
                onClick: function () {
                    window.focus();
                    this.close();
                    anotherPusher();
                }
            });
        });
}

function anotherPusher() {
    Push.create("Pusher", {
        body: "Previous Pusher Clicked.",
        icon: '../images/icon.png',
        timeout: 3000,
        onClick: function () {
            window.focus();
            this.close();
            anotherPusher();
        }
    });
}

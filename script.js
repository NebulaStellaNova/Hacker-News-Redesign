{
    functions = {
        newest: () => {
            console.log('Enable newest tab');
        }
    }
    function activate(ele) {
        var list = Array.prototype.slice.call(document.getElementsByClassName("active"));
        //console.log(list);
        list.forEach(element => {
            element.classList.remove("active");
        });

        try {
        functions[ele.innerHTML.toLowerCase()]();
        } catch {
            console.log("Function not coded in yet");
        }
        ele.classList.add("active");
    }

    function login() {

    }

    function signup() {

    }
    var points = 139;
    setInterval(() => {
        points += 1;
        document.getElementById("points1209321").innerHTML = "" + points;
    }, 90);
}
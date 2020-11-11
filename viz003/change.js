window.onbeforeunload = function () {
    window.scrollTo(0,0);
};



const handleDate = entries => {
    entries.forEach(entry => {
        let month = entry.target.dataset.month;
        if (entry.intersectionRatio > 0 && entry.isIntersecting == true ) {
            document.getElementById("responsive_headline").innerHTML = month ;
            let rand = randomColor();
            document.getElementById("responsive_headline").style.color = rand;
            document.getElementById("responsive_headline1").style.color = rand;
        }
    });
}


var num = 0;
var dates = document.querySelectorAll('.date');
let boxElement;
let prevRatio = 0.0;


var state = {entry: "enter", dir: "up"}
let previousY = 0;
let previousX = 0;
let hOptions = {
    threshold:[0.2]
}

window.addEventListener("load", (event) => {
    boxElement = document.querySelectorAll(".change");
    boxElement.forEach(el =>{
        createObserver(el);
    })
    
}, false);

function createObserver(el) {
    let observer;
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersect, options)
    observer.observe(el);
}

function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;
    for (let i=1.0; i<= numSteps; i++){
        let ratio = i/numSteps;
        thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if ((entry.target.className).includes("month") && entry.intersectionRatio > 0.15 ) {
            entry.target.style.position = "sticky";
            entry.target.style.top = "-150px";
            entry.target.style.left = 0;
        }



        if ((entry.intersectionRatio > prevRatio) && (entry.target.className).includes("month")) {
            // coming into screen
            document.body.style.backgroundColor = "white"/*"#fceab6"*/;
            document.querySelector(".timeline").style.visibility = "visible";

        } else if ((entry.intersectionRatio < prevRatio) && (entry.target.className).includes("month")){
            //going out of screen
            document.body.style.backgroundColor = "#b55404";
            document.querySelector(".timeline").style.visibility = "hidden";

        } else if ((entry.intersectionRatio > prevRatio) && (entry.target.className).includes("left") && (entry.target.dataset.state != "entered")){
            //coming into  screen
            let month = entry.target.dataset.month;
            document.getElementById("responsive_headline").innerHTML = month ;
            document.querySelector(".cls-1").style.fill = "black";
            // document.querySelector('#a').style.fill = "red";
            document.querySelector(`#${entry.target.dataset.name}`).style.fill = "#1ef4f7";
            let rand = randomColor()
            document.getElementById("responsive_headline").style.color = rand;
            document.getElementById("responsive_headline1").style.color = rand;
            entry.target.dataset.state = "entered";

        } else if ((entry.intersectionRatio < prevRatio) && (entry.target.className).includes("left")){
            entry.target.dataset.state = "exited";
            
            document.querySelector(`#${entry.target.dataset.name}`).style.fill = "black";

        }
        prevRatio = entry.intersectionRatio;

    });
    

}

function randomColor() {
    colors = ["#c6855d", "#909c98","#d4964f","#e8955d"];
    // colors = ["red", "blue", "green"]
    let i = num%colors.length;
    num = num+1;
    // i = Math.floor(Math.random()*colors.length + 1)
    return colors[i];
}

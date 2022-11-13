let canvas = document.getElementById("main_canvas")
canvas.style.background = "#ff8";

let updateCanvasSize = function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', updateCanvasSize, false);

updateCanvasSize();

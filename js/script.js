let column = 16; // column quantity a
let row = 16; // row quantity

let newColor="#000"; // curret color

let aux = 'odd'; // type number (odd/even)

let directionVertical = "top"; // direction add row
let directionHorizontal = "left"; // direction add column

let buttonPaint = 1; // button default paint
let buttonEraser = 2; // button default eraser

// CHANGE BUTTONS OPTION FOR PAINT AND ERASER
// Change visual of the left click
$('#paint').on('click', function(event){
    event.preventDefault();
    
    buttonPaint = 1;
    if(buttonEraser == buttonPaint){
        buttonEraser = 0;
    }

    $('#mouse-left .left-click').css('fill', '#2F2F2F');
    $('#mouse-left .right-click, #mouse-right .left-click').css('fill', 'white');
});
$('#eraser').on('click', function(event){
    event.preventDefault();

    buttonEraser = 1;
    if(buttonPaint == buttonEraser){
        buttonPaint = 0;
    }

    $('#mouse-right .left-click').css('fill', '#2F2F2F');
    $('#mouse-right .right-click, #mouse-left .left-click').css('fill', 'white');
});

// Change visual of the right click
$("#paint").on('contextmenu', function(event) {
    event.preventDefault();

    buttonPaint = 2;
    if(buttonEraser == buttonPaint){
        buttonEraser = 0;
    }

    $('#mouse-left .right-click').css('fill', '#2F2F2F');
    $('#mouse-left .left-click, #mouse-right .right-click').css('fill', 'white');
});
$("#eraser").on('contextmenu', function(event) {
    event.preventDefault();

    buttonEraser = 2;
    if(buttonPaint == buttonEraser){
        buttonPaint = 0;
    }
    $('#mouse-right .right-click').css('fill', '#2F2F2F');
    $('#mouse-right .left-click, #mouse-left .right-click').css('fill', 'white');
    
});

// Change function of the right click
function principalButton($element) {
    if(buttonPaint == 1){
        return paint($element);
    }else if(buttonEraser == 1){
        return eraser($element);
    }
}

function secondButton($element) {
    if(buttonPaint == 2){
        return paint($element);
    }else if(buttonEraser == 2){
        return eraser($element);
    }
}

// insert val input
$("#row").val(row);
$("#column").val(column);

// Max number of frames for the canvas
$("#options .size").on("input", function() {
    let valor = parseInt($(this).val()); // get number 
    let maxFrame = 28; // max number

    if (valor > maxFrame) { // if the number is greater than maximun
        $(this).val(maxFrame); // set max number
    }else if (valor <= 0){ // if numer is smaller than 0
        $(this).val(1); // set 1
    }
});

// select color
$("#pen-color").on('input', function() {
    newColor = $(this).val(); // save color
    $("#current-color").css("background-color", newColor); // view color
});

// paint frame of canvas
function paint($element){
    $element.attr('data-color', newColor).css("background-color", newColor); // get color and paint
    $("#old-color").css("background", newColor); // set current color in the view 
}

// erase frame of canvas
function eraser($element){
    $element.removeAttr("style").removeAttr('data-color');
}

$("#canvas").on('click', ".row div", function() { // select frame
    principalButton($(this));
    
});
$("#canvas").on('contextmenu', ".row div", function(event) {
    event.preventDefault();
    secondButton($(this))
});

// Contiue drawing
$("#canvas").on("mouseenter", "div", function (event) {
    let $element = $(this);

    if (event.buttons === 1) {
        principalButton($element);
    } else if (event.buttons === 2) {
        secondButton($element);
    }
});

// drag disable
$("#canvas").on("dragstart", function(event) {
    event.preventDefault();
});
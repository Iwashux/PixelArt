$(document).ready(function() {
    // funcion para pintar
    $('#paint').on('click', function(){
        var paint = 1;
        $('#mouse-left .left-click').css('fill', '#2F2F2F');
        $('#mouse-left .right-click, #mouse-right .left-click').css('fill', 'white');
    });

    $("#paint").on('contextmenu', function(event) {
        event.preventDefault();

        var paint = 2;
        $('#mouse-left .right-click').css('fill', '#2F2F2F');
        $('#mouse-left .left-click, #mouse-right .right-click').css('fill', 'white');
    });

    $('#eraser').on('click', function(){
        var eraser = 1;
        $('#mouse-right .left-click').css('fill', '#2F2F2F');
        $('#mouse-right .right-click, #mouse-left .left-click').css('fill', 'white');
    });

    $("#eraser").on('contextmenu', function(event) {
        event.preventDefault();

        var eraser = 2;
        $('#mouse-right .right-click').css('fill', '#2F2F2F');
        $('#mouse-right .left-click, #mouse-left .right-click').css('fill', 'white');
    });

        
    // max number of frames for the canvas
    $("#options .size").on("input", function() {
        var valor = parseInt($(this).val()); // get number 
        let maxFrame = 28; // max number

        if (valor > maxFrame) { // if the number is greater than maximun
            $(this).val(maxFrame); // set max number
        }else if (valor <= 0){ // if numer is smaller than 0
            $(this).val(1); // set 1
        }
    });
});
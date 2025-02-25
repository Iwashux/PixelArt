$(document).ready(function() {
    let column = 16; // column quantity a
    let row = 16; // row quantity

    let newColor="#000"; // curret color

    let aux = 'odd'; // type number (odd/even)

    let directionVertical = "top"; // direction add row
    let directionHorizontal = "left"; // direction add column

    // generate canvas
    function getCanvasFlex(){
        let canvas=""; // insert canvas

        for (let i = 0; i < row; i++) {
            canvas+="<div class='row "+aux+"'>"; // generate row
            aux == 'odd' ? aux = 'even' : aux = 'odd'; // generate type number
            for (let j = 0; j < column; j++) { 
                canvas += "<div></div>"; // generate frame
            }
            canvas+="</div>"; // close row
        }

        // insert canvas
        $("#canvas.flex").html(canvas);
    }getCanvasFlex();

    // insert val input
    $("#row").val(row);
    $("#column").val(column);

    // select color
    $("#pen-color").on('input', function() {
        newColor = $(this).val(); // save color
        $("#current-color").css("background-color", newColor); // view color
    });

    // paint frame of canvas
    function paint(){
        $(".row div").on('click', function(event) { // select frame
            $(this).attr('data-color', newColor).css("background-color", newColor); // get color and paint
            $("#old-color").css("background", newColor); // set current color in the view 
        });
    }

    // para borrar
    function eraser(){
        $(".row div").on('contextmenu', function(event) {
            event.preventDefault();
            $(this).removeAttr("style").removeAttr('data-color');
        });
    }

    paint(); // function for paint canvas
    eraser();
    
    // max number of frames for the canvas
    $("#canvas.flex-size .size").on("input", function() {
        let valor = parseInt($(this).val()); // get number 
        let maxFrame = 28; // max number

        if (valor > maxFrame) { // if the number is greater than maximun
            $(this).val(maxFrame); // set max number
        }else if (valor <= 0){ // if numer is smaller than 0
            $(this).val(1); // set 1
        }
    });

    // cambio de tamanio para las filas dependiendo de la direccion
    let selectRowAux = ".row:first"; // letiable auxiliar en caso de no ser top ni bottom
    $("#row").on("change", function() { // cambio de filas
        let newRow = parseInt($(this).val()); // nueva cantidad de filas
        let selectRow; // donde se agregaran las filas

        if(isNaN(newRow)){ // arreglo caso de no haber datos
            newRow = row;
            $("#row").val(row);
        }
        // validacion de centralizacion del dibujo
        if(directionVertical == "top"){ // al agregar o eliminar, el dibujo se queda arriba
            selectRow = ".row:last"; // clase en la que se agregara o eliminar filas
        }else if(directionVertical == "bottom"){ // al agregar o eliminar, el dibujo se queda arriba
            selectRow = ".row:first"; // clase en la que se agregara o eliminar filas
        }else{ // al agregar o eliminar, el dibujo se queda al centro
            selectRow = false; // se intercalara entre arriba y abajo
            // arreglo en la visualizacion de la vista de centrado
            $('#centered .vertical.active').length == 0 ? $('#centered .vertical').addClass('active') : '';
        }
        // validacion si se esta agregando o eliminando filas
        if(newRow < row){ // eliminando filas
            for (let i = 0; i < row - newRow; i++) { // reitera la diferencia entre la nueva cantidad de filas y el actual
                if(!selectRow){ // en el caso de estar centrado el dibujo reitera entre arriba y abajo para agregar filas
                    selectRowAux = (selectRowAux == ".row:last" ? ".row:first" : ".row:last");  
                }
                // genera la eliminacion de la fila
                $("#canvas.flex "+(selectRow ? selectRow : selectRowAux)).remove();
            }
        }else if(newRow > row){ // agrega fila
            for (let i = 0; i < newRow - row; i++) { // reitera la diferencia entre la nueva cantidad de filas y el actual
                if(!selectRow){ // en el caso de estar centrado el dibujo reitera entre arriba y abajo para agregar filas
                    selectRowAux = (selectRowAux == ".row:last" ? ".row:first" : ".row:last");  
                }
                // agrega clases, sirve para los colores del fondo del lienso
                $("#canvas.flex "+(selectRow ? selectRow : selectRowAux)).hasClass('odd') ? aux = 'even' : aux = 'odd'; 
                let newCanvas="<div class='row "+aux+"'>"; // genera la fila
                for (let j = 0; j < column; j++) {
                    newCanvas+="<div></div>";
                }
                newCanvas+="</div>"
                // valida la centralizacion del dibujo
                if (selectRow == ".row:first" || (!selectRow && selectRowAux == ".row:first")) {
                    $("#canvas.flex").prepend(newCanvas); // agrega al principio
                } else {
                    $("#canvas.flex").append(newCanvas); // agrega al final
                }
            }
        }
        row = newRow; // cambia el valor de las filas actuales
        paint() // function for paint canvas
    });

    // cambio de tamanio para las columnas dependiendo de la direccion (verticales)
    let selectColumnAux = "div:first";
    $("#column").on("change", function() {
        let newColumn = parseInt($(this).val());
        let selectColumn;

        if(isNaN(newColumn)){
            newColumn = column;
            $("#column").val(column);
        }
        
        if(directionHorizontal == "left"){
            selectColumn = "div:last";
        }else if(directionHorizontal == "right"){
            selectColumn = "div:first";
        }else{
            selectColumn = false;
            $('#centered .horizontal.active').length == 0 ? $('#centered .horizontal').addClass('active') : '';
        }
        
        if(newColumn < column){
            for (let i = 0; i < column - newColumn; i++) {
                if(!selectColumn){
                    selectColumnAux = (selectColumnAux == "div:last" ? "div:first" : "div:last");
                }
                
                $("#canvas.flex .row").find(selectColumn ? selectColumn : selectColumnAux).remove();
            }
        }else if(newColumn > column){
            let newCanvas="<div></div>";
            for (let i = 0; i < newColumn - column; i++) {
                if(!selectColumn){
                    selectColumnAux = (selectColumnAux == "div:last" ? "div:first" : "div:last");
                }

                if (selectColumn == "div:first" || (!selectColumn && selectColumnAux == "div:first")) {
                    $("#canvas.flex .row").prepend(newCanvas);
                } else {
                    $("#canvas.flex .row").append(newCanvas);
                }
            }
        }
        column = newColumn;

        paint()
    });

    // let timer;
    // $(".row div").on('mousedown', function() {
    //     let conteiner = $(this);
    //     timer = setTimeout(function(){
    //         conteiner.removeClass();
    //         if (color != "white") {
    //             conteiner.addClass(color);
    //         }
    //     }, 100);
    // });

    // $("#modal div").on("mousedown", function() {
    //     let div = $(this);
    //     intervalo = setInterval(function() {
    //         div.removeClass();
    //     }, 100); // Intervalo de tiempo en milisegundos para eliminar las clases repetidamente
    // }).on("mouseup mouseleave", function() {
    //     clearInterval(intervalo); // Limpiar el intervalo cuando se suelta el botón del ratón o se sale del área
    // });

    // 
    $('#centered .vertical, #centered .horizontal').on('click', function(){
        // activa o desactiva posicion del centralizado
        $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
        // validacion de centralizacion vertical del dibujo, al tener ambos o ninguno activo, esta centrado
        if($('#centered .vertical.active').length == 2 || $('#centered .vertical.active').length == 0){ // centralizado
            directionVertical = 'both';
        }else{ // caso de tener 1, busca cual es la direccion activa
            directionVertical = $('#centered .vertical.active').attr('direction');
        }
        // validacion de centralizacion horizontal del dibujo, al tener ambos o ninguno activo, esta centrado
        if($('#centered .horizontal.active').length == 2 || $('#centered .horizontal.active').length == 0){ // centralizado
            directionHorizontal = 'both';
        }else{ // caso de tener 1, busca cual es la direccion activa
            directionHorizontal = $('#centered .horizontal.active').attr('direction');
        }
    });

    $('#flex-mode').on('click', function(){
        $('#canvas').removeClass();
        $('#canvas').addClass('flex');
        getCanvasFlex();
    });
});
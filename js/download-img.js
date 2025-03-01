$(document).ready( function() {
    $('#btn-download').on('click', function() {
        // Selecciona el canvas completo
        let element = document.querySelectorAll('#canvas');

        generateImage(element, $(this).find('span'));
    });

    function generateImage(elements, loading) {
        // validar existencia de elementos
        if (!elements.length) {
            console.error('Elementos no encontrados');
            return;
        }

        const $loadingElement = loading;
        const loadingText = $loadingElement.text();
        $loadingElement.empty().append("<i class='fa-solid fa-circle-notch loading'></i>");
        // Configurar escala y opciones de renderizado
        const scaler = 4;
    
        let element = elements[0];

        console.log(elements);
        
        // Guardar el estilo original
        const originalStyles = [];
        $(element).find('div').each(function() {
            originalStyles.push({
                element: this,
                backgroundColor: $(this).css("background-color")
            });
        });

        // eliminar los frame sin pintar
        $(element).find('div').each(function() {
            if (!$(this).attr('data-color')) {
                $(this).css("background-color", "transparent");
            }
        });

        // opciones de reescalado para la resolucion de imagen
        options = optionScaleImage(element.offsetHeight, element.offsetWidth, scaler)

        // Generar y descargar una sola imagen
        domtoimage.toPng(element, options).then(function(dataUrl) {
            // Descargar la imagen
            downloadImage(dataUrl, `pixelArt_git-iwashux.png`);
            $loadingElement.empty().text(loadingText);

            // Restaurar el estilo original
            originalStyles.forEach(function(style) {
                $(style.element).css("background-color", style.backgroundColor);
            });
        }).catch(function(error) {
            console.error('Error al generar la imagen:', error);
            $loadingElement.empty().text(loadingText);

            // Restaurar el estilo original en caso de error
            originalStyles.forEach(function(style) {
                $(style.element).css("background-color", style.backgroundColor);
            });
        });
    }

    function optionScaleImage(height, width, scaler) {
        let margin = 2; // Margen adicional en px
        let options = {
            width: (width + 2 * margin) * scaler,
            height: (height + 2 * margin) * scaler,
            style: {
                bgcolor: null, // Configura el fondo como transparente si es necesario
                transform: 'scale(' + scaler + ')',
                transformOrigin: 'top left',
                width: (width + 2 * margin) + 'px',
                height: (height + 2 * margin) + 'px',
                margin: `-${margin}px 0 0 -${margin}px` // Ajuste para incluir el margen en el contenedor
            }
        };

        return options;
    }
    
    // Función para descargar una imagen
    function downloadImage(dataUrl, filename) {
        let link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
    }
})
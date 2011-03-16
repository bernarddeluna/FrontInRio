jQuery(function($) {
    var $main = $('#main');
    var $id = $main.find('#fromServer').data('id');

    tAPI = {
        key : "AIzaSyDdYoOdqec4m4oYzp-oi3WjfOxhT09IGc0",
        url : "https://www.googleapis.com/language/translate/v2?key=",
        original : {
            txt : ($main.find('.original').text()),
            src : "pt",
            tgt : "en",
            resp : function(response) {
                tAPI.handleResponse(response, 'translated1');
            }
        },
        translated : {
            txt : ($main.find('.translated').text()),
            src : "en",
            tgt : "pt",
            resp : function(response) {
                tAPI.handleResponse(response, 'translated2');
            }
        },
        handleResponse : function(response, place) {
            var titulo = '';
            if (place == 'translated1') {
                titulo = '<h3>A frase original via Google Translate:</h3>';
            } else if (place == 'translated2') {
                titulo = '<h3>A frase em inglês de volta ao português via Google Translate:</h3>';
            }
            
            var textofinal = titulo+'<p>'+response.data.translations[0].translatedText+'</p>';
            
            if (Modernizr.localstorage) {
                localStorage[place+'-id'+$id] = textofinal;
            }
            
            tTexts.appendTexto(textofinal);
        }

    };
    
    tTexts = {
        translateText : function (item) {
            if (item == 'translated1') {
                return tAPI.url + tAPI.key + '&source=pt&target=en'
                   + '&callback=tAPI.original.resp&q=' + tAPI.original.txt;
            } else if (item == 'translated2') {
                return tAPI.url + tAPI.key + '&source=en&target=pt'
                   + '&callback=tAPI.translated.resp&q=' + tAPI.translated.txt;
            }
        },
        appendTexto : function(texto) {
            $(texto).appendTo('#fromAPI');
        },
        makeTrans : function(e) {
            e.preventDefault;
            
            var trans1 = '', calling = $(this).data('call');
            
            if (Modernizr.localstorage) {
                trans1 = localStorage[calling+'-id'+$id];
                
                if ( trans1 && trans1 != 'undefined' ) {
                    tTexts.appendTexto(trans1);
                } else {
                    trans1 = tTexts.translateText(calling);
                    //$(trans1).appendTo('#fromAPI');
					var elemento = document.createElement('script');
					elemento.src = trans1;
					document.getElementsByTagName('head')[0].appendChild(elemento);
                }
            } else {
                trans1 = tTexts.translateText(calling);
                //$(trans1).appendTo('#fromAPI');
				var elemento = document.createElement('script');
				elemento.src = trans1;
				document.getElementsByTagName('head')[0].appendChild(elemento);
            }
            $(this).remove();
        }
    };
    
    $main.find('#callOriginal').one('click', tTexts.makeTrans);
    $main.find('#callTrans').one('click', tTexts.makeTrans);
});




















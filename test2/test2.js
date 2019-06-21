$(function () {
    var displace = window.displacejs;  

    var dataView = {
        'words': [
            'Transmitting',
            'Petabit (petabyte)',
            'Data',
            'High-def',
            'Cable',
            'Souped-up',
            'Fiber'
        ],
        'meanings':  [
            ' - to send out electrical signals using a radio, television, or computer network',
            ' - a unit of computer information consisting of 1000000000000000 bytes',
            ' - information in an electronic form that can be stored and used by a computer',
            ' - a system for showing very clear pictures on a television or computer screen or for producing very clear sound (high definition)',
            ' - a set of wires, that carries electricity, phone signals, etc',
            ' - (of a vehicle or machine) made to go faster or be more powerful',
            ' - Fiber – the material like thread that form plant or artificial material (волокно)',
        ],
        'lastItemHeight': 0,
        'setGap': false,
        'gap': 0,
        'parentHeight': 0,
        'lastElementBottom': 0,
    };

    var formView = {
        init: function() {
            this.words = dataView.words;
            this.meanings = dataView.meanings;
            dataView.lastElementBottom = 0;
            this.renderWords();
            this.renderMeanings();
        },

        renderWords: function() {
            var perentID = 'test-2-words';
            var classTemplate = "test-2-word";
            var idTemplate = "test-2-word-%id%";
            octopus.displayArrayData(this.words, false, perentID, classTemplate, idTemplate);
        },

        renderMeanings: function() {
            var perentID = 'test-2-meanings';
            var classTemplate = "test-2-meaning";
            var idTemplate = "test-2-meaning-%id%";
            octopus.displayArrayData(this.meanings, true, perentID, classTemplate, idTemplate);
        },

    };

    var octopus = {
        init: function() {
            formView.init();
        },

        randomArray: function(array) {
            array.sort(function(){ 
                return 0.5 - Math.random()
            });
        },

        displayArrayData: function(array, isRandom, perentID, classTemplate, idTemplate) {
            var self = this;
            if ( isRandom ) {
                this.randomArray(array);  
            };
            var perent = $('#' + perentID)[0];

            perent.style.height = array.length * 2 + 'em';
            var lastElementBottom = 0;
            array.forEach( (item, id) => {

                element = $('<div></div>', {
                    class: classTemplate,
                    id: idTemplate.replace('%id%', id),
                    text: item,
                });

                perent.append(element[0]);
                var element = $("#" + idTemplate.replace('%id%', id))[0];
                element.style.top = lastElementBottom +'px';
                lastElementBottom += (element.offsetHeight);

                return displace(element, {
                    constrain: true,
                    relativeTo: document.body,

                    onMouseDown: function(element){
                        element.className += ' active';
                    },
                    onTouchStart: function(el){
                        el.className += ' active';
                    },
                    onMouseUp: function(el){
                        el.className = el.className.replace(' active', '');
                    },
                    onTouchStop: function(el){
                        el.className = el.className.replace(' active', '');
                    },

                })
                
                
            });
        },

        setActive: function(el) {
            console.log('qweqweqwe', el.className);
            el.className += ' active';
        },

        removeActive: function(el) {
            el.className = el.className.replace('active', '');
        },

        getElementBottom: function(el) {
            var box = el.getBoundingClientRect();
            return box.bottom + pageYOffset
        }
    };
    octopus.init();
})

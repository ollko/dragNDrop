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
            ' - a system for showing very clear pictures on a television or',
            ' - a set of wires, that carries electricity, phone signals, etc',
            ' - (of a vehicle or machine) made to go faster or be more powerful',
            ' - Fiber – the material like thread that form plant or artificial material (волокно)'
        ],
        
        
        'gapForStick': 10,
        'lastElementBottom': 0,
        'wordElementArray':[],
        'allBusy': false,
        'test2Result': []
    };

    var formView = {
        init: function() {
            this.words = dataView.words;
            this.meanings = dataView.meanings;
            this.renderWords();
            dataView.wordElementArray = $('.test-2-word');
            this.renderMeanings();

        },

        renderWords: function() {
            var perentID = 'test-2';
            var classTemplate = "test-2-word";
            var idTemplate = "test-2-word-%id%";
            octopus.displayArrayData(this.words, false, perentID, classTemplate, idTemplate);
        },

        renderMeanings: function() {
            var perentID = 'test-2';
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
            self = this;
            if ( isRandom ) {
                this.randomArray(array);  
            };
            var perent = $('#' + perentID)[0];

            perent.style.height = array.length * 5 + 'em';
            var lastElementBottom = dataView.lastElementBottom;
            console.log('lastElementBottom = ', lastElementBottom)
            array.forEach( (item, id) => {

                element = $('<div></div>', {
                    class: classTemplate,
                    id: idTemplate.replace('%id%', id),
                    text: item,
                    busy: '',
                });

                perent.append(element[0]);
                var element = $("#" + idTemplate.replace('%id%', id))[0];
                element.style.top = lastElementBottom +'px';
                lastElementBottom += element.offsetHeight*1.1;
                dataView.lastElementBottom = lastElementBottom;

                return displace(element, {
                    constrain: true,
                    relativeTo: window.body,

                    onMouseDown: function(el){
                        self.setActive(el);
                        self.freeAnswer(el);
                    },
                    onTouchStart: function(el){
                        self.setActive(el);
                        self.freeAnswer(el);
                    },
                    onMouseUp: function(el){
                        self.removeActive(el);
                        self.stickAnswer(el);
                        self.checkBusy();
                        const button = $('.test-2-button');
                        if ( dataView.allBusy ) {
                            button.prop('disabled', false);
                        } else {
                            button.prop('disabled', true);
                        };
                    },
                    onTouchStop: function(el){
                        self.removeActive(el);
                        self.stickAnswer(el);
                        const button = $('.test-2-button');
                        if ( dataView.allBusy ) {
                            button.prop('disabled', false);
                        } else {
                            button.prop('disabled', true);
                        };
                    },
                    
                }) 
            });
        },

        setActive: function(el) {
            el.className += ' active';
        },

        removeActive: function(el) {
            el.className = el.className.replace('active', '');
        },

        stickAnswer: function(answerElement) {
            const answerX = answerElement.offsetLeft;
            const answerY = answerElement.offsetTop;
            const gapForStick = dataView.gapForStick;
            const wordElementsArray = $('.test-2-word');
            for ( let i=0; i<wordElementsArray.length; i++ ) {
                let wordElement = wordElementsArray[i];
                let wordX = wordElement.offsetLeft + wordElement.offsetWidth;
                let wordY = wordElement.offsetTop;
                if (
                    wordElement.getAttribute('busy') != 'busy' &&
                    Math.abs( wordX - answerX)  <= gapForStick &&
                    Math.abs( wordY - answerY)  <= gapForStick
                ){
                    answerElement.style.color = 'black';
                    answerElement.style.left = wordX+'px';
                    answerElement.style.top = wordY+'px';
                    wordElement.setAttribute('busy', answerElement.id);
                }
            }         
        },

        freeAnswer: function(answerEl) {
            answerEl.style.color = 'red';
            const words = dataView.wordElementArray;
            for ( let i=0; i<words.length; i++ ) {
                let word = words[i];
                if ( word.getAttribute('busy') === answerEl.id ) {
                    word.setAttribute('busy', '');
                }
            }               
        },

        checkBusy: function() {
            const words = dataView.wordElementArray;
            dataView.allBusy = true;
            for ( let i=0; i<words.length; i++ ) {
                console.log(words[i])
                if ( words[i].getAttribute('busy') === '' ) {
                    dataView.allBusy = false;
                    break;
                }
            }
        }

        // between: function (val, min, max){
        //         return val >= min && val <= max;
        // }, 

        // getElementBottom: function(el) {
            // var box = el.getBoundingClientRect();
            // return box.bottom + pageYOffset
        // },    
    };

    octopus.init();
})

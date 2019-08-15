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
            ' - Fiber – the material like thread that form plant or artificial material (волокно)'
        ],
        
        'lastElementBottom': 0,
        'gapForStick': 10,
        'getWordsPositionsArray': {},

        'test2Answers': null
    };

    var formView = {
        init: function() {
            this.words = dataView.words;
            this.meanings = dataView.meanings;
            // dataView.lastElementBottom = 0;
            this.renderWords();
            dataView.WordsPositionsArray = octopus.getWordsPositionsArray();
            console.log('333',dataView.WordsPositionsArray);

            this.renderMeanings();
            dataView.test2Answers = this.words.map(i =>{
                return new Array(i, null);
            });
            console.log('answers = ', dataView.test2Answers);
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
                        element.className += ' active';
                        self.freeAnswer(el);
                    },
                    onTouchStart: function(el){
                        el.className += ' active';
                        self.freeAnswer(el);
                    },
                    onMouseUp: function(el){
                        el.className = el.className.replace(' active', '');
                        self.stickAnswer(el);
                    },
                    onTouchStop: function(el){
                        el.className = el.className.replace(' active', '');
                        self.stickAnswer(el);
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

        getElementBottom: function(el) {
            var box = el.getBoundingClientRect();
            return box.bottom + pageYOffset
        },

        getWordsPositionsArray: function() {
            var res = new Array();
            $('.test-2-word').each( function( i, item ) {
                res[i] = new Array(item.offsetTop, item.offsetLeft + item.offsetWidth, i, '', '');
            });
            return res
        },

        stickAnswer: function(el){
            const x = el.offsetLeft;
            const y = el.offsetTop;
            const gapForStick = dataView.gapForStick;

            dataView.WordsPositionsArray.forEach((item, i) => {
                if  ( 
                        item[3] != 'busy' &&
                        Math.abs( item[0] - y)  <= gapForStick &&
                        Math.abs( item[1] - x)  <= gapForStick  
                    )
                {
                    console.log(item[3])
                    console.log(Math.abs( item[0]) - y)
                    console.log(Math.abs( item[1]) - x)
                    el.style.color = 'black';
                    el.style.top = item[0]+'px';
                    el.style.left = item[1]+'px';

                    if ( el.style.color == 'black' ) { item[3] = 'busy'; item[4] = el.id; }
                        console.log(dataView.WordsPositionsArray)
                }
                
            });

            function between(val, min, max){
                return val >= min && val <= max;
            }
        },

        freeAnswer: function(el) {
            el.style.color = 'red';
            console.log(dataView.WordsPositionsArray)
        }
            
    };
    octopus.init();
})

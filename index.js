const displace = window.displacejs;

let displaceInstances;
function initSortingDemo(){
	// clear any existing displace instances
	try {
		displaceInstances.forEach(d => d.destroy());
	} catch (e){}

	const circleSize = 40;
	const positions = {};
	const progress = {};

	// setup corner coordinates
	['.top-left', '.top-right', '.bottom-left', '.bottom-right'].map(corner => {
		const el = document.querySelector(corner);
		const position = {
			top: el.offsetTop,
			left: el.offsetLeft,
			// ensure that circle is completely in the box
			bottom: el.offsetTop + el.offsetHeight - circleSize,
			right: el.offsetLeft + el.offsetWidth - circleSize
		};
		const key = corner.replace(/\./, '').replace(/-/, ' ');
		progress[key] = 0;
		return positions[key] = position;
	});
	
	// update corner progress text
	updateCorners();

	// set up circles
	displaceInstances = ['.one', '.two', '.three', '.four'].map(selector => {
		const el = document.querySelector(selector);
		el.style.left = genPos(105, 445) + 'px';
		el.style.top = genPos(105, 245) + 'px';
		el.className = el.className.replace('inactive', '');
		return displace(el, {
			onMouseDown: function(el){
				el.className += ' active';
			},
			onMouseUp: function(el){
				el.className = el.className.replace('active', '');
				checkPosition(el);
			},
		});

		function genPos(min, max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	});

	function checkPosition(el){
		const x = el.offsetLeft;
		const y = el.offsetTop;

		Object.keys(positions).forEach(key => {
			const vals = positions[key];

			if ( between(x, vals.left, vals.right) && between(y, vals.top, vals.bottom) ){
				progress[key] = progress[key] + 1;
				updateCorners();

				// disable element
				el.className += ' inactive';
				const d = displaceInstances.find(d => {
					return d.el === el;
				});
				d.destroy();
			}
		});

		function between(val, min, max){
			return val >= min && val <= max;
		}
	}

	function updateCorners(){
		Object.keys(positions).forEach(key => {
			const query =  `[data-name='${key}']`;
			const el = document.querySelector(query);
			el.innerHTML = `Contains: <strong>${progress[key]}</strong>`;
		});
	}
}
initSortingDemo();
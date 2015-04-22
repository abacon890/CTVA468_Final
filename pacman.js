
			var output; 
			var pacman;
			var loopTimer;
			var numLoops = 0;

			var upArrowDown = false;
			var downArrowDown = false;
			var leftArrowDown = false;
			var rightArrowDown = false;
			var direction = 'right';

			var walls = new Array();

			var redGhost;
			var blueGhost;
			var greenGhost;
			var pinkGhost;

			var rgDirection; // Red Ghost Direction
			var bgDirection;
			var ggDirection;
			var pgDirection;

			const PACMAN_SPEED = 10;
			const GHOST_SPEED = 5;

			function init(){
				// alert('page loaded');
				output = document.getElementById('output');
				pacman = document.getElementById('pacman');
				pacman.style.left = '280px';
				pacman.style.top = '240px';
				pacman.style.width = '40px';
				pacman.style.height = '40px';

				
				loopTimer = setInterval(loop, 50);

				
				


				
				
			}

			function createWall(left, top, width, height){
				var wall = document.createElement('div');
				wall.className = 'wall';
				wall.style.left =  left + 'px';
				wall.style.top =  top + 'px';
				wall.style.width = width + 'px';
				wall.style.height =  height + 'px';
				gameWindow.appendChild(wall);

				// var numWalls = walls.length;
				// walls[numWalls] = wall;
				// var numWalls = walls.length;
				// walls[numWalls] = wall;
				walls.push(wall);
				// output.innerHTML = walls.length;

			}
			function loop(){
				// output.innerHTML = direction;
				numLoops++;
				tryToChangeDirection();

				var originalLeft = pacman.style.left;
				var originalTop = pacman.style.top;
				
				if(direction=='up'){
					var pacmanY = parseInt(pacman.style.top) - PACMAN_SPEED;
					if(pacmanY < -30) pacmanY = 390;
					pacman.style.top = pacmanY + 'px';
				}
				if(direction=='down'){
					var pacmanY = parseInt(pacman.style.top) + PACMAN_SPEED;
					if(pacmanY > 390) pacmanY = -30;
					pacman.style.top = pacmanY + 'px';
				}
				if(direction=='left'){
					var pacmanX = parseInt(pacman.style.left) - PACMAN_SPEED;
					if(pacmanX < -30) pacmanX = 590;
					pacman.style.left = pacmanX + 'px';
				}
				if(direction=='right'){
					var pacmanX = parseInt(pacman.style.left) + PACMAN_SPEED;
					if(pacmanX > 590) pacmanX = -30;
					pacman.style.left = pacmanX + 'px';
				}
				if(hitWall(pacman) ){
					pacman.style.left = originalLeft;
					pacman.style.top = originalTop;
				}

				
				
			}

			
			document.addEventListener('keydown', function(event){
				if(event.keyCode==37) leftArrowDown = true;
				if(event.keyCode==38) upArrowDown = true;
				if(event.keyCode==39) rightArrowDown = true;
				if(event.keyCode==40) downArrowDown = true;
			});

			document.addEventListener('keyup', function(event){
				if(event.keyCode==37) leftArrowDown = false;
				if(event.keyCode==38) upArrowDown = false;
				if(event.keyCode==39) rightArrowDown = false;
				if(event.keyCode==40) downArrowDown = false;
			});

			function hitWall(element){
				var hit = false;
				for(var i=0; i<walls.length; i++){
					if( hittest(walls[i], element) ) hit = true;
				}
				return hit;
			}

			function tryToChangeDirection(){
			var originalLeft = pacman.style.left;
			var originalTop = pacman.style.top;

				if(leftArrowDown){ 
					pacman.style.left = parseInt(pacman.style.left) - PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
						// leftArrowDown = true;
						direction = 'left';
						pacman.className = "flip-horizontal";
					}
				}
				if(upArrowDown){ 
					pacman.style.top = parseInt(pacman.style.top) - PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
						// upArrowDown = true;
						direction = 'up';
						pacman.className = "rotate270";
					}
				}
				if(rightArrowDown){
					pacman.style.left = parseInt(pacman.style.left) + PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
						// rightArrowDown = true;
						direction = 'right';
						pacman.className = "";
					}
				}
				if(downArrowDown){ 
					pacman.style.top = parseInt(pacman.style.top) + PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
						// downArrowDown = true;
						direction = 'down';
						pacman.className = "rotate90";
					}
				}

				pacman.style.left = originalLeft;
				pacman.style.top = originalTop;
			}
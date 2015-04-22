
			var output; 
			var pacman;
			var loopTimer;
			var numLoops = 0;
			var bullets;
			
			var hSpeed;
			var vSpeed;

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
			var gameWindowH = 600;
			var gameWindowW = 800;

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

				
				bullets = document.createElement('DIV');
				bullets.className = 'gameObject';
				bullets.style.width = gameWindow.style.width;
				bullets.style.height = gameWindow.style.height;
				bullets.style.left = '0px';
				bullets.style.top = '0px';
				gameWindow.appendChild(bullets);


				ghost = document.getElementById('whiteGhost');
				
				ghost.style.left = '280px';
				ghost.style.top = '240px';
				ghost.style.width = '40px';
				ghost.style.height = '40px';

				
				
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
				
				if(upArrowDown){
					var pacmanY = parseInt(pacman.style.top) - PACMAN_SPEED;
					if(pacmanY < -30) pacmanY = gameWindowH - 10;
					pacman.style.top = pacmanY + 'px';
				}
				if(downArrowDown){
					var pacmanY = parseInt(pacman.style.top) + PACMAN_SPEED;
					if(pacmanY > gameWindowH - 10) pacmanY = -30;
					pacman.style.top = pacmanY + 'px';
				}
				if(leftArrowDown){
					var pacmanX = parseInt(pacman.style.left) - PACMAN_SPEED;
					if(pacmanX < -30) pacmanX = gameWindowW - 10;
					pacman.style.left = pacmanX + 'px';
				}
				if(rightArrowDown){
					var pacmanX = parseInt(pacman.style.left) + PACMAN_SPEED;
					if(pacmanX > gameWindowW - 10) pacmanX = -30;
					pacman.style.left = pacmanX + 'px';
				}
				if(hitWall(pacman) ){
					pacman.style.left = originalLeft;
					pacman.style.top = originalTop;
				}

				var b = bullets.children;
				for(var i=0; i<b.length; i++){
					
					var newX = parseInt(b[i].style.left) - b[i].hSpeed;
					var newY = parseInt(b[i].style.top) - b[i].vSpeed;
					
					if(b[i].vSpeed > 0){
						// BULLET MOVING UP
						if( newY > gameWindowH ) bullets.removeChild(b[i]);
						else{ 
								b[i].style.top = newY + 'px';
						}						
					}
					else if(b[i].vSpeed < 0){
						// BULLET MOVING DOWN
						if( newY < 0 ) bullets.removeChild(b[i]);
						else{ 
								b[i].style.top = newY + 'px';
							// for(var j=0; j<enemies.length; j++){
						// 		if( hittest(b[i], enemies[j]) ){
	// 								document.getElementById('sndExp').currentTime = 0;
	// 								document.getElementById('sndExp').play();
	// 								bullets.removeChild(b[i]);
	// 								explode(enemies[j]);
	// 								placeEnemyShip(enemies[j]);
	// 							}
	// 						} 
							// output.innerHTML = autofireCount;
						}
					}
					else if(b[i].hSpeed < 0){
						// BULLET MOVING LEFT
						if( newX < 0 ) bullets.removeChild(b[i]);
						else{ 
								b[i].style.left = newX + 'px';
						}
					}
					else if(b[i].hSpeed > 0){
						// BULLET MOVING RIGHT
						if( newX > gameWindowW ) bullets.removeChild(b[i]);
						else{
							b[i].style.left = newX + 'px';
						}
					}
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
						leftArrowDown = true;
						direction = 'left';
						pacman.className = "flip-horizontal";
					}
				}
				if(upArrowDown){ 
					pacman.style.top = parseInt(pacman.style.top) - PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
					 upArrowDown = true;
						direction = 'up';
						pacman.className = "rotate270";
					}
				}
				if(rightArrowDown){
					pacman.style.left = parseInt(pacman.style.left) + PACMAN_SPEED + 'px';
						 if( ! hitWall(pacman) ){ 
						 rightArrowDown = true;
						direction = 'right';
						pacman.className = "";
					}
				}
				if(downArrowDown){ 
					pacman.style.top = parseInt(pacman.style.top) + PACMAN_SPEED + 'px';
					if( ! hitWall(pacman) ){ 
						downArrowDown = true;
						direction = 'down';
						pacman.className = "rotate90";
						
					}
				}

				pacman.style.left = originalLeft;
				pacman.style.top = originalTop;
			}

		function fire(){
					// document.getElementById('sndShoot').currentTime = 0;
// 					sndShoot = document.getElementById('sndShoot');
// 					sndShoot.volume = 0.5;
// 					sndShoot.play();

					var bulletWidth = 4;
					var bulletHeight = 10;
					var bullet = document.createElement('DIV');
					bullet.className = 'gameObject';
					bullet.style.backgroundColor = 'black';
					bullet.style.width = bulletWidth + 'px';
					bullet.style.height = bulletHeight + 'px';
					bullet.speed = 1;
					// bullet.style.top = parseInt(pacman.style.top) - bulletHeight + 'px';
					if(direction == 'left'){
						bullet.hSpeed = PACMAN_SPEED + bullet.speed;
						bullet.vSpeed = 0;
						bullet.style.height = '4px';
						bullet.style.width = '10px';
					}
					if(direction == 'right'){
						bullet.hSpeed = (PACMAN_SPEED*-1) -bullet.speed;
						bullet.vSpeed = 0;
						bullet.style.height = '4px';
						bullet.style.width = '10px';
					}
					if(direction == 'up'){
						bullet.hSpeed = 0;
						bullet.vSpeed = PACMAN_SPEED + bullet.speed;
						
					}
					if(direction == 'down'){
						bullet.hSpeed = 0;
						bullet.vSpeed = (PACMAN_SPEED*-1) -bullet.speed;
						
					}
					var pacmanX = parseInt(pacman.style.left) + parseInt(pacman.style.width)/2;
					bullet.style.left = (pacmanX - bulletWidth/2) + 'px';
					var pacmanY = parseInt(pacman.style.top) + parseInt(pacman.style.height)/2;
					bullet.style.top = (pacmanY - bulletWidth/2) + 'px';
					
					bullets.appendChild(bullet);
				}
				
			document.addEventListener('keypress', function(event){
				// if(event.keyCode==32) fire();
				if(event.charCode==32) fire();
			});
				

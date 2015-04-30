
var output; 
var pacman;
var loopTimer;
var numLoops = 0;
var bullets;
var moveTimer = 0;

var hSpeed;
var vSpeed;

var upArrowDown = false;
var downArrowDown = false;
var leftArrowDown = false;
var rightArrowDown = false;
var direction = 'right';

var walls = new Array();
var ghosts = new Array();
var gDirections = new Array();


var redGhost;
var blueGhost;
var greenGhost;
var pinkGhost;

var gNewDirection;
var gOppositeDirection;

var rgDirection; // Red Ghost Direction
var bgDirection;
var ggDirection;
var pgDirection;
var gameWindowH = 400;
var gameWindowW = 600;

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

	ghosts[0] = document.getElementById('redGhost');
	// ghosts[1] = document.getElementById('blueGhost');
	// ghosts[2] = document.getElementById('greenGhost');
	// ghosts[3] = document.getElementById('pinkGhost');
	
	for(var i=0; i<ghosts.length; i++){
		ghosts[i].style.top = '40px';
		ghosts[i].style.width = '40px';
		ghosts[i].style.height = '40px';
		ghosts[i].style.left = 220 + 40*i + 'px';
		gDirections[i] = '';
	}

	
	// createWall(240, 200, 120, 40);
	// createWall(240, 280, 120, 40);
	// createWall(80, 160, 40, 160);
	// createWall(480, 160, 40, 160);
	// createWall(160, 240, 40, 160);
	// createWall(160, 0, 40, 120);
	// createWall(400, 240, 40, 160);
	// createWall(400, 0, 40, 120);
	// createWall(80, 80, 40, 40);
	// createWall(480, 80, 40, 40);
	// createWall(160, 160, 40, 40);
	// createWall(400, 160, 40, 40);
	// createWall(240, 80, 40, 80);
	// createWall(320, 80, 40, 80);
}

function createWall(left, top, width, height){
	var wall = document.createElement('div');
	wall.className = 'wall';
	wall.style.left = left + 'px';
	wall.style.top = top + 'px';
	wall.style.width = width + 'px';
	wall.style.height = height + 'px';
	gameWindow.appendChild(wall);

	walls.push(wall);
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

	moveGhosts();
	for(var i=0; i<ghosts.length; i++){
		if( hittest(pacman, ghosts[i]) ){
			alert('you lose');
			clearInterval(loopTimer);
		}
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
				if(hitWall(b[i]) ){
					bullets.removeChild(b[i]);
				}
			}						
		}
		else if(b[i].vSpeed < 0){
			// BULLET MOVING DOWN
			if( newY < 0 ) bullets.removeChild(b[i]);
			else{ 
				b[i].style.top = newY + 'px';
				if(hitWall(b[i]) ){
					bullets.removeChild(b[i]);
				}
			}	
		}	
			
		
		else if(b[i].hSpeed < 0){
			// BULLET MOVING LEFT
			if( newX < 0 ) bullets.removeChild(b[i]);
			else{ 
				b[i].style.left = newX + 'px';
					if(hitWall(b[i]) ){
					bullets.removeChild(b[i]);
				}	
			}
		}
		else if(b[i].hSpeed > 0){
			// BULLET MOVING RIGHT
			if( newX > gameWindowW ) bullets.removeChild(b[i]);
			else{
				b[i].style.left = newX + 'px';
			
				if(hitWall(b[i]) ){
					bullets.removeChild(b[i]);
				}
				
			}
		}
	}	
	moveTimer++
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
document.addEventListener('keypress', function(event){
	// if(event.keyCode==32) fire();
	if(event.charCode==32) fire();
});

function hitWall(element){
	var hit = false;
	for(var i=0; i<walls.length; i++){
		if( hittest(walls[i], element) ) hit = true;
	}
	return hit;
}



function moveGhosts(){
	for(var i=0; i<ghosts.length; i++){
	
	var gX = parseInt(ghosts[i].style.left);
	var gY = parseInt(ghosts[i].style.top);

	var pacX = parseInt(pacman.style.left);
	var pacY = parseInt(pacman.style.top);
			
	var goodChoices = new Array();
	var badChoices = new Array();

	var pinkGhost = ghosts[i];	
	var redGhost = ghosts[i];	
	var blueGhost = ghosts[i];	
	var greenGhost = ghosts[i];	

		if(ghosts[i].id=='pinkGhost'){
			var pgDirection = gDirections[i];
			
			
			// Check right
			if(pgDirection != 'left'){
				pinkGhost.style.left = gX + GHOST_SPEED + 'px';
				if( ! hitWall(pinkGhost) ){			
					if(pacX > gX) goodChoices.push('right');
					else badChoices.push('right');
				}
				pinkGhost.style.left = gX + 'px';
			}
			// Check left
			if(pgDirection != 'right'){
				pinkGhost.style.left = gX - GHOST_SPEED + 'px';
				if( ! hitWall(pinkGhost) ){			
					if(pacX < gX) goodChoices.push('left');
					else badChoices.push('left');
				}
				pinkGhost.style.left = gX + 'px';
			}
			// Check up
			if(pgDirection != 'down'){
				pinkGhost.style.top = gY - GHOST_SPEED + 'px';
				if( ! hitWall(pinkGhost) ){			
					if(pacY < gY) goodChoices.push('up');
					else badChoices.push('up');
				}
				pinkGhost.style.top = gY + 'px';
			}
			// Check down
			if(pgDirection != 'up'){
				pinkGhost.style.top = gY + GHOST_SPEED + 'px';
				if( ! hitWall(pinkGhost) ){			
					if(pacY > gY) goodChoices.push('down');
					else badChoices.push('down');
				}
				pinkGhost.style.top = gY + 'px';
			}
			
			if(goodChoices.length>0){
				var r = Math.floor(Math.random()*goodChoices.length)
				gNewDirection = goodChoices[r];
			}
			else{
				var r = Math.floor(Math.random()*badChoices.length)
				gNewDirection = badChoices[r];
			}
			
			if(gNewDirection == 'right'){
					if(gX>590) gX = -30;
					ghosts[i].style.left = gX + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'left'){
					if(gX < -30) gX = 590;
					ghosts[i].style.left = gX - GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'down'){
					if(gY > 390) gY = -30;
					ghosts[i].style.top = gY + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'up'){
					if(gY < -30) gY = 390;
					ghosts[i].style.top = gY - GHOST_SPEED + 'px';
				}
			
			
		}
		else if(ghosts[i].id=='redGhost'){
			var rgDirection = gDirections[i];
			
			
			// Check right
			if(rgDirection != 'left'){
				redGhost.style.left = gX + GHOST_SPEED + 'px';
				if( ! hitWall(redGhost) ){			
					if(pacX > gX) goodChoices.push('right');
					else badChoices.push('right');
				}
				redGhost.style.left = gX + 'px';
			}
			// Check left
			if(pgDirection != 'right'){
				redGhost.style.left = gX - GHOST_SPEED + 'px';
				if( ! hitWall(redGhost) ){			
					if(pacX < gX) goodChoices.push('left');
					else badChoices.push('left');
				}
				redGhost.style.left = gX + 'px';
			}
			// Check up
			if(pgDirection != 'down'){
				redGhost.style.top = gY - GHOST_SPEED + 'px';
				if( ! hitWall(redGhost) ){			
					if(pacY < gY) goodChoices.push('up');
					else badChoices.push('up');
				}
				redGhost.style.top = gY + 'px';
			}
			// Check down
			if(pgDirection != 'up'){
				redGhost.style.top = gY + GHOST_SPEED + 'px';
				if( ! hitWall(redGhost) ){			
					if(pacY > gY) goodChoices.push('down');
					else badChoices.push('down');
				}
				redGhost.style.top = gY + 'px';
			}
			
			if(goodChoices.length>0){
				var r = Math.floor(Math.random()*goodChoices.length)
				gNewDirection = goodChoices[r];
			}
			else{
				var r = Math.floor(Math.random()*badChoices.length)
				gNewDirection = badChoices[r];
			}
			
			if(gNewDirection == 'right'){
					if(gX>590) gX = -30;
					ghosts[i].style.left = gX + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'left'){
					if(gX < -30) gX = 590;
					ghosts[i].style.left = gX - GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'down'){
					if(gY > 390) gY = -30;
					ghosts[i].style.top = gY + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'up'){
					if(gY < -30) gY = 390;
					ghosts[i].style.top = gY - GHOST_SPEED + 'px';
				}
			
			
		}
		
			else{


			
			if(gDirections[i]=='left') gOppositeDirection = 'right';
			else if(gDirections[i]=='right') gOppositeDirection = 'left';
			else if(gDirections[i]=='down') gOppositeDirection = 'up';
			else if(gDirections[i]=='up') gOppositeDirection = 'down';

			do{
				ghosts[i].style.left = gX + 'px';
				ghosts[i].style.top = gY + 'px';

				if(moveTimer>25){
				do{
					var r = Math.floor(Math.random()*4);	// 0=right, 1=left, 2=down, 3=up
					if(r==0) gNewDirection = 'right';
					else if(r==1) gNewDirection = 'left';
					else if(r==2) gNewDirection = 'down';
					else if(r==3) gNewDirection = 'up';
				} while( gNewDirection == gOppositeDirection );
				}

				if(gNewDirection == 'right'){
					if(gX>590) gX = -30;
					ghosts[i].style.left = gX + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'left'){
					if(gX < -30) gX = 590;
					ghosts[i].style.left = gX - GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'down'){
					if(gY > 390) gY = -30;
					ghosts[i].style.top = gY + GHOST_SPEED + 'px';
				}
				else if(gNewDirection == 'up'){
					if(gY < -30) gY = 390;
					ghosts[i].style.top = gY - GHOST_SPEED + 'px';
				}
				
			} while( hitWall(ghosts[i]) );
		
			
		}
		
		gDirections[i] = gNewDirection;
	}
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
	

	

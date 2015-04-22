
function hittest(a, b){
	var aX1 = parseInt(a.style.left);
	var aY1 = parseInt(a.style.top);
	var aX2 = aX1 + parseInt(a.style.width)-1;
	var aY2 = aY1;
	var aX3 = aX1;
	var aY3 = aY1 + parseInt(a.style.height)-1;
	var aX4 = aX2;
	var aY4 = aY3;

	var bX1 = parseInt(b.style.left);
	var bY1 = parseInt(b.style.top);
	var bX2 = bX1 + parseInt(b.style.width)-1;
	var bY2 = bY1;
	var bX3 = bX1;
	var bY3 = bY1 + parseInt(b.style.height)-1;
	var bX4 = bX2;
	var bY4 = bY3;

	var hit = false;
	
	if(aX1>bX1 && aX1<bX2 && aY1>bY1 && aY1<bY3) hit = true;
	else if(aX2>=bX1 && aX2<=bX2 && aY2>=bY1 && aY2<=bY3) hit = true;
	else if(aX3>=bX1 && aX3<=bX2 && aY3>=bY1 && aY3<=bY3) hit = true;
	else if(aX4>=bX1 && aX4<=bX2 && aY4>=bY1 && aY4<=bY3) hit = true;
	else if(bX1>=aX1 && bX1<=aX2 && bY1>=aY1 && bY1<=aY3) hit = true;
	else if(bX2>=aX1 && bX2<=aX2 && bY2>=aY1 && bY2<=aY3) hit = true;
	else if(bX3>=aX1 && bX3<=aX2 && bY3>=aY1 && bY3<=aY3) hit = true;
	else if(bX4>=aX1 && bX4<=aX2 && bY4>=aY1 && bY4<=aY3) hit = true;

	return hit;
}
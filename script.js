
var eltBurger, eltSidebar;

function toggleSidebar() {
	eltSidebar.classList.toggle("folded");
		
	setTimeout('setBurgerArrow();', getHiddenTimeout(false));
	setTimeout('document.querySelector("#controls").classList.toggle("hidden");', getHiddenTimeout(true));
}

function setBurgerArrow() {
	const tUp = "∧", tRt = ">", tDn = "∨", tLt = "<";
	var m = document.documentElement.clientWidth < 460;
	eltBurger.innerHTML = (eltSidebar.classList.contains("folded")) ? (m ? tDn : tRt) : (m ? tUp : tLt);
}

function getHiddenTimeout(sidebarTimeout) {
	var transDuration = parseFloat(getComputedStyle(document.querySelector("#sidebar")).transitionDuration) * 1000;
	return sidebarTimeout ? !(eltSidebar.classList.contains("folded")) * transDuration : transDuration;
}


function changeFontSize() {
	var eltFontSize = document.querySelector("#fontsize");
	var fontSize = +eltFontSize.value;
	
	if (fontSize < +eltFontSize.min || fontSize > +eltFontSize.max) {
		alert("The font size should lie between " + eltFontSize.min + " and " + eltFontSize.max + "!");
		return;
	}
	
	var elsP = document.querySelectorAll("p");
	for (i = 0; i < elsP.length; i++) {
		elsP[i].style.fontSize = fontSize + "px";
	}
}


function changeBGColor() {
	document.querySelector("div.content").style.backgroundColor = document.querySelector("#bgcolor").value;
}


function changeFontFamily() {
	var elsRadio = document.getElementsByName("fontfamily");
	
	for (i = 0; i < elsRadio.length; i++) {
		if (elsRadio[i].checked) {
			document.querySelector("div.content").style.fontFamily = elsRadio[i].value;
			break;
		}
	}
}


function removeLastP() {
	document.querySelector("div.content > p:last-of-type").remove();
	
	if (!document.querySelector("div.content > p:last-of-type")) {
		document.querySelector("#remover").remove();
	}
}


window.onload = function() {
	eltBurger = document.querySelector("#burger");	
	eltSidebar = document.querySelector("#sidebar");
		
	document.querySelector("#fontsize").value = parseInt(getComputedStyle(document.querySelector("p")).fontSize);
	document.querySelector("#bgcolor").value = toHexColor(getComputedStyle(document.body).backgroundColor);
	
	setBurgerArrow();
	appendRadioInput();
}

function toHexColor(c) {
	c = c.match(/(\d+), (\d+), (\d+)/);
	return ("#" + (+c[1]).toString(16) + (+c[2]).toString(16) + (+c[3]).toString(16));
}

function appendRadioInput() {
	var htmlRadio = "";
	var arrFonts = ["Arial", "Courier New", "Georgia", "Lucida Sans Unicode", "Tahoma"];
	
	var defFont = getComputedStyle(document.body).fontFamily.replace(/"/g, "'");
	arrFonts.push(defFont);
	
	for (i in arrFonts) {
		if (arrFonts[i].indexOf("'") < 0) {
			arrFonts[i] = "'" + arrFonts[i] + "'";
		}
	}
	arrFonts.sort();

	for (i in arrFonts) {
		var c = (arrFonts[i].replace(/'/g, "") == defFont.replace(/'/g, "")) ? " checked" : ""; 
		htmlRadio += '<input type="radio" name="fontfamily" value="' + arrFonts[i] + '" onchange="changeFontFamily()"' + c + '></input><span style="font-family: ' + arrFonts[i] + '">' + arrFonts[i].split(" ")[0].replace(/'/g, "") + '</span><br>\n';
	}

	window.document.querySelector("#controls > div:last-child > label").insertAdjacentHTML("afterEnd", htmlRadio);
}


window.onresize = function() {
	setBurgerArrow();
}


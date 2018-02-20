
var eltBurger = document.querySelector("#burger");
var eltSidebar = document.querySelector("#sidebar");

var options = {
	backgroundColor: getComputedStyle(document.body).backgroundColor,
	transitionDuration: getComputedStyle(eltSidebar).transitionDuration,
	fontSize: getComputedStyle(document.querySelector("p")).fontSize,
	fontFamily: getComputedStyle(document.body).fontFamily,
	fonts: ["Arial", "Courier New", "Georgia", "Lucida Sans Unicode", "Tahoma"]
};


/* --------- sidebar initialization & animation --------- */
function initializeSidebar() {
	document.querySelector("#fontsize").value = parseInt(options.fontSize);
	document.querySelector("#bgcolor").value = toHexColor(options.backgroundColor);
	document.querySelector("#remover").disabled = false;
	
	setBurgerArrow();
	insertRadioInput();
	
	function toHexColor(c) {
		c = c.match(/(\d+), (\d+), (\d+)/);
		return ("#" + (+c[1]).toString(16) + (+c[2]).toString(16) + (+c[3]).toString(16));
	}
	
	function insertRadioInput() {
		var htmlRadio = "", arrFonts = options.fonts;
		
		// add the default font family into the array and sort it
		var defFont = options.fontFamily.replace(/"/g, "'");
		arrFonts.push(defFont);
		
		for (i in arrFonts) {
			if (arrFonts[i].indexOf("'") < 0) {
				arrFonts[i] = "'" + arrFonts[i] + "'";
			}
		}
		arrFonts.sort();

		// build an html code for the radio control
		for (i in arrFonts) {
			var c = (arrFonts[i].replace(/'/g, "") == defFont.replace(/'/g, "")) ? " checked" : ""; 
			htmlRadio += 
				'<input type="radio" name="fontfamily" value="' + arrFonts[i] + '" onchange="changeFontFamily()"' + c + '></input>' +
				'<span style="font-family: ' + arrFonts[i] + '">' + arrFonts[i].split(" ")[0].replace(/'/g, "") + '</span><br>\n';
		}

		window.document.querySelector("#controls > div:nth-last-child(2) > label").insertAdjacentHTML("afterEnd", htmlRadio);
	}
}

function toggleSidebar() {
	eltSidebar.classList.toggle("folded");
		
	setTimeout('setBurgerArrow();', getHiddenTimeout(false));
	setTimeout('document.querySelector("#controls").classList.toggle("hidden");', getHiddenTimeout(true));
}

function setBurgerArrow() {
	const tUp = "∧", tRt = ">", tDn = "∨", tLt = "<";
	// adjust for a narrow width
	var m = document.documentElement.clientWidth < 460;
	eltBurger.innerHTML = (eltSidebar.classList.contains("folded")) ? (m ? tDn : tRt) : (m ? tUp : tLt);
}

function getHiddenTimeout(isControlsTimeout) {
	var transDuration = parseFloat(options.transitionDuration) * 1000;
	return isControlsTimeout ? !(eltSidebar.classList.contains("folded")) * transDuration: transDuration * 0.9;
}


/* --------- content style customization --------- */
function changeFontSize() {
	var eltFontSize = document.querySelector("#fontsize");
	var fontSize = eltFontSize.value;
	
	if (!fontSize.trim().match(/^\d{1,2}$/)) {
		// default message displayed
		return;
	}
	
	fontSize = +fontSize;
	if (fontSize < +eltFontSize.min || fontSize > +eltFontSize.max) {
		alert("The font size should lie between " + eltFontSize.min + " and " + eltFontSize.max + "!");
		return;
	}
	
	var elsP = document.querySelectorAll("p");
	for (i = 0; i < elsP.length; i++) {
		elsP[i].style.fontSize = fontSize + "px";
	}
}

function changeBackgroundColor() {
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
		document.querySelector("#remover").disabled = true;
	}
}


/* --------- window functions --------- */
window.onload = initializeSidebar;
window.onresize = setBurgerArrow;

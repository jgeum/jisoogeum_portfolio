
// Nav Bar Scroll 



// Typewriter Animation 
// Tutorial by https://www.youtube.com/watch?v=POX3dT-pB4E&ab_channel=TraversyMedia

//txtElement is the span tag in html, wait is the wait time before deleting
const Typewriter = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = ''; //whatever words that are in the screen at the moment 
	this.wordIndex = 0; //index of the word as Arrays - to know which word we are on 
	this.wait = parseInt(wait, 10);
	this.type(); //setting the method as Type
	this.isDeleting = false; // set as false at first. When it's deleting, it's going to be set as true
};

// Type Method
Typewriter.prototype.type = function() {
	// Current index of 'words'
	const current = this.wordIndex % this.words.length;
	//console.log(current); // shows '0' over and over/ 

	// Get full text of current word 
	const fullTxt = this.words[current];
	//console.log(fullTxt); //shows the first string over and over.

	// Add or Delete character
	if(this.isDeleting) {
		// Remove character
		this.txt = fullTxt.substring(0, this.txt.length - 1);

	} else {
		// Add character
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	// Output whatever is in this.txt into a span
	this.txtElement.innerHTML = `<span class="cursor-effect">${this.txt}</span>`; // using back ticks

	// Initial type speed
	let typeSpeed = 100;
	if (this.isDeleting) {

		// Speed gets faster when deleting. 
		typeSpeed /= 3; // /= means typeSpeed / 3.
	}

	// If word is complete, set a short pause at the end.
	if (!this.isDeleting && this.txt == fullTxt) {
		// Make pause 
		typeSpeed = this.wait;

		// Delete start
		this.isDeleting = true;

		// If the word is completely deleted
	} else if(this.isDeleting && this.txt == '') {
		// Delete ends
		this.isDeleting = false;

		// Begin typing next word 
		this.wordIndex++;

		// Pause before start typing 
		typeSpeed = 200;
	}


	// Calling the type method. "150" is half a second or 150ms.
	setTimeout(() => this.type(), typeSpeed); //
	//console.log('150ms'); //shows '150ms' every 150ms.
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Initialize App 
function init() {
	const txtElement = document.querySelector('.txt-type'); // class in html
	//run the string words with JSON parse
	const words = JSON.parse(txtElement.getAttribute('data-words')); // words in html
	const wait = txtElement.getAttribute('data-wait');
	// Initialize typewriter
	new Typewriter(txtElement, words, wait);
}


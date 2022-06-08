const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')



function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
 
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    showLoadingSpinner()
    // Pick a andom Quote from local QuotesArray
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if Author field is blank and replace it with 'Unknown'
    quote.author ? authorText.textContent = quote.author :  authorText.textContent = 'Unknown';
   
    // Check Quote length to determine styling
    if(quote.text.length > 80){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner()
}

// Get Qoute From API
let apiQuotes = [];

async function getQuotes() {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error){
        // Catch Eror Here 
        console.log('Hey, no quotes', error)
    }
}

// On Load from API
getQuotes()

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load Local
// newQuote()
showLoadingSpinner()

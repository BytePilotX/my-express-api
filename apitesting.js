async function getKanyeQuoteAPI() {
    const response = await fetch('https://api.kanye.rest/')
    const data = await response.json();
    return data;
}

module.exports = {getKanyeQuoteAPI};

/*(getKanyeQuoteAPI().then(data => {
    console.log(data.quote);
})
*/
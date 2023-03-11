const puppeteer = require('puppeteer');
const fs = require('fs');

const getPokemonData = async () => {

  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1024, height: 768 });

    // Trying to make request as fast as possible
    
      // Disable images to reduce content amount
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.resourceType() === 'image') {
          request.abort();
        } else {
          request.continue();
        }
      });

    // set view port reduce of content amount
    await page.goto('https://scrapeme.live/shop/');
    
    // end of trying

    const result = [];
  
    // Starting extraction of pokemon data
    while (true) {
      const pokemons = await page.evaluate(() => {
        const pokemonList = Array.from(document.querySelectorAll('.product'));
  
          return pokemonList.map(pokemon => {
            const id = pokemon.querySelector('.button').getAttribute('data-product_id');
            const name = pokemon.querySelector('.woocommerce-loop-product__title').textContent.trim();
            const sku = pokemon.querySelector('.button').getAttribute('data-product_sku');
            const image_url = pokemon.querySelector('.wp-post-image').getAttribute('src');
            const price = pokemon.querySelector('.price').textContent.trim();
      
            return { id, sku, name, price, image_url };
          });
      });
  
      // Save the Pokemon data to the result array
      result.push(...pokemons);
  
      // Check if there is a "Next" button on the current page
      const nextButton = await page.$('.next'); 
      if (!nextButton) {
        break;
      }
  
      // Click the "Next" button to go to the next page
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        nextButton.click(),
      ]);
    }
  
    // Save the result array to a local file
    fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
  
    // Close the browser
    await browser.close();
  } catch (error){
    console.log(error);
  }
};

getPokemonData();
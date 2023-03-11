const { test, expect } = require('@jest/globals');
const fs = require('fs');

// Import the function to be tested
const getPokemonData = require('./index.cjs');

// Test the getPokemonData function
test('getPokemonData and save to file', async () => {
  try{
    await getPokemonData();

    
    // Read the saved file
  const data = fs.readFileSync('result.json');
  const result = JSON.parse(data);

  // Check that the result is an array with at least one element
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  
  // Check that each element has the required properties
  result.forEach(pokemon => {
    expect(pokemon.id).toBeDefined();
    expect(pokemon.name).toBeDefined();
    expect(pokemon.sku).toBeDefined();
    expect(pokemon.image_url).toBeDefined();
    expect(pokemon.price).toBeDefined();
  });

  // Clean up the saved file
  fs.unlinkSync('result.json');
  } catch (error){
    console.log(error)
  }


});

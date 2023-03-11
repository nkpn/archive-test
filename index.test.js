const { getPokemonData } = require('./index.cjs');

test('should return an array of Pokemon objects', async () => {
  const result = await getPokemonData();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  expect(result[0]).toHaveProperty('id');
  expect(result[0]).toHaveProperty('name');
  expect(result[0]).toHaveProperty('sku');
  expect(result[0]).toHaveProperty('price');
  expect(result[0]).toHaveProperty('image_url');
});
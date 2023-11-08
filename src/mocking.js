const generateMockProduct = (id) => {
    const product = {
      _id: id,
      name: 'Sample Product',
      price: 10.0,
      description: 'This is a sample product description.',
      stock: 100,
      quantity: 0,
    };
    return product;
  };
  
  const generateMockProducts = (count = 100) => {
    const products = [];
    for (let i = 1; i <= count; i++) {
      products.push(generateMockProduct(i));
    }
    return products;
  };
  
  module.exports = {
    generateMockProduct,
    generateMockProducts,
  };
  
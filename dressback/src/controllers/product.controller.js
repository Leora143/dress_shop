const prisma = require('../lib/prisma');
const getProducts = async (req, res) => {
    try{
        const product = await prisma.product.findMany();
        res.status(200).json(product);

    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const createProduct = async (req, res) => {
  try {

    console.log(req.body);
    const {
      name,
      description,
      price,
      image,
    } = req.body;

    const product =
      await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
        },
      });

    res.status(201).json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await prisma.product.findFirst({
            where: {
            id: id,
         },
        });
        console.log(product);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: error.message, });
    }
};

const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;

        const product = await prisma.product.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: error.message, });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                name,
                description,
                price,
                image,
            },
        });
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: error.message, });
    }
};
module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
};


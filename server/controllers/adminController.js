import Product from "#models/admin/product.model";

export function adminDashboard(req, res) {
  res.json({ message: "Welcome to the admin dashboard!" });
}

export function createProduct(req, res) {
  // Access form data
  const { productName, price, description, category } = req.body;
  const productImage = req.file; // Access the uploaded file

  // validate data with mongoose schema
  const newProduct = new Product({
    productName,
    price,
    description,
    category,
    productImage: productImage ? productImage.path : null, // Store the file path of the uploaded image
  });

  // save to database
  newProduct.save();

  // return response
  res
    .status(201)
    .json({ message: "Product created successfully!", product: newProduct });
}

export async function getProducts(req, res) {
  // get products from database
  const products = await Product.find();

  // return response
  res.json(products);
}

export async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

export async function updateProduct(req, res) {
  // Access form data
  const { productName, price, description, category } = req.body;
  const productImage = req.file; // Access the uploaded file

  const updateData = {
    productName,
    price,
    description,
    category,
  };

  // Only replace image if a new file is uploaded
  if (productImage) {
    updateData.productImage = productImage.path;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
  );

  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    message: "Product updated successfully",
    updatedData: updatedProduct,
  });
}

export async function deleteProduct(req, res) {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
}

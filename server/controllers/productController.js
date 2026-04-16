const products = [
  {
    id: 1,
    name: "Drawing Tablet",
    image:
      "https://astropad.com/wp-content/uploads/2024/01/Wacom-Cintiq-16-.webp",
    price: 8499,
  },
  {
    id: 2,
    name: "Gaming Keyboard",
    image:
      "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2022/04/rgb-lit-gaming-mechanical-keyboard.jpg?w=1200&h=675&fit=crop",
    price: 1999,
  },
  {
    id: 3,
    name: "PlayStation 5",
    image: "https://m.media-amazon.com/images/I/51ljnEaW0pL.jpg",
    price: 50000,
  },
];

export function getProducts(req, res) {
  const loggedInUser = req.user;

  res.json({
    products,
    user: loggedInUser,
  });
}

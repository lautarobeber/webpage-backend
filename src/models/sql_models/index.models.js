/* import { Project } from "./Project.js";
import { Task } from "./Task.js"; */
import { Product } from "./products.model.js";
import { Category } from "./category.model.js";
import { User } from "./users.model.js";
import { Cart } from "./cart.model.js";
import Order from "./order.model.js";
import Product_Cart from "./product_cart.model.js";
import { Order_Product } from "./order_product.model.js";

//categoria - productos
Category.hasMany(Product, {
  foreignKey: "id_category",
  sourceKey: "id_category",
});
Product.belongsTo(Category, {
  foreignKey: "id_category",
  targetKey: "id_category",
});

//usuarios - carrito
User.hasOne(Cart, {
  foreignKey: "id_user",
  sourceKey: "email",
});
Cart.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "email",
});
//usuarios -- order
User.hasMany(Order, { foreignKey: "id_user", sourceKey: "email" });
Order.belongsTo(User, { foreignKey: "id_user", targetKey: "email" });

//product_cart -- product
Product.hasMany(Product_Cart, {
  foreignKey: "id_product",
  sourceKey: "id_product",
});
Product_Cart.belongsTo(Product, {
  foreignKey: "id_product",
  targetKey: "id_product",
});

//product_cart -- product
Cart.hasMany(Product_Cart, { foreignKey: "id_cart", sourceKey: "id_cart" });
Product_Cart.belongsTo(Cart, {
    foreignKey: "id_cart",
    targetKey: "id_cart",
  });


//order_product -- product

Product.hasMany(Order_Product, {
    foreignKey: 'id_product',
    sourceKeyKey: 'id_product',
})
Order_Product.belongsTo(Product, {
    foreignKey: 'id_product',
    targetKey: 'id_product',
})

//order_product -- order
Order.hasMany(Order_Product, {
    foreignKey: 'id_order',
    sourceKeyKey: 'id_order',
})
Order_Product.belongsTo(Order, {
    foreignKey: 'id_order',
    targetKey: 'id_order',
})

export {
   Product,
  Category,
  User,
  Order,
  Cart,
  Product_Cart,
  Order_Product
};

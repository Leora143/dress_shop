import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} from "@/services/product.services";

import { uploadImage } from "@/services/upload.services";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  


  const handleSubmit = async (e) => {e.preventDefault();
    
  if(editingId){
    await updateProduct(
      editingId,{
      name,
      description,
      price: Number(price),
      image,
    });
  }else {
    // const uploadResult = await uploadImage(image);
    // const imageUrl = uploadResult.imageUrl;
    // console.log(uploadResult);
console.log(imageUrl);
    await createProduct({
      name,
      description,
      price: Number (price),
      image: imageUrl,
    });

  }
  const data = await getProducts();
  console.log(data);

setProducts(data);
  alert("Products state updated");
  
}

const handleDelete = async (id) => {

  try {

    await deleteProduct(id);

    setProducts(
      products.filter(
        (product) =>
          product.id !== id
      )
    );

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

  const fetchProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }

  };

  fetchProducts();

}, []);


console.log("STATE", products);
console.log(image);
  return (
  <div className="admin-container">

    <h1>
      {editingId ? "Edit Product" : "Create Product"}
    </h1>

    <div className="admin-form">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">
          {editingId
            ? "Update Product"
            : "Create Product"}
        </button>

      </form>

    </div>

    <h2>Products</h2>

    <div className="product-grid">

      {products.map((product) => (

        <div
          className="admin-product"
          key={product.id}
        >

          <img
            src={product.image}
            alt={product.name}
          />

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <div className="admin-buttons">

            <button
              onClick={() => {
                setEditingId(product.id);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setImage(product.image);
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(product.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
);
}
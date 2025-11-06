import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncRemoveProduct,
  asyncUpdateProduct,
} from "../../store/action/productActions";
import { useState } from "react";
import axios from "../../api/config";

const ProductDetail = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const products = useSelector((state) => state.productsReducers.products) || [];
  const user = useSelector((state) => state.usersReducer.user);

  const product = products.find(
    (p) => String(p.id) === String(id) || String(p._id) === String(id)
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  // Remove product
  const handleRemoveProduct = () => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      dispatch(asyncRemoveProduct(product._id)); // Use _id for backend
      navigate(-1);
    }
  };

  // Update product
  const handleEditProduct = (data) => {
    if (!product) return;

    const formData = new FormData();
    formData.append("name", data.name || product.name);
    formData.append("price", data.price || product.price);
    formData.append("description", data.description || product.description);
    formData.append("category", data.category || product.category);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Only add new image if selected
    }

    dispatch(asyncUpdateProduct(product._id, formData));
  };

  return (
    <div className="max-w-6xl md:mt-0 mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left - Product Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-3xl shadow-xl border-4 border-pink-200"
          />
        </div>

        {/* Right - Product Details */}
        <div className="space-y-6 p-8 rounded-3xl bg-white shadow-md">
          <h2 className="text-4xl font-extrabold text-pink-700">
            {product.name}
          </h2>
          <p className="text-xl text-gray-500 capitalize">{product.category}</p>
          <p className="text-2xl text-yellow-600 font-semibold">
            ${product.price}
          </p>
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={async (e) => {
                e.preventDefault();
                try {
                  await axios.post("/cart", { productId: product._id });
                  alert("✅ Added to Cart");
                } catch (err) {
                  console.log(err);
                  alert("❌ Please login first");
                }
              }} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md">
              🛒 Add to Cart
            </button>
            <button className="bg-red-200 hover:bg-red-300 text-red-700 font-semibold py-2 px-5 rounded-full transition duration-300">
              ❤️ Like
            </button>
            {user?.role === "admin" && (
              <button
                className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-semibold py-2 px-5 rounded-full transition duration-300"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                ✏️ Edit
              </button>
            )}
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-full transition duration-300"
              onClick={() => navigate(-1)}
            >
              🔙 Back
            </button>
          </div>

          {/* Edit Form */}
          {user?.user?.role === "admin" &&(
            <div className="mt-10 p-6 bg-gray-100 rounded-2xl shadow-md space-y-4 w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Edit Product
              </h3>
              <form onSubmit={handleSubmit(handleEditProduct)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={product.name}
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    defaultValue={product.price}
                    {...register("price", { required: "Price is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    defaultValue={product.description}
                    {...register("description", { required: "Description is required" })}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    defaultValue={product.category}
                    {...register("category", { required: "Category is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transition duration-300"
                  >
                    💾 Save
                  </button>
                  <button
                    type="button"
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transition duration-300"
                    onClick={handleRemoveProduct}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

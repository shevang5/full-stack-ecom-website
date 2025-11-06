import { nanoid } from 'nanoid'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { asyncCreateProduct } from '../../store/action/productActions'

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (product) => {
  product.id = nanoid();

  // Fix: extract the actual file from the FileList
  if (product.image && product.image.length > 0) {
    product.image = product.image[0];
  }

  dispatch(asyncCreateProduct(product));
  console.log('Form Data:', product);
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('name', { required: 'Title is required' })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Handmade Fresh Table"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="toys">Toys</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Price must be at least 1' },
            })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="687"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Andy shoes are designed to keeping in..."
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

       {/* Image URL Input */}
<div>
  <label className="block text-sm font-medium text-gray-700">Image URL</label>
  <input
    type="file"
    placeholder="image.jpg"
    {...register('image', { required: 'Image file is required' })}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
  />
  {errors.image && (
    <p className="text-red-500 text-sm">{errors.image.message}</p>
  )}
</div>


        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct

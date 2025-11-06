// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { asyncLoginUsers } from '../store/action/userActions';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(asyncLoginUsers({ email, password }))
//       .then(() => navigate('/'))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="w-1/3 p-8 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//         </div>
//         <div className="flex items-center justify-between">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
//           <Link to="/register" className="text-blue-500 hover:text-blue-700">Don't have an account ? Register</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

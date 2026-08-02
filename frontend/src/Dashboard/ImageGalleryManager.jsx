// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { FaTrash, FaUpload, FaImage, FaTimes } from "react-icons/fa";
// import API from "../api/api";

// const ImageGalleryManager = () => {
//   const [images, setImages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [remainingSlots, setRemainingSlots] = useState(10);
//   const [loading, setLoading] = useState(false);

//   // Fetch Uploaded Images matching `getMyPosts` controller
//   const fetchMyImages = async () => {
//     try {
//       const res = await API.get("/posts/my-posts");
//       if (res.data.success) {
//         setImages(res.data.posts || []);
//         setRemainingSlots(res.data.remainingSlots ?? 10);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error(err?.response?.data?.message || "Images load nahi ho paaye");
//     }
//   };

//   useEffect(() => {
//     fetchMyImages();
//   }, []);

//   // Handle Image Selection with Strict Validation
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//       if (!allowedTypes.includes(file.mimetype) && !file.type.startsWith("image/")) {
//         toast.error("Keval Image files (JPG, PNG, WEBP) hi allowed hain!");
//         return;
//       }
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Upload Image Submit matching `createPost` controller
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       toast.error("Kripya ek image file select karein.");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const res = await API.post("/posts/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success(res.data.message || "Image successfully upload ho gayi hai");
//       setSelectedFile(null);
//       setPreview("");
//       fetchMyImages(); // Refresh Grid & Slots
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Upload Fail!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Image matching `deletePost` controller using postId param
//   const handleDelete = async (postId) => {
//     if (!window.confirm("Kya aap is image ko delete karna chahte hain?")) return;

//     try {
//       const res = await API.delete(`/posts/delete/${postId}`);
//       toast.success(res.data.message || "Image delete ho gayi.");
//       fetchMyImages(); // Refresh Grid & Slots
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete error occurred");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-100 text-gray-900 py-8 px-4 sm:px-6">
//       <div className="max-w-4xl mx-auto space-y-8">
        
//         {/* Header */}
//         <div className="bg-white border-2 border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
//               My Business Showcase
//             </h1>
//             <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">
//               Upload and manage your gallery images ({images.length}/10 Images)
//             </p>
//           </div>
//           <div className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700">
//             Remaining Slots: <span className="text-gray-900">{remainingSlots}</span>
//           </div>
//         </div>

//         {/* Upload Box Form */}
//         <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
//           <form onSubmit={handleUpload} className="space-y-4">
//             <div className="flex flex-col items-center justify-center">
//               <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-700 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
//                 <FaUpload size={28} className="text-gray-500 mb-2" />
//                 <span className="font-bold text-sm sm:text-base">Click to select image</span>
//                 <span className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP up to 10 limit</span>
//                 <input
//                   type="file"
//                   accept="image/jpeg, image/png, image/jpg, image/webp"
//                   onChange={handleFileChange}
//                   disabled={remainingSlots === 0 || loading}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {preview && (
//               <div className="relative inline-block mt-4">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => { setSelectedFile(null); setPreview(""); }}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 cursor-pointer"
//                 >
//                   <FaTimes size={12} />
//                 </button>
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={!selectedFile || loading || remainingSlots === 0}
//                 className="w-full sm:w-auto px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-md transition-all disabled:bg-gray-400 cursor-pointer"
//               >
//                 {loading ? "Uploading..." : "Upload Image"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Image Grid Display */}
//         <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
//           <h3 className="text-xl font-extrabold text-gray-900 mb-6">Uploaded Images</h3>
          
//           {images.length === 0 ? (
//             <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
//               <FaImage size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">Koi image upload nahi hui hai.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {images.map((item) => (
//                 <div
//                   key={item._id}
//                   className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm flex flex-col justify-between"
//                 >
//                   <img
//                     src={item.imageUrl}
//                     alt="Uploaded Post"
//                     className="w-full h-44 object-cover"
//                   />
//                   <div className="p-3 bg-white border-t border-gray-200">
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer"
//                     >
//                       <FaTrash size={14} /> Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ImageGalleryManager;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaUpload, FaImage, FaTimes } from "react-icons/fa";
import API from "../api/api";

const ImageGalleryManager = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [remainingSlots, setRemainingSlots] = useState(10);
  const [loading, setLoading] = useState(false);

  // Fetch Uploaded Images
  const fetchMyImages = async () => {
    try {
      const res = await API.get("/posts/my-posts");
      if (res.data.success) {
        setImages(res.data.posts || []);
        setRemainingSlots(res.data.remainingSlots ?? 10);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error(err?.response?.data?.message || "Failed to load images.");
    }
  };

  useEffect(() => {
    fetchMyImages();
  }, []);

  // Handle Image Selection with Limit & Type Validation
  const handleFileChange = (e) => {
    if (remainingSlots === 0) {
      toast.error("Limit reached! You can upload a maximum of 10 images.");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.mimetype) && !file.type.startsWith("image/")) {
        toast.error("Only image files (JPG, PNG, WEBP) are allowed!");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload Image Submit
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (remainingSlots === 0) {
      toast.error("Limit reached! You can upload a maximum of 10 images.");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select an image file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Image uploaded successfully!");
      setSelectedFile(null);
      setPreview("");
      fetchMyImages(); // Refresh Grid & Slots
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Image (Direct delete without window.confirm popup)
  const handleDelete = async (postId) => {
    try {
      const res = await API.delete(`/posts/delete/${postId}`);
      toast.success(res.data.message || "Image deleted successfully.");
      fetchMyImages(); // Refresh Grid & Slots
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete error occurred.");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900 py-6 px-4 sm:px-8">
      <div className="w-full space-y-6">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border border-indigo-100 shadow-xl p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              My Business Showcase
            </h1>
            <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">
              Upload and manage your gallery images ({images.length}/10 Images)
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-200">
            Remaining Slots: <span className="text-yellow-300">{remainingSlots}</span>
          </div>
        </div>

        {/* Upload Box Form */}
        <div className="bg-white/80 backdrop-blur-md border-2 border-dashed border-indigo-200 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <label 
                onClick={(e) => {
                  if (remainingSlots === 0) {
                    e.preventDefault();
                    toast.error("Limit reached! You can upload a maximum of 10 images.");
                  }
                }}
                className="w-full flex flex-col items-center px-4 py-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 text-indigo-700 rounded-xl border-2 border-indigo-200/60 cursor-pointer hover:bg-indigo-100/50 transition-all shadow-sm hover:shadow"
              >
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-md mb-3">
                  <FaUpload size={22} />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-gray-800">Click to select image</span>
                <span className="text-xs text-gray-500 mt-1 font-medium">JPG, PNG, WEBP up to 10 limit</span>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg, image/webp"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>

            {preview && (
              <div className="relative inline-block mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border-4 border-white shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => { setSelectedFile(null); setPreview(""); }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white p-1.5 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!selectedFile || loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all disabled:opacity-50 disabled:shadow-none cursor-pointer"
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </form>
        </div>

        {/* Image Grid Display */}
        <div className="bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-extrabold text-gray-900 mb-6">Uploaded Images</h3>
          
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-indigo-100 rounded-xl bg-indigo-50/20">
              <FaImage size={40} className="mx-auto text-indigo-300 mb-3" />
              <p className="text-gray-500 font-medium">No images have been uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((item) => (
                <div
                  key={item._id}
                  className="border border-indigo-100 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt="Uploaded Post"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-gray-50/50 border-t border-indigo-50">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-2 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
                    >
                      <FaTrash size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ImageGalleryManager;
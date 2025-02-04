// import React, { useState, useEffect } from "react";
// import NavbarOrganism from "../organisms/NavbarOrganism";

// const CatatanOrganism = () => {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Mengambil data catatan dari localStorage saat pertama kali dimuat
//   useEffect(() => {
//     const savedNotes = localStorage.getItem("notes");
//     if (savedNotes) {
//       setNotes(JSON.parse(savedNotes));  // Menyimpan catatan jika ada data di LocalStorage
//     }
//   }, []);  // Hanya dijalankan sekali saat halaman pertama kali dimuat

//   // Menyimpan catatan ke localStorage setiap kali notes berubah
//   useEffect(() => {
//     if (notes.length > 0) {
//       localStorage.setItem("notes", JSON.stringify(notes));  // Simpan catatan ke localStorage
//     }
//   }, [notes]);  // Simpan setiap kali notes berubah

//   const handleAddOrUpdateNote = () => {
//     if (title.trim() === "" || description.trim() === "") {
//       alert("Please enter both title and description.");
//       return;
//     }

//     const newNote = { title, description };

//     if (editingIndex !== null) {
//       const updatedNotes = [...notes];
//       updatedNotes[editingIndex] = newNote;
//       setNotes(updatedNotes);
//       setEditingIndex(null);
//     } else {
//       setNotes([...notes, newNote]);
//     }

//     setTitle("");
//     setDescription("");
//     setShowModal(false);
//   };

//   const handleDeleteNote = (index) => {
//     const updatedNotes = notes.filter((_, i) => i !== index);
//     setNotes(updatedNotes);
//   };

//   const handleEditNote = (index) => {
//     setTitle(notes[index].title);
//     setDescription(notes[index].description);
//     setEditingIndex(index);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setTitle("");
//     setDescription("");
//     setEditingIndex(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="bg-white pb-[1080px] pl-3 pr-3 font-inter">
//       <NavbarOrganism></NavbarOrganism>
//       <h1 className="text-6xl font-thin pb-6 pt-6 text-center">Catatan</h1>
//       <button
//         onClick={() => setShowModal(true)}
//         className="fixed bottom-5 right-5 p-5 bg-black text-white rounded-full"
//       >
//         Add New Note
//       </button>

//       <ul className="flex flex-wrap">
//         {notes.map((note, index) => (
//           <div key={index} className="p-5 m-1 border border-black/15 rounded-3xl w-[390px] flex flex-col justify-between">
//             <div className="mb-1">
//               <p className="text-4xl mb-5 font-thin">{note.title}</p>
//               {/* <p className="text-xl text-black/50 mt-3 mb-5">{note.description}</p> */}
//             </div>
//             <div className="flex flex-col">
//               <button
//                 onClick={() => handleEditNote(index)}
//                 className="p-3 border border-black/15 text-black rounded-full"
//               >
//                 See Note
//               </button>
//               <button
//                 onClick={() => handleDeleteNote(index)}
//                 className="p-4 bg-black text-white rounded-full mt-1"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </ul>

//       {showModal && (
//         <div className="fixed top-0 left-0 right-0">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-full h-screen">
//             <h2 className="text-6xl text-center font-thin mb-4">
//               {editingIndex !== null ? "See Note" : "Add New Note"}
//             </h2>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Masukkan judul..."
//               className="p-2 bg-white border-b border-black/15 text-4xl font-thin rounded-lg w-full mb-4"
//             />
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Masukkan deskripsi..."
//               className="p-2 bg-white border-none h-full rounded-lg w-full mb-4 text-xl text-black/50"
//               rows="3"
//             />
//             <div className="fixed bottom-5 right-5">
//               <button
//                 onClick={closeModal}
//                 className="p-5 border border-black/15 text-black rounded-2xl mr-2"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleAddOrUpdateNote}
//                 className="p-5 bg-black text-white rounded-2xl"
//               >
//                 Simpan
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CatatanOrganism;

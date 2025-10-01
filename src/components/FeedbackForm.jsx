import { FaUser, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

export default function FeedbackForm() {
  const [form, setForm] = useState({name: "", email:"", feedback:""})
  const handleSubmit = (e) => {
    e.preventDefault(); 

    toast.success("Thank you for your feedback!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setForm({name: "", email:"", feedback:""})
  };

  const handleChange = (e)=>{
    setForm({[e.target.name]: e.target.value})
  }

  return (
    <section className="py-16 px-6 bg-background-dark rounded-xl mx-6 my-12 shadow-lg">
     
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Give Us Your Feedback
      </h2>

      <form className="max-w-3xl mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={handleChange}
          name="name"
          placeholder="Your Name"
          className="p-4 rounded-lg border border-black bg-background text-black placeholder-gray-400 "
        />

        <input
          type="email"
          value={form.email}
          name="email"
          onChange={handleChange}
          placeholder="Your Email"
          className="p-4 rounded-lg border border-black bg-background text-black placeholder-gray-400 "
        />

        <textarea
          rows="5"
          value={form.feedback}
          onChange={handleChange}
          name="feedback"
          placeholder="Write your feedback here..."
          className="p-4 rounded-lg border border-black bg-background text-black placeholder-gray-400 "
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit" 
          disabled={!form.name && !form.email && !form.feedback}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
}
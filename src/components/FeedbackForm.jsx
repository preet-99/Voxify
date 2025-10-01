import { FaUser, FaEnvelope } from "react-icons/fa";


export default function FeedbackForm() {
  return (
    <section className="py-16 px-6 bg-background-dark rounded-xl mx-6 my-12 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Give Us Your Feedback</h2>
      
      <form className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Your Name"
          className="p-4 rounded-lg border border-black bg-background  text-black placeholder-gray-400 "
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Your Email"
          className="p-4 rounded-lg border border-black bg-background text-black placeholder-gray-400 "
        />

        {/* Feedback Textarea */}
        <textarea
          rows="5"
          placeholder="Write your feedback here..."
          className="p-4 rounded-lg border border-black bg-background text-black placeholder-gray-400 "
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
}

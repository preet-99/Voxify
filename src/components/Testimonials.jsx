export default function Testimonials() {
  const reviews = [
    { name: "Aman Sharma", text: "Amazing tool! Extracted text from my video in seconds." },
    { name: "Priya Singh", text: "The speech to text feature is super useful for my notes." },
    { name: "Rahul Verma", text: "Clean UI and very easy to use. Love the purple-teal theme." },
  ];

  return (
    <section className="bg-[#bbdefb] py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Our Users Say</h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white shadow-lg p-6 rounded-xl text-gray-800 hover:shadow-2xl transition">
            <p className="mb-4 italic">“{r.text}”</p>
            <h4 className="text-accent font-semibold">{r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

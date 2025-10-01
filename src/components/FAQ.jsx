export default function FAQ() {
  const faqs = [
    { q: "Is it free to use?", a: "Yes, the basic tools are free with some limits." },
    { q: "Can I use it on mobile?", a: "Yes, the site is fully responsive and mobile-friendly." },
    { q: "What formats are supported?", a: "We support MP4, MP3, PNG, JPG, and more." },
  ];

  return (
    <section className="py-20 px-6 bg-[#bbdefb]">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold text-accent">{f.q}</h3>
            <p className="text-gray-700">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

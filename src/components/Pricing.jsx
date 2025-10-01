export default function Pricing() {
  const plans = [
    { name: "Free", price: "₹0", features: ["Basic conversions", "Limited uploads"] },
    { name: "Pro", price: "₹499/mo", features: ["Unlimited usage", "Fast AI processing", "Priority support"] },
    { name: "Enterprise", price: "₹1999/mo", features: ["Custom features", "Dedicated server", "24/7 support"] },
  ];

  return (
    <section className="py-20 px-6 bg-background-dark">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">Choose Your Plan</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-accent">{plan.name}</h3>
            <p className="text-3xl font-bold text-primary my-4">{plan.price}</p>
            <ul className="text-gray-700 mb-6">
              {plan.features.map((f, j) => (
                <li key={j} className="mb-2">✔ {f}</li>
              ))}
            </ul>
            <button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

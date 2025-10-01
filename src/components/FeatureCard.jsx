export default function FeatureCard({ title, desc, icon, id, onClick }) {
  return (
    <div
      id={id}
      onClick={() => onClick?.(id)} // Safe call if onClick is passed
      className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition cursor-pointer"
    >
      <div className="text-black mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-black">{desc}</p>
    </div>
  );
}

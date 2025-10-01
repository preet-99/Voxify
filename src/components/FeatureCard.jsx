export default function FeatureCard({ title, desc, icon, id, onClick }) {
  return (
    <div
      id={id}
      onClick={() => onClick?.(id)} // Safe call if onClick is passed
      className="bg-[#bbdefb] shadow-lg rounded-2xl p-6 hover:scale-105 transition cursor-pointer"
    >
      <div className="text-green-700 mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-green-900">{title}</h3>
      <p className="text-green-800">{desc}</p>
    </div>
  );
}

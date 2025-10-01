export default function ToolCard({ title, desc, children, id }) {
  return (
    <div
      id={id}
      className="bg-gray-900 text-gray-200 shadow-lg rounded-2xl p-6 hover:scale-105 transition"
    >
      <h3 className="text-xl font-bold mb-2 text-green-400">{title}</h3>
      <p className="text-gray-400 mb-4">{desc}</p>
      <div className="bg-gray-800 p-4 rounded-xl">{children}</div>
    </div>
  );
}

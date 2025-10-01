export default function Hero() {
  return (
    <section className="bg-[#bbdefb] text-black  py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-cyan"
       style={{ textShadow: "2px 2px 4px grey, -2px -2px 4px rgba(255, 255, 255, 0.6)" }} 
      >
        Convert Anything to Anything 
      </h1>
      <p className="max-w-2xl mx-auto text-lg mb-8">
        Video to Text, Image to Text, Text to Speech & Speech to Text —
        all in one smart AI platform.
      </p>
      <a
        href="#features"
        className="bg-white text-green-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Explore Tools
      </a>
    </section>
  );
}

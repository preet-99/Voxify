import React from "react";

export default function HowItWorks() {
  const steps = [
    { num: "1", title: "Upload File", desc: "Upload video, image, or audio file.", icon: "/src/assets/upload.gif" }, 
    { num: "2", title: "AI Processing", desc: "Our AI converts your content instantly.", icon: "/src/assets/ai_icon_48.gif" }, 
    { num: "3", title: "Get Results", desc: "Download or copy your text/audio output.", icon: "/src/assets/exam-results.png" }, // 
  ];

  return (
    <section className="py-20 px-6 bg-[#bbdefb]">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 bg-white p-6 rounded-xl shadow-md text-center text-gray-800 hover:shadow-2xl transition">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-green font-bold mb-4">
              <img src={s.icon} alt={s.title} className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-accent">{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
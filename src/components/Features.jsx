import { useState } from "react";
import FeatureCard from "./FeatureCard";
import ToolInputPanel from "./ToolInputPanel";
import { Video, Image, Mic, Type, SquareSplitHorizontal , FileAudio} from "lucide-react";

export default function Features() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <section id="features" className="py-20 px-6 bg-[#bbdefb]">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
        Our Smart AI Tools
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <FeatureCard
          id="videoTotext"
          title="Video to Text"
          desc="Extract speech & subtitles from videos instantly."
          icon={<Video />}
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="audioTotext"
          title="Audio to Text"
          desc="Extract speech from audio instantly."
          icon={<Video />}
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="trim"
          title="Trim Video"
          desc="Trim your favourite part as you want."
          icon={< SquareSplitHorizontal />}
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="audio"
          title="Video to Audio"
          desc="Convert video file into audio in seconds."
          icon={< FileAudio />}
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="textspeech"
          title="Text to Speech"
          desc="Turn written text into natural-sounding speech."
          icon={<Type />}
          onClick={setSelectedTool}
        />

        <FeatureCard
          id="imagetextspeech"
          title="Image Text to Speech"
          desc="Turn Image text into natural-sounding speech."
          icon={<Type />}
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="textfiletospeech"
          title="Text File to Speech"
          desc="Turn text file into natural-sounding speech."
          icon={<Type />}
          onClick={setSelectedTool}
        />
      </div>

      {/* Render input panel for selected tool */}
      <div className="max-w-4xl mx-auto mt-12">
        <ToolInputPanel selectedTool={selectedTool} />
      </div>
    </section>
  );
}

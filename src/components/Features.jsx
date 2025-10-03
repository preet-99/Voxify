import { useState } from "react";
import FeatureCard from "./FeatureCard";
import ToolInputPanel from "./ToolInputPanel";
import {
  Video,
  Image,
  Mic,
  Type,
  SquareSplitHorizontal,
  FileAudio,
  AudioLines,
  FileText,
} from "lucide-react";

export default function Features() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <section id="features" className="py-20 px-6 bg-[#bbdefb]">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">
        Our Smart AI Tools
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <FeatureCard
          id="videoTotext"
          title="Video to Text"
          desc="Extract speech & subtitles from videos instantly."
          icon={
            <img
              src="/src/assets/live_video_on_100.gif"
              alt="Video to Text GIF"
              className="w-8 h-8"
            />
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="audioTotext"
          title="Audio to Text"
          desc="Extract speech from audio instantly."
          icon={
            <img
              src="/src/assets/audio_wave_48.gif"
              alt="Audio to Text GIF"
              className="w-8 h-8"
            />
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="trim"
          title="Trim Video"
          desc="Trim your favourite part as you want."
          icon={
            <SquareSplitHorizontal/>
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="audio"
          title="Video to Audio"
          desc="Convert video file into audio in seconds."
          icon={
            <img
              src="/src/assets/music_file.gif"
              alt="Video to Audio GIF"
              className="w-9 h-9"
            />
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="textspeech"
          title="Text to Speech"
          desc="Turn written text into natural-sounding speech."
          icon={
            <Type/>
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />

        <FeatureCard
          id="imagetextspeech"
          title="Image Text to Speech"
          desc="Turn Image text into natural-sounding speech."
          icon={
            <img
              src="/src/assets/image_icon_48.gif"
              alt="Image Text to Speech GIF"
              className="w-9 h-9"
            />
          } // Replace with your GIF path or URL
          onClick={setSelectedTool}
        />
        <FeatureCard
          id="textfiletospeech"
          title="Text File to Speech"
          desc="Turn text file into natural-sounding speech."
          icon={
            <img
              src="/src/assets/text_file_100.gif"
              alt="Text File to Speech GIF"
              className="w-9 h-9"
            />
          } // Replace with your GIF path or URL
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

import { useEffect, useState } from "react";

export default function ToolInputPanel({ selectedTool }) {
  const [ttsAudioURL, setTtsAudioURL] = useState(null);
  const [imgTtsAudioURL, setImgTtsAudioURL] = useState(null);
  const [textFileTtsAudioURL, setTextFileTtsAudioURL] = useState(null);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [extractedAudioURL, setExtractedAudioURL] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [trimmedVideoURL, setTrimmedVideoURL] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [trimStart, setTrimStart] = useState("");
  const [trimEnd, setTrimEnd] = useState("");
  const [videoDuration, setVideoDuration] = useState(null);

  // Fetch home endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/");
        const data = await response.json();
        setMsg(data);
        console.log("Home endpoint response:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMsg({ error: "Failed to fetch data" });
      }
    };
    fetchData();
  }, []);

  // Cleanup Blob URLs on component unmount
  useEffect(() => {
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (extractedAudioURL) URL.revokeObjectURL(extractedAudioURL);
      if (downloadLink) URL.revokeObjectURL(downloadLink);
      if (ttsAudioURL) URL.revokeObjectURL(ttsAudioURL);
      if (imgTtsAudioURL) URL.revokeObjectURL(imgTtsAudioURL);
      if (trimmedVideoURL) URL.revokeObjectURL(trimmedVideoURL);
      if (textFileTtsAudioURL) URL.revokeObjectURL(textFileTtsAudioURL);
    };
  }, [
    videoURL,
    audioURL,
    extractedAudioURL,
    downloadLink,
    ttsAudioURL,
    imgTtsAudioURL,
    trimmedVideoURL,
    textFileTtsAudioURL,
  ]);

  // Handle file selection with validation and duration check
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(null);
    setTranscribedText("");
    setExtractedAudioURL(null);
    setImgTtsAudioURL(null);
    setTextFileTtsAudioURL(null);
    setTrimmedVideoURL(null);
    setExtractedText("");
    setDownloadLink(null);
    setVideoDuration(null);

    if (file) {
      if (
        (selectedTool === "imagetextspeech" &&
          !file.type.startsWith("image/")) ||
        (["videoTotext", "audio", "trim"].includes(selectedTool) &&
          !file.type.startsWith("video/")) ||
        (selectedTool === "audioTotext" && !file.type.startsWith("audio/")) ||
        (["textfiletotext", "textfiletospeech"].includes(selectedTool) &&
          !file.name.endsWith(".txt"))
      ) {
        setError("Please select a valid file type.");
        setSelectedFile(null);
        return;
      }

      // Check video duration for trim tool
      if (selectedTool === "trim") {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          setVideoDuration(video.duration);
          if (trimEnd && Number(trimEnd) > video.duration) {
            setError(
              `End time (${trimEnd}s) exceeds video duration (${video.duration.toFixed(
                1
              )}s).`
            );
            setTrimEnd("");
          }
        };
        video.src = URL.createObjectURL(file);
      }

      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  // Reset file input
  const resetFileInput = () => {
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = "";
  };

  // Audio to text
  const handleAudioToText = async () => {
    if (!selectedFile) {
      setError("Please select an audio file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const audioUrl = URL.createObjectURL(selectedFile);
    setAudioURL(audioUrl);

    const formData = new FormData();
    formData.append("audio", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/audio_to_text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to transcribe from audio: ${response.statusText}`
        );
      }
      const data = await response.json();
      setTranscribedText(data.text || "No transcription received.");
      resetFileInput();
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError("Error transcribing audio.");
      setTranscribedText("");
    } finally {
      setIsLoading(false);
    }
  };

  // Video to text
  const handleVideoToText = async () => {
    if (!selectedFile) {
      setError("Please select a video file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const videoUrl = URL.createObjectURL(selectedFile);
    setVideoURL(videoUrl);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/video_to_text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to convert video to text: ${response.statusText}`
        );
      }

      const data = await response.json();
      setTranscribedText(data.text || "No transcription received.");
      resetFileInput();
    } catch (error) {
      console.error("Error transcribing video:", error);
      setError("Error transcribing video.");
      setTranscribedText("");
    } finally {
      setIsLoading(false);
    }
  };

  // Video to Audio
  const handleVideoToAudio = async () => {
    if (!selectedFile) {
      setError("Please select a video file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const videoUrl = URL.createObjectURL(selectedFile);
    setVideoURL(videoUrl);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/video_to_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to convert video to audio: ${response.statusText}`
        );
      }

      const audioBlob = await response.blob();
      if (audioBlob.size === 0 || !audioBlob.type.includes("audio")) {
        throw new Error("Invalid audio Blob received");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      setExtractedAudioURL(audioUrl);
      setDownloadLink(audioUrl);
      resetFileInput();
    } catch (error) {
      console.error("Error converting video to audio:", error);
      setError(`Error converting video to audio: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Image text to speech
  const handleImgTts = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/image_to_speech", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to transcribe text from image: ${response.statusText}`
        );
      }

      const audioBlob = await response.blob();
      if (audioBlob.size === 0 || !audioBlob.type.includes("audio")) {
        throw new Error("Invalid audio Blob received");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      setImgTtsAudioURL(audioUrl);
      setDownloadLink(audioUrl);
      resetFileInput();
    } catch (error) {
      console.error("Error converting image text to audio:", error);
      setError(`Error converting image text to audio: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Text to Speech
  const handleTts = async () => {
    if (!text) {
      setError("Please enter text.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate speech: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      if (audioBlob.size === 0 || !audioBlob.type.includes("audio")) {
        throw new Error("Invalid audio Blob received");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      setTtsAudioURL(audioUrl);
      setDownloadLink(audioUrl);
    } catch (error) {
      console.error("Error generating speech:", error);
      setError(`Error generating speech: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Trim Video
  const handleTrimVideo = async () => {
    if (!selectedFile) {
      setError("Please select a video file.");
      return;
    }
    const start = parseFloat(trimStart);
    const end = parseFloat(trimEnd);

    if (isNaN(start) || isNaN(end) || start < 0 || end <= start) {
      setError(
        "Please enter valid start and end times (end time must be greater than start time)."
      );
      return;
    }
    if (videoDuration && end > videoDuration) {
      setError(
        `End time (${end}s) exceeds video duration (${videoDuration.toFixed(
          1
        )}s).`
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("start_time", start.toString());
    formData.append("end_time", end.toString());

    try {
      const response = await fetch("http://localhost:5000/trim_video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to trim video: ${errorText || response.statusText}`);
      }

      const videoBlob = await response.blob();
      if (videoBlob.size === 0 || !videoBlob.type.includes("video")) {
        throw new Error("Invalid video Blob received");
      }

      const videoUrl = URL.createObjectURL(videoBlob);
      setTrimmedVideoURL(videoUrl);
      setDownloadLink(videoUrl);
      resetFileInput();
    } catch (error) {
      console.error("Error trimming video:", error);
      setError(`Error trimming video: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Text File to Speech
  const handleTextFileToSpeech = async () => {
    if (!selectedFile) {
      setError("Please select a text file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("text_file", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:5000/text_file_to_speech",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to convert text file to speech: ${response.statusText}`
        );
      }

      const audioBlob = await response.blob();
      if (audioBlob.size === 0 || !audioBlob.type.includes("audio")) {
        throw new Error("Invalid audio Blob received");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      setTextFileTtsAudioURL(audioUrl);
      setDownloadLink(audioUrl);
      resetFileInput();
    } catch (error) {
      console.error("Error converting text file to speech:", error);
      setError(`Error converting text file to speech: ${error.message}`);
      setTextFileTtsAudioURL(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Render based on selected tool
  return (
    <>
      <style>
        {`
          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}
      </style>
      {(() => {
        switch (selectedTool) {
          case "videoTotext":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Video to Text
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose video file</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <video
                    src={URL.createObjectURL(selectedFile)}
                    controls
                    className="mt-2 w-64 h-36 object-cover rounded-md mb-4"
                  />
                )}
                <button
                  onClick={handleVideoToText}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Extract Text
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {transcribedText && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium text-gray-700">Transcribed Text:</h3>
                    <p className="bg-gray-100 p-3 rounded-md">{transcribedText}</p>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(transcribedText)
                      }
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Copy Text
                    </button>
                  </div>
                )}
              </div>
            );
          case "audioTotext":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Audio to Text
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose audio file</span>
                  <input
                    type="file"
                    accept="audio/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  onClick={handleAudioToText}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Extract Text
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {transcribedText && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium text-gray-700">Transcribed Text:</h3>
                    <p className="bg-gray-100 p-3 rounded-md">{transcribedText}</p>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(transcribedText)
                      }
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Copy Text
                    </button>
                  </div>
                )}
              </div>
            );
          case "trim":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Trim Video
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose video file</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <video
                    src={URL.createObjectURL(selectedFile)}
                    controls
                    className="mt-2 w-64 h-36 object-cover rounded-md mb-4"
                  />
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={trimStart}
                    onChange={(e) => setTrimStart(e.target.value)}
                    className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 10.5"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={trimEnd}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTrimEnd(value);
                      if (videoDuration && Number(value) > videoDuration) {
                        setError(
                          `End time (${value}s) exceeds video duration (${videoDuration.toFixed(
                            1
                          )}s).`
                        );
                        setTrimEnd("");
                      }
                    }}
                    className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 20.5"
                  />
                </div>
                <button
                  onClick={handleTrimVideo}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Trim Video
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {trimmedVideoURL && (
                  <>
                    <h3 className="mt-4 text-md font-medium text-gray-700">Trimmed Video:</h3>
                    <video
                      src={trimmedVideoURL}
                      controls
                      className="mt-2 w-64 h-36 object-cover rounded-md"
                    />
                    <br />
                    <a href={downloadLink} download="trimmed_video.mp4">
                      <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mt-4">
                        Download Trimmed Video
                      </button>
                    </a>
                  </>
                )}
              </div>
            );
          case "audio":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Video to Audio
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose video file</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <video
                    src={URL.createObjectURL(selectedFile)}
                    controls
                    className="mt-2 w-64 h-36 object-cover rounded-md mb-4"
                  />
                )}
                <button
                  onClick={handleVideoToAudio}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Convert
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {extractedAudioURL && (
                  <>
                    <h3 className="mt-4 text-md font-medium text-gray-700">Extracted Audio:</h3>
                    <audio src={extractedAudioURL} controls className="w-full" />
                    <br />
                    <a href={downloadLink} download="extracted_audio.mp3">
                      <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mt-4">
                        Download Audio
                      </button>
                    </a>
                  </>
                )}
              </div>
            );
          case "textspeech":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Text to Speech
                </h3>
                <textarea
                  rows="4"
                  className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  placeholder="Enter text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  onClick={handleTts}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Convert to Audio
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {ttsAudioURL && (
                  <>
                    <div className="mt-4">
                      <h3 className="text-md font-medium text-gray-700">Generated Audio:</h3>
                      <audio controls src={ttsAudioURL} className="w-full"></audio>
                    </div>
                    <a href={ttsAudioURL} download="generated_speech.mp3">
                      <button className="bg-green-700 text-white px-4 py-2 mt-3 rounded hover:bg-green-800">
                        Download Audio
                      </button>
                    </a>
                  </>
                )}
              </div>
            );
          case "imagetextspeech":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Image Text to Speech
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose image file</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  onClick={handleImgTts}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Convert to Audio
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {imgTtsAudioURL && (
                  <>
                    <div className="mt-4">
                      <h3 className="text-md font-medium text-gray-700">Generated Audio:</h3>
                      <audio controls src={imgTtsAudioURL} className="w-full"></audio>
                    </div>
                    <a href={imgTtsAudioURL} download="generated_speech.mp3">
                      <button className="bg-green-700 text-white px-4 py-2 mt-3 rounded hover:bg-green-800">
                        Download Audio
                      </button>
                    </a>
                  </>
                )}
              </div>
            );
          case "textfiletospeech":
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Text File to Speech
                </h3>
                <label className="block mb-4">
                  <span className="sr-only">Choose text file</span>
                  <input
                    type="file"
                    accept=".txt"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  onClick={handleTextFileToSpeech}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={isLoading}
                >
                  Convert to audio
                </button>
                {isLoading && (
                  <p className="text-blue-600 mt-2">Processing...</p>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {textFileTtsAudioURL && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Generated Audio:
                    </h4>
                    <audio
                      controls
                      src={textFileTtsAudioURL}
                      className="w-full mt-2"
                    />
                    <a href={downloadLink} download="generated_speech.mp3">
                      <button className="bg-green-700 text-white px-4 py-2 mt-3 rounded hover:bg-green-800 transition-colors">
                        Download Audio
                      </button>
                    </a>
                  </div>
                )}
              </div>
            );

          default:
            return (
              <div className="bg-white p-6 rounded-lg shadow-md mt-10">
                <p className="text-gray-600">
                  Please select a tool to proceed.
                </p>
              </div>
            );
        }
      })()}
    </>
  );
}
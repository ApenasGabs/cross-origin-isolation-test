import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useState } from "react";

const ffmpeg = createFFmpeg({ log: true });

interface UseVideoCompressorProps {
  cancelCompression: () => void;
  compressVideo: (videoFile: File) => Promise<File | null>;
  isLoading: boolean;
  progress: number;
}

const useVideoCompressor = (): UseVideoCompressorProps => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const compressVideo = async (videoFile: File): Promise<File | null> => {
    setIsLoading(true);
    setProgress(0);

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS("writeFile", videoFile.name, await fetchFile(videoFile));

    ffmpeg.setProgress(({ ratio }) => {
      setProgress(ratio * 100);
    });

    try {
      await ffmpeg.run(
        "-i",
        videoFile.name,
        "-vcodec",
        "libx264",
        "-crf",
        "28",
        "compressed.mp4"
      );
    } catch (error) {
      setIsLoading(false);
      return null;
    }

    const data = ffmpeg.FS("readFile", "compressed.mp4");
    const compressedFile = new Blob([data.buffer], { type: "video/mp4" });

    setIsLoading(false);
    return new File([compressedFile], "compressed.mp4", { type: "video/mp4" });
  };

  const cancelCompression = () => {
    if (ffmpeg.isLoaded()) {
      ffmpeg.exit();
    }
  };

  return { compressVideo, cancelCompression, isLoading, progress };
};

export default useVideoCompressor;

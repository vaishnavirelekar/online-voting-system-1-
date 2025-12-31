import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Camera, CheckCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface FaceCaptureProps {
  onCapture: (faceImage: string) => void;
  label?: string;
}

export function FaceCapture({ onCapture, label = "Capture Your Face" }: FaceCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      toast.success("Face captured successfully!");
    } else {
      toast.error("Failed to capture image. Please try again.");
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = () => {
    if (imgSrc) {
      onCapture(imgSrc);
      toast.success("Face photo confirmed!");
    }
  };

  const handleUserMedia = () => {
    setIsCameraReady(true);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-2">{label}</h3>
        <p className="text-sm text-gray-600">
          Position your face in the center of the frame
        </p>
      </div>

      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {!imgSrc ? (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              className="w-full h-full object-cover"
            />
            {/* Face guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-4 border-blue-500 rounded-full opacity-50"></div>
            </div>
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <Camera className="size-12 mx-auto mb-2 text-gray-400 animate-pulse" />
                  <p className="text-gray-600">Loading camera...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <img src={imgSrc} alt="Captured face" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex gap-3">
        {!imgSrc ? (
          <Button
            onClick={capture}
            disabled={!isCameraReady}
            className="w-full"
            size="lg"
          >
            <Camera className="size-4 mr-2" />
            Capture Photo
          </Button>
        ) : (
          <>
            <Button
              onClick={retake}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <RotateCcw className="size-4 mr-2" />
              Retake
            </Button>
            <Button
              onClick={confirm}
              className="flex-1"
              size="lg"
            >
              <CheckCircle className="size-4 mr-2" />
              Confirm
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

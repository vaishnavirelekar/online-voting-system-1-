import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FaceVerificationProps {
  storedFaceImage: string;
  onVerificationComplete: (success: boolean, similarity: number) => void;
  label?: string;
}

export function FaceVerification({ 
  storedFaceImage, 
  onVerificationComplete,
  label = "Verify Your Identity" 
}: FaceVerificationProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    similarity: number;
  } | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const compareImages = useCallback((img1: string, img2: string): number => {
    // Simple image comparison based on pixel data
    // In production, use a proper face recognition library like face-api.js
    
    // For demo purposes, we'll simulate face matching with a random similarity score
    // In real implementation, you would:
    // 1. Extract facial features from both images
    // 2. Compare feature vectors
    // 3. Calculate similarity percentage
    
    const canvas1 = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    const image1 = new Image();
    const image2 = new Image();
    
    // Simulate processing time
    const similarity = Math.random() * 30 + 70; // 70-100% for demo
    
    return similarity;
  }, []);

  const verify = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      toast.error("Failed to capture image. Please try again.");
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const similarity = compareImages(imageSrc, storedFaceImage);
      const success = similarity >= 75; // 75% threshold for successful match
      
      setVerificationResult({ success, similarity });
      setIsVerifying(false);
      
      if (success) {
        toast.success(`Face verified! Similarity: ${similarity.toFixed(1)}%`);
        onVerificationComplete(true, similarity);
      } else {
        toast.error(`Face verification failed. Similarity: ${similarity.toFixed(1)}%`);
        onVerificationComplete(false, similarity);
      }
    }, 2000);
  }, [webcamRef, storedFaceImage, compareImages, onVerificationComplete]);

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
          Look directly at the camera for verification
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Live Camera Feed */}
        <div>
          <p className="text-sm font-medium mb-2">Live Camera</p>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
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
              <div className="w-48 h-64 border-4 border-green-500 rounded-full opacity-50"></div>
            </div>
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <Camera className="size-12 mx-auto mb-2 text-gray-400 animate-pulse" />
                  <p className="text-gray-600">Loading camera...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stored Reference Photo */}
        <div>
          <p className="text-sm font-medium mb-2">Reference Photo</p>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img 
              src={storedFaceImage} 
              alt="Reference face" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className={`p-4 rounded-lg border-2 ${
          verificationResult.success 
            ? 'bg-green-50 border-green-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          <div className="flex items-center gap-3">
            {verificationResult.success ? (
              <CheckCircle className="size-6 text-green-600" />
            ) : (
              <AlertCircle className="size-6 text-red-600" />
            )}
            <div>
              <p className={`font-semibold ${
                verificationResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {verificationResult.success ? 'Verification Successful' : 'Verification Failed'}
              </p>
              <p className="text-sm text-gray-700">
                Similarity Score: {verificationResult.similarity.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={verify}
        disabled={!isCameraReady || isVerifying}
        className="w-full"
        size="lg"
      >
        {isVerifying ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <CheckCircle className="size-4 mr-2" />
            Verify Face
          </>
        )}
      </Button>
    </div>
  );
}

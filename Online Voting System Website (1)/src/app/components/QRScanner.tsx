import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { CheckCircle, XCircle, Upload, RotateCcw, Camera } from "lucide-react";
import { toast } from "sonner";
import Webcam from "react-webcam";

interface QRScannerProps {
  onScanSuccess: (data: any) => void;
  onScanError?: (error: string) => void;
}

export function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<"upload" | "camera">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  // Simple QR code decoder using jsQR library simulation
  const decodeQRFromImage = async (imageData: string) => {
    // In production, you would use a library like jsQR
    // For demo purposes, we'll simulate QR code reading
    // by looking for JSON data in a mock way
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo: return mock data based on timing
    // In real implementation, use jsQR or similar library
    return null; // Will be replaced with actual QR decoding
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        
        // For demo purposes, we'll use a simple simulation
        // In production, use jsQR library to decode the QR code
        toast.info("Scanning QR code from image...");
        
        // Simulate successful scan with mock data
        // In real app, this would be the decoded QR data
        setTimeout(() => {
          try {
            // Mock successful scan
            const mockData = {
              id: "VID-2025-001234",
              name: "Mock User",
              dob: "January 1, 1990",
              reg: "January 5, 2025",
              checksum: "valid"
            };
            
            setScanResult(mockData);
            toast.success("QR Code scanned successfully!");
            onScanSuccess(mockData);
            setError(null);
          } catch (err) {
            const errorMsg = "Invalid QR code format";
            setError(errorMsg);
            toast.error(errorMsg);
            if (onScanError) {
              onScanError(errorMsg);
            }
          }
        }, 1000);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      const errorMsg = "Failed to read image file";
      setError(errorMsg);
      toast.error(errorMsg);
      if (onScanError) {
        onScanError(errorMsg);
      }
    }
  };

  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      toast.info("Scanning QR code from camera...");
      
      // Simulate QR code detection
      setTimeout(() => {
        const mockData = {
          id: "VID-2025-001234",
          name: "Camera Scan User",
          dob: "March 15, 1990",
          reg: "January 7, 2025",
          checksum: "valid"
        };
        
        setScanResult(mockData);
        toast.success("QR Code scanned successfully!");
        onScanSuccess(mockData);
        setError(null);
      }, 1000);
    }
  };

  const reset = () => {
    setScanResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-2">Scan Voter ID QR Code</h3>
        <p className="text-sm text-gray-600">
          Upload an image or use your camera to scan a QR code
        </p>
      </div>

      {!scanResult && !error && (
        <div className="flex gap-2 mb-4">
          <Button
            variant={scanMode === "upload" ? "default" : "outline"}
            onClick={() => setScanMode("upload")}
            className="flex-1"
          >
            <Upload className="size-4 mr-2" />
            Upload Image
          </Button>
          <Button
            variant={scanMode === "camera" ? "default" : "outline"}
            onClick={() => setScanMode("camera")}
            className="flex-1"
          >
            <Camera className="size-4 mr-2" />
            Use Camera
          </Button>
        </div>
      )}

      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {!scanResult && !error ? (
          scanMode === "upload" ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="qr-upload"
              />
              <label
                htmlFor="qr-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="size-16 mb-4 text-gray-400" />
                <p className="text-gray-600 font-medium mb-2">
                  Click to upload QR code image
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WebP
                </p>
              </label>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Take a screenshot of any voter ID card QR code from the "Voter IDs" tab
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button onClick={handleCameraCapture} size="lg">
                  <Camera className="size-4 mr-2" />
                  Capture & Scan
                </Button>
              </div>
            </div>
          )
        ) : scanResult ? (
          <div className="h-full flex items-center justify-center bg-green-50">
            <div className="text-center p-6">
              <CheckCircle className="size-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                QR Code Verified
              </h3>
              <div className="text-left bg-white p-4 rounded-lg shadow-sm space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Voter ID:</span> {scanResult.id}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {scanResult.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">DOB:</span> {scanResult.dob}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Registered:</span> {scanResult.reg}
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center bg-red-50">
            <div className="text-center p-6">
              <XCircle className="size-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Scan Failed
              </h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        ) : null}
      </div>

      {(scanResult || error) && (
        <Button onClick={reset} className="w-full" variant="outline">
          <RotateCcw className="size-4 mr-2" />
          Scan Another QR Code
        </Button>
      )}

      {!scanResult && !error && scanMode === "upload" && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Note: This is a demo. In production, actual QR code decoding would be performed using libraries like jsQR.
          </p>
        </div>
      )}
    </div>
  );
}

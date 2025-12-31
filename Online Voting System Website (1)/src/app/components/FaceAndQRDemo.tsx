import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { FaceCapture } from "./FaceCapture";
import { FaceVerification } from "./FaceVerification";
import { QRScanner } from "./QRScanner";
import {
  VoterIDGallery,
  EXAMPLE_VOTERS,
} from "./VoterIDGallery";
import { VoterIDCard } from "./VoterIDCard";
import { toast } from "sonner";
import { Camera, ScanLine, IdCard, Users } from "lucide-react";

export function FaceAndQRDemo() {
  const [capturedFace, setCapturedFace] = useState<
    string | null
  >(null);
  const [selectedVoter, setSelectedVoter] = useState(
    EXAMPLE_VOTERS[0],
  );

  const handleFaceCapture = (faceImage: string) => {
    setCapturedFace(faceImage);
    toast.success(
      "Face captured successfully! You can now test face verification.",
    );
  };

  const handleVerificationComplete = (
    success: boolean,
    similarity: number,
  ) => {
    if (success) {
      toast.success(
        `Verification successful! Match: ${similarity.toFixed(1)}%`,
      );
    } else {
      toast.error(
        `Verification failed. Match: ${similarity.toFixed(1)}%`,
      );
    }
  };

  const handleQRScan = (data: any) => {
    toast.success(`Voter ID verified: ${data.name}`);
    // Find matching voter
    const voter = EXAMPLE_VOTERS.find(
      (v) => v.voterId === data.id,
    );
    if (voter) {
      setSelectedVoter(voter);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl mb-4">
            Face Recognition & Voter ID System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete voter verification system with facial
            recognition, QR code scanning, and digital voter ID
            cards with encrypted data
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="face-capture" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="face-capture">
              <Camera className="size-4 mr-2" />
              Face Capture
            </TabsTrigger>
            <TabsTrigger value="face-verify">
              <Camera className="size-4 mr-2" />
              Face Verify
            </TabsTrigger>
            <TabsTrigger value="qr-scan">
              <ScanLine className="size-4 mr-2" />
              QR Scanner
            </TabsTrigger>
            <TabsTrigger value="voter-ids">
              <IdCard className="size-4 mr-2" />
              Voter IDs
            </TabsTrigger>
          </TabsList>

          {/* Face Capture Tab */}
          <TabsContent value="face-capture" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="size-6 text-blue-600" />
                  Face Capture for Registration
                </CardTitle>
                <CardDescription>
                  Capture your face to register as a voter. This
                  photo will be used for identity verification
                  during login.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FaceCapture onCapture={handleFaceCapture} />

                {capturedFace && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold mb-2">
                      ✓ Face captured successfully!
                    </p>
                    <p className="text-sm text-green-700">
                      You can now switch to the "Face Verify"
                      tab to test face verification.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Face Verification Tab */}
          <TabsContent value="face-verify" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="size-6 text-blue-600" />
                  Face Verification for Login
                </CardTitle>
                <CardDescription>
                  Verify your identity by comparing your live
                  face with the registered photo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {capturedFace ? (
                  <FaceVerification
                    storedFaceImage={capturedFace}
                    onVerificationComplete={
                      handleVerificationComplete
                    }
                  />
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Camera className="size-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold text-gray-700 mb-2">
                      No Face Photo Captured
                    </h3>
                    <p className="text-gray-600">
                      Please capture your face in the "Face
                      Capture" tab first before testing
                      verification.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Scanner Tab */}
          <TabsContent value="qr-scan" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ScanLine className="size-6 text-blue-600" />
                    QR Code Scanner
                  </CardTitle>
                  <CardDescription>
                    Scan a voter ID card's QR code to verify
                    voter identity and retrieve their
                    information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QRScanner onScanSuccess={handleQRScan} />
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> To test the scanner,
                      scan the QR code from any of the voter ID
                      cards in the "Voter IDs" tab.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected Voter Card</CardTitle>
                  <CardDescription>
                    The voter ID card for scanning or viewing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VoterIDCard
                    voter={selectedVoter}
                    showDownload={false}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Voter IDs Tab */}
          <TabsContent value="voter-ids" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-6 text-blue-600" />
                  10 Example Voter ID Cards
                </CardTitle>
                <CardDescription>
                  Each card contains encrypted voter data in a
                  QR code that can be scanned for verification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoterIDGallery />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feature Explanation */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle>🔐 Security Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded">
                <Camera className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  Face Recognition
                </h4>
                <p className="text-sm text-blue-50">
                  Biometric authentication ensures only the
                  registered voter can access their account and
                  cast votes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded">
                <ScanLine className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  QR Code Verification
                </h4>
                <p className="text-sm text-blue-50">
                  Each voter ID contains encrypted data in a QR
                  code that can be scanned to verify
                  authenticity and prevent fraud.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded">
                <IdCard className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  Digital Voter ID Cards
                </h4>
                <p className="text-sm text-blue-50">
                  Official digital ID cards with photo, personal
                  details, and scannable QR codes for instant
                  verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
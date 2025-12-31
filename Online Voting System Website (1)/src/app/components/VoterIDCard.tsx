import { QRCodeSVG } from "qrcode.react";
import { Shield, CheckCircle } from "lucide-react";

export interface VoterData {
  voterId: string;
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  registrationDate: string;
  photo: string;
  constituency: string;
  pollingStation: string;
}

interface VoterIDCardProps {
  voter: VoterData;
  showDownload?: boolean;
}

export function VoterIDCard({ voter, showDownload = true }: VoterIDCardProps) {
  // Encode voter data into QR code
  const qrData = JSON.stringify({
    id: voter.voterId,
    name: voter.name,
    dob: voter.dateOfBirth,
    reg: voter.registrationDate,
    checksum: btoa(voter.voterId + voter.email) // Simple checksum for verification
  });

  const downloadCard = () => {
    // In production, use html2canvas or similar to download as image
    const element = document.getElementById(`voter-card-${voter.voterId}`);
    if (element) {
      // Simple download simulation
      const dataUrl = element.innerHTML;
      const link = document.createElement('a');
      link.download = `voter-id-${voter.voterId}.html`;
      link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(dataUrl);
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <div
        id={`voter-card-${voter.voterId}`}
        className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm px-6 py-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="size-8" />
              <div>
                <h2 className="text-xl font-bold">VOTER IDENTIFICATION CARD</h2>
                <p className="text-sm opacity-90">ElectionHub Digital Platform</p>
              </div>
            </div>
            <CheckCircle className="size-8 text-green-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Left: Photo and QR */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border-4 border-white/30">
              <img 
                src={voter.photo} 
                alt={voter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white p-3 rounded-lg">
              <QRCodeSVG
                value={qrData}
                size={160}
                level="H"
                className="w-full h-auto"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm opacity-75">Voter ID</p>
                <p className="text-2xl font-bold tracking-wider">{voter.voterId}</p>
              </div>
              
              <div className="border-t border-white/20 pt-3">
                <p className="text-sm opacity-75">Full Name</p>
                <p className="text-xl font-semibold">{voter.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75">Date of Birth</p>
                  <p className="font-medium">{voter.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Registration Date</p>
                  <p className="font-medium">{voter.registrationDate}</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-3">
                <p className="text-sm opacity-75">Email</p>
                <p className="font-medium">{voter.email}</p>
              </div>

              <div>
                <p className="text-sm opacity-75">Address</p>
                <p className="font-medium">{voter.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75">Constituency</p>
                  <p className="font-medium">{voter.constituency}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Polling Station</p>
                  <p className="font-medium">{voter.pollingStation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 border-t border-white/20">
          <p className="text-xs text-center opacity-75">
            This is an official digital voter identification card. Keep it secure and present during voting.
          </p>
        </div>
      </div>

      {showDownload && (
        <div className="text-center">
          <button
            onClick={downloadCard}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Download Voter ID Card
          </button>
        </div>
      )}
    </div>
  );
}

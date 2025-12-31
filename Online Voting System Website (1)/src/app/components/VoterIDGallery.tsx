import { VoterIDCard, VoterData } from "./VoterIDCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users } from "lucide-react";

// 10 Example Voter ID Cards with Mock Data
export const EXAMPLE_VOTERS: VoterData[] = [
  {
    voterId: "VID-2025-001234",
    name: "Sarah Anderson",
    email: "sarah.anderson@email.com",
    dateOfBirth: "March 15, 1990",
    address: "123 Oak Street, Springfield, State 12345",
    registrationDate: "January 5, 2025",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    constituency: "District 5 - North",
    pollingStation: "Community Center A"
  },
  {
    voterId: "VID-2025-001235",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    dateOfBirth: "July 22, 1985",
    address: "456 Maple Avenue, Riverside, State 12346",
    registrationDate: "January 7, 2025",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    constituency: "District 3 - Central",
    pollingStation: "Public Library B"
  },
  {
    voterId: "VID-2025-001236",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    dateOfBirth: "November 8, 1992",
    address: "789 Pine Road, Lakewood, State 12347",
    registrationDate: "January 10, 2025",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    constituency: "District 7 - West",
    pollingStation: "Elementary School C"
  },
  {
    voterId: "VID-2025-001237",
    name: "James Wilson",
    email: "james.wilson@email.com",
    dateOfBirth: "April 30, 1988",
    address: "321 Elm Street, Brookside, State 12348",
    registrationDate: "January 12, 2025",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    constituency: "District 2 - South",
    pollingStation: "Town Hall D"
  },
  {
    voterId: "VID-2025-001238",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    dateOfBirth: "September 14, 1995",
    address: "654 Cedar Lane, Hillcrest, State 12349",
    registrationDate: "January 15, 2025",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    constituency: "District 4 - East",
    pollingStation: "Recreation Center E"
  },
  {
    voterId: "VID-2025-001239",
    name: "David Thompson",
    email: "david.thompson@email.com",
    dateOfBirth: "February 19, 1987",
    address: "987 Birch Avenue, Sunnyside, State 12350",
    registrationDate: "January 18, 2025",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    constituency: "District 1 - Downtown",
    pollingStation: "City Hall F"
  },
  {
    voterId: "VID-2025-001240",
    name: "Lisa Martinez",
    email: "lisa.martinez@email.com",
    dateOfBirth: "June 25, 1991",
    address: "147 Willow Drive, Greenfield, State 12351",
    registrationDate: "January 20, 2025",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    constituency: "District 6 - Northwest",
    pollingStation: "High School G"
  },
  {
    voterId: "VID-2025-001241",
    name: "Robert Kim",
    email: "robert.kim@email.com",
    dateOfBirth: "December 3, 1989",
    address: "258 Spruce Street, Fairview, State 12352",
    registrationDate: "January 22, 2025",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    constituency: "District 8 - Southeast",
    pollingStation: "Community Hall H"
  },
  {
    voterId: "VID-2025-001242",
    name: "Amanda Johnson",
    email: "amanda.johnson@email.com",
    dateOfBirth: "August 17, 1993",
    address: "369 Ash Boulevard, Westwood, State 12353",
    registrationDate: "January 25, 2025",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    constituency: "District 9 - Southwest",
    pollingStation: "Civic Center I"
  },
  {
    voterId: "VID-2025-001243",
    name: "Carlos Hernandez",
    email: "carlos.hernandez@email.com",
    dateOfBirth: "May 28, 1986",
    address: "741 Poplar Court, Eastside, State 12354",
    registrationDate: "January 28, 2025",
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    constituency: "District 10 - Northeast",
    pollingStation: "Fire Station J"
  }
];

export function VoterIDGallery() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="size-6 text-blue-600" />
            <CardTitle>Example Voter ID Cards</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Below are 10 example voter ID cards with QR codes containing encrypted voter data.
            Each card includes a photo, personal details, and a scannable QR code for verification.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {EXAMPLE_VOTERS.map((voter, index) => (
            <div key={voter.voterId} className="border-b pb-8 last:border-b-0 last:pb-0">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500">
                  Example {index + 1} of {EXAMPLE_VOTERS.length}
                </span>
              </div>
              <VoterIDCard voter={voter} showDownload={false} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

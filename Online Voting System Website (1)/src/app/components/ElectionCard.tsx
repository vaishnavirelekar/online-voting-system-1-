import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Users, Clock, Edit, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Candidate {
  id: string;
  name: string;
  party?: string;
  votes: number;
  imageUrl?: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
  startDate: string;
  endDate: string;
  totalVotes: number;
  status: "active" | "closed" | "upcoming";
  eligibleVoters: number;
}

interface ElectionCardProps {
  election: Election;
  onVote?: (electionId: string) => void;
  onViewResults?: (electionId: string) => void;
  onEdit?: (electionId: string) => void;
  onDelete?: (electionId: string) => void;
  hasVoted?: boolean;
  isAdmin?: boolean;
}

export function ElectionCard({ 
  election, 
  onVote, 
  onViewResults, 
  onEdit,
  onDelete,
  hasVoted,
  isAdmin = false 
}: ElectionCardProps) {
  const now = new Date();
  const startDate = new Date(election.startDate);
  const endDate = new Date(election.endDate);
  
  const isActive = election.status === "active" && now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const turnout = election.eligibleVoters > 0 
    ? ((election.totalVotes / election.eligibleVoters) * 100).toFixed(1) 
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle>{election.title}</CardTitle>
            <CardDescription className="mt-2">{election.description}</CardDescription>
          </div>
          <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"}>
            {isActive ? "Active" : isUpcoming ? "Upcoming" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="size-4" />
              <span>{election.totalVotes} / {election.eligibleVoters} voted ({turnout}%)</span>
            </div>
            {isActive && (
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{daysLeft} days left</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-600 mb-2">{election.candidates.length} Candidates</p>
            <div className="flex flex-wrap gap-2">
              {election.candidates.slice(0, 3).map((candidate) => (
                <Badge key={candidate.id} variant="outline">
                  {candidate.name}
                </Badge>
              ))}
              {election.candidates.length > 3 && (
                <Badge variant="outline">+{election.candidates.length - 3} more</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {isAdmin ? (
          <>
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={() => onViewResults?.(election.id)}
            >
              View Results
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onEdit?.(election.id)}
            >
              <Edit className="size-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onDelete?.(election.id)}
            >
              <Trash2 className="size-4 text-red-600" />
            </Button>
          </>
        ) : (
          <>
            {isActive && !hasVoted ? (
              <Button className="flex-1" onClick={() => onVote?.(election.id)}>
                Cast Your Vote
              </Button>
            ) : (
              <Button 
                className="flex-1" 
                variant="outline" 
                onClick={() => onViewResults?.(election.id)}
              >
                {hasVoted ? "View Your Vote" : "View Results"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

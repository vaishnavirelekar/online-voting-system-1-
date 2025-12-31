import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Users, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: { id: string; text: string; votes: number }[];
  endDate: string;
  totalVotes: number;
  status: "active" | "closed";
  category: string;
}

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string) => void;
  onViewResults: (pollId: string) => void;
  hasVoted?: boolean;
}

export function PollCard({ poll, onVote, onViewResults, hasVoted }: PollCardProps) {
  const isActive = poll.status === "active" && new Date(poll.endDate) > new Date();
  const daysLeft = Math.ceil((new Date(poll.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle>{poll.title}</CardTitle>
            <CardDescription className="mt-2">{poll.description}</CardDescription>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>Ends {new Date(poll.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="size-4" />
            <span>{poll.totalVotes} votes</span>
          </div>
          {isActive && (
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{daysLeft} days left</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Badge variant="outline">{poll.category}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {isActive && !hasVoted ? (
          <Button className="flex-1" onClick={() => onVote(poll.id)}>
            Vote Now
          </Button>
        ) : (
          <Button className="flex-1" variant="outline" onClick={() => onViewResults(poll.id)}>
            {hasVoted ? "View Your Vote" : "View Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

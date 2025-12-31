import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Election } from "./ElectionCard";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ElectionResultsProps {
  election: Election | null;
  onBack: () => void;
  votedCandidateId?: string;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export function ElectionResults({ election, onBack, votedCandidateId }: ElectionResultsProps) {
  if (!election) return null;

  const sortedCandidates = [...election.candidates].sort((a, b) => b.votes - a.votes);
  const winner = sortedCandidates[0];

  const chartData = election.candidates.map((candidate) => ({
    name: candidate.name,
    votes: candidate.votes,
    percentage: election.totalVotes > 0 ? ((candidate.votes / election.totalVotes) * 100).toFixed(1) : 0,
  }));

  const turnout = election.eligibleVoters > 0 
    ? ((election.totalVotes / election.eligibleVoters) * 100).toFixed(1) 
    : 0;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Elections
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{election.title}</CardTitle>
                <CardDescription className="mt-2">{election.description}</CardDescription>
              </div>
              <Badge variant={election.status === "active" ? "default" : "secondary"}>
                {election.status === "active" ? "Active" : "Closed"}
              </Badge>
            </div>
            <div className="text-sm text-gray-600 mt-4 space-y-1">
              <div>Total Votes: {election.totalVotes} / {election.eligibleVoters}</div>
              <div>Voter Turnout: {turnout}%</div>
              <div>Period: {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}</div>
            </div>
          </CardHeader>
        </Card>

        {election.status === "closed" && winner && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-6 text-green-600" />
                Election Winner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="text-xl">{winner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">{winner.name}</h3>
                  {winner.party && <p className="text-gray-600">{winner.party}</p>}
                  <p className="text-lg text-green-600 mt-1">
                    {winner.votes} votes ({((winner.votes / election.totalVotes) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vote Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="votes"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
            <CardDescription>Complete breakdown of all candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedCandidates.map((candidate, index) => {
                const percentage = election.totalVotes > 0 ? (candidate.votes / election.totalVotes) * 100 : 0;
                const isVotedFor = votedCandidateId === candidate.id;
                
                return (
                  <div key={candidate.id} className={`p-4 border rounded-lg ${isVotedFor ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        #{index + 1}
                      </Badge>
                      <Avatar>
                        <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{candidate.name}</span>
                          {isVotedFor && (
                            <Badge variant="default" className="text-xs">Your Vote</Badge>
                          )}
                        </div>
                        {candidate.party && (
                          <span className="text-sm text-gray-600">{candidate.party}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{candidate.votes} votes</div>
                        <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

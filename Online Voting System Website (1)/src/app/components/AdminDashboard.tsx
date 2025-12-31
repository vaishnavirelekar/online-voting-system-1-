import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Users, Vote, CheckCircle, Clock } from "lucide-react";
import { Election } from "./ElectionCard";

interface AdminDashboardProps {
  elections: Election[];
  totalVoters: number;
}

export function AdminDashboard({ elections, totalVoters }: AdminDashboardProps) {
  const activeElections = elections.filter(e => e.status === "active").length;
  const totalVotes = elections.reduce((sum, e) => sum + e.totalVotes, 0);
  const closedElections = elections.filter(e => e.status === "closed").length;

  const stats = [
    {
      title: "Total Registered Voters",
      value: totalVoters,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Elections",
      value: activeElections,
      icon: Vote,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Votes Cast",
      value: totalVotes,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Completed Elections",
      value: closedElections,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Overview of all election activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Elections</CardTitle>
          <CardDescription>Latest election activities and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {elections.slice(0, 5).map((election) => (
              <div
                key={election.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{election.title}</h4>
                  <p className="text-sm text-gray-600">{election.totalVotes} votes cast</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      election.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {election.status === "active" ? "Active" : "Closed"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(election.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

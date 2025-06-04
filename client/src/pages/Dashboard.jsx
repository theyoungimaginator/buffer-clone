import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.username || 'User'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-primary">0</p> {/* Mock data */}
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platforms Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-primary">1</p> {/* Mock data */}
            <p className="text-sm text-muted-foreground">Your current plan: {user?.role || 'Free'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Post Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">No recent posts</p> {/* Mock data */}
            <p className="text-sm text-muted-foreground">Schedule your first post!</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more dashboard elements here later */}
    </div>
  );
};

export default Dashboard;
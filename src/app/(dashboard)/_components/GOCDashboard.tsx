// src/app/(dashboard)/_components/GOCDashboard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllRequests } from '@/services/request.service';
import { useUserStore } from '@/hooks/use-user-store';

export default function GOCDashboard() {
    const { user } = useUserStore();
    const [requestsData, setRequestsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAllRequests(user?.role)
            .then((data) => {
                setRequestsData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const rank = user?.rank ? user.rank + ' ' : '';
    const name = user?.name ? user.name.split(' ').pop() : 'GOC';

    return (
        <div className="max-w-5xl mx-auto py-8 space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        <span role="img" aria-label="goc" className="mr-2">⭐</span>
                        Welcome, {rank}{name}
                    </h1>
                    <p className="text-muted-foreground">General Officer Commanding Dashboard</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                        ) : (
                            <span className="text-2xl font-bold">{requestsData?.total || 0}</span>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Approved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                        ) : (
                            <span className="text-2xl font-bold text-green-600">{requestsData?.approved || 0}</span>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                        ) : (
                            <span className="text-2xl font-bold text-yellow-600">{requestsData?.pending || 0}</span>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rejected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                        ) : (
                            <span className="text-2xl font-bold text-red-600">{requestsData?.rejected || 0}</span>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
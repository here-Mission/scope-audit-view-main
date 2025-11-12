// import { useMemo } from 'react';
// import { useAuditData } from '@/hooks/useAuditData';
// import KPICard from '@/components/KPICard';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
// import { TrendingUp, AlertTriangle, Clock, CheckCircle, Users, Target, Activity, FileText } from 'lucide-react';

// const Dashboard = () => {
//   const { data: auditData, loading, error } = useAuditData();

//   // Calculate KPIs
//   const kpis = useMemo(() => {
//     const total = auditData.length;
//     const closed = auditData.filter(item => item.status === 'Closed').length;
//     const open = auditData.filter(item => item.status === 'Open').length;
//     const overdue = auditData.filter(item => item.isOverdue).length;
//     const highRisk = auditData.filter(item => 
//       item.category === 'F1 - Finding' || item.category === 'High'
//     ).length;
//     const resolutionRate = total > 0 ? Math.round((closed / total) * 100) : 0;
    
//     return {
//       total,
//       closed,
//       open,
//       overdue,
//       highRisk,
//       resolutionRate
//     };
//   }, [auditData]);

//   // Status distribution
//   const statusData = useMemo(() => {
//     const statusCounts: Record<string, number> = {};
//     auditData.forEach(item => {
//       statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
//     });
//     return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
//   }, [auditData]);

//   // Category distribution
//   const categoryData = useMemo(() => {
//     const categoryCounts: Record<string, number> = {};
//     auditData.forEach(item => {
//       categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
//     });
//     return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
//   }, [auditData]);

//   // Trend data by year
//   const trendData = useMemo(() => {
//     const yearCounts: Record<string, { year: string; total: number; closed: number; open: number }> = {};
//     auditData.forEach(item => {
//       if (!yearCounts[item.year]) {
//         yearCounts[item.year] = { year: item.year, total: 0, closed: 0, open: 0 };
//       }
//       yearCounts[item.year].total++;
//       if (item.status === 'Closed') yearCounts[item.year].closed++;
//       if (item.status === 'Open') yearCounts[item.year].open++;
//     });
//     return Object.values(yearCounts).sort((a, b) => a.year.localeCompare(b.year));
//   }, [auditData]);

//   // Department distribution
//   const departmentData = useMemo(() => {
//     const deptCounts: Record<string, number> = {};
//     auditData.forEach(item => {
//       deptCounts[item.department] = (deptCounts[item.department] || 0) + 1;
//     });
//     return Object.entries(deptCounts)
//       .map(([name, value]) => ({ name, value }))
//       .sort((a, b) => b.value - a.value)
//       .slice(0, 6);
//   }, [auditData]);

//   const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading audit data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-destructive mb-2">{error}</p>
//           <p className="text-sm text-muted-foreground">Please ensure audit-data.xlsx is in the public folder</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-foreground mb-2">Global KPI Corporate Audit Dashboard</h1>
//           <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security - Executive Overview</p>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Total Findings"
//             value={kpis.total}
//             icon={FileText}
//             variant="info"
//             trend="All audit periods"
//           />
//           <KPICard
//             title="High Risk Items"
//             value={kpis.highRisk}
//             icon={AlertTriangle}
//             variant="danger"
//             trend="Requires immediate attention"
//           />
//           <KPICard
//             title="Overdue Findings"
//             value={kpis.overdue}
//             icon={Clock}
//             variant="warning"
//             trend="Past due date"
//           />
//           <KPICard
//             title="Resolution Rate"
//             value={`${kpis.resolutionRate}%`}
//             icon={Target}
//             variant="success"
//             trend={`${kpis.closed} of ${kpis.total} closed`}
//           />
//         </div>

//         {/* Secondary KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <KPICard
//             title="Open Findings"
//             value={kpis.open}
//             icon={Activity}
//             variant="default"
//           />
//           <KPICard
//             title="Closed Findings"
//             value={kpis.closed}
//             icon={CheckCircle}
//             variant="success"
//           />
//           <KPICard
//             title="Active Departments"
//             value={new Set(auditData.map(item => item.department)).size}
//             icon={Users}
//             variant="info"
//           />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Status Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Findings by Status</CardTitle>
//               <CardDescription>Current distribution of audit findings</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={statusData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {statusData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Category Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Findings by Risk Category</CardTitle>
//               <CardDescription>Breakdown by severity levels</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={categoryData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                   <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
//                   <YAxis tick={{ fill: '#6B7280' }} />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Trend Over Years */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Findings Trend by Year</CardTitle>
//               <CardDescription>Historical overview of audit findings</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={trendData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                   <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
//                   <YAxis tick={{ fill: '#6B7280' }} />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total" />
//                   <Line type="monotone" dataKey="closed" stroke="#10B981" strokeWidth={2} name="Closed" />
//                   <Line type="monotone" dataKey="open" stroke="#EF4444" strokeWidth={2} name="Open" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Department Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Top Departments by Findings</CardTitle>
//               <CardDescription>Workload distribution across departments</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={departmentData} layout="vertical">
//                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                   <XAxis type="number" tick={{ fill: '#6B7280' }} />
//                   <YAxis type="category" dataKey="name" tick={{ fill: '#6B7280' }} width={80} />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#F59E0B" radius={[0, 8, 8, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Summary Stats */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Key Performance Indicators Summary</CardTitle>
//             <CardDescription>Comprehensive overview of audit findings performance</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <div className="text-center p-4 bg-secondary rounded-lg">
//                 <p className="text-2xl font-bold text-primary">{kpis.resolutionRate}%</p>
//                 <p className="text-sm text-muted-foreground mt-1">Resolution Rate</p>
//               </div>
//               <div className="text-center p-4 bg-secondary rounded-lg">
//                 <p className="text-2xl font-bold text-success">{kpis.closed}</p>
//                 <p className="text-sm text-muted-foreground mt-1">Resolved</p>
//               </div>
//               <div className="text-center p-4 bg-secondary rounded-lg">
//                 <p className="text-2xl font-bold text-warning">{kpis.overdue}</p>
//                 <p className="text-sm text-muted-foreground mt-1">Overdue</p>
//               </div>
//               <div className="text-center p-4 bg-secondary rounded-lg">
//                 <p className="text-2xl font-bold text-destructive">{kpis.highRisk}</p>
//                 <p className="text-sm text-muted-foreground mt-1">High Priority</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useMemo } from 'react';
import { useAuditData } from '@/hooks/useAuditData';
import KPICard from '@/components/KPICard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, CheckCircle, Users, Target, Activity, FileText, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { data: auditData, loading, error, refreshData } = useAuditData();

  // Calculate KPIs
  const kpis = useMemo(() => {
    const total = auditData.length;
    const closed = auditData.filter(item => item.status === 'Closed').length;
    const open = auditData.filter(item => item.status === 'Open').length;
    const overdue = auditData.filter(item => item.isOverdue).length;
    const highRisk = auditData.filter(item => 
      item.category === 'F1 - Finding' || item.category === 'High'
    ).length;
    const resolutionRate = total > 0 ? Math.round((closed / total) * 100) : 0;
    
    return {
      total,
      closed,
      open,
      overdue,
      highRisk,
      resolutionRate
    };
  }, [auditData]);

  // Status distribution
  const statusData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    auditData.forEach(item => {
      statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [auditData]);

  // Category distribution
  const categoryData = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    auditData.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  }, [auditData]);

  // Trend data by year
  const trendData = useMemo(() => {
    const yearCounts: Record<string, { year: string; total: number; closed: number; open: number }> = {};
    auditData.forEach(item => {
      if (!yearCounts[item.year]) {
        yearCounts[item.year] = { year: item.year, total: 0, closed: 0, open: 0 };
      }
      yearCounts[item.year].total++;
      if (item.status === 'Closed') yearCounts[item.year].closed++;
      if (item.status === 'Open') yearCounts[item.year].open++;
    });
    return Object.values(yearCounts).sort((a, b) => a.year.localeCompare(b.year));
  }, [auditData]);

  // Department distribution
  const departmentData = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    auditData.forEach(item => {
      deptCounts[item.department] = (deptCounts[item.department] || 0) + 1;
    });
    return Object.entries(deptCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [auditData]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit data from Azure Blob Storage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4 text-lg font-semibold">{error}</p>
          <p className="text-sm text-muted-foreground mb-4">Error loading from Azure Blob Storage</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        {/* Header with Refresh Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Global KPI Corporate Audit Dashboard</h1>
            <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security - Executive Overview</p>
            <p className="text-xs text-muted-foreground mt-2">Data source: Azure Blob Storage (Real-time)</p>
          </div>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center gap-2 font-medium"
            title="Refresh data from Azure Blob Storage"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Findings"
            value={kpis.total}
            icon={FileText}
            variant="info"
            trend="All audit periods"
          />
          <KPICard
            title="High Risk Items"
            value={kpis.highRisk}
            icon={AlertTriangle}
            variant="danger"
            trend="Requires immediate attention"
          />
          <KPICard
            title="Overdue Findings"
            value={kpis.overdue}
            icon={Clock}
            variant="warning"
            trend="Past due date"
          />
          <KPICard
            title="Resolution Rate"
            value={`${kpis.resolutionRate}%`}
            icon={Target}
            variant="success"
            trend={`${kpis.closed} of ${kpis.total} closed`}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Open Findings"
            value={kpis.open}
            icon={Activity}
            variant="default"
          />
          <KPICard
            title="Closed Findings"
            value={kpis.closed}
            icon={CheckCircle}
            variant="success"
          />
          <KPICard
            title="Active Departments"
            value={new Set(auditData.map(item => item.department)).size}
            icon={Users}
            variant="info"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Findings by Status</CardTitle>
              <CardDescription>Current distribution of audit findings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Findings by Risk Category</CardTitle>
              <CardDescription>Breakdown by severity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trend Over Years */}
          <Card>
            <CardHeader>
              <CardTitle>Findings Trend by Year</CardTitle>
              <CardDescription>Historical overview of audit findings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total" />
                  <Line type="monotone" dataKey="closed" stroke="#10B981" strokeWidth={2} name="Closed" />
                  <Line type="monotone" dataKey="open" stroke="#EF4444" strokeWidth={2} name="Open" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Top Departments by Findings</CardTitle>
              <CardDescription>Workload distribution across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: '#6B7280' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#6B7280' }} width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F59E0B" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators Summary</CardTitle>
            <CardDescription>Comprehensive overview of audit findings performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-primary">{kpis.resolutionRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">Resolution Rate</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-success">{kpis.closed}</p>
                <p className="text-sm text-muted-foreground mt-1">Resolved</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-warning">{kpis.overdue}</p>
                <p className="text-sm text-muted-foreground mt-1">Overdue</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-destructive">{kpis.highRisk}</p>
                <p className="text-sm text-muted-foreground mt-1">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
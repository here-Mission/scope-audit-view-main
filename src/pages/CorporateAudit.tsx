// // // import React, { useState, useMemo } from "react";
// // // import { useAuditData } from "@/hooks/useAuditData";
// // // import KPICard from "@/components/KPICard";
// // // import { BarChart3, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
// // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // // // Axis values: update these if your labels ever change in your Excel file!
// // // const impactLevels = ["1 - Slight", "2 - Moderate", "3 - Severe", "4 - Extreme"];
// // // const likelihoodLevels = ["1 - Unlikely", "2 - Likely", "3 - Very Likely", "4 - Extremely Likely"];

// // // // Highest impact (4 - Extreme) should be top, so we reverse order (for matrix)
// // // const displayedImpactLevels = impactLevels.slice().reverse();

// // // function getRiskColor(i, j) {
// // //   // i: 0 is top (Extreme), 3 is bottom (Slight); j: 0 is left (Unlikely), 3 is right (Extremely Likely)
// // //   // High: top-right; Med: diagonal; Low: bottom-left
// // //   // Manually set based on cell position if you need fine control!
// // //   if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "bg-red-500 text-white border-red-700";
// // //   if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "bg-yellow-200 text-yellow-900 border-yellow-500";
// // //   return "bg-green-200 text-green-900 border-green-500";
// // // }

// // // const BOX_STYLE = "rounded-xl border-2 shadow-md font-bold transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer";
// // // const CELL_STYLE: React.CSSProperties = {
// // //   minWidth: 72,
// // //   minHeight: 64,
// // //   height: 70,
// // //   width: 90,
// // //   boxSizing: "border-box" as const,
// // //   fontSize: "1.25rem",
// // // };


// // // const CorporateAudit = () => {
// // //   const { data: auditData, loading, error } = useAuditData();
// // //   const [filters, setFilters] = useState({
// // //   status: "all",
// // //   category: "all",
// // //   year: "all",
// // //   responsible: "all",
// // //   impact: "all",
// // //   likelihood: "all"
// // // });


// // //   const filteredData = useMemo(() => {
// // //   return auditData.filter(item => {
// // //     if (filters.status !== "all" && item.status !== filters.status) return false;
// // //     if (filters.category !== "all" && item.category !== filters.category) return false;
// // //     if (filters.year !== "all" && item.year !== filters.year) return false;
// // //     if (filters.responsible !== "all" && item.responsible !== filters.responsible) return false;
// // //     if (filters.impact !== "all" && item.impact !== filters.impact) return false;
// // //     if (filters.likelihood !== "all" && item.likelihood !== filters.likelihood) return false;
// // //     return true;
// // //   });
// // // }, [auditData, filters]);


// // //   const kpis = useMemo(() => {
// // //     const total = filteredData.length;
// // //     const closed = filteredData.filter(i => i.status === "Closed").length;
// // //     const open = filteredData.filter(i => i.status === "Open").length;
// // //     const overdue = filteredData.filter(i => i.isOverdue).length;
// // //     const highRisk = filteredData.filter(i => i.category === "F1 - Finding" || i.category === "High").length;
// // //     return {
// // //       total, closed, open, overdue, highRisk, resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0
// // //     };
// // //   }, [filteredData]);

// // //   // Build the risk matrix with fixed axis order
// // //   const riskMatrix = displayedImpactLevels.map((impact, iIdx) => ({
// // //     impact,
// // //     counts: likelihoodLevels.map((likelihood, lIdx) => ({
// // //       count: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood).length,
// // //       iIdx,
// // //       lIdx
// // //     })),
// // //   }));

// // //   if (loading) return <div className="min-h-screen flex justify-center items-center">Loading audit data...</div>;
// // //   if (error) return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <div className="p-8">
// // //         <div className="mb-8">
// // //           <h1 className="text-4xl font-bold">Corporate Audit Findings Dashboard</h1>
// // //           <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security</p>
// // //         </div>

// // //         {/* KPI Cards */}
// // //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // //           <KPICard title="Total Findings" value={kpis.total} icon={BarChart3} />
// // //           <KPICard title="High Risk" value={kpis.highRisk} icon={AlertTriangle} />
// // //           <KPICard title="Overdue" value={kpis.overdue} icon={Clock} />
// // //           <KPICard title="Closed" value={kpis.closed} icon={CheckCircle} />
// // //         </div>

// // //         {/* Filters */}
// // //         <Card className="mb-6">
// // //           <CardHeader>
// // //             <CardTitle>Filters</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
// // //                 <option value="all">All Status</option>
// // //                 <option value="Open">Open</option>
// // //                 <option value="Closed">Closed</option>
// // //                 <option value="Re-opened">Re-opened</option>
// // //               </select>
// // //               <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
// // //                 <option value="all">All Categories</option>
// // //                 <option value="F1 - Finding">F1 - Finding</option>
// // //                 <option value="F2 - Finding">F2 - Finding</option>
// // //                 <option value="High">High</option>
// // //                 <option value="Medium">Medium</option>
// // //               </select>
// // //               <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}>
// // //                 <option value="all">All Years</option>
// // //                 {[...new Set(auditData.map(i => i.year))].sort().map(y => (
// // //                   <option key={y} value={y}>{y}</option>
// // //                 ))}
// // //               </select>
// // //               <select value={filters.responsible} onChange={e => setFilters(f => ({ ...f, responsible: e.target.value }))}>
// // //                 <option value="all">All Responsible</option>
// // //                 {[...new Set(auditData.map(i => i.responsible))]
// // //                   .filter(Boolean)
// // //                   .map(r => <option key={r} value={r}>{r}</option>)}
// // //               </select>
// // //               <select value={filters.impact} onChange={e => setFilters(f => ({...f, impact: e.target.value}))}>
// // //   <option value="all">All Impact</option>
// // //   {impactLevels.map(lvl => (
// // //     <option key={lvl} value={lvl}>{lvl}</option>
// // //   ))}
// // // </select>
// // // <select value={filters.likelihood} onChange={e => setFilters(f => ({...f, likelihood: e.target.value}))}>
// // //   <option value="all">All Likelihood</option>
// // //   {likelihoodLevels.map(lvl => (
// // //     <option key={lvl} value={lvl}>{lvl}</option>
// // //   ))}
// // // </select>

// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Tabs */}
// // //         <Tabs defaultValue="risk">
// // //           <TabsList className="grid w-full grid-cols-2">
// // //             <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
// // //             <TabsTrigger value="details">Detailed Findings</TabsTrigger>
// // //           </TabsList>
// // //           <TabsContent value="risk" className="space-y-6">
// // //             {/* --- Large, ordered, boxed Risk Matrix --- */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>Risk Matrix (Likelihood × Impact)</CardTitle>
// // //                 <CardDescription>
// // //                   Risk Matrix for Likelihood and Impact Values
// // //                 </CardDescription>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="overflow-x-auto flex justify-center p-3">
// // //                   <table className="border-separate mx-auto" style={{ borderSpacing: 8, minWidth: 765 }}>
// // //                     <thead>
// // //                       <tr>
// // //                         <th className="h-[70px] px-4 py-3 text-base font-bold text-left bg-slate-50 border rounded-xl shadow-inner min-w-[120px] align-middle" style={{ fontSize: "1.1rem" }}>Impact /<br />Likelihood</th>
// // //                         {likelihoodLevels.map(lvl => (
// // //                           <th key={lvl} className="px-2 py-3 text-base font-bold bg-slate-50 border rounded-xl shadow-inner align-middle" style={{ fontSize: "1.10rem", minWidth: 100 }}>{lvl}</th>
// // //                         ))}
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       {riskMatrix.map((row, iIdx) => (
// // //                         <tr key={row.impact}>
// // //                           <td className="px-2 py-3 text-base font-semibold bg-slate-50 border rounded-xl shadow-inner text-center align-middle" style={{ fontSize: "1.10rem", minWidth: 120 }}>{row.impact}</td>
// // //                           {row.counts.map(({ count }, lIdx) => (
// // //                             <td
// // //                               key={lIdx}
// // //                               className={`${BOX_STYLE} ${getRiskColor(iIdx, lIdx)} text-center text-xl align-middle`}
// // //                               style={CELL_STYLE}
// // //                               title={`Impact: ${row.impact}, Likelihood: ${likelihoodLevels[lIdx]}`}
// // //                             >
// // //                               {count > 0 ? count : <span className="opacity-50">-</span>}
// // //                             </td>
// // //                           ))}
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //                 {riskMatrix.flatMap(r => r.counts.map(c => c.count)).reduce((a, b) => a + b, 0) === 0 && (
// // //                   <div className="text-slate-400 text-center mt-6">
// // //                     No findings for matrix values; check your impact/likelihood mapping or filters.
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>
// // //           <TabsContent value="details" className="space-y-6">
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>All Findings</CardTitle>
// // //                 <CardDescription>Complete list with all mapped values, including likelihood & impact.</CardDescription>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="overflow-x-auto">
// // //                   <table className="w-full text-sm">
// // //                     <thead>
// // //                       <tr>
// // //                         <th>Action #</th>
// // //                         <th>Finding Name</th>
// // //                         <th>Category</th>
// // //                         <th>Impact</th>
// // //                         <th>Likelihood</th>
// // //                         <th>Status</th>

// // //                         <th>Responsible</th>
// // //                         <th>Department</th>
// // //                         <th>Year</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       {filteredData.map(item => (
// // //                         <tr key={item.actionNumber}>
// // //                           <td>{item.actionNumber}</td>
// // //                           <td>{item.findingName}</td>
// // //                           <td>{item.category}</td>
// // //                           <td>{item.impact}</td>
// // //                           <td>{item.likelihood}</td>
// // //                           <td>{item.status}</td>

// // //                           <td>{item.responsible}</td>
// // //                           <td>{item.department}</td>
// // //                           <td>{item.year}</td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //                 <div className="mt-2 text-sm text-muted-foreground">
// // //                   Showing {filteredData.length} of {auditData.length} findings
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CorporateAudit;

// // import React, { useState, useMemo } from "react";
// // import { useAuditData } from "@/hooks/useAuditData";
// // import KPICard from "@/components/KPICard";
// // import { BarChart3, AlertTriangle, Clock, CheckCircle, X } from 'lucide-react';
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // // Axis values
// // const impactLevels = ["1 - Slight", "2 - Moderate", "3 - Severe", "4 - Extreme"];
// // const likelihoodLevels = ["1 - Unlikely", "2 - Likely", "3 - Very Likely", "4 - Extremely Likely"];
// // const displayedImpactLevels = impactLevels.slice().reverse();

// // function getRiskColor(i, j) {
// //   if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "bg-red-500 text-white border-red-700";
// //   if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "bg-yellow-200 text-yellow-900 border-yellow-500";
// //   return "bg-green-200 text-green-900 border-green-500";
// // }

// // const BOX_STYLE = "rounded-xl border-2 shadow-md font-bold transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer";
// // const CELL_STYLE: React.CSSProperties = {
// //   minWidth: 72,
// //   minHeight: 64,
// //   height: 70,
// //   width: 90,
// //   boxSizing: "border-box",
// //   fontSize: "1.25rem",
// // };

// // const CorporateAudit = () => {
// //   const { data: auditData, loading, error } = useAuditData();
// //   const [filters, setFilters] = useState({
// //     status: "all",
// //     category: "all",
// //     year: "all",
// //     responsible: "all",
// //     impact: "all",
// //     likelihood: "all"
// //   });

// //   // Sidebar state
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [selectedCell, setSelectedCell] = useState<{ impact: string; likelihood: string; items: any[] } | null>(null);

// //   const filteredData = useMemo(() => {
// //     return auditData.filter(item => {
// //       if (filters.status !== "all" && item.status !== filters.status) return false;
// //       if (filters.category !== "all" && item.category !== filters.category) return false;
// //       if (filters.year !== "all" && item.year !== filters.year) return false;
// //       if (filters.responsible !== "all" && item.responsible !== filters.responsible) return false;
// //       if (filters.impact !== "all" && item.impact !== filters.impact) return false;
// //       if (filters.likelihood !== "all" && item.likelihood !== filters.likelihood) return false;
// //       return true;
// //     });
// //   }, [auditData, filters]);

// //   const kpis = useMemo(() => {
// //     const total = filteredData.length;
// //     const closed = filteredData.filter(i => i.status === "Closed").length;
// //     const open = filteredData.filter(i => i.status === "Open").length;
// //     const overdue = filteredData.filter(i => i.isOverdue).length;
// //     const highRisk = filteredData.filter(i => i.category === "F1 - Finding" || i.category === "High").length;
// //     return {
// //       total, closed, open, overdue, highRisk, resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0
// //     };
// //   }, [filteredData]);

// //   const riskMatrix = displayedImpactLevels.map((impact, iIdx) => ({
// //     impact,
// //     counts: likelihoodLevels.map((likelihood, lIdx) => ({
// //       count: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood).length,
// //       items: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood),
// //       iIdx,
// //       lIdx
// //     })),
// //   }));

// //   const handleCellClick = (impact: string, likelihood: string, items: any[]) => {
// //     if (items.length > 0) {
// //       setSelectedCell({ impact, likelihood, items });
// //       setSidebarOpen(true);
// //     }
// //   };

// //   const closeSidebar = () => {
// //     setSidebarOpen(false);
// //     setTimeout(() => setSelectedCell(null), 300);
// //   };

// //   if (loading) return <div className="min-h-screen flex justify-center items-center">Loading audit data...</div>;
// //   if (error) return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <div className="p-8">
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold">Corporate Audit Findings Dashboard</h1>
// //           <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security</p>
// //         </div>

// //         {/* KPI Cards */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //           <KPICard title="Total Findings" value={kpis.total} icon={BarChart3} />
// //           <KPICard title="High Risk" value={kpis.highRisk} icon={AlertTriangle} />
// //           <KPICard title="Overdue" value={kpis.overdue} icon={Clock} />
// //           <KPICard title="Closed" value={kpis.closed} icon={CheckCircle} />
// //         </div>

// //         {/* Filters */}
// //         <Card className="mb-6">
// //           <CardHeader>
// //             <CardTitle>Filters</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
// //               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
// //                 <option value="all">All Status</option>
// //                 <option value="Open">Open</option>
// //                 <option value="Closed">Closed</option>
// //                 <option value="Re-opened">Re-opened</option>
// //               </select>
// //               <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
// //                 <option value="all">All Categories</option>
// //                 <option value="F1 - Finding">F1 - Finding</option>
// //                 <option value="F2 - Finding">F2 - Finding</option>
// //                 <option value="High">High</option>
// //                 <option value="Medium">Medium</option>
// //               </select>
// //               <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}>
// //                 <option value="all">All Years</option>
// //                 {[...new Set(auditData.map(i => i.year))].sort().map(y => (
// //                   <option key={y} value={y}>{y}</option>
// //                 ))}
// //               </select>
// //               <select value={filters.responsible} onChange={e => setFilters(f => ({ ...f, responsible: e.target.value }))}>
// //                 <option value="all">All Responsible</option>
// //                 {[...new Set(auditData.map(i => i.responsible))].filter(Boolean).map(r => <option key={r} value={r}>{r}</option>)}
// //               </select>
// //               <select value={filters.impact} onChange={e => setFilters(f => ({ ...f, impact: e.target.value }))}>
// //                 <option value="all">All Impact</option>
// //                 {impactLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
// //               </select>
// //               <select value={filters.likelihood} onChange={e => setFilters(f => ({ ...f, likelihood: e.target.value }))}>
// //                 <option value="all">All Likelihood</option>
// //                 {likelihoodLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
// //               </select>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Tabs */}
// //         <Tabs defaultValue="risk">
// //           <TabsList className="grid w-full grid-cols-2">
// //             <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
// //             <TabsTrigger value="details">Detailed Findings</TabsTrigger>
// //           </TabsList>
// //           <TabsContent value="risk" className="space-y-6">
// //             {/* Risk Matrix with Sidebar */}
// //             <div className="relative flex gap-4">
// //               <Card className={`transition-all duration-300 ${sidebarOpen ? 'w-1/2' : 'w-full'}`}>
// //                 <CardHeader>
// //                   <CardTitle>Risk Matrix (Likelihood × Impact)</CardTitle>
// //                   <CardDescription>
// //                     Click on any cell to view detailed findings. Top: Extreme, bottom: Slight.
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="overflow-x-auto flex justify-center p-3">
// //                     <table className="border-separate mx-auto" style={{ borderSpacing: 8, minWidth: 765 }}>
// //                       <thead>
// //                         <tr>
// //                           <th className="h-[70px] px-4 py-3 text-base font-bold text-left bg-slate-50 border rounded-xl shadow-inner min-w-[120px] align-middle" style={{ fontSize: "1.1rem" }}>Impact /<br />Likelihood</th>
// //                           {likelihoodLevels.map(lvl => (
// //                             <th key={lvl} className="px-2 py-3 text-base font-bold bg-slate-50 border rounded-xl shadow-inner align-middle" style={{ fontSize: "1.10rem", minWidth: 100 }}>{lvl}</th>
// //                           ))}
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {riskMatrix.map((row, iIdx) => (
// //                           <tr key={row.impact}>
// //                             <td className="px-2 py-3 text-base font-semibold bg-slate-50 border rounded-xl shadow-inner text-center align-middle" style={{ fontSize: "1.10rem", minWidth: 120 }}>{row.impact}</td>
// //                             {row.counts.map(({ count, items }, lIdx) => (
// //                               <td
// //                                 key={lIdx}
// //                                 className={`${BOX_STYLE} ${getRiskColor(iIdx, lIdx)} text-center text-xl align-middle`}
// //                                 style={CELL_STYLE}
// //                                 onClick={() => handleCellClick(row.impact, likelihoodLevels[lIdx], items)}
// //                                 title={`Impact: ${row.impact}, Likelihood: ${likelihoodLevels[lIdx]} - Click to view details`}
// //                               >
// //                                 {count > 0 ? count : <span className="opacity-50">-</span>}
// //                               </td>
// //                             ))}
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Animated Sidebar */}
// //               <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l transition-all duration-300 ease-in-out z-50 overflow-y-auto ${sidebarOpen ? 'w-1/2 translate-x-0' : 'w-0 translate-x-full'}`}>
// //                 {selectedCell && (
// //                   <div className="p-6">
// //                     <div className="flex justify-between items-center mb-4">
// //                       <div>
// //                         <h2 className="text-2xl font-bold">Findings Details</h2>
// //                         <p className="text-muted-foreground">
// //                           Impact: <strong>{selectedCell.impact}</strong> | Likelihood: <strong>{selectedCell.likelihood}</strong>
// //                         </p>
// //                         <p className="text-sm text-muted-foreground">{selectedCell.items.length} findings</p>
// //                       </div>
// //                       <button onClick={closeSidebar} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
// //                         <X className="w-6 h-6" />
// //                       </button>
// //                     </div>

// //                     <div className="overflow-x-auto">
// //                       <table className="w-full text-sm border-collapse">
// //                         <thead>
// //                           <tr className="bg-slate-100">
// //                             <th className="border p-2 text-left">Action #</th>
// //                             <th className="border p-2 text-left">Finding Name</th>
// //                             <th className="border p-2 text-left">Status</th>
// //                             <th className="border p-2 text-left">Due Date</th>
// //                             <th className="border p-2 text-left">Responsible</th>
// //                             <th className="border p-2 text-left">Department</th>
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {selectedCell.items.map((item, idx) => (
// //                             <tr key={idx} className="hover:bg-slate-50">
// //                               <td className="border p-2">{item.actionNumber}</td>
// //                               <td className="border p-2">{item.findingName}</td>
// //                               <td className="border p-2">
// //                                 <span className={`px-2 py-1 rounded text-xs ${item.status === 'Closed' ? 'bg-green-100 text-green-800' : item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
// //                                   {item.status}
// //                                 </span>
// //                               </td>
// //                               <td className="border p-2 whitespace-nowrap">
// //                                 {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
// //                                 {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
// //                               </td>
// //                               <td className="border p-2">{item.responsible}</td>
// //                               <td className="border p-2">{item.department}</td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Overlay */}
// //               {sidebarOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={closeSidebar}></div>
// //               )}
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="details" className="space-y-6">
// //             {/* Existing detailed findings table */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>All Findings</CardTitle>
// //                 <CardDescription>Complete list with all mapped values.</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full text-sm">
// //                     <thead>
// //                       <tr>
// //                         <th>Action #</th>
// //                         <th>Finding Name</th>
// //                         <th>Category</th>
// //                         <th>Impact</th>
// //                         <th>Likelihood</th>
// //                         <th>Status</th>
// //                         <th>Due Date</th>
// //                         <th>Responsible</th>
// //                         <th>Department</th>
// //                         <th>Year</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredData.map(item => (
// //                         <tr key={item.actionNumber}>
// //                           <td>{item.actionNumber}</td>
// //                           <td>{item.findingName}</td>
// //                           <td>{item.category}</td>
// //                           <td>{item.impact}</td>
// //                           <td>{item.likelihood}</td>
// //                           <td>{item.status}</td>
// //                           <td style={{ minWidth: 140, whiteSpace: 'nowrap' }}>
// //                             {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
// //                             {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
// //                           </td>
// //                           <td>{item.responsible}</td>
// //                           <td>{item.department}</td>
// //                           <td>{item.year}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //                 <div className="mt-2 text-sm text-muted-foreground">
// //                   Showing {filteredData.length} of {auditData.length} findings
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CorporateAudit;

// import React, { useState, useMemo } from "react";
// import { useAuditData } from "@/hooks/useAuditData";
// import KPICard from "@/components/KPICard";
// import { BarChart3, AlertTriangle, Clock, CheckCircle, X, ChevronDown } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Axis values
// const impactLevels = ["1 - Slight", "2 - Moderate", "3 - Severe", "4 - Extreme"];
// const likelihoodLevels = ["1 - Unlikely", "2 - Likely", "3 - Very Likely", "4 - Extremely Likely"];
// const displayedImpactLevels = impactLevels.slice().reverse();

// function getRiskColor(i, j) {
//   if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "bg-red-500 text-white border-red-700";
//   if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "bg-yellow-200 text-yellow-900 border-yellow-500";
//   return "bg-green-200 text-green-900 border-green-500";
// }

// function getRiskLevel(i, j): "high" | "medium" | "low" {
//   if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "high";
//   if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "medium";
//   return "low";
// }

// // Categorize findings by security area
// function categorizeByArea(findingName: string): string {
//   const name = (findingName || "").toLowerCase();
//   if (name.includes("vulnerability") && name.includes("management")) return "Vulnerability Management";
//   if (name.includes("network") && name.includes("security")) return "Network Security";
//   if (name.includes("information") && name.includes("security")) return "Information Security";
//   if (name.includes("sap")) return "SAP System Security";
//   if (name.includes("csoc")) return "CSOC";
//   if (name.includes("ot") || name.includes("shopfloor") || name.includes("endpoint")) return "OT Security";
//   if (name.includes("data") && name.includes("management")) return "Data Management";
//   return "Other";
// }

// const BOX_STYLE = "rounded-xl border-2 shadow-md font-bold transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer";
// const CELL_STYLE: React.CSSProperties = {
//   minWidth: 72,
//   minHeight: 64,
//   height: 70,
//   width: 90,
//   boxSizing: "border-box",
//   fontSize: "1.25rem",
// };

// const CorporateAudit = () => {
//   const { data: auditData, loading, error } = useAuditData();
//   const [filters, setFilters] = useState({
//     status: "all",
//     category: "all",
//     year: "all",
//     responsible: "all",
//     impact: "all",
//     likelihood: "all"
//   });

//   // Sidebar state
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedCell, setSelectedCell] = useState<{ impact: string; likelihood: string; items: any[] } | null>(null);

//   // Area expandable state
//   const [expandedArea, setExpandedArea] = useState<string | null>(null);

//   const filteredData = useMemo(() => {
//     return auditData.filter(item => {
//       if (filters.status !== "all" && item.status !== filters.status) return false;
//       if (filters.category !== "all" && item.category !== filters.category) return false;
//       if (filters.year !== "all" && item.year !== filters.year) return false;
//       if (filters.responsible !== "all" && item.responsible !== filters.responsible) return false;
//       if (filters.impact !== "all" && item.impact !== filters.impact) return false;
//       if (filters.likelihood !== "all" && item.likelihood !== filters.likelihood) return false;
//       return true;
//     });
//   }, [auditData, filters]);

//   const kpis = useMemo(() => {
//     const total = filteredData.length;
//     const closed = filteredData.filter(i => i.status === "Closed").length;
//     const open = filteredData.filter(i => i.status === "Open").length;
//     const overdue = filteredData.filter(i => i.isOverdue).length;
//     const highRisk = filteredData.filter(i => i.category === "F1 - Finding" || i.category === "High").length;
//     return {
//       total, closed, open, overdue, highRisk, resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0
//     };
//   }, [filteredData]);

//   const riskMatrix = displayedImpactLevels.map((impact, iIdx) => ({
//     impact,
//     counts: likelihoodLevels.map((likelihood, lIdx) => ({
//       count: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood).length,
//       items: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood),
//       iIdx,
//       lIdx
//     })),
//   }));

//   // Categorize findings by area and risk level
//   const riskAreas = useMemo(() => {
//     const areas: { [key: string]: { high: any[]; medium: any[]; low: any[] } } = {};
    
//     filteredData.forEach(item => {
//       const area = categorizeByArea(item.findingName);
//       if (!areas[area]) {
//         areas[area] = { high: [], medium: [], low: [] };
//       }
      
//       const riskLevel = getRiskLevel(
//         displayedImpactLevels.indexOf(item.impact),
//         likelihoodLevels.indexOf(item.likelihood)
//       );
//       areas[area][riskLevel].push(item);
//     });

//     return Object.entries(areas).map(([name, data]) => ({
//       name,
//       high: data.high.length,
//       medium: data.medium.length,
//       low: data.low.length,
//       items: data,
//       overallRisk: data.high.length > 0 ? "High" : data.medium.length > 0 ? "Medium" : "Low"
//     })).sort((a, b) => b.high - a.high);
//   }, [filteredData]);

//   const handleCellClick = (impact: string, likelihood: string, items: any[]) => {
//     if (items.length > 0) {
//       setSelectedCell({ impact, likelihood, items });
//       setSidebarOpen(true);
//     }
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//     setTimeout(() => setSelectedCell(null), 300);
//   };

//   if (loading) return <div className="min-h-screen flex justify-center items-center">Loading audit data...</div>;
//   if (error) return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="p-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold">Corporate Audit Findings Dashboard</h1>
//           <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security</p>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <KPICard title="Total Findings" value={kpis.total} icon={BarChart3} />
//           <KPICard title="High Risk" value={kpis.highRisk} icon={AlertTriangle} />
//           <KPICard title="Overdue" value={kpis.overdue} icon={Clock} />
//           <KPICard title="Closed" value={kpis.closed} icon={CheckCircle} />
//         </div>

//         {/* Filters */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Filters</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
//               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
//                 <option value="all">All Status</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Closed</option>
//                 <option value="Re-opened">Re-opened</option>
//               </select>
//               <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
//                 <option value="all">All Categories</option>
//                 <option value="F1 - Finding">F1 - Finding</option>
//                 <option value="F2 - Finding">F2 - Finding</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//               </select>
//               <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}>
//                 <option value="all">All Years</option>
//                 {[...new Set(auditData.map(i => i.year))].sort().map(y => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//               <select value={filters.responsible} onChange={e => setFilters(f => ({ ...f, responsible: e.target.value }))}>
//                 <option value="all">All Responsible</option>
//                 {[...new Set(auditData.map(i => i.responsible))].filter(Boolean).map(r => <option key={r} value={r}>{r}</option>)}
//               </select>
//               <select value={filters.impact} onChange={e => setFilters(f => ({ ...f, impact: e.target.value }))}>
//                 <option value="all">All Impact</option>
//                 {impactLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
//               </select>
//               <select value={filters.likelihood} onChange={e => setFilters(f => ({ ...f, likelihood: e.target.value }))}>
//                 <option value="all">All Likelihood</option>
//                 {likelihoodLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
//               </select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Tabs */}
//         <Tabs defaultValue="risk">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
//             <TabsTrigger value="areas">Risk Areas</TabsTrigger>
//             <TabsTrigger value="details">Detailed Findings</TabsTrigger>
//           </TabsList>

//           <TabsContent value="risk" className="space-y-6">
//             {/* Risk Matrix with Sidebar */}
//             <div className="relative flex gap-4">
//               <Card className={`transition-all duration-300 ${sidebarOpen ? 'w-1/2' : 'w-full'}`}>
//                 <CardHeader>
//                   <CardTitle>Risk Matrix (Likelihood × Impact)</CardTitle>
//                   <CardDescription>
//                     Click on any cell to view detailed findings. Top: Extreme, bottom: Slight.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="overflow-x-auto flex justify-center p-3">
//                     <table className="border-separate mx-auto" style={{ borderSpacing: 8, minWidth: 765 }}>
//                       <thead>
//                         <tr>
//                           <th className="h-[70px] px-4 py-3 text-base font-bold text-left bg-slate-50 border rounded-xl shadow-inner min-w-[120px] align-middle" style={{ fontSize: "1.1rem" }}>Impact /<br />Likelihood</th>
//                           {likelihoodLevels.map(lvl => (
//                             <th key={lvl} className="px-2 py-3 text-base font-bold bg-slate-50 border rounded-xl shadow-inner align-middle" style={{ fontSize: "1.10rem", minWidth: 100 }}>{lvl}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {riskMatrix.map((row, iIdx) => (
//                           <tr key={row.impact}>
//                             <td className="px-2 py-3 text-base font-semibold bg-slate-50 border rounded-xl shadow-inner text-center align-middle" style={{ fontSize: "1.10rem", minWidth: 120 }}>{row.impact}</td>
//                             {row.counts.map(({ count, items }, lIdx) => (
//                               <td
//                                 key={lIdx}
//                                 className={`${BOX_STYLE} ${getRiskColor(iIdx, lIdx)} text-center text-xl align-middle`}
//                                 style={CELL_STYLE}
//                                 onClick={() => handleCellClick(row.impact, likelihoodLevels[lIdx], items)}
//                                 title={`Impact: ${row.impact}, Likelihood: ${likelihoodLevels[lIdx]} - Click to view details`}
//                               >
//                                 {count > 0 ? count : <span className="opacity-50">-</span>}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Animated Sidebar */}
//               <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l transition-all duration-300 ease-in-out z-50 overflow-y-auto ${sidebarOpen ? 'w-1/2 translate-x-0' : 'w-0 translate-x-full'}`}>
//                 {selectedCell && (
//                   <div className="p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <div>
//                         <h2 className="text-2xl font-bold">Findings Details</h2>
//                         <p className="text-muted-foreground">
//                           Impact: <strong>{selectedCell.impact}</strong> | Likelihood: <strong>{selectedCell.likelihood}</strong>
//                         </p>
//                         <p className="text-sm text-muted-foreground">{selectedCell.items.length} findings</p>
//                       </div>
//                       <button onClick={closeSidebar} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//                         <X className="w-6 h-6" />
//                       </button>
//                     </div>

//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm border-collapse">
//                         <thead>
//                           <tr className="bg-slate-100">
//                             <th className="border p-2 text-left">Action #</th>
//                             <th className="border p-2 text-left">Finding Name</th>
//                             <th className="border p-2 text-left">Status</th>
//                             <th className="border p-2 text-left">Due Date</th>
//                             <th className="border p-2 text-left">Responsible</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedCell.items.map((item, idx) => (
//                             <tr key={idx} className="hover:bg-slate-50">
//                               <td className="border p-2">{item.actionNumber}</td>
//                               <td className="border p-2">{item.findingName}</td>
//                               <td className="border p-2">
//                                 <span className={`px-2 py-1 rounded text-xs ${item.status === 'Closed' ? 'bg-green-100 text-green-800' : item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
//                                   {item.status}
//                                 </span>
//                               </td>
//                               <td className="border p-2 whitespace-nowrap">
//                                 {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
//                                 {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
//                               </td>
//                               <td className="border p-2">{item.responsible}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Overlay */}
//               {sidebarOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={closeSidebar}></div>
//               )}
//             </div>
//           </TabsContent>

//           {/* NEW: Risk Areas Tab */}
//           <TabsContent value="areas" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Risk Areas Analysis</CardTitle>
//                 <CardDescription>
//                   Security areas categorized by finding types with risk distribution (High/Medium/Low)
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {riskAreas.map((area) => (
//                     <div key={area.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                       <button
//                         onClick={() => setExpandedArea(expandedArea === area.name ? null : area.name)}
//                         className="w-full flex justify-between items-center text-left hover:bg-slate-50 p-2 rounded"
//                       >
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold">{area.name}</h3>
//                           <div className="flex gap-4 mt-2 text-sm">
//                             <span className="flex items-center gap-2">
//                               <span className="w-3 h-3 bg-red-500 rounded"></span>
//                               High Risk: <strong>{area.high}</strong>
//                             </span>
//                             <span className="flex items-center gap-2">
//                               <span className="w-3 h-3 bg-yellow-300 rounded"></span>
//                               Medium Risk: <strong>{area.medium}</strong>
//                             </span>
//                             <span className="flex items-center gap-2">
//                               <span className="w-3 h-3 bg-green-500 rounded"></span>
//                               Low Risk: <strong>{area.low}</strong>
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                             area.overallRisk === 'High' ? 'bg-red-100 text-red-700' :
//                             area.overallRisk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
//                             'bg-green-100 text-green-700'
//                           }`}>
//                             {area.overallRisk}
//                           </span>
//                           <ChevronDown className={`w-5 h-5 transition-transform ${expandedArea === area.name ? 'rotate-180' : ''}`} />
//                         </div>
//                       </button>

//                       {/* Expandable Details */}
//                       {expandedArea === area.name && (
//                         <div className="mt-4 pt-4 border-t space-y-4">
//                           {Object.entries(area.items).map(([riskLevel, items]: [string, any]) => (
//                             items.length > 0 && (
//                               <div key={riskLevel}>
//                                 <h4 className={`font-semibold mb-2 ${
//                                   riskLevel === 'high' ? 'text-red-700' :
//                                   riskLevel === 'medium' ? 'text-yellow-700' :
//                                   'text-green-700'
//                                 }`}>
//                                   {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk Audits ({items.length})
//                                 </h4>
//                                 <div className="overflow-x-auto">
//                                   <table className="w-full text-xs">
//                                     <thead>
//                                       <tr className="bg-slate-50">
//                                         <th className="border p-2 text-left">Action #</th>
//                                         <th className="border p-2 text-left">Finding Name</th>
//                                         <th className="border p-2 text-left">Impact</th>
//                                         <th className="border p-2 text-left">Likelihood</th>
//                                         <th className="border p-2 text-left">Status</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {items.map((item, idx) => (
//                                         <tr key={idx} className="hover:bg-slate-50">
//                                           <td className="border p-2">{item.actionNumber}</td>
//                                           <td className="border p-2 text-ellipsis overflow-hidden">{item.findingName}</td>
//                                           <td className="border p-2">{item.impact}</td>
//                                           <td className="border p-2">{item.likelihood}</td>
//                                           <td className="border p-2">
//                                             <span className={`px-2 py-1 rounded text-xs ${item.status === 'Closed' ? 'bg-green-100 text-green-800' : item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
//                                               {item.status}
//                                             </span>
//                                           </td>
//                                         </tr>
//                                       ))}
//                                     </tbody>
//                                   </table>
//                                 </div>
//                               </div>
//                             )
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="details" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Findings</CardTitle>
//                 <CardDescription>Complete list with all mapped values.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr>
//                         <th>Action #</th>
//                         <th>Finding Name</th>
//                         <th>Category</th>
//                         <th>Impact</th>
//                         <th>Likelihood</th>
//                         <th>Status</th>
//                         <th>Due Date</th>
//                         <th>Responsible</th>
//                         <th>Department</th>
//                         <th>Year</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.map(item => (
//                         <tr key={item.actionNumber}>
//                           <td>{item.actionNumber}</td>
//                           <td>{item.findingName}</td>
//                           <td>{item.category}</td>
//                           <td>{item.impact}</td>
//                           <td>{item.likelihood}</td>
//                           <td>{item.status}</td>
//                           <td style={{ minWidth: 140, whiteSpace: 'nowrap' }}>
//                             {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
//                             {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
//                           </td>
//                           <td>{item.responsible}</td>
//                           <td>{item.department}</td>
//                           <td>{item.year}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-2 text-sm text-muted-foreground">
//                   Showing {filteredData.length} of {auditData.length} findings
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default CorporateAudit;
import React, { useState, useMemo } from "react";
import { useAuditData } from "@/hooks/useAuditData";
import KPICard from "@/components/KPICard";
import.meta.env.VITE_AZURE_BLOB_SAS_URl;
import { BarChart3, AlertTriangle, Clock, CheckCircle, X, ChevronDown, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Axis values
const impactLevels = ["1 - Slight", "2 - Moderate", "3 - Severe", "4 - Extreme"];
const likelihoodLevels = ["1 - Unlikely", "2 - Likely", "3 - Very Likely", "4 - Extremely Likely"];
const displayedImpactLevels = impactLevels.slice().reverse();

function getRiskColor(i, j) {
  if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "bg-red-500 text-white border-red-700";
  if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "bg-yellow-200 text-yellow-900 border-yellow-500";
  return "bg-green-200 text-green-900 border-green-500";
}

function getRiskLevel(i, j): "high" | "medium" | "low" {
  if ((i === 0 && (j === 2 || j === 3)) || (i === 1 && j === 3)) return "high";
  if ((i === 2 && j >= 2) || (i === 1 && j === 2) || (i === 0 && j < 2)) return "medium";
  return "low";
}

// Categorize findings by security area
function categorizeByArea(findingName: string): string {
  const name = (findingName || "").toLowerCase();
  if (name.includes("vulnerability") && name.includes("management")) return "Vulnerability Management";
  if (name.includes("network") && name.includes("security")) return "Network Security";
  if (name.includes("information") && name.includes("security")) return "Information Security";
  if (name.includes("sap")) return "SAP System Security";
  if (name.includes("csoc")) return "CSOC";
  if (name.includes("ot") || name.includes("shopfloor") || name.includes("endpoint")) return "OT Security";
  if (name.includes("data") && name.includes("management")) return "Data Management";
  return "Other";
}

const BOX_STYLE = "rounded-xl border-2 shadow-md font-bold transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer";
const CELL_STYLE: React.CSSProperties = {
  minWidth: 72,
  minHeight: 64,
  height: 70,
  width: 90,
  boxSizing: "border-box",
  fontSize: "1.25rem",
};

const CorporateAudit = () => {
  const { data: auditData, loading, error, refreshData } = useAuditData();
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    year: "all",
    responsible: "all",
    impact: "all",
    likelihood: "all"
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ impact: string; likelihood: string; items: any[] } | null>(null);

  // Area expandable state
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return auditData.filter(item => {
      if (filters.status !== "all" && item.status !== filters.status) return false;
      if (filters.category !== "all" && item.category !== filters.category) return false;
      if (filters.year !== "all" && item.year !== filters.year) return false;
      if (filters.responsible !== "all" && item.responsible !== filters.responsible) return false;
      if (filters.impact !== "all" && item.impact !== filters.impact) return false;
      if (filters.likelihood !== "all" && item.likelihood !== filters.likelihood) return false;
      return true;
    });
  }, [auditData, filters]);

  const kpis = useMemo(() => {
    const total = filteredData.length;
    const closed = filteredData.filter(i => i.status === "Closed").length;
    const open = filteredData.filter(i => i.status === "Open").length;
    const overdue = filteredData.filter(i => i.isOverdue).length;
    const highRisk = filteredData.filter(i => i.category === "F1 - Finding" || i.category === "High").length;
    return {
      total, closed, open, overdue, highRisk, resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0
    };
  }, [filteredData]);

  const riskMatrix = displayedImpactLevels.map((impact, iIdx) => ({
    impact,
    counts: likelihoodLevels.map((likelihood, lIdx) => ({
      count: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood).length,
      items: filteredData.filter(f => f.impact === impact && f.likelihood === likelihood),
      iIdx,
      lIdx
    })),
  }));

  // Categorize findings by area and risk level
  const riskAreas = useMemo(() => {
    const areas: { [key: string]: { high: any[]; medium: any[]; low: any[] } } = {};
    
    filteredData.forEach(item => {
      const area = categorizeByArea(item.findingName);
      if (!areas[area]) {
        areas[area] = { high: [], medium: [], low: [] };
      }
      
      const riskLevel = getRiskLevel(
        displayedImpactLevels.indexOf(item.impact),
        likelihoodLevels.indexOf(item.likelihood)
      );
      areas[area][riskLevel].push(item);
    });

    return Object.entries(areas).map(([name, data]) => ({
      name,
      high: data.high.length,
      medium: data.medium.length,
      low: data.low.length,
      items: data,
      overallRisk: data.high.length > 0 ? "High" : data.medium.length > 0 ? "Medium" : "Low"
    })).sort((a, b) => b.high - a.high);
  }, [filteredData]);

  const handleCellClick = (impact: string, likelihood: string, items: any[]) => {
    if (items.length > 0) {
      setSelectedCell({ impact, likelihood, items });
      setSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setSelectedCell(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit data from Azure Blob Storage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-lg font-semibold">{error}</p>
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
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">Corporate Audit Findings Dashboard</h1>
            <p className="text-muted-foreground text-lg">Daimler Truck Global Cyber Security</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KPICard title="Total Findings" value={kpis.total} icon={BarChart3} />
          <KPICard title="High Risk" value={kpis.highRisk} icon={AlertTriangle} />
          <KPICard title="Overdue" value={kpis.overdue} icon={Clock} />
          <KPICard title="Closed" value={kpis.closed} icon={CheckCircle} />
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <select 
                value={filters.status} 
                onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Re-opened">Re-opened</option>
              </select>
              <select 
                value={filters.category} 
                onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Categories</option>
                <option value="F1 - Finding">F1 - Finding</option>
                <option value="F2 - Finding">F2 - Finding</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
              <select 
                value={filters.year} 
                onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Years</option>
                {[...new Set(auditData.map(i => i.year))].sort().map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select 
                value={filters.responsible} 
                onChange={e => setFilters(f => ({ ...f, responsible: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Responsible</option>
                {[...new Set(auditData.map(i => i.responsible))].filter(Boolean).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select 
                value={filters.impact} 
                onChange={e => setFilters(f => ({ ...f, impact: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Impact</option>
                {impactLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
              <select 
                value={filters.likelihood} 
                onChange={e => setFilters(f => ({ ...f, likelihood: e.target.value }))}
                className="px-3 py-2 border rounded bg-white"
              >
                <option value="all">All Likelihood</option>
                {likelihoodLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="risk">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="areas">Risk Areas</TabsTrigger>
            <TabsTrigger value="details">Detailed Findings</TabsTrigger>
          </TabsList>

          <TabsContent value="risk" className="space-y-6">
            {/* Risk Matrix with Sidebar */}
            <div className="relative flex gap-4">
              <Card className={`transition-all duration-300 ${sidebarOpen ? 'w-1/2' : 'w-full'}`}>
                <CardHeader>
                  <CardTitle>Risk Matrix (Likelihood × Impact)</CardTitle>
                  <CardDescription>
                    Click on any cell to view detailed findings. Top: Extreme, bottom: Slight.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto flex justify-center p-3">
                    <table className="border-separate mx-auto" style={{ borderSpacing: 8, minWidth: 765 }}>
                      <thead>
                        <tr>
                          <th className="h-[70px] px-4 py-3 text-base font-bold text-left bg-slate-50 border rounded-xl shadow-inner min-w-[120px] align-middle" style={{ fontSize: "1.1rem" }}>Impact /<br />Likelihood</th>
                          {likelihoodLevels.map(lvl => (
                            <th key={lvl} className="px-2 py-3 text-base font-bold bg-slate-50 border rounded-xl shadow-inner align-middle" style={{ fontSize: "1.10rem", minWidth: 100 }}>{lvl}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {riskMatrix.map((row, iIdx) => (
                          <tr key={row.impact}>
                            <td className="px-2 py-3 text-base font-semibold bg-slate-50 border rounded-xl shadow-inner text-center align-middle" style={{ fontSize: "1.10rem", minWidth: 120 }}>{row.impact}</td>
                            {row.counts.map(({ count, items }, lIdx) => (
                              <td
                                key={lIdx}
                                className={`${BOX_STYLE} ${getRiskColor(iIdx, lIdx)} text-center text-xl align-middle`}
                                style={CELL_STYLE}
                                onClick={() => handleCellClick(row.impact, likelihoodLevels[lIdx], items)}
                                title={`Impact: ${row.impact}, Likelihood: ${likelihoodLevels[lIdx]} - Click to view details`}
                              >
                                {count > 0 ? count : <span className="opacity-50">-</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Animated Sidebar */}
              <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l transition-all duration-300 ease-in-out z-50 overflow-y-auto ${sidebarOpen ? 'w-1/2 translate-x-0' : 'w-0 translate-x-full'}`}>
                {selectedCell && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">Findings Details</h2>
                        <p className="text-muted-foreground">
                          Impact: <strong>{selectedCell.impact}</strong> | Likelihood: <strong>{selectedCell.likelihood}</strong>
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedCell.items.length} findings</p>
                      </div>
                      <button onClick={closeSidebar} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border p-2 text-left">Action #</th>
                            <th className="border p-2 text-left">Finding Name</th>
                            <th className="border p-2 text-left">Status</th>
                            <th className="border p-2 text-left">Due Date</th>
                            <th className="border p-2 text-left">Responsible</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCell.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="border p-2">{item.actionNumber}</td>
                              <td className="border p-2">{item.findingName}</td>
                              <td className="border p-2">
                                <span className={`px-2 py-1 rounded text-xs ${item.status === 'Closed' ? 'bg-green-100 text-green-800' : item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="border p-2 whitespace-nowrap">
                                {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
                                {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
                              </td>
                              <td className="border p-2">{item.responsible}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlay */}
              {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={closeSidebar}></div>
              )}
            </div>
          </TabsContent>

          {/* Risk Areas Tab */}
          <TabsContent value="areas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Areas Analysis</CardTitle>
                <CardDescription>
                  Security areas categorized by finding types with risk distribution (High/Medium/Low)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskAreas.map((area) => (
                    <div key={area.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <button
                        onClick={() => setExpandedArea(expandedArea === area.name ? null : area.name)}
                        className="w-full flex justify-between items-center text-left hover:bg-slate-50 p-2 rounded"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{area.name}</h3>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-red-500 rounded"></span>
                              High Risk: <strong>{area.high}</strong>
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-yellow-300 rounded"></span>
                              Medium Risk: <strong>{area.medium}</strong>
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 bg-green-500 rounded"></span>
                              Low Risk: <strong>{area.low}</strong>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            area.overallRisk === 'High' ? 'bg-red-100 text-red-700' :
                            area.overallRisk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {area.overallRisk}
                          </span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${expandedArea === area.name ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {/* Expandable Details */}
                      {expandedArea === area.name && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          {Object.entries(area.items).map(([riskLevel, items]: [string, any]) => (
                            items.length > 0 && (
                              <div key={riskLevel}>
                                <h4 className={`font-semibold mb-2 ${
                                  riskLevel === 'high' ? 'text-red-700' :
                                  riskLevel === 'medium' ? 'text-yellow-700' :
                                  'text-green-700'
                                }`}>
                                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk Audits ({items.length})
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="bg-slate-50">
                                        <th className="border p-2 text-left">Action #</th>
                                        <th className="border p-2 text-left">Finding Name</th>
                                        <th className="border p-2 text-left">Impact</th>
                                        <th className="border p-2 text-left">Likelihood</th>
                                        <th className="border p-2 text-left">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                          <td className="border p-2">{item.actionNumber}</td>
                                          <td className="border p-2 text-ellipsis overflow-hidden">{item.findingName}</td>
                                          <td className="border p-2">{item.impact}</td>
                                          <td className="border p-2">{item.likelihood}</td>
                                          <td className="border p-2">
                                            <span className={`px-2 py-1 rounded text-xs ${item.status === 'Closed' ? 'bg-green-100 text-green-800' : item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                                              {item.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Findings</CardTitle>
                <CardDescription>Complete list with all mapped values.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left p-2">Action #</th>
                        <th className="text-left p-2">Finding Name</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Impact</th>
                        <th className="text-left p-2">Likelihood</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Due Date</th>
                        <th className="text-left p-2">Responsible</th>
                        <th className="text-left p-2">Department</th>
                        <th className="text-left p-2">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map(item => (
                        <tr key={item.actionNumber} className="border-t hover:bg-slate-50">
                          <td className="p-2">{item.actionNumber}</td>
                          <td className="p-2">{item.findingName}</td>
                          <td className="p-2">{item.category}</td>
                          <td className="p-2">{item.impact}</td>
                          <td className="p-2">{item.likelihood}</td>
                          <td className="p-2">{item.status}</td>
                          <td className="p-2 whitespace-nowrap">
                            {(!item.dueDate || item.dueDate.trim() === "#######") ? "N/A" : item.dueDate.trim()}
                            {item.isOverdue && <span className="text-red-700 ml-1">⚠️</span>}
                          </td>
                          <td className="p-2">{item.responsible}</td>
                          <td className="p-2">{item.department}</td>
                          <td className="p-2">{item.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Showing {filteredData.length} of {auditData.length} findings
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CorporateAudit;
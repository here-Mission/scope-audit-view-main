// // // import { useState, useEffect } from 'react';
// // // import * as XLSX from 'xlsx';
// // // import { AuditFinding } from '@/data/auditData';

// // // export const useAuditData = () => {
// // //   const [data, setData] = useState<AuditFinding[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const loadExcelData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);

// // //         const response = await fetch('/audit-data.xlsx');
// // //         if (!response.ok) {
// // //           throw new Error('Excel file not found');
// // //         }

// // //         const arrayBuffer = await response.arrayBuffer();
// // //         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// // //         const sheetName = workbook.SheetNames[0];
// // //         const worksheet = workbook.Sheets[sheetName];
// // //         const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

// // //         console.log('Raw Excel data sample:', jsonData[0]);

// // //         const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
// // //           const actionNumber = String(row['Action Number'] || '').trim();
// // //           const auditStatus = String(row['Audit Status'] || 'Open').trim();
// // //           const findingCategory = String(row['Finding Category'] || 'Medium').trim();
// // //           const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
// // //           const likelihood = String(row['Finding Likelihood'] || '').trim();
// // //           const findingName = String(row['Finding Name'] || '').trim();
// // //           const responsible = String(row['Responsible'] || '').trim();
// // //           const dueDate = String(row['Due Date'] || '').trim();
// // //           const department = String(row['Implementing Department'] || '').trim();
// // //           const year = String(row['Plan Year'] || '').trim();

// // //           // Calculate isOverdue properly
// // //           let isOverdue = false;
// // //           if (auditStatus !== 'Closed' && dueDate) {
// // //             try {
// // //               isOverdue = new Date(dueDate) < new Date();
// // //             } catch (e) {
// // //               isOverdue = false;
// // //             }
// // //           }

// // //           return {
// // //             actionNumber,
// // //             status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
// // //             category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
// // //             impact: findingImpact,
// // //             likelihood: likelihood,
// // //             findingName,
// // //             responsible,
// // //             dueDate,
// // //             department,
// // //             year,
// // //             isOverdue,
// // //           } as AuditFinding;
// // //         });

// // //         console.log('✅ Successfully loaded', auditFindings.length, 'records');
// // //         setData(auditFindings);
// // //       } catch (err) {
// // //         const errorMsg = err instanceof Error ? err.message : 'Unknown error';
// // //         console.error('❌ Error loading Excel data:', errorMsg);
// // //         setError(errorMsg);
// // //         setData([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadExcelData();
// // //   }, []);

// // //   return { data, loading, error };
// // // };
// // import { useState, useEffect } from 'react';
// // import * as XLSX from 'xlsx';
// // import { AuditFinding } from '@/data/auditData';

// // export const useAuditData = () => {
// //   const [data, setData] = useState<AuditFinding[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const loadExcelData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         // Azure Blob Storage SAS URL
// //         const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;
        
// //         if (!blobSasUrl) {
// //           throw new Error('Azure Blob SAS URL not configured in environment variables');
// //         }

// //         // Fetch the Excel file from Azure Blob
// //         const response = await fetch(`${blobSasUrl}/audit-Audit%20Findings%20List.xlsx`);
        
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch file: ${response.statusText}`);
// //         }

// //         const arrayBuffer = await response.arrayBuffer();
// //         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// //         const sheetName = workbook.SheetNames[0];
// //         const worksheet = workbook.Sheets[sheetName];
// //         const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

// //         console.log('Raw Excel data sample:', jsonData[0]);

// //         const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
// //           const actionNumber = String(row['Action Number'] || '').trim();
// //           const auditStatus = String(row['Audit Status'] || 'Open').trim();
// //           const findingCategory = String(row['Finding Category'] || 'Medium').trim();
// //           const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
// //           const likelihood = String(row['Finding Likelihood'] || '').trim();
// //           const findingName = String(row['Finding Name'] || '').trim();
// //           const responsible = String(row['Responsible'] || '').trim();
// //           const dueDate = String(row['Due Date'] || '').trim();
// //           const department = String(row['Implementing Department'] || '').trim();
// //           const year = String(row['Plan Year'] || '').trim();

// //           // Calculate isOverdue properly
// //           let isOverdue = false;
// //           if (auditStatus !== 'Closed' && dueDate) {
// //             try {
// //               isOverdue = new Date(dueDate) < new Date();
// //             } catch (e) {
// //               isOverdue = false;
// //             }
// //           }

// //           return {
// //             actionNumber,
// //             status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
// //             category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
// //             impact: findingImpact,
// //             likelihood: likelihood,
// //             findingName,
// //             responsible,
// //             dueDate,
// //             department,
// //             year,
// //             isOverdue,
// //           } as AuditFinding;
// //         });

// //         console.log('✅ Successfully loaded', auditFindings.length, 'records from Azure Blob');
// //         setData(auditFindings);
// //       } catch (err) {
// //         const errorMsg = err instanceof Error ? err.message : 'Unknown error';
// //         console.error('❌ Error loading Excel data from Azure Blob:', errorMsg);
// //         setError(errorMsg);
// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadExcelData();
// //   }, []);

// //   const refreshData = async () => {
// //     const loadExcelData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;
        
// //         if (!blobSasUrl) {
// //           throw new Error('Azure Blob SAS URL not configured');
// //         }

// //         const response = await fetch(`${blobSasUrl}/audit-Audit%20Findings%20List.xlsx`);
        
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch file: ${response.statusText}`);
// //         }

// //         const arrayBuffer = await response.arrayBuffer();
// //         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// //         const sheetName = workbook.SheetNames[0];
// //         const worksheet = workbook.Sheets[sheetName];
// //         const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

// //         const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
// //           const actionNumber = String(row['Action Number'] || '').trim();
// //           const auditStatus = String(row['Audit Status'] || 'Open').trim();
// //           const findingCategory = String(row['Finding Category'] || 'Medium').trim();
// //           const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
// //           const likelihood = String(row['Finding Likelihood'] || '').trim();
// //           const findingName = String(row['Finding Name'] || '').trim();
// //           const responsible = String(row['Responsible'] || '').trim();
// //           const dueDate = String(row['Due Date'] || '').trim();
// //           const department = String(row['Implementing Department'] || '').trim();
// //           const year = String(row['Plan Year'] || '').trim();

// //           let isOverdue = false;
// //           if (auditStatus !== 'Closed' && dueDate) {
// //             try {
// //               isOverdue = new Date(dueDate) < new Date();
// //             } catch (e) {
// //               isOverdue = false;
// //             }
// //           }

// //           return {
// //             actionNumber,
// //             status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
// //             category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
// //             impact: findingImpact,
// //             likelihood: likelihood,
// //             findingName,
// //             responsible,
// //             dueDate,
// //             department,
// //             year,
// //             isOverdue,
// //           } as AuditFinding;
// //         });

// //         console.log('✅ Data refreshed:', auditFindings.length, 'records');
// //         setData(auditFindings);
// //       } catch (err) {
// //         const errorMsg = err instanceof Error ? err.message : 'Unknown error';
// //         console.error('❌ Error refreshing data:', errorMsg);
// //         setError(errorMsg);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     await loadExcelData();
// //   };

// //   return { data, loading, error, refreshData };
// // };


// import { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { AuditFinding } from '@/data/auditData';

// export const useAuditData = () => {
//   const [data, setData] = useState<AuditFinding[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadExcelData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;
        
//         if (!blobSasUrl) {
//           throw new Error('Azure Blob SAS URL not configured in environment variables');
//         }

//         const response = await fetch(`${blobSasUrl}/audit-Audit%20Findings%20List.xlsx`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch file: ${response.statusText}`);
//         }

//         const arrayBuffer = await response.arrayBuffer();
//         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

//         console.log('Raw Excel data sample:', jsonData[0]);

//         const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
//           const actionNumber = String(row['Action Number'] || '').trim();
//           const auditStatus = String(row['Audit Status'] || 'Open').trim();
//           const findingCategory = String(row['Finding Category'] || 'Medium').trim();
//           const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
//           const likelihood = String(row['Finding Likelihood'] || '').trim();
//           const findingName = String(row['Finding Name'] || '').trim();
//           const responsible = String(row['Responsible'] || '').trim();
//           const dueDate = String(row['Due Date'] || '').trim();
//           const department = String(row['Implementing Department'] || '').trim();
//           const year = String(row['Plan Year'] || '').trim();

//           let isOverdue = false;
//           if (auditStatus !== 'Closed' && dueDate) {
//             try {
//               isOverdue = new Date(dueDate) < new Date();
//             } catch (e) {
//               isOverdue = false;
//             }
//           }

//           return {
//             actionNumber,
//             status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
//             category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
//             impact: findingImpact,
//             likelihood: likelihood,
//             findingName,
//             responsible,
//             dueDate,
//             department,
//             year,
//             isOverdue,
//           } as AuditFinding;
//         });

//         console.log('✅ Successfully loaded', auditFindings.length, 'records from Azure Blob');
//         setData(auditFindings);
//       } catch (err) {
//         const errorMsg = err instanceof Error ? err.message : 'Unknown error';
//         console.error('❌ Error loading Excel data from Azure Blob:', errorMsg);
//         setError(errorMsg);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadExcelData();
//   }, []);

//   const refreshData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;

//       if (!blobSasUrl) {
//         throw new Error('Azure Blob SAS URL not configured');
//       }

//       const response = await fetch(`${blobSasUrl}/audit-Audit%20Findings%20List.xlsx`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch file: ${response.statusText}`);
//       }

//       const arrayBuffer = await response.arrayBuffer();
//       const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

//       const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
//         const actionNumber = String(row['Action Number'] || '').trim();
//         const auditStatus = String(row['Audit Status'] || 'Open').trim();
//         const findingCategory = String(row['Finding Category'] || 'Medium').trim();
//         const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
//         const likelihood = String(row['Finding Likelihood'] || '').trim();
//         const findingName = String(row['Finding Name'] || '').trim();
//         const responsible = String(row['Responsible'] || '').trim();
//         const dueDate = String(row['Due Date'] || '').trim();
//         const department = String(row['Implementing Department'] || '').trim();
//         const year = String(row['Plan Year'] || '').trim();

//         let isOverdue = false;
//         if (auditStatus !== 'Closed' && dueDate) {
//           try {
//             isOverdue = new Date(dueDate) < new Date();
//           } catch (e) {
//             isOverdue = false;
//           }
//         }

//         return {
//           actionNumber,
//           status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
//           category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
//           impact: findingImpact,
//           likelihood: likelihood,
//           findingName,
//           responsible,
//           dueDate,
//           department,
//           year,
//           isOverdue,
//         } as AuditFinding;
//       });

//       console.log('✅ Data refreshed:', auditFindings.length, 'records');
//       setData(auditFindings);
//     } catch (err) {
//       const errorMsg = err instanceof Error ? err.message : 'Unknown error';
//       console.error('❌ Error refreshing data:', errorMsg);
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, refreshData };
// };
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { AuditFinding } from '@/data/auditData';

export const useAuditData = () => {
  const [data, setData] = useState<AuditFinding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        setError(null);

        const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;
        
        if (!blobSasUrl) {
          throw new Error('Azure Blob SAS URL not configured in environment variables');
        }

        // ✅ FIXED: Changed from "audit-Audit%20Findings%20List.xlsx" to "Audit%20Findings%20List.xlsx"
        const response = await fetch(`${blobSasUrl}/Audit%20Findings%20List.xlsx`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

        console.log('Raw Excel data sample:', jsonData[0]);

        const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
          const actionNumber = String(row['Action Number'] || '').trim();
          const auditStatus = String(row['Audit Status'] || 'Open').trim();
          const findingCategory = String(row['Finding Category'] || 'Medium').trim();
          const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
          const likelihood = String(row['Finding Likelihood'] || '').trim();
          const findingName = String(row['Finding Name'] || '').trim();
          const responsible = String(row['Responsible'] || '').trim();
          const dueDate = String(row['Due Date'] || '').trim();
          const department = String(row['Implementing Department'] || '').trim();
          const year = String(row['Plan Year'] || '').trim();

          let isOverdue = false;
          if (auditStatus !== 'Closed' && dueDate) {
            try {
              isOverdue = new Date(dueDate) < new Date();
            } catch (e) {
              isOverdue = false;
            }
          }

          return {
            actionNumber,
            status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
            category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
            impact: findingImpact,
            likelihood: likelihood,
            findingName,
            responsible,
            dueDate,
            department,
            year,
            isOverdue,
          } as AuditFinding;
        });

        console.log('✅ Successfully loaded', auditFindings.length, 'records from Azure Blob');
        setData(auditFindings);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('❌ Error loading Excel data from Azure Blob:', errorMsg);
        setError(errorMsg);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadExcelData();
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      const blobSasUrl = import.meta.env.VITE_AZURE_BLOB_SAS_URL;

      if (!blobSasUrl) {
        throw new Error('Azure Blob SAS URL not configured');
      }

      // ✅ FIXED: Changed from "audit-Audit%20Findings%20List.xlsx" to "Audit%20Findings%20List.xlsx"
      const containerUrl = import.meta.env.VITE_AZURE_BLOB_CONTAINER_URL;
      const sasToken = import.meta.env.VITE_AZURE_BLOB_SAS_TOKEN;
      const fileName = "Audit%20Findings%20List.xlsx";
      // Construct URL properly
      const url = `${containerUrl}/${fileName}${sasToken}`;
      const response = await fetch(url);


      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

      const auditFindings: AuditFinding[] = jsonData.map((row: any) => {
        const actionNumber = String(row['Action Number'] || '').trim();
        const auditStatus = String(row['Audit Status'] || 'Open').trim();
        const findingCategory = String(row['Finding Category'] || 'Medium').trim();
        const findingImpact = String(row['Finding Impact'] || 'Medium').trim();
        const likelihood = String(row['Finding Likelihood'] || '').trim();
        const findingName = String(row['Finding Name'] || '').trim();
        const responsible = String(row['Responsible'] || '').trim();
        const dueDate = String(row['Due Date'] || '').trim();
        const department = String(row['Implementing Department'] || '').trim();
        const year = String(row['Plan Year'] || '').trim();

        let isOverdue = false;
        if (auditStatus !== 'Closed' && dueDate) {
          try {
            isOverdue = new Date(dueDate) < new Date();
          } catch (e) {
            isOverdue = false;
          }
        }

        return {
          actionNumber,
          status: (auditStatus === 'Closed' ? 'Closed' : auditStatus === 'Re-opened' ? 'Re-opened' : 'Open') as 'Open' | 'Closed' | 'Re-opened',
          category: (findingCategory as 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium'),
          impact: findingImpact,
          likelihood: likelihood,
          findingName,
          responsible,
          dueDate,
          department,
          year,
          isOverdue,
        } as AuditFinding;
      });

      console.log('✅ Data refreshed:', auditFindings.length, 'records');
      setData(auditFindings);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ Error refreshing data:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  

  return { data, loading, error, refreshData };
};
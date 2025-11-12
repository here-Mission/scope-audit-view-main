// export interface AuditFinding {
//   actionNumber: string;
//   status: 'Open' | 'Closed' | 'Re-opened';
//   category: 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium';
//   impact: 'Extreme' | 'Severe' | 'High' | 'Moderate' | 'Medium';
//   likelihood: string;
//   findingName: string;
//   responsible: string;
//   dueDate: string;
//   department: string;
//   year: string;
//   isOverdue: boolean;
// }


// export const auditData: AuditFinding[] = [
//   {
//     actionNumber: "008-003",
//     status: "Closed",
//     category: "Medium",
//     impact: "Medium",
//     findingName: "Central SITS OT Solutions",
//     responsible: "Peter Dornheim",
//     likelihood: "2 - Likely",
//     dueDate: "2023-07-15",
//     department: "TT/ICS",
//     year: "2023",
//     isOverdue: false
//   },
//   {
//     actionNumber: "001-002",
//     status: "Re-opened",
//     category: "F2 - Finding",
//     impact: "Extreme",
//     findingName: "Information Security",
//     responsible: "Oliver Thron",
//     likelihood: "2 - Likely",
//     dueDate: "2024-07-15",
//     department: "TT/IME",
//     year: "2024",
//     isOverdue: true
//   },
//   {
//     actionNumber: "02-001",
//     status: "Open",
//     category: "F1 - Finding",
//     impact: "Extreme",
//     findingName: "Infrastructure Vulnerability Management",
//     responsible: "Raghavendra Vaidya",
//     likelihood: "2 - Likely",
//     dueDate: "2026-03-14",
//     department: "TT/I",
//     year: "2025",
//     isOverdue: false
//   },
//   {
//     actionNumber: "001-001",
//     status: "Open",
//     category: "F2 - Finding",
//     impact: "Severe",
//     findingName: "Network Security Management",
//     responsible: "Raghavendra Vaidya",
//     likelihood: "2 - Likely",
//     dueDate: "2025-07-15",
//     department: "TT/I",
//     year: "2024",
//     isOverdue: false
//   },
//   {
//     actionNumber: "002-001",
//     status: "Closed",
//     category: "High",
//     impact: "High",
//     findingName: "Third Party Cyber Risk Management",
//     responsible: "Raghavendra Vaidya",
//     likelihood: "2 - Likely",
//     dueDate: "2024-07-15",
//     department: "TT/I",
//     year: "2023",
//     isOverdue: false
//   },
//   {
//     actionNumber: "003-001",
//     status: "Open",
//     category: "Medium",
//     impact: "Moderate",
//     findingName: "SIEM Integration",
//     responsible: "Peter Dornheim",
//     likelihood: "2 - Likely",
//     dueDate: "2025-03-15",
//     department: "TT/ICS",
//     year: "2024",
//     isOverdue: false
//   },
//   {
//     actionNumber: "004-001",
//     status: "Open",
//     category: "F2 - Finding",
//     impact: "Severe",
//     findingName: "Endpoint Protection",
//     responsible: "Felix Solis Cruz",
//     likelihood: "2 - Likely",
//     dueDate: "2024-03-15",
//     department: "TT/IIN",
//     year: "2024",
//     isOverdue: true
//   },
//   {
//     actionNumber: "005-001",
//     status: "Closed",
//     category: "Medium",
//     impact: "Moderate",
//     findingName: "Vulnerability Management",
//     responsible: "Peter Dornheim",
//     likelihood: "2 - Likely",
//     dueDate: "2023-12-15",
//     department: "TT/ICS",
//     year: "2023",
//     isOverdue: false
//   },
//   {
//     actionNumber: "006-001",
//     status: "Open",
//     category: "F1 - Finding",
//     impact: "Extreme",
//     findingName: "Identity and Access Management",
//     responsible: "Raghavendra Vaidya",
//     likelihood: "2 - Likely",
//     dueDate: "2025-07-15",
//     department: "TT/I",
//     year: "2023",
//     isOverdue: false
//   },
//   {
//     actionNumber: "007-001",
//     status: "Open",
//     category: "F2 - Finding",
//     impact: "Severe",
//     findingName: "Application Management",
//     responsible: "Andreas Kurfiss",
//     likelihood: "2 - Likely",
//     dueDate: "2025-09-15",
//     department: "TT/IEG",
//     year: "2025",
//     isOverdue: false
//   }
// ];
export interface AuditFinding {
  actionNumber: string;
  status: 'Open' | 'Closed' | 'Re-opened';
  category: 'F1 - Finding' | 'F2 - Finding' | 'High' | 'Medium';
  impact: string;
  likelihood: string;
  findingName: string;
  responsible: string;
  dueDate: string;
  department: string;
  year: string;
  isOverdue: boolean;
}

export const auditData: AuditFinding[] = [
  {
    actionNumber: "008-003",
    status: "Closed",
    category: "Medium",
    impact: "Medium",
    findingName: "Central SITS OT Solutions",
    responsible: "Peter Dornheim",
    likelihood: "2 - Likely",
    dueDate: "2023-07-15",
    department: "TT/ICS",
    year: "2023",
    isOverdue: false,
  },
  {
    actionNumber: "001-002",
    status: "Re-opened",
    category: "F2 - Finding",
    impact: "Extreme",
    findingName: "Information Security",
    responsible: "Oliver Thron",
    likelihood: "2 - Likely",
    dueDate: "2024-07-15",
    department: "TT/IME",
    year: "2024",
    isOverdue: true,
  },
  {
    actionNumber: "02-001",
    status: "Open",
    category: "F1 - Finding",
    impact: "Extreme",
    findingName: "Infrastructure Vulnerability Management",
    responsible: "Raghavendra Vaidya",
    likelihood: "2 - Likely",
    dueDate: "2026-03-14",
    department: "TT/I",
    year: "2025",
    isOverdue: false,
  },
  {
    actionNumber: "001-001",
    status: "Open",
    category: "F2 - Finding",
    impact: "Severe",
    findingName: "Network Security Management",
    responsible: "Raghavendra Vaidya",
    likelihood: "2 - Likely",
    dueDate: "2025-07-15",
    department: "TT/I",
    year: "2024",
    isOverdue: false,
  },
  {
    actionNumber: "002-001",
    status: "Closed",
    category: "High",
    impact: "High",
    findingName: "Third Party Cyber Risk Management",
    responsible: "Raghavendra Vaidya",
    likelihood: "2 - Likely",
    dueDate: "2024-07-15",
    department: "TT/I",
    year: "2023",
    isOverdue: false,
  },
  {
    actionNumber: "003-001",
    status: "Open",
    category: "Medium",
    impact: "Moderate",
    findingName: "SIEM Integration",
    responsible: "Peter Dornheim",
    likelihood: "2 - Likely",
    dueDate: "2025-03-15",
    department: "TT/ICS",
    year: "2024",
    isOverdue: false,
  },
  {
    actionNumber: "004-001",
    status: "Open",
    category: "F2 - Finding",
    impact: "Severe",
    findingName: "Endpoint Protection",
    responsible: "Felix Solis Cruz",
    likelihood: "2 - Likely",
    dueDate: "2024-03-15",
    department: "TT/IIN",
    year: "2024",
    isOverdue: true,
  },
  {
    actionNumber: "005-001",
    status: "Closed",
    category: "Medium",
    impact: "Moderate",
    findingName: "Vulnerability Management",
    responsible: "Peter Dornheim",
    likelihood: "2 - Likely",
    dueDate: "2023-12-15",
    department: "TT/ICS",
    year: "2023",
    isOverdue: false,
  },
  {
    actionNumber: "006-001",
    status: "Open",
    category: "F1 - Finding",
    impact: "Extreme",
    findingName: "Identity and Access Management",
    responsible: "Raghavendra Vaidya",
    likelihood: "2 - Likely",
    dueDate: "2025-07-15",
    department: "TT/I",
    year: "2023",
    isOverdue: false,
  },
  {
    actionNumber: "007-001",
    status: "Open",
    category: "F2 - Finding",
    impact: "Severe",
    findingName: "Application Management",
    responsible: "Andreas Kurfiss",
    likelihood: "2 - Likely",
    dueDate: "2025-09-15",
    department: "TT/IEG",
    year: "2025",
    isOverdue: false,
  },
];

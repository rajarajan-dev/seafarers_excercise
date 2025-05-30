import {
  Category,
  DocumentStatus,
  DocumentType,
} from "../types/PreDepartureDocsTypes";
const PreDepartureDocList: { categories: Category[] } = {
  categories: [
    {
      id: "certificates",
      title: "Certificates",
      documents: [
        {
          id: "arpa-cert",
          name: "Autom. Radar Plotting Aids (ARPA) CERT",
          nationality: "",
          docNumber: "",
          issueDate: "2022-04-24",
          expiryDate: "2027-04-24",
          type: "AttentionRequired" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "gmdss-cert",
          name: "GMDSS GOC",
          nationality: "RUS",
          docNumber: "5543/8823",
          issueDate: "",
          expiryDate: "",
          type: "Optional" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "gmdss-aort",
          name: "GMDSS GOC",
          nationality: "RUS",
          docNumber: "5543/8823",
          issueDate: "",
          expiryDate: "",
          type: "Optional" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-cert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-bert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-dert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-eert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-fert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-gert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-hert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "bst-iert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Todo" as DocumentStatus,
        },
        {
          id: "pscrb-cert",
          name: "Proficiency in Survival Craft and Rescue Boats (PSCRB)",
          nationality: "RUS",
          docNumber: "1190/7721",
          issueDate: "2021-01-20",
          expiryDate: "2026-01-20",
          type: "Mandatory" as DocumentType,
          status: "Done" as DocumentStatus,
        },
        {
          id: "adv-firefighting-cert",
          name: "Advanced Fire Fighting Certificate",
          nationality: "RUS",
          docNumber: "2201/3321",
          issueDate: "2022-08-25",
          expiryDate: "2027-08-25",
          type: "Optional" as DocumentType,
          status: "Skipped" as DocumentStatus,
        },
        {
          id: "bst-jert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "9823/1188",
          issueDate: "2020-06-10",
          expiryDate: "2025-06-10",
          type: "Mandatory" as DocumentType,
          status: "Done" as DocumentStatus,
        },
      ],
    },
    {
      id: "medical",
      title: "Medical",
      documents: [
        {
          id: "vaccination-cert",
          name: "Vaccination Certificate",
          nationality: "RUS",
          docNumber: "697-076/22-01C",
          issueDate: "2023-03-05",
          expiryDate: "2028-03-05",
          type: "Optional" as DocumentType,
          status: "Pending" as DocumentStatus,
        },
        {
          id: "covid-cert",
          name: "COVID-19 Test Certificate",
          nationality: "RUS",
          docNumber: "7583-11/RU",
          issueDate: "2024-12-01",
          expiryDate: "2025-12-01",
          type: "Optional" as DocumentType,
          status: "Skipped" as DocumentStatus,
        },
      ],
    },
  ],
};

export default PreDepartureDocList;

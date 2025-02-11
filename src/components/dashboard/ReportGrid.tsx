import React from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  title: string;
  description: string;
  reports: {
    id: string;
    name: string;
    description: string;
    isFavorite: boolean;
  }[];
}

interface ReportGridProps {
  categories?: Category[];
  onPreviewReport?: (categoryId: string, reportId: string) => void;
  onDownloadReport?: (categoryId: string, reportId: string) => void;
  onToggleFavorite?: (categoryId: string, reportId: string) => void;
  onManageReports?: () => void;
}

const ReportGrid = ({
  categories = [
    {
      id: "1",
      title: "General Management",
      description: "Key management reports and metrics",
      reports: [
        {
          id: "1",
          name: "Executive Dashboard",
          description: "High-level business overview",
          isFavorite: true,
        },
        {
          id: "2",
          name: "Performance Metrics",
          description: "KPIs and performance indicators",
          isFavorite: false,
        },
      ],
    },
    {
      id: "2",
      title: "Purchasing",
      description: "Procurement and vendor reports",
      reports: [
        {
          id: "3",
          name: "Vendor Analysis",
          description: "Vendor performance and spending",
          isFavorite: false,
        },
        {
          id: "4",
          name: "Purchase Orders",
          description: "Active and completed POs",
          isFavorite: true,
        },
      ],
    },
    {
      id: "3",
      title: "Sales",
      description: "Sales and revenue analytics",
      reports: [
        {
          id: "5",
          name: "Revenue Report",
          description: "Monthly revenue breakdown",
          isFavorite: true,
        },
        {
          id: "6",
          name: "Sales Pipeline",
          description: "Upcoming opportunities",
          isFavorite: false,
        },
      ],
    },
  ],
  onPreviewReport = () => {},
  onDownloadReport = () => {},
  onToggleFavorite = () => {},
  onManageReports = () => {},
}: ReportGridProps) => {
  return (
    <div className="w-full min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              reports={category.reports}
              onPreview={(reportId) => onPreviewReport(category.id, reportId)}
              onDownload={(reportId) => onDownloadReport(category.id, reportId)}
              onToggleFavorite={(reportId) =>
                onToggleFavorite(category.id, reportId)
              }
              onManage={onManageReports}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGrid;

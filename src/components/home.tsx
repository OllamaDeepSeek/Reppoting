import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import ReportGrid from "./dashboard/ReportGrid";
import ReportPreviewDialog from "./dashboard/ReportPreviewDialog";

interface HomeProps {
  initialTheme?: "light" | "dark";
  userName?: string;
  userEmail?: string;
}

// Define the Category type
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

const Home = ({
  initialTheme = "light",
  userName = "John Doe",
  userEmail = "john.doe@company.com",
}: HomeProps) => {
  const navigate = useNavigate();

  const handleManageReports = () => {
    navigate("/manage-reports");
  };
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories") || "null") || [
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
    ],
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  // Initialize theme on mount
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<
    {
      id: string;
      name: string;
      category: string;
      uploadDate: string;
      fileSize: string;
    }[]
  >(JSON.parse(localStorage.getItem("reportFiles") || "null") || []);

  // Watch for changes in uploaded files
  React.useEffect(() => {
    const handleStorageChange = () => {
      const files =
        JSON.parse(localStorage.getItem("reportFiles") || "null") || [];
      setUploadedFiles(files);

      // Update the Purchasing category's Vendor Analysis description if there's a new file
      const latestFile = files[files.length - 1];
      if (latestFile && latestFile.category === "Purchasing") {
        const updatedCategories = categories.map((category) => {
          if (category.title === "Purchasing") {
            return {
              ...category,
              reports: category.reports.map((report) => {
                if (report.name === "Vendor Analysis") {
                  return {
                    ...report,
                    description: "privision",
                  };
                }
                return report;
              }),
            };
          }
          return category;
        });
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [categories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Update the class on document.documentElement
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  const handlePreviewReport = (categoryId: string, reportId: string) => {
    // Find the report in the categories
    const category = categories.find((cat) => cat.id === categoryId);
    const report = category?.reports.find((rep) => rep.id === reportId);

    if (report) {
      setSelectedReport({
        id: reportId,
        name: report.name,
        description: report.description,
      });
    }
  };

  const handleDownloadReport = (categoryId: string, reportId: string) => {
    console.log(`Downloading report ${reportId} from category ${categoryId}`);
  };

  const handleToggleFavorite = (categoryId: string, reportId: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          reports: category.reports.map((report) => {
            if (report.id === reportId) {
              return { ...report, isFavorite: !report.isFavorite };
            }
            return report;
          }),
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearch={handleSearch}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
        userName={userName}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Enterprise Reports</h1>
            <p className="text-muted-foreground mt-2">
              Access and manage your business reports
            </p>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">
                Recently Uploaded Files
              </h3>
              <ul className="space-y-1">
                {uploadedFiles.slice(0, 3).map((file) => (
                  <li
                    key={file.id}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                      {file.name.split(".").pop()}
                    </span>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ReportGrid
          categories={categories}
          onPreviewReport={handlePreviewReport}
          onDownloadReport={handleDownloadReport}
          onToggleFavorite={handleToggleFavorite}
          onManageReports={handleManageReports}
        />
      </main>

      {selectedReport && (
        <ReportPreviewDialog
          open={!!selectedReport}
          onOpenChange={(open) => !open && setSelectedReport(null)}
          reportData={selectedReport}
          onDownload={(reportId) =>
            console.log(`Downloading report ${reportId}`)
          }
        />
      )}
    </div>
  );
};

export default Home;

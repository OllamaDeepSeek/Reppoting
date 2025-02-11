import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  fileSize: string;
}

const ManageReports = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<Report[]>(
    JSON.parse(localStorage.getItem("reportFiles") || "null") || [
      {
        id: "1",
        name: "Q1 Financial Summary.xlsx",
        category: "General Management",
        uploadDate: "2024-04-10",
        fileSize: "2.5 MB",
      },
      {
        id: "2",
        name: "Vendor Analysis 2024.xlsx",
        category: "Purchase Management",
        uploadDate: "2024-04-09",
        fileSize: "1.8 MB",
      },
    ],
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newReport: Report = {
        id: Date.now().toString(),
        name: file.name,
        category: "Purchasing",
        uploadDate: new Date().toISOString().split("T")[0],
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };

      // Update local state
      const updatedFiles = [...files, newReport];
      setFiles(updatedFiles);

      // Save to localStorage
      localStorage.setItem("reportFiles", JSON.stringify(updatedFiles));

      // Update categories in localStorage to change Vendor Analysis description
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      const updatedCategories = categories.map((category: any) => {
        if (category.title === "Purchasing") {
          return {
            ...category,
            reports: category.reports.map((report: any) => {
              if (report.name === "Vendor Analysis") {
                return { ...report, description: "privision" };
              }
              return report;
            }),
          };
        }
        return category;
      });
      localStorage.setItem("categories", JSON.stringify(updatedCategories));

      // Trigger storage event for Home component to update
      window.dispatchEvent(new Event("storage"));

      // Clear the input
      event.target.value = "";
    }
  };

  const handleDelete = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem("reportFiles", JSON.stringify(updatedFiles));
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Manage Reports</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Upload New Report</h2>
          <p className="text-sm text-muted-foreground">
            Add new Excel reports to the system
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".xlsx,.xls"
            className="w-[300px]"
            onChange={handleFileUpload}
          />
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.category}</TableCell>
                <TableCell>{file.uploadDate}</TableCell>
                <TableCell>{file.fileSize}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageReports;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Star, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Report {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

interface CategoryCardProps {
  title?: string;
  description?: string;
  reports?: Report[];
  onPreview?: (reportId: string) => void;
  onDownload?: (reportId: string) => void;
  onToggleFavorite?: (reportId: string) => void;
  onManage?: () => void;
}

const CategoryCard = ({
  title = "Category Title",
  description = "Reports and analytics for this category",
  reports = [
    {
      id: "1",
      name: "Monthly Sales Report",
      description: "Overview of monthly sales performance",
      isFavorite: false,
    },
    {
      id: "2",
      name: "Inventory Status",
      description: "Current inventory levels and alerts",
      isFavorite: true,
    },
  ],
  onPreview = () => {},
  onDownload = () => {},
  onToggleFavorite = () => {},
  onManage = () => {},
}: CategoryCardProps) => {
  return (
    <Card className="w-[380px] h-[240px] bg-background">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onManage}>
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage Reports</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="max-h-[120px] overflow-y-auto">
        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium">{report.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {report.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPreview(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview Report</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDownload(report.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Report</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleFavorite(report.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${report.isFavorite ? "fill-yellow-400" : ""}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {report.isFavorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {reports.length} reports available
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;

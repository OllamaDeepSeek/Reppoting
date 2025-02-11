import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface ReportPreviewDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  reportData?: {
    id: string;
    name: string;
    description: string;
    previewUrl?: string;
  };
  onDownload?: (reportId: string) => void;
}

const ReportPreviewDialog = ({
  open = true,
  onOpenChange = () => {},
  reportData = {
    id: "1",
    name: "Sample Report",
    description: "This is a preview of the sample report",
    previewUrl:
      "https://images.unsplash.com/photo-1706018167918-2760d4007b9b?w=800&auto=format&fit=crop",
  },
  onDownload = () => {},
}: ReportPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>{reportData.name}</DialogTitle>
          <DialogDescription>{reportData.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4 border rounded-md my-4">
          {reportData.previewUrl ? (
            <img
              src={reportData.previewUrl}
              alt="Report Preview"
              className="w-full h-auto"
            />
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-muted">
              <p className="text-muted-foreground">Preview not available</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button onClick={() => onDownload(reportData.id)}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreviewDialog;

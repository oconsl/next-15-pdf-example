import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './pdf-document';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FormData } from '@/types/main';
import React from 'react';

interface PDFPreviewDialogProps extends FormData {
  open: boolean;
  onClose: () => void;
}

const PDFPreviewDialog: React.FC<PDFPreviewDialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  description,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogTitle hidden>Previsualización</DialogTitle>
        <PDFViewer width="100%" height="100%" className="py-4">
          <PDFDocument
            title={title}
            subtitle={subtitle}
            description={description}
          />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreviewDialog;

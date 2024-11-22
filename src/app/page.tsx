'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PDFDocument from '@/components/pdf-document';
import PDFPreviewDialog from '@/components/pdf-preview-dialog';
import { FormData } from '@/types/main';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    description: '',
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    const blob = await pdf(
      <PDFDocument
        title={formData.title}
        subtitle={formData.subtitle}
        description={formData.description}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${new Date().toISOString().split('T')[0]}-resumen.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto p-6 max-w-2xl">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="Ingrese el subtítulo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ingrese la descripción"
            rows={6}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setPreviewOpen(true)}
            disabled={!formData.title || !formData.description}
          >
            Previsualizar PDF
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={!formData.title || !formData.description}
            variant="outline"
          >
            Descargar PDF
          </Button>
        </div>
      </form>

      <PDFPreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        {...formData}
      />
    </main>
  );
}

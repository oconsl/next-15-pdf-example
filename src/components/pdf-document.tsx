import { FormData } from '@/types/main';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4b5563',
  },
  description: {
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: 'justify',
    color: '#1f2937',
  },
});

const PDFDocument: React.FC<FormData> = ({ title, subtitle, description }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;

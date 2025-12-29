import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n\n';
  }
  
  return fullText.trim();
}

export function extractTextFromPlainFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function extractResumeText(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
    return extractTextFromPlainFile(file);
  } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    // For Word docs, we'll try to extract as text (works for simple docs)
    // In production, you'd want a more robust solution
    try {
      return await extractTextFromPlainFile(file);
    } catch {
      throw new Error('Word document parsing not fully supported. Please upload a PDF or TXT file.');
    }
  }
  
  throw new Error('Unsupported file format. Please upload a PDF, DOC, DOCX, or TXT file.');
}

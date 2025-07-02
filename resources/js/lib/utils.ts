import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function strLimit(text: string, limit: number = 100, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return '/assets/pdf.png';
    case 'doc':
    case 'docx':
      return '/assets/docx.png';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '/assets/image.png';
    case 'xlsx':
    case 'xls':
      return '/assets/excel.png';
    default:
      return '/assets/file.png';
  }
};

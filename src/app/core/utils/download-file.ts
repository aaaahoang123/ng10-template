import {HttpHeaders} from '@angular/common/http';

export function extractFileNameFromHeader(headers: HttpHeaders): string {
  const fields = headers.get('Content-Disposition');
  return fields
    .split(';')
    .find(field => field.includes('filename'))
    .trim()
    .split('=')
    .find(part => !part.includes('filename'))
    .trim();
}

export function downloadBlob(blob: Blob, filename?: string): void {
  filename = filename || 'download.txt';
  const url = window.URL.createObjectURL(blob);
  const anchorElem = document.createElement('a');
  anchorElem.style.display = 'none';
  anchorElem.href = url;
  anchorElem.download = filename;
  document.body.appendChild(anchorElem);
  anchorElem.click();
  document.body.removeChild(anchorElem);
  // On Edge, revokeObjectURL should be called only after
  // a.click() has completed, at least on EdgeHTML 15.15048
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1000);
}

export function downloadScreenshot(base64: string, filename = 'screenshot.png') {
  const link = document.createElement('a');
  link.href = base64;
  link.download = filename;
  link.click();
}

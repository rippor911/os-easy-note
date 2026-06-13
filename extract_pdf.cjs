const { PDFParse } = require('pdf-parse');
const fs = require('fs');

async function main() {
    const buf = fs.readFileSync('os.2025-期末考试.pdf');
    const pdf = new PDFParse(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength));
    await pdf.load();
    
    const allText = await pdf.getText();
    fs.writeFileSync('os.2025-期末考试.txt', allText.text, 'utf-8');
    console.log(`Saved ${allText.text.length} chars to os.2025-期末考试.txt`);
    
    pdf.destroy();
}

main().catch(e => console.error(e));
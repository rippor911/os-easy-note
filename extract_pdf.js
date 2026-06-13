const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('os.2025-期末考试.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("Pages:", data.numpages);
    console.log("Info:", JSON.stringify(data.info, null, 2));
    console.log("\n=== TEXT ===");
    console.log(data.text);
}).catch(function(err) {
    console.error("Error:", err.message);
});
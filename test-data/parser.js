const fs = require('fs');

// Read the input log file
function parseLogFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Find all metrics sections using regex
    const metricSectionPattern = /--------------------------------------\s+Metrics for period to: ([\d:]+\(\+\d+\)) \(width: [\d.]+s\)\s+--------------------------------------\s+([\s\S]+?)(?=--------------------------------------|\n\s*\n|$)/g;
    
    const results = [];
    let match;
    
    while ((match = metricSectionPattern.exec(data)) !== null) {
      const timestamp = match[1];
      const metricsText = match[2].trim();
      
      // Process the metrics section
      const metrics = { timestamp };
      
      // Process each line of metrics
      const lines = metricsText.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Check if line contains a metric
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        
        let key = line.substring(0, colonIndex).trim();
        const valueSection = line.substring(colonIndex + 1).trim();
        
        // Only process http and vusers metrics
        if (!key.startsWith('http.') && !key.startsWith('vusers.')) continue;
        
        // Handle different metric formats
        if (valueSection.includes('min:') || (i + 1 < lines.length && lines[i + 1].trim().startsWith('min:'))) {
          // This is a header for nested properties (like http.response_time)
          // Process the nested values in subsequent lines
          for (let j = i + 1; j < lines.length; j++) {
            const nestedLine = lines[j].trim();
            if (!nestedLine || !nestedLine.includes(':')) break;
            
            const nestedParts = nestedLine.split(':');
            const nestedKey = nestedParts[0].trim();
            const nestedValueSection = nestedParts[1].trim();
            
            const nestedValue = extractNumericValue(nestedValueSection);
            if (nestedValue !== null) {
              metrics[`${key}.${nestedKey}`] = nestedValue;
            }
          }
          
          // Skip processed nested lines in the next iteration
          while (i + 1 < lines.length && 
                (lines[i + 1].trim().startsWith('min:') || 
                 lines[i + 1].trim().startsWith('max:') || 
                 lines[i + 1].trim().startsWith('mean:') || 
                 lines[i + 1].trim().startsWith('median:') || 
                 lines[i + 1].trim().startsWith('p95:') || 
                 lines[i + 1].trim().startsWith('p99:'))) {
            i++;
          }
        } else {
          // This is a regular metric
          const value = extractNumericValue(valueSection);
          if (value !== null) {
            metrics[key] = value;
          }
        }
      }
      
      results.push(metrics);
    }
    
    return results;
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

// Helper function to extract numeric values from different formats
function extractNumericValue(text) {
  // Format: 123/sec
  const rateMatch = text.match(/(\d+)\/sec/);
  if (rateMatch) return rateMatch[1];
  
  // Format: Regular number at the end of a line with dots
  const numberMatch = text.match(/[\d\.]+$/);
  if (numberMatch) return numberMatch[0];
  
  return null;
}

// Convert metrics to CSV
function convertToCSV(metrics) {
  if (metrics.length === 0) return '';
  
  // Get all unique keys across all metric objects
  const allKeys = new Set();
  metrics.forEach(metric => {
    Object.keys(metric).forEach(key => allKeys.add(key));
  });
  
  // Sort keys for consistent output
  const sortedKeys = Array.from(allKeys).sort();
  
  // Create CSV header
  const header = sortedKeys.join(',');
  
  // Create CSV rows
  const rows = metrics.map(metric => {
    return sortedKeys.map(key => {
      return metric[key] !== undefined ? metric[key] : '';
    }).join(',');
  });
  
  return [header, ...rows].join('\n');
}

// Main function
function main() {
  // Replace with your actual file paths
  const inputFilePath = 'testResult-old.txt';  // Using the name from your document
  const outputFilePath = 'http_vusers_metrics_old.csv';
  
  const metrics = parseLogFile(inputFilePath);
  const csv = convertToCSV(metrics);
  
  // Write to output file
  try {
    fs.writeFileSync(outputFilePath, csv);
    console.log(`CSV file has been created at ${outputFilePath}`);
    console.log(`Extracted ${metrics.length} metric periods`);
  } catch (err) {
    console.error('Error writing CSV file:', err);
  }
}

main();
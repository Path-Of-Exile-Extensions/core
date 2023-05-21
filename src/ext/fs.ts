import * as fs from "fs";
import path from "path";

export function ensureFileExists(filePath: string) {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // Ensure the parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    // Create the file
    fs.writeFileSync(filePath, '');
  }
}

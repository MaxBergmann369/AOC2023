import * as fs from "fs";
import * as os from "os";

export function getLines(path: string): string[] {
    const data = fs.readFileSync(path, "utf-8")
    return data.split(os.EOL);
}
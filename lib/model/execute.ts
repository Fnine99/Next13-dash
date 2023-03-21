import { spawn } from "child_process";

export function dcf(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const pythonProcess = spawn("python3", [
      `${process.env.PYTHON_FILE_PATH}`,
      jsonData,
    ]);
    let infos:any;
    pythonProcess.stdout.on("data", (data) => {
      infos = JSON.parse(data);
    });
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python: ${data}`);
      reject(data);
    });
    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      resolve(infos);
    });
  });
}
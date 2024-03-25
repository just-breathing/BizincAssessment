const fs = require('fs');
const path = require('path');
const getAtlantaTime = require("../Utils/timestampFormat");



// Middleware function for logging request details to a file
  const requestLogger = (req, res, next) => {
  const date = new Date();
  const filePath = `log_${date.getMonth()+1}_${date.getDate()}_${date.getFullYear()}.txt`;
  console.log(filePath)
  const logFilePath = path.join(__dirname, '..','logs',filePath );
  const logMessage = `[${getAtlantaTime(date)}] ${req.method} ${req.url}\n`;

  // Check if the log file exists, if not, create it
  fs.access(logFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, create it
      fs.mkdir(path.dirname(logFilePath), { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
          console.error('Error creating logs directory:', mkdirErr);
        } else {
          // File created, write log message
          writeLog(logFilePath, logMessage);
        }
      });
    } else {
      // File exists, write log message
      writeLog(logFilePath, logMessage);
    }
  });

  next(); // Call next middleware in chain
};

// Function to write log message to file
function writeLog(filePath, message) {
  fs.appendFile(filePath, message, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}


module.exports=requestLogger;
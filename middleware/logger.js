const axios = require("axios");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YW5zaGlrYS5kaXhpdDI1OUBnbWFpbC5jb20iLCJleHAiOjE3NTczMjA0ODksImlhdCI6MTc1NzMxOTU4OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImM2MjFiZWUzLTIyYmItNDM2OC1hZDg2LTgzMGZjNWU1Yzk1YSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhbnNoaWthIGRpeGl0Iiwic3ViIjoiYTU3Y2Q1ZDMtMzVlMC00MTVhLThhZWMtZGExZGY2ZTQ0OTk5In0sImVtYWlsIjoidmFuc2hpa2EuZGl4aXQyNTlAZ21haWwuY29tIiwibmFtZSI6InZhbnNoaWthIGRpeGl0Iiwicm9sbE5vIjoiMjIwMTY0MDEwMDMxNiIsImFjY2Vzc0NvZGUiOiJzQVdUdVIiLCJjbGllbnRJRCI6ImE1N2NkNWQzLTM1ZTAtNDE1YS04YWVjLWRhMWRmNmU0NDk5OSIsImNsaWVudFNlY3JldCI6IkN3V3hGc3ZCTWtESHduSlkifQ.mbcSSmLxxWDuMbrauDnfD93SibK0AfpBJnAtHLEJH7I";

async function Log(stack, level, packageName, message) {
  const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
  try {
    await axios.post(
      LOG_API_URL,
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: packageName.toLowerCase(),
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  } catch (error) {}
}

module.exports = { Log };

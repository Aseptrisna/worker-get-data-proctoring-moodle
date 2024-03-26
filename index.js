require("dotenv").config();
const config = require("./src/config");
const worker = require("./src");

async function main() {
  console.log("Worker run...............");
  await config.connectToMongoDB();
  const mysqlConnection = await config.mysqlConnection();
  await worker.dummyData();
  setInterval(async () => {
    await worker.sqlprocess(mysqlConnection);
  }, 10000);
}

main();

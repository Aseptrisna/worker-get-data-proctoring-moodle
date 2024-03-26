const { connection } = require("mongoose");
const sqlService = require("./service/mysql/index");
const mongoService = require("./service/mongo");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const data = require("../src/data/result.json")

class worker {
  async sqlprocess(connection) {
    const query = await sqlService.getProctoring(connection);
    // console.log(query);
    const user = query[0].faceimage;
    const parts = user.split("/");
    const imageName = parts[parts.length - 1];
    // console.log("Nama file gambar:", imageName);
    const imageParts = imageName.split("-");

    // Dapatkan data dari indeks ke-2
    const imageData = imageParts[2];
    const idCourses = imageParts[3];
    const timestamp = imageParts[4];
    const imageNameWithoutExtension = timestamp.substring(
      0,
      timestamp.lastIndexOf(".")
    );

    console.log("Data dari indeks ke-2:", imageData);
    const queryUser = await sqlService.getDataUser(connection, imageData);
    // console.log(queryUser);

    const timestamps = parseInt(imageNameWithoutExtension);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };

    const formattedDate = new Date(timestamps)
      .toLocaleString("id-ID", options)
      .replace(/\//g, "-")
      .replace(",", "");
    // console.log(
    //   "Timestamp 171142551048 dalam format (DD-MM-YYYY HH:MM:SS):",
    //   formattedDate
    // );

    const queryCourses = await sqlService.getDataCourses(connection, idCourses);
    // console.log(queryCourses);

    const payload = {
      guid: uuidv4(),
      imageURL: query[0].faceimage,
      userID: imageData,
      imageName: imageName,
      username: queryUser[0].username,
      password: queryUser[0].password,
      firstname: queryUser[0].firstname,
      lastname: queryUser[0].lastname,
      email: queryUser[0].email,
      picture: queryUser[0].picture,
      timestamp: Math.round(new Date().getTime() / 1000).toString(),
      datetime: moment().format("DD-MM-YYYY HH:mm:ss"),
      idCourses,
      courseName: queryCourses[0].fullname,
    };
    console.log(payload);
    await mongoService.saveLog(payload);
  }

  async  dummyData() {
    for (let i = 0; i < data.length; i++) {
      console.log("Run data..")
      await mongoService.saveLog(data[i]);
      // Menunggu 1 detik sebelum iterasi berikutnya
      await this.delay(1000); // 1000 milidetik = 1 detik
    }
  }
  
  // Fungsi delay untuk menunggu sebelum melanjutkan iterasi berikutnya
   async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
// this.dummyData();


module.exports = new worker();


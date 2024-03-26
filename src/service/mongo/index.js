const model = require("../../model/mdl_proctoring_face_images");
const result = require("../../model/model_result");

class MongoDB {
  async saveLog(payload) {
    try {
      // Cari entri dengan URL gambar tertentu
      const existingEntry = await model.findOne({ imageURL: payload.imageURL });

      // Jika tidak ada entri yang ditemukan, buat entri baru
      if (!existingEntry) {
        const newEntry = new model(payload);
        await newEntry.save();
        console.log("Data berhasil disimpan.");
      } else {
        console.log("Data sudah ada, proses di-skip.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async saveResult(payload) {
    try {
      await result.create(payload);
      console.log("Data berhasil disimpan.");
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = new MongoDB();

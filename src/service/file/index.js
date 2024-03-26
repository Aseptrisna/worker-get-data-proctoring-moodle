const fs = require('fs');
const path = require('path');
const axios = require('axios');

class File {
    async saveFile(data) {
        try {
            // Unduh file dari URL
            const response = await axios.get(data.imageURL, {
                responseType: 'arraybuffer'
            });

            // Tentukan path lengkap untuk menyimpan file
            const filePath = path.join('C:', 'ASEP TRISNA SETIAWAN', 'FILE', 'DATA', data.userID, data.imageName);

            // Pastikan folder untuk user ID sudah ada
            const userDirectory = path.join('C:', 'ASEP TRISNA SETIAWAN', 'FILE', 'DATA', data.userID);
            if (!fs.existsSync(userDirectory)) {
                fs.mkdirSync(userDirectory, {
                    recursive: true
                });
            }

            // Tulis data file ke dalam file yang ditentukan
            fs.writeFileSync(filePath, Buffer.from(response.data));

            console.log('File berhasil disimpan:', filePath);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = new File();

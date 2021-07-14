const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sharp = require('sharp');
const Promise = require('bluebird');
const booking = require('../models/booking')
const fs = require('fs');
Promise.promisifyAll(fs);

async function uploadImage(filepath,bookingID)
{
    const path = filepath;
    console.log('path = ' + path);
    const raw = await fs.readFileAsync(path);
  
    // Resize image
    const content = await sharp(path)
      .resize(128, 128, { fit: 'inside' })
      .jpeg({ quality: 100 })
      .toBuffer();
    console.log(content);
    // await booking.update(
    //   {
    //     qrcode : content
    //   },
    //   {
    //     where: {
    //       bookingId : bookingID
    //     }
    //   }
    // )
    
} 

module.exports = uploadImage
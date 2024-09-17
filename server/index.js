const express = require("express");
const app = express();
const cors = require("cors");
const { configDotenv } = require("dotenv");
const QRCode = require("qrcode");
const QRCodeReader = require("qrcode-reader");
const { Jimp, BlendMode, JimpMime } = require("jimp");
const morgan = require("morgan");

configDotenv();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.post("/api/v1/qrcode/generate", async (req, res) => {
  try {
    const { data, logo: _logo, color } = req.body;

    const settings = {
      errorCorrectionLevel: "H",
      width: 512,
      margin: 1,
      color: {
        dark: color.dark || "#000000",
        light: color.light || "#ffffff",
      },
    };

    if (!_logo) {
      const qrCode = await QRCode.toDataURL(data, settings);

      res.json({
        qrCode,
      });

      return;
    }
    const qrCodeBuffer = await QRCode.toBuffer(data, settings);
    const qrImage = await Jimp.read(qrCodeBuffer);
    const logo = await Jimp.read(_logo);
    const logoSize = qrImage.bitmap.width / 6; // Logo size is 1/4 of QR code size
    logo.resize({
      w: logoSize,
      h: logoSize,
    });

    // Calculate the position to place the logo (center)
    const xPos = qrImage.bitmap.width / 2 - logoSize / 2;
    const yPos = qrImage.bitmap.height / 2 - logoSize / 2;

    // Place the logo on the QR code
    qrImage.composite(logo, xPos, yPos, {
      mode: BlendMode.SRC_OVER,
      opacitySource: 1,
      opacityDest: 1,
    });

    // Convert the image to base64 and send it as a Data URI
    const qrCodeWithLogo = await qrImage.getBase64(JimpMime.png);

    // Send the QR code with the logo as an image
    res.json({
      qrCode: qrCodeWithLogo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.post("/api/v1/qrcode/read", async (req, res) => {
  try {
    const { qrCode } = req.body;
    const qrImage = await Jimp.read(qrCode);

    const qrCodeReader = new QRCodeReader();
    qrCodeReader.callback = (err, value) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      res.json({
        data: value.result,
      });
    };
    qrCodeReader.decode(qrImage.bitmap);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

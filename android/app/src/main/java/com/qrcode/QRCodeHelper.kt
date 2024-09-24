package com.qrcode

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import com.google.zxing.BarcodeFormat
import com.google.zxing.EncodeHintType
import com.google.zxing.MultiFormatWriter
import com.google.zxing.common.BitMatrix
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel
import java.util.*

object QRCodeHelper {

    fun generateQRCode(
        content: String,
        width: Int,
        height: Int,
        qrColor: Int = Color.BLACK,
        backgroundColor: Int = Color.WHITE,
        logoBitmap: Bitmap? = null,
        errorCorrectionLevel: ErrorCorrectionLevel = ErrorCorrectionLevel.M
    ): Bitmap {
        // Set encoding hints (including error correction level)
        val hints: MutableMap<EncodeHintType, Any> = EnumMap(EncodeHintType::class.java)
        hints[EncodeHintType.CHARACTER_SET] = "UTF-8"
        hints[EncodeHintType.ERROR_CORRECTION] = errorCorrectionLevel
        hints[EncodeHintType.MARGIN] = 2

        // Generate the QR code matrix
        val bitMatrix: BitMatrix = MultiFormatWriter().encode(
            content, BarcodeFormat.QR_CODE, width, height, hints
        )

        // Create a bitmap from the bit matrix with the specified colors
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565)
        for (x in 0 until width) {
            for (y in 0 until height) {
                bitmap.setPixel(x, y, if (bitMatrix[x, y]) qrColor else backgroundColor)
            }
        }

        // If a logo is provided, overlay it onto the center of the QR code
        logoBitmap?.let {
            addLogoToQRCode(bitmap, logoBitmap)
        }

        return bitmap
    }

    // Function to overlay logo onto QR code
    private fun addLogoToQRCode(qrBitmap: Bitmap, logoBitmap: Bitmap) {
        val canvas = Canvas(qrBitmap)
        val scaleFactor = qrBitmap.width / 5 // Logo will be 1/5th the size of the QR code
        val resizedLogo = Bitmap.createScaledBitmap(
            logoBitmap,
            scaleFactor,
            scaleFactor,
            false
        )

        // Calculate the position of the logo (centered)
        val posX = (qrBitmap.width - resizedLogo.width) / 2
        val posY = (qrBitmap.height - resizedLogo.height) / 2

        // Draw the logo onto the QR code bitmap
        canvas.drawBitmap(resizedLogo, posX.toFloat(), posY.toFloat(), null)
    }
}

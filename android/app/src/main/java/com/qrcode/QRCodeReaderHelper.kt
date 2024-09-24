package com.qrcode

import android.graphics.Bitmap
import com.google.zxing.BinaryBitmap
import com.google.zxing.LuminanceSource
import com.google.zxing.MultiFormatReader
import com.google.zxing.RGBLuminanceSource
import com.google.zxing.Result
import com.google.zxing.common.HybridBinarizer

object QRCodeReaderHelper {

    fun readQRCode(bitmap: Bitmap): String? {
        // Convert the Bitmap to int array (RGB)
        val width = bitmap.width
        val height = bitmap.height
        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)

        // Create LuminanceSource from Bitmap's RGB data
        val source: LuminanceSource = RGBLuminanceSource(width, height, pixels)
        val binaryBitmap = BinaryBitmap(HybridBinarizer(source))

        return try {
            // Decode the QR code
            val reader = MultiFormatReader()
            val result: Result = reader.decode(binaryBitmap)
            result.text
        } catch (e: Exception) {
            // Handle exceptions (e.g., QR code not found)
            e.printStackTrace()
            null
        }
    }
}

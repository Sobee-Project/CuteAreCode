package com.qrcode

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel
import java.io.ByteArrayOutputStream

class QRCodeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "QRCodeModule"
    }

    @ReactMethod
    fun generateQRCode(
        content: String,
        width: Int,
        height: Int,
        qrColor: String,
        backgroundColor: String,
        errorCorrection: String,
        logoBase64: String?,
        callback: Callback
    ) {
        try {
            // Decode the logo if provided
            val logoBitmap: Bitmap? = logoBase64?.let {
                val decodedBytes = Base64.decode(it, Base64.DEFAULT)
                BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
            }

            // Get colors from the passed hex strings
            val qrCodeColor = Color.parseColor(qrColor)
            val bgColor = Color.parseColor(backgroundColor)

            // Get the error correction level
            val errorCorrectionLevel = when (errorCorrection.uppercase()) {
                "L" -> ErrorCorrectionLevel.L
                "M" -> ErrorCorrectionLevel.M
                "Q" -> ErrorCorrectionLevel.Q
                "H" -> ErrorCorrectionLevel.H
                else -> ErrorCorrectionLevel.M
            }

            // Generate the QR code with the provided customization options
            val bitmap: Bitmap = QRCodeHelper.generateQRCode(
                content, width, height, qrCodeColor, bgColor, logoBitmap, errorCorrectionLevel
            )

            // Convert the generated QR code bitmap to base64
            val byteArrayOutputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
            val byteArray: ByteArray = byteArrayOutputStream.toByteArray()
            val encoded = Base64.encodeToString(byteArray, Base64.DEFAULT)

            callback.invoke(null, encoded)
        } catch (e: Exception) {
            callback.invoke(e.message, null)
        }
    }

    @ReactMethod
    fun readQRCodeFromBitmap(encodedImage: String, callback: Callback) {
        try {
            // Decode the base64 string to a Bitmap
            val decodedBytes = Base64.decode(encodedImage, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)

            // Read QR Code from the Bitmap
            val qrCodeText = QRCodeReaderHelper.readQRCode(bitmap)
            if (qrCodeText != null) {
                callback.invoke(null, qrCodeText)
            } else {
                callback.invoke("QR Code not found", null)
            }
        } catch (e: Exception) {
            callback.invoke(e.message, null)
        }
    }
}

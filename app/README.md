# CuteAreCode App

This is a QR code app that help you scan and generate QR code built with React Native.

> **Note**: Currently, the app only focuses on support Android.

## Preqrequisites

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)
- Android Studio
- Android Emulator or Physical Device
- React Native CLI

## Installation

1. Install dependencies

```bash
yarn install
```

If you don't have yarn installed, you can install it by running:

```bash
npm install -g yarn
```

2. Create a key.properties file in the android folder

```bash
touch android/key.properties
```

3. Add the following lines to the key.properties file

```properties
storePassword=<your_store_password>
keyPassword=<your_key_password>
keyAlias=<your_key_alias>
storeFile=<your_store_file>
```

Example:

```properties
storePassword=123456
keyPassword=123456
keyAlias=key
storeFile=./release.keystore
```

4. Create a release keystore file

```bash
keytool -genkey -v -keystore <your_store_file> -alias <your_key_alias> -keyalg RSA -keysize 2048 -validity 10000
```

> **Note**: Your keystore file should be in the `android/app` folder. Your `<your_store_file>` and `<your_key_alias>` should be the same as in the key.properties file.

5. Start the app

```bash
yarn start
```

Click on the following options to run the app:

- `a` - To run android
- `i` - To run ios

## Important

- Make sure you have the server running before starting the app. You can view the server [README](../server/README.md) for more information.
- You have to change the `port` in [`instance.ts`](src/services/instance.ts) to your server port.
- If you're using a physical device, make sure you have enabled USB debugging and use network proxy to connect to the server (ngrok).

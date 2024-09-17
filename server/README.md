# CuteAreCode Server

This is the server side of CuteAreCode app. It is built with ExpressJS.

## Prerequisites

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)
- Docker (optional)

## Installation

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=<port>
```

3. Start the server

- Start the server in development mode

```bash
npm run dev
```

- Start the server in production mode

```bash
npm start
```

Your server should be running on `http://localhost:<port>`.

## Installation with Docker

1. Build the Docker image

```bash
docker build -t cutearecode-server .
```

2. Run the Docker container

```bash
docker run -dp 8080:8080 cutearecode-server
```

3. Check the server

```bash
docker ps
```

Your server should be running on `http://localhost:8080`.

## API

### QR Code `api/v1/qrcode`

#### Generate QR Code

- **URL**: `/api/v1/qrcode/generate`
- **Method**: `POST`
- **Request body:**

```json
{
  "data": "string", // data to encode
  "logo": "string", // base64 or url
  "color": {
    "dark": "string", // hex color
    "light": "string" // hex color
  }
}
```

- **Response:**

```json
{
  "qrCode": "string" // base64
}
```

#### Read from QR Code

- **URL**: `/api/v1/qrcode/read`
- **Method**: `POST`
- **Request body:**

```json
{
  "qrCode": "string" // base64
}
```

- **Response:**

```json
{
  "data": "string" // data decoded
}
```

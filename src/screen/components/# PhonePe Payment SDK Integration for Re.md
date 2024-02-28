 # PhonePe Payment SDK Integration for React Native

This React Native component demonstrates how to integrate the PhonePe Payment SDK for Android and iOS. It includes step-by-step instructions on how to initialize the SDK, check if the PhonePe app is installed, and generate a base64-encoded string for payment data.

## Prerequisites

- React Native >= 0.60
- PhonePe Payment SDK for React Native (available on npm)

## Installation

```sh
npm install react-native-phonepe-pg
```

## Usage

### 1. Initialize the SDK

```javascript
import PhonePePaymentSDK from 'react-native-phonepe-pg';

const initializePhonePeSDK = async () => {
  const environmentForSDK = 'TEST'; // or 'PRODUCTION' for production environment
  const merchantId = 'M1EG3MVESPAQ';
  const appId = 'null'; // Pass null if not applicable
  const isDebuggingEnabled = true; // Set to false in production

  try {
    const result = await PhonePePaymentSDK.init(
      environmentForSDK,
      merchantId,
      appId,
      isDebuggingEnabled
    );
    console.log('PhonePe SDK Initialization Result:', result);
  } catch (error) {
    console.error('PhonePe SDK Initialization Error:', error);
  }
};
```

### 2. Check if the PhonePe app is installed

```javascript
PhonePePaymentSDK.isPhonePeInstalled().then(a => {
  if (a) {
    console.log("Message: PhonePe App Installed")
  } else {
    console.log("Message: PhonePe App Unavailable")
  }
})
```

### 3. Generate a base64-encoded string for payment data

```javascript
const base64 = () => {
  try {
    const data = {
      "merchantId": "MERCHANTUAT",
      "merchantTransactionId": "transaction_123",
      "merchantUserId": "90223250",
      "amount": 1000,
      "mobileNumber": "9999999999",
      "callbackUrl": "https://webhook.site/callback-url",
      "paymentInstrument": {
        "

Generated by [BlackboxAI](https://www.blackbox.ai)
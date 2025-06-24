# React Native Calculator App

A modern, themeable calculator app built with React Native and Expo. This README will guide you from project setup to building and installing the app on your Android device.

---

## Features
- Basic arithmetic operations (+, -, ×, ÷)
- Percentage calculation (real calculator logic)
- Backspace (⌫) support
- Light/Dark mode toggle
- Responsive and modern UI

---

## Prerequisites
- **Node.js** (v16 or later recommended)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (`npm install -g eas-cli`)
- **Android Studio** (for local device/emulator testing, optional for cloud builds)
- An [Expo account](https://expo.dev/accounts/dev.siyam/projects/calculator/builds/57feada9-0d13-4a85-8367-b6df300e72ca)

---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/dev-siyamahmed/react-native-calculator.git
cd calculator
```

### 2. Install Dependencies
```sh
yarn install
# or
npm install
```

### 3. Start the Development Server
```sh
npx expo start
```
- Scan the QR code with the Expo Go app (available on Google Play/App Store) to preview the app on your phone.

---

## Building the App for Android

### 1. Log in to Expo
```sh
npx expo login
```

### 2. Install EAS CLI (if not already installed)
```sh
npm install -g eas-cli
# or 
yarn install -g eas-cli
```

### 3. Configure EAS (first time only)
```sh
eas build:configure
```

### 4. Build an APK (for direct install on any Android phone)
```sh
eas build -p android --profile preview --platform android --output=apk
```
- If prompted, allow EAS to create a project for you.
- Wait for the build to finish. You will get a download link in the terminal or on your [Expo dashboard](https://expo.dev/accounts/).

**Note:** If you get an `.aab` file, you cannot install it directly on your phone. Always use the `--profile preview` or set the build profile to output APK.

#### Troubleshooting: Forcing APK Output
If you get an `.aab` file instead of `.apk`, add this to your `eas.json`:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```
Then run:
```sh
eas build -p android --profile preview
```

---

## Installing the APK on Your Phone
1. Download the APK file from the Expo build link.
2. Transfer the APK to your phone (via USB, Google Drive, email, or QR code).
3. On your phone, open the APK file and allow installation from unknown sources if prompted.
4. The app will be installed and ready to use!

---

## Common Issues & Solutions
- **AAB file cannot be installed:** Use APK for direct install. See above for how to force APK output.
- **Android SDK/adb not found:** Install Android Studio and set up `ANDROID_HOME` and `PATH` environment variables.
- **Expo Go app limitations:** Some native features may not work in Expo Go. Use a real build for full functionality.

---

## Useful Commands
- Start development: `npx expo start`
- Build APK: `eas build -p android --profile preview`
- Install dependencies: `yarn install` or `npm install`

---

## License
This project is for educational and personal use. Feel free to modify and use as you wish. 
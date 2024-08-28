# SpotyApp

SpotyApp is a React Native application that allows users to explore and interact with their Spotify playlists, albums, and tracks. The app provides a seamless interface for browsing your Spotify library, playing music, and managing your favorite tracks.

## Features

- **Spotify Authentication**: Securely log in with your Spotify account.
- **Browse Playlists**: View and manage your Spotify playlists.
- **Explore Albums**: Access and explore your saved albums.
- **Track Management**: Search, play, and save your favorite tracks.

## Screens

- **Home**: Displays an overview of your playlists and recently played tracks.
- **Profile**: Showcases your Spotify profile information and playlists.
- **Liked Songs**: Displays your liked songs with playback controls.
- **Search**: Allows you to search for tracks, albums, and artists on Spotify.

## Installation

To run SpotyApp on your local machine, follow these steps:

### Prerequisites

- **Node.js**: Ensure that Node.js (v14.x or higher) is installed.
- **Expo CLI**: Install Expo CLI globally using npm or yarn.
- **Spotify Developer Account**: Set up a Spotify Developer account to obtain the necessary API credentials.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/doombladeoff/SpotyApp
   cd SpotyApp
   ```

2. **Install Dependencies**
   Use npm or yarn to install the required dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Create a .env file in the root of the project and add your Spotify API credentials:

   ```bash
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REDIRECT_URI=your_redirect_uri
   ```

4. **Run the Application**
   Start the Expo development server:

   ```bash
   npx expo start
   ```

5. **Build the Application**
   If you want to build the app for production, you can run the following commands:

   ```bash
   npx expo prebuild
   npx expo build:android
   npx expo build:ios
   ```

Follow the prompts to complete the build process.

**Dependencies**

React Native: The framework used to build the app.
Expo: A framework and platform for universal React applications.
react-native-reanimated: Used for animations within the app.
expo-auth-session: Manages authentication with Spotify.
AsyncStorage: For storing tokens and user data.

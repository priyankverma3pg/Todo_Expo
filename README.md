# Todo App

This is a Todo application built using Expo, React Native, and TypeScript. The app allows users to manage their daily tasks with features such as viewing, editing, deleting, and adding tasks. The app also includes theme switching and a simple UI for better user interaction.

## Features

- View and manage your todos
- Add, edit, and delete tasks
- Toggle between light and dark themes
- View completed and pending tasks
- Offline support (No-sync, but a standalone offline app)
- User-friendly UI with Toast notifications for success/failure messages

## Technologies Used

- **Expo**: For building the React Native app
- **React Navigation**: For navigation between screens
- **TypeScript**: For type safety
- **Styled-components**: For styling the components
- **React Context API**: For global state management (todos, theme)
- **Toast**: For success/error messages
- **Jest**: For Unit testing

## Setup Steps

Follow these steps to get the application up and running on your local machine.

### Prerequisites

- **Node.js** (preferably version 14 or higher)
- **Expo CLI** (for building and running the app)
  - Install Expo CLI globally if you haven't already.

Follow from https://docs.expo.dev/guides/overview/
### 1. Clone the repository

First, clone the repository to your local machine:



```bash
git clone https://github.com/priyankverma3pg/Todo_Expo.git
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
yarn install
```

### 3. Start the Development Server

Run the following command to start the app in development mode:

```bash
expo start

```
This will open Expo's development environment in your browser. From there:

- Scan the QR code using the Expo Go app (available for iOS and Android).
- OR run the app in an emulator.

### 4. Run the App on a Physical Device or Emulator

To test the app on a physical device:

Install the Expo Go app from your respective app store:

- Google Play (for Android)
- App Store (for iOS)

Scan the QR code shown in the terminal when running expo start.

### Folder Structure

Here’s a brief overview of the folder structure of the app:

```bash
__tests__/         # contains test cases

/assets
  /images          # Store images used in the app (e.g., icons, logos)

/components
  /Container       # Shared container components (e.g., Button, Text, Container)
  /GradientCard    # Gradient Card component used for the UI
  /ListingComponent# Displays the list of todos
  /InputModal      # Modal for adding new todos

/screens
  /WelcomeScreen   # The first screen displayed to the user
  /TodoList        # Displays the todo list and manages tasks
  /TodoDetail      # Detailed view for completed and pending todos

/contexts
  /ThemeProvider   # Provides theme context (light/dark mode)
  /TodosProvider   # Provides todos context (global state for todos)

/hooks
  /useFetch        # Custom hook for fetching data from the API

/constants
  /Colors          # Color palette for the app's design
  /ApiConstants    # API base URL and todo types (e.g., completed, pending)
  /Utils           # Utility functions for app logic

/types
  /RootStackParamList # Defines the types for navigation routes
  /Todo            # Type for a Todo object

/App.tsx           # Main entry point of the app

```
### Future Improvements

- Integration with AsyncStorage for offline data persistence.
- Animations for better UI interactions.
- Sync functionality with a backend API.
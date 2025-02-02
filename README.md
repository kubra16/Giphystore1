
# 🚀 React Native Giphy App

This is a **React Native App** that allows users to **search, browse, download, and share GIFs** using the **Giphy API**.

## 🌟 Features
- 🔎 **Search GIFs** using Giphy API
- 📌 **Recent Searches** stored and displayed
- 🎭 **Dark/Light Theme Toggle**
- 🏆 **Trending & Category-Based GIFs**
- ⏳ **Infinite Scrolling for GIFs**
- 🎬 **Play/Pause GIFs inside Modal**
- 📥 **Download GIFs to Gallery**
- 📤 **Share GIFs to WhatsApp & Other Apps**

---

## 📁 **Folder Structure**
# 🚀 React Native Giphy App

This is a **React Native App** that allows users to **search, browse, download, and share GIFs** using the **Giphy API**.

## 🌟 Features
- 🔎 **Search GIFs** using Giphy API
- 📌 **Recent Searches** stored and displayed
- 🎭 **Dark/Light Theme Toggle**
- 🏆 **Trending & Category-Based GIFs**
- ⏳ **Infinite Scrolling for GIFs**
- 🎬 **Play/Pause GIFs inside Modal**
- 📥 **Download GIFs to Gallery**
- 📤 **Share GIFs to WhatsApp & Other Apps**

---

## 📁 **Folder Structure**

src/ │── api/ │ ├── giphyApi.js # Handles API calls to Giphy │ │── components/ │ ├── CategoryTabs.js # Handles category tab selection │ ├── GifList.js # Displays GIFs with infinite scrolling │ ├── TrendingGrid.js # Renders GIFs inside FlatList │ ├── RecentSearches.js # Displays recent searches │ ├── SearchBar.js # Search input field │ ├── ThemeSwitcher.js # Dark/Light mode switch │ │── screens/ │ ├── HomeScreen.js # Main screen managing state │ │── App.js # Entry point for the React Native app │── package.json #

Dependencies & scripts


---

## ⚙️ **Installation & Setup**
### **1️⃣ Install Dependencies**
Run the following command:
```sh
npm install
```


## 2️⃣ **Install Expo Dependencies**

```sh
expo install expo-file-system expo-media-library expo-sharing expo-av @expo/vector-icons
```


## 3️⃣ **Start the App**

npx expo start

## 📡 **API Configuration**

- This app uses Giphy API to fetch trending GIFs.
- Get your Giphy API Key from Giphy Developers and add it to src/api/giphyApi.js:

```sh
export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: 'YOUR_GIPHY_API_KEY', // Replace with your API key
  },
});
```

## 🎬 **How to Use**
- Search for GIFs using the search bar.
- Browse Trending & Categories via the tab bar.
- Tap on a GIF to open it in a modal.
- Play/Pause GIFs inside the modal.
- Download or Share GIFs using the buttons.

## 🛠 **Technologies Used**
- ⚛️ React Native
- ⚡ Expo
- 🖼 Giphy API
- 🎨 Styled Components
- 🔄 React Hooks
- 🎥 Expo-AV (GIF Play/Pause)
- 📂 Expo-FileSystem & MediaLibrary (Download GIFs)
- 📤 Expo-Sharing (Share GIFs)
- 🐛 Troubleshooting


## **❓ GIFs Not Loading?**
Check your Giphy API Key in giphyApi.js


## **❓ Permission Denied on Download?**
Ensure media permissions are enabled in device settings.
Run:
```sh
expo install expo-media-library
```


## **❓ App Not Starting?**

```sh
npx expo start -c
```

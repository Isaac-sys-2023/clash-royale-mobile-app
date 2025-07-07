# 👑 Info Royale

# 🇪🇸 Español

**Info Royale** es una app móvil hecha con **React Native** basada en [RoyaleAPI](https://royaleapi.com) que busca mostrar información relevante para los jugadores de **Clash Royale**:  
- 📋 Cartas favoritas  
- 🔍 Búsqueda de jugadores y clanes  
- 🌎 Top de jugadores por región  

Todo esto aprovechando datos de la [API oficial de Clash Royale](https://developer.clashroyale.com).

---

## ¿Cómo funciona todo?

La API oficial solo permite 10 IPs estáticas. Eso complica las cosas. Pero para ello hicimos la siguiente solucion:

🧩 Se usa **RoyaleAPI como intermediario** para tener una IP estática real.  
🔁 Pero como no se puede hacer fetch directo desde el celular a esa IP, se creó un **backend en Node.js + Express** para actuar como proxy/mediador.

🛠️ El backend está aquí:  
👉 [api-clash-backend](https://github.com/Isaac-sys-2023/api-clash-backend.git)  
Ahí se explica mejor el flujo mágico, y además…  
- Se integra con [FlagCDN](https://flagcdn.com) para mostrar **banderas** de cada país.  
- Se usa [ip-api.com](http://ip-api.com) para detectar tu **ubicación geográfica** y mostrar el ranking regional de tu región como se debe.

> ⚠️ Requiere **SÍ o SÍ** conexión a internet.

---

## 🛠️ ¿Cómo descargo e instalo este proyecto?

### ✅ Paso 1: Clona el repo
```bash
git clone https://github.com/Isaac-sys-2023/clash-royale-mobile-app.git   # HTTPS
# o si prefieres SSH:
git clone git@github.com:Isaac-sys-2023/clash-royale-mobile-app.git
```

### ✅ Paso 2: Instala Node.js
Ve a https://nodejs.org y descarga la versión LTS. Verifica tu instalación con:
```bash
node -v
npm -v
```

### ✅ Paso 3: Inicializa el proyecto
```bash
cd clash-royale-mobile-app
npm install
```

### ✅ Paso 4: Instala las librerías necesarias
```bash
npx expo install react-native-safe-area-context
npm install @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated
npx expo install expo-linear-gradient
npm install react-native-vector-icons
npm install @react-native-community/netinfo
```

### ✅ Paso 5: Haz correr el proyecto
```bash
npx expo start --clear
```

### ✅ Paso 6: Instala Expo Go en tu celular
📲 Disponible en la Play Store o búscalo como “Expo Go”.

### ✅ Paso 7: Escanea el QR
Abre Expo Go, escanea el código QR que apareció en el paso 5...
¡Y listo! Ya estás dentro de Info Royale
No requiere cuenta ni login, solo buen internet.

⚠️ ADVERTENCIA: Tu laptop o PC debe estar en la misma red Wi-Fi que el celular.

---

## Justificacion de las herramientas del Proyecto (¿Porqué?)
### 🤔 ¿Por qué React Native + TypeScript + Expo Go?
Fue una decisión basada en rendimiento y practicidad.  
Android Studio no corre bien en mi máquina, aun con mi Linux instalado (Perdoname Willy, te he fallado), y Flutter tarda más en compilar y construir la aplicación.  
Ya tenía experiencia previa con React + TypeScript, así que opté por lo que me permitía avanzar más rápido sin comprometer la calidad.

### 📱 ¿Para qué sirve `react-native-safe-area-context`?
Esta librería asegura que el contenido de la app no se vea tapado por las barras superiores o inferiores del sistema en distintos dispositivos.  
En resumen, mejora la presentación general y experiencia del usuario.

### 🧭 ¿Para qué se usan estas librerías?
```bash
npm install @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

Estas librerías permiten una navegación fluida y estructurada:

- @react-navigation/native: sistema de navegación base.
- @react-navigation/drawer: menú lateral desplegable.
- react-native-gesture-handler y react-native-reanimated: permiten animaciones suaves y soporte táctil adecuado.

### 🧭 ¿Por qué usar expo-linear-gradient?
Permite aplicar fondos con degradados, lo que da un toque más visual y atractivo a elementos clave como las cartas y me ayuda a salir de los colores planos y hacer la interfaz más llamativa.

### 🧭 ¿Por qué usar react-native-vector-icons?
Porque me permite usar iconos bonitos... y ya.

### 🌐 ¿Qué hace @react-native-community/netinfo?
Sirve para detectar el estado de la conexión a internet del dispositivo.
Esto me permite manejar de forma adecuada qué mostrar al usuario si no tiene conexión. (Esto lo descubriras mejor cuando hagas correr el proyecto en tu celular y le quites el internet)

# 🇬🇧 English

**Info Royale** is a mobile app built with **React Native**, based on [RoyaleAPI](https://royaleapi.com), designed to show useful information for **Clash Royale** players:  
- 📋 Favorite cards  
- 🔍 Search for players and clans  
- 🌎 Top players by region  

It all runs on data from the [official Clash Royale API](https://developer.clashroyale.com).

---

## 💡 How does it all work?

The official API only allows 10 static IPs, which makes things tricky. So here's how we handled it:

🧩 We use **RoyaleAPI as an intermediary** to provide a usable static IP.  
🔁 Since we can’t fetch from mobile directly to that IP, a **Node.js + Express backend** was created to act as a proxy.

🛠️ Backend repo:  
👉 [api-clash-backend](https://github.com/Isaac-sys-2023/api-clash-backend.git)  
That repo explains the data flow more clearly, and additionally:  
- It integrates with [FlagCDN](https://flagcdn.com) to display country flags.  
- It uses [ip-api.com](http://ip-api.com) to detect your **geolocation** and show your regional leaderboard accordingly.

> ⚠️ This app **REQUIRES** an internet connection to work.

---

## 🛠️ How to download and run the project?

### ✅ Step 1: Clone the repo
```bash
git clone https://github.com/Isaac-sys-2023/clash-royale-mobile-app.git   # HTTPS
# or if you prefer SSH:
git clone git@github.com:Isaac-sys-2023/clash-royale-mobile-app.git
```

### ✅ Step 2: Install Node.js
Go to https://nodejs.org and download the LTS version. Check it’s installed with:
```bash
node -v
npm -v
```

### ✅ Step 3: Initialize the project
```bash
cd clash-royale-mobile-app
npm install
```

### ✅ Step 4: Install the required libraries
```bash
npx expo install react-native-safe-area-context
npm install @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated
npx expo install expo-linear-gradient
npm install react-native-vector-icons
npm install @react-native-community/netinfo
```

### ✅ Step 5: Start the app
```bash
npx expo start --clear
```

### ✅ Step 6: Install Expo Go on your phone
📲 Available in the Play Store — search for “Expo Go”.

### ✅ Step 7: Scan the QR code
Open Expo Go, scan the QR code from step 5...  
And you're in! Welcome to Info Royale.  
No login or account needed — just a stable internet connection.

⚠️ WARNING: Your computer **must be on the same Wi-Fi network** as your phone.

---

## 🧰 Project Tool Justification (Why?)

### 🤔 Why React Native + TypeScript + Expo Go?
This choice was based on performance and practicality.  
Android Studio doesn’t run well on my machine, even with Linux (Sorry Willy, I failed you), and Flutter takes longer to compile and build the app.  
I already had experience with React + TypeScript, so I chose the stack that let me move faster without sacrificing quality.

### 📱 What is `react-native-safe-area-context` for?
This library ensures that the app content is not covered by the top or bottom bars of the system across different devices.  
In short, it improves layout consistency and the overall user experience.

### 🧭 What are these libraries used for?
```bash
npm install @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

These libraries enable a smooth and structured navigation experience:

- `@react-navigation/native`: base navigation system  
- `@react-navigation/drawer`: slide-out drawer menu  
- `react-native-gesture-handler` and `react-native-reanimated`: enable smooth transitions and proper gesture handling

### 🎨 Why use `expo-linear-gradient`?
It allows you to create gradient backgrounds, making key UI elements (like cards) more visually appealing.  
It helps escape the limitations of flat colors and gives the interface a more dynamic look.

### ⭐ Why use `react-native-vector-icons`?
Because it lets me use nice icons... and that’s all I needed.

### 🌐 What does `@react-native-community/netinfo` do?
It detects the device’s internet connection status.  
This helps the app respond appropriately when there's no connection.  
(You’ll understand better once you run the app on your phone and disconnect the internet 😈)

# 👑 Info Royale

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

@react-navigation/native: sistema de navegación base.
@react-navigation/drawer: menú lateral desplegable.
react-native-gesture-handler y react-native-reanimated: permiten animaciones suaves y soporte táctil adecuado.

### 🧭 ¿Por qué usar expo-linear-gradient?
Permite aplicar fondos con degradados, lo que da un toque más visual y atractivo a elementos clave como las cartas.
Me ayuda a salir de los colores planos y hacer la interfaz más llamativa.

### 🧭 ¿Por qué usar react-native-vector-icons?
Porque me permite usar iconos bonitos... y ya.

### 🌐 ¿Qué hace @react-native-community/netinfo?
Sirve para detectar el estado de la conexión a internet del dispositivo.
Esto me permite manejar de forma adecuada qué mostrar al usuario si no tiene conexión. (Esto lo descubriras mejor cuando hagas correr el proyecto en tu celular y le quites el internet)

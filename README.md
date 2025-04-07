# 💱 Conversor de Moedas — React Native (Expo)

Aplicação mobile desenvolvida com **React Native + Expo**, que permite converter moedas em tempo real através de uma API pública. A aplicação inclui três ecrãs principais:

- **Home** — ecrã inicial com opções de navegação  
- **Conversor** — ecrã para converter moedas entre diferentes países  
- **Histórico** — lista de conversões anteriores com opção para apagar individualmente

---

## 🛠️ Tecnologias e Dependências

Esta aplicação foi construída com os seguintes recursos:

### 🔧 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [FreeCurrencyAPI](https://freecurrencyapi.com/) *(API pública gratuita para taxas de câmbio)*

### 📦 Pacotes instalados

| Pacote                             | Descrição                                                  |
|-----------------------------------|-------------------------------------------------------------|
| `@react-navigation/native`        | Navegação entre ecrãs                                       |
| `@react-navigation/native-stack`  | Navegação tipo “pilha”                                      |
| `@react-native-picker/picker`     | Componente Picker para seleção de moedas                    |
| `@react-native-async-storage/async-storage` | Armazenamento local do histórico                         |
| `axios`                           | Requisições HTTP à API                                      |
| `expo-linear-gradient`            | Fundos com gradiente                                        |
| `@expo/vector-icons`              | Ícones (ex: FontAwesome)                                    |
| `react-native-safe-area-context`  | Garante margens seguras no ecrã                             |
| `react-native-screens`            | Otimizações na navegação                                    |
| `react-native-gesture-handler`    | Suporte a gestos e interações personalizadas                |

---

## 🌐 API Utilizada

A aplicação utiliza a **[FreeCurrencyAPI](https://freecurrencyapi.com/)** para obter taxas de câmbio em tempo real entre mais de 150 moedas.

📌 A chave API gratuita pode ser obtida após registo no site.

Exemplo de requisição:
```
https://api.freecurrencyapi.com/v1/latest?apikey=YOUR_API_KEY&base_currency=EUR&currencies=USD
```

---

## 📲 Como executar o projeto no teu computador

### 1. Clona o repositório

```
git clone https://github.com/o-teu-utilizador/conversor-moedas.git
cd conversor-moedas
```

### 2. Instala o Expo CLI (caso ainda não tenhas)

```
npm install -g expo-cli
```

### 3. Instala as dependências do projeto

```
npm install
```

Ou, se utilizares `yarn`:

```
yarn install
```

### 4. Inicia o projeto (modo túnel recomendado)

```
npx expo start --tunnel
```

### 5. Testa no telemóvel

- Instala a app **Expo Go** (disponível para Android e iOS)
- Lê o QR Code que aparece no terminal ou navegador

---

## ⚙️ Funcionalidades

- Conversão de moedas em tempo real  
- Seleção de moedas através de Picker  
- Histórico de conversões guardado localmente  
- Remoção individual de conversões através de ícone  
- Interface moderna, com gradientes e ícones

---

## ✅ Requisitos

- Node.js (recomendado: v18 ou superior)  
- Expo CLI  
- Dispositivo com Expo Go instalado (ou emulador Android/iOS)

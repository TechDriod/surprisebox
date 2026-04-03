# 🎁 SurpriseBox.in

> Personalized surprise websites for birthdays, anniversaries & special wishes — delivered in 24 hours.

---

## 📁 Folder Structure

```
surprisebox/
├── index.html        ← Main website file
├── css/
│   └── style.css     ← All styling
├── js/
│   └── main.js       ← All JavaScript logic
├── assets/           ← Images rakhne ke liye (future use)
└── README.md
```

---

## ⚙️ Setup — Apna number add karo

`js/main.js` file kholo aur **line 5** pe apna WhatsApp number daalo:

```js
const WHATSAPP_NUMBER = '919876543210';
// Example: India ke liye 91 + 10 digit number
// Jaise: '919876543210'
```

---

## 🚀 GitHub Pages pe Live Karo

1. GitHub pe naya repository banao (e.g. `surprisebox`)
2. Yeh saari files upload karo
3. **Settings** → **Pages** → **Branch: main** → **Save**
4. Tumhari website live ho jaayegi:
   `https://yourusername.github.io/surprisebox`

---

## ✏️ Customization

| Cheez           | File          | Kya change karein              |
|-----------------|---------------|-------------------------------|
| WhatsApp number | `js/main.js`  | Line 5 — `WHATSAPP_NUMBER`    |
| Prices          | `js/main.js`  | `PRICES` object (line 8-12)   |
| Colors/Theme    | `css/style.css` | `:root` variables (line 1-15)|
| Content/Text    | `index.html`  | Directly edit karo             |

---

## 📦 Features

- 🎂 Birthday websites
- 💍 Anniversary websites  
- 🌟 Wishes (Farewell, Congratulations, Promotion, Get Well Soon, Thank You)
- 3 pricing plans per category
- WhatsApp order integration
- Mobile responsive
- Smooth animations
- No backend required — pure HTML/CSS/JS

---

Made with ♥ by SurpriseBox

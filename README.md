# ✨ Special Proposal — Romantic Interactive Multi-Step Web App

A luxury dark-aesthetic, romantic multi-step interactive web application built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Telegram Bot Telemetry**.

---

## 🌟 Asosiy Xususiyatlar (Features)

1. **Dark Luxury Estetikasi:**
   - Qop-qora obsidian fon (`#08070b`), ambient neon pushti va binafsharang yog'dular.
   - Glassmorphism (xira shishasimon kartalar), neon nurlar va har bir qadamda his-tuyg'ularga mos kulgili va yoqimli mushuk memlari/GIFlari.
2. **Interaktiv Ko'p Bosqichli Oqim (Multi-Step Flow):**
   - **1-qadam (Intro):** "I have something special to tell you..." + "Tap to Begin" tugmasi bosilishi bilan romantik musiqa boshlanadi va Telegramga tashrif xabari boradi.
   - **2-qadam (Ishonch):** Yig'layotgan mushukcha + "Do you trust me?". "Yes, I do" va kursordan/barmoqdan qochib ketuvchi "No" tugmasi (qochishlar sonini Telegramga yozib boradi).
   - **3-qadam (Intriga & Salom):** Salomlashish, Nodirbekning samimiy so'zlari va kofe taklifi.
   - **4-qadam (Status):** "Yuragingiz band emasmi?" ("Yo'q, bo'sh" -> 5A yoki "Ha, band" -> 5B).
   - **5A-qadam (Sovg'a & Kontakt):** Manzil / sevimli qahvaxona va Telegram/telefon kiritish formasi.
   - **5B-qadam (Muloyim xayrlashuv):** Samimiyat uchun minnatdorchilik va baxt tilash.
   - **6A-qadam (Bayram):** Salfetka / confetti portlashi, urib turgan pushti yurak va quvonchli yakuniy xabar.
3. **Bir martalik havola xavfsizligi (One-Time Link):**
   - Maxsus havola orqali kiriladi (masalan: `https://domain.com/?token=special`).
   - Yakuniy javob yuborilgach, havola darhol yopiladi. Qayta kirilganda *"Bu sahifa o'z vazifasini bajarib bo'ldi 💌"* yozuvi chiqadi.
4. **Telegram Xabarnomalari (Server-side Telemetry):**
   - Bot tokeni va chat ID hech qachon foydalanuvchiga (brauzerga) ko'rinmaydi. Barcha so'rovlar xavfsiz serverless API orqali yuboriladi.

---

## 🚀 100% Bepul Vercel'ga Joylash (Deploy) Qo'llanmasi

Ushbu loyihani Vercel'ga deploy qilish juda oson va mutlaqo bepul:

### 1-qadam: Telegram Bot tayyorlash (1 daqiqa)
1. Telegramda [@BotFather](https://t.me/BotFather) botiga kiring va `/newbot` buyrug'ini bering.
2. Botga nom va username bering. Sizga berilgan **HTTP API Token**ni nusxalab oling (bu: `TELEGRAM_BOT_TOKEN`).
3. Telegramda [@userinfobot](https://t.me/userinfobot) botiga kirib, o'zingizning raqamli `Id`ingizni oling (bu: `TELEGRAM_CHAT_ID`).
4. Yangi ochgan botingizga kiring va **/start** tugmasini bosing (aks holda bot sizga xabar yubora olmaydi).

### 2-qadam: Vercel'da ishga tushirish
1. [vercel.com](https://vercel.com) saytiga kiring va **"Continue with GitHub"** orqali kiring.
2. **"Add New..."** -> **"Project"** tugmasini bosing.
3. `special-proposal` repozitoriyasini tanlang va **"Import"** tugmasini bosing.
4. **"Environment Variables"** bo'limida quyidagi parametrlarni kiriting:
   - `TELEGRAM_BOT_TOKEN` = `sizning_bot_tokeningiz`
   - `TELEGRAM_CHAT_ID` = `sizning_chat_idingiz`
   *(Ixtiyoriy: `APP_ACCESS_TOKENS` = `special,feruza,love`)*
5. **"Deploy"** tugmasini bosing! 1 daqiqada saytingiz tayyor bo'ladi (masalan: `https://special-proposal.vercel.app`).

---

## 💌 Qizga Havolani Qanday Yuborish Kerak?

Saytingiz deploy bo'lgach, unga quyidagi formatda havola yuborasiz:

```text
https://special-proposal.vercel.app/?token=feruza
```
*(yoki istalgan nom: `?token=love`, `?token=special`)*

Qiz ushbu havolani bosganda:
1. U kirishi bilan Telegramingizga: *"Yangi tashrif! Foydalanuvchi maxsus taklifnomani ochdi"* degan xabar keladi.
2. Bosqichma-bosqich javob berishi bilan barcha harakatlari sizning Telegramingizga real vaqtda kelib turadi!
3. Oxirida manzilini yuborganidan so'ng, bu havola avtomatik ravishda yopiladi.

---

## 🛠 Mahalliy Kompyuterda Ishga Tushirish (Local Development)

```bash
# Repozitoriyani yuklab olish
git clone https://github.com/babayaz0v22/special-proposal.git
cd special-proposal

# Bog'liqliklarni o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env.local
# .env.local ichiga o'z Telegram tokenlaringizni yozing

# Saytni ishga tushirish
npm run dev
```

Brauzerda: `http://localhost:3000/?token=test` manzilini oching.

---

Yaratuvchi: **Nodirbek** ✨
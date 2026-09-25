# ElysiaJS + Bun + Drizzle ORM + MySQL

Proyek backend menggunakan framework [ElysiaJS](https://elysiajs.com/) yang berjalan di atas runtime [Bun](https://bun.sh/), dengan [Drizzle ORM](https://orm.drizzle.team/) dan driver MySQL (`mysql2`).

## Struktur Proyek

```text
├── drizzle/              # Folder migrasi SQL hasil generate drizzle-kit
├── src/
│   ├── db/
│   │   ├── index.ts      # Koneksi database MySQL dengan Drizzle ORM
│   │   └── schema.ts     # Definisi skema tabel database
│   └── index.ts          # Entry point server ElysiaJS
├── .env                  # Konfigurasi environment (DATABASE_URL, PORT)
├── .env.example          # Contoh template environment
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

## Setup & Instalasi

1. Salin file environment:
   ```bash
   cp .env.example .env
   ```
2. Sesuaikan konfigurasi `DATABASE_URL` di dalam file `.env`:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/latihan_db"
   PORT=3000
   ```

## Menjalankan Server

- Mode Development (dengan hot reload):
  ```bash
  bun run dev
  ```
- Mode Production:
  ```bash
  bun run start
  ```

Server akan aktif secara default di `http://localhost:3000`.

## Endpoint API

- `GET /` : Info status aplikasi
- `GET /api/health` : Health check endpoint
- `GET /api/users` : Mendapatkan seluruh data users
- `POST /api/users` : Membuat user baru (`{ "name": "...", "email": "..." }`)

## Perintah Database (Drizzle Kit)

- Generate file migrasi baru:
  ```bash
  bun run db:generate
  ```
- Push skema langsung ke database:
  ```bash
  bun run db:push
  ```
- Jalankan migrasi:
  ```bash
  bun run db:migrate
  ```
- Buka Drizzle Studio (Database GUI):
  ```bash
  bun run db:studio
  ```

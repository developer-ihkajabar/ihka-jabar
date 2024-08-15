CREATE TABLE "admin" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT,
  "member_id" TEXT,
  "no_telp" TEXT,
  "cabang_id" INTEGER,
  "is_admin_daerah" BOOLEAN,
  "is_moderator" BOOLEAN,
  "is_active" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("cabang_id") REFERENCES "cabang" ("id")
);

CREATE TABLE "news" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT UNIQUE NOT NULL,
  "content_html" TEXT NOT NULL,
  "is_published" BOOLEAN NOT NULL DEFAULT false,
  "admin_id" INTEGER,
  "cabang_id" INTEGER,
  "approved_by" INTEGER,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("admin_id") REFERENCES "admin" ("id"),
  FOREIGN KEY ("cabang_id") REFERENCES "cabang" ("id"),
  FOREIGN KEY ("approved_by") REFERENCES "admin" ("id")
);

CREATE TABLE "cabang" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT UNIQUE
);

CREATE TABLE "struktur_organisasi" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  "department" TEXT,
  "daerah_id" INTEGER NOT NULL
);

CREATE TABLE "superadmin" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "username" TEXT,
  "password" TEXT
);


INSERT INTO "cabang" ("name") VALUES
('Kota Bandung'),
('Kabupaten Bandung');

INSERT INTO "superadmin" ("username", "password") VALUES
('superadmin', 'superadmin'),
('superadmin2', 'superadmin2');

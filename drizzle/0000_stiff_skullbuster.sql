CREATE TABLE `admin` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text,
	`member_id` text,
	`no_telp` text,
	`cabang_id` integer,
	`is_admin_daerah` integer,
	`is_moderator` integer,
	`is_active` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`cabang_id`) REFERENCES `cabang`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE TABLE `cabang` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cabang_name_unique` ON `cabang` (`name`);--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content_html` text NOT NULL,
	`is_published` integer DEFAULT false NOT NULL,
	`admin_id` integer,
	`cabang_id` integer,
	`approved_by` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cabang_id`) REFERENCES `cabang`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approved_by`) REFERENCES `admin`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_title_unique` ON `news` (`title`);--> statement-breakpoint
CREATE TABLE `struktur_organisasi` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`department` text,
	`daerah_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `superadmin` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`password` text
);

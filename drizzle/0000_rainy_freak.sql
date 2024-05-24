CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`lastname` text NOT NULL,
	`email` text NOT NULL,
	`email_verified_at` integer,
	`password` text NOT NULL,
	`profile_picture` text DEFAULT '/public/images/profile-pictures/default.svg',
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
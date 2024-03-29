create table category(
 "id" serial primary key,
 "category_id" text not null,
 "category_title" integer not null,
 "image" text,
 "subcategory" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table top_tovar(
 "id" serial primary key,
 "category_id" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table best_seller(
 "id" serial primary key,
 "category_id" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table contact(
 "id" serial primary key,
"fullname" text not null,
"phone" text not null,
"email" text not null,
"message" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table company(
 "id" serial primary key,
 "phone" text not null,
 "email" text not null,
 "address" text not null,
 "facebook" text not null,
 "lan" text not null,
 "lac" text not null,
 "telegram" text not null,
 "youtobe" text not null,
 "instagram" text not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table category(
 "id" serial primary key,
 "category_id" text not null,
 "category_title" text not null,
 "image" text,
 "subcategory" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table users(
 "id" serial primary key,
 "login" text not null,
 "password" text not null,
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
create table tokensklad(
 "id" serial primary key,
 "token" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table dolor_course(
 "id" serial primary key,
 "dollor" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table document(
 "id" serial primary key,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table carousel(
 "id" serial primary key,
 "image" text not null,
 "title" varchar(50) not null,
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

create table homiy(
 "id" serial primary key,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table header_category(
    "id" serial primary key,
 "category_id" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
)


ALTER SEQUENCE header_category_id_seq OWNED BY header_category.id;
GRANT USAGE, SELECT ON SEQUENCE header_category_id_seq TO abbasuz2_user;



ALTER SEQUENCE homiy_id_seq OWNED BY homiy.id;
GRANT USAGE, SELECT ON SEQUENCE homiy_id_seq TO abbasuz2_user;


ALTER SEQUENCE category_id_seq OWNED BY category.id;
GRANT USAGE, SELECT ON SEQUENCE category_id_seq TO abbasuz2_user;


ALTER SEQUENCE users_id_seq OWNED BY users.id;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO abbasuz2_user;

ALTER SEQUENCE top_tovar_id_seq OWNED BY top_tovar.id;
GRANT USAGE, SELECT ON SEQUENCE top_tovar_id_seq TO abbasuz2_user;

ALTER SEQUENCE best_seller_id_seq OWNED BY best_seller.id;
GRANT USAGE, SELECT ON SEQUENCE best_seller_id_seq TO abbasuz2_user;

ALTER SEQUENCE tokensklad_id_seq OWNED BY tokensklad.id;
GRANT USAGE, SELECT ON SEQUENCE tokensklad_id_seq TO abbasuz2_user;


ALTER SEQUENCE dolor_course_id_seq OWNED BY dolor_course.id;
GRANT USAGE, SELECT ON SEQUENCE dolor_course_id_seq TO abbasuz2_user;

ALTER SEQUENCE document_id_seq OWNED BY document.id;
GRANT USAGE, SELECT ON SEQUENCE document_id_seq TO abbasuz2_user;

ALTER SEQUENCE carousel_id_seq OWNED BY carousel.id;
GRANT USAGE, SELECT ON SEQUENCE carousel_id_seq TO abbasuz2_user;


ALTER SEQUENCE contact_id_seq OWNED BY contact.id;
GRANT USAGE, SELECT ON SEQUENCE contact_id_seq TO abbasuz2_user;

ALTER SEQUENCE company_id_seq OWNED BY company.id;
GRANT USAGE, SELECT ON SEQUENCE company_id_seq TO abbasuz2_user;
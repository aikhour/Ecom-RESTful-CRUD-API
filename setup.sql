CREATE TABLE user_table (
    id int primary key,
    username varchar(20) NOT NULL,
    password varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    first_name varchar(10),
    last_name varchar(10)
);

CREATE TABLE product_table (
    id int primary key,
    name varchar(20) NOT NULL,
    price float NOT NULL,
    description varchar(20),
    category varchar(10) NOT NULL
);

CREATE TABLE cart_table (
	id int primary key,
	quantity int NOT NULL,
	total float,
	product_id int references product_table (id),
	user_id int references user_table (id)
);

create table order_table (
	id int primary key,
	status varchar(10),
	date date not null,
	user_id int references user_table (id),
	cart_id int references cart_table (id)
);
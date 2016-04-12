
create schema if not exists allgau_schema;
use allgau_schema;


drop trigger if exists sell_create_trigger;
drop table if exists sell;
drop table if exists product;
drop table if exists employee;


create table if not exists employee(
	id_employee BIGINT unsigned not null auto_increment unique,
    name_employee VARCHAR(64) not null,
    login_employee VARCHAR(16) not null unique,
    password_employee VARCHAR(16) not null,
    primary key(id_employee, login_employee)
);


create table if not exists product(
	id_product BIGINT unsigned not null auto_increment unique primary key,
    label_product VARCHAR(64) not null,
    description_product TEXT,
    price_product DECIMAL(10,2) not null,
    quantity_product INT unsigned not null
);


create table if not exists sell(
	id_sell BIGINT unsigned not null auto_increment unique primary key,
    quantity_sell INT unsigned not null check(quantity_product >= 1),
    id_employee_fk BIGINT unsigned not null,
    id_product_fk BIGINT unsigned not null,
    foreign key(id_employee_fk) references employee(id_employee),
    foreign key(id_product_fk) references product(id_product)
);


delimiter $$
create trigger sell_create_trigger after insert on sell for each row
begin
	declare old_quantity INT;
    declare new_quantity INT;
    
    select product.quantity_product into old_quantity from product where product.id_product = new.id_product_fk;
    
    set new_quantity = old_quantity - new.quantity_sell;
    update product set quantity_product = new_quantity where product.id_product = new.id_product_fk;
    
end $$
delimiter ;




-- Populating 'employee' table:
insert into employee(name_employee, login_employee, password_employee) values('George', 'g_kleo', '123abc');
insert into employee(name_employee, login_employee, password_employee) values('Jurumeba', 'jMeba', 'abc');
insert into employee(name_employee, login_employee, password_employee) values('Amoeba', 'amoebinha', '1234');
insert into employee(name_employee, login_employee, password_employee) values('Guilherme', 'potentii', '123');
insert into employee(name_employee, login_employee, password_employee) values('Antonia', 'anto_nia', 'aaaa');




-- Populating 'product' table:
insert into product (label_product, description_product, price_product, quantity_product) values ('curae donec', 'Suspendisse potenti.', 19.55, 19);
insert into product (label_product, description_product, price_product, quantity_product) values ('metus sapien', 'Aenean sit amet justo.', 842.08, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('aenean fermentum', 'Sed sagittis.', 885.05, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('blandit', 'Maecenas tincidunt lacus at velit.', 105.74, 11);
insert into product (label_product, description_product, price_product, quantity_product) values ('ultricies', 'Morbi a ipsum.', 589.21, 19);
insert into product (label_product, description_product, price_product, quantity_product) values ('donec vitae nisi', 'Nulla ac enim.', 991.67, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('ut dolor', 'Nullam molestie nibh in lectus.', 712.0, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('posuere cubilia curae', 'Nunc nisl.', 542.76, 6);
insert into product (label_product, description_product, price_product, quantity_product) values ('nulla', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', 387.2, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('dis parturient', 'Morbi vel lectus in quam fringilla rhoncus.', 556.1, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('rutrum', 'Vivamus vestibulum sagittis sapien.', 766.47, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('id ligula', 'Mauris sit amet eros.', 520.05, 23);
insert into product (label_product, description_product, price_product, quantity_product) values ('cubilia curae', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 123.52, 12);
insert into product (label_product, description_product, price_product, quantity_product) values ('pharetra', 'Vestibulum ac est lacinia nisi venenatis tristique.', 632.59, 17);
insert into product (label_product, description_product, price_product, quantity_product) values ('maecenas leo', 'Nulla nisl.', 480.35, 9);
insert into product (label_product, description_product, price_product, quantity_product) values ('eu est', 'Sed accumsan felis.', 370.86, 20);
insert into product (label_product, description_product, price_product, quantity_product) values ('odio', 'In quis justo.', 674.75, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('nisi volutpat', 'Vivamus in felis eu sapien cursus vestibulum.', 83.84, 8);
insert into product (label_product, description_product, price_product, quantity_product) values ('et tempus semper', 'Praesent id massa id nisl venenatis lacinia.', 93.6, 14);
insert into product (label_product, description_product, price_product, quantity_product) values ('magna', 'Suspendisse potenti.', 694.9, 16);
insert into product (label_product, description_product, price_product, quantity_product) values ('augue a suscipit', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 33.75, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('lacus curabitur at', 'Nullam sit amet turpis elementum ligula vehicula consequat.', 570.59, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('ac', 'Nam dui.', 18.54, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('morbi non', 'Nulla ut erat id mauris vulputate elementum.', 152.54, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('congue elementum in', 'Nulla justo.', 725.26, 24);
insert into product (label_product, description_product, price_product, quantity_product) values ('et', 'Nulla mollis molestie lorem.', 664.13, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('semper', 'Curabitur convallis.', 553.36, 6);
insert into product (label_product, description_product, price_product, quantity_product) values ('id', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 758.84, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('vestibulum', 'Integer a nibh.', 950.12, 25);
insert into product (label_product, description_product, price_product, quantity_product) values ('vestibulum ac est', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', 524.26, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('quisque ut erat', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', 761.29, 25);
insert into product (label_product, description_product, price_product, quantity_product) values ('nisl duis bibendum', 'Nunc rhoncus dui vel sem.', 259.57, 1);
insert into product (label_product, description_product, price_product, quantity_product) values ('blandit', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 388.08, 25);
insert into product (label_product, description_product, price_product, quantity_product) values ('ut rhoncus aliquet', 'Nullam varius.', 104.82, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('eu interdum', 'Sed sagittis.', 349.8, 17);
insert into product (label_product, description_product, price_product, quantity_product) values ('arcu sed augue', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 759.45, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('vitae', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 169.04, 24);
insert into product (label_product, description_product, price_product, quantity_product) values ('hac', 'In eleifend quam a odio.', 306.29, 4);
insert into product (label_product, description_product, price_product, quantity_product) values ('sapien urna pretium', 'Phasellus id sapien in sapien iaculis congue.', 186.27, 20);
insert into product (label_product, description_product, price_product, quantity_product) values ('quam turpis adipiscing', 'In quis justo.', 778.61, 9);
insert into product (label_product, description_product, price_product, quantity_product) values ('interdum eu', 'Nunc purus.', 631.96, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('pede', 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', 398.32, 14);
insert into product (label_product, description_product, price_product, quantity_product) values ('vitae consectetuer eget', 'Cras non velit nec nisi vulputate nonummy.', 797.63, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('nec', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 102.89, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('tincidunt nulla mollis', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 610.09, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('adipiscing molestie hendrerit', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 395.88, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('libero', 'Sed sagittis.', 939.11, 11);
insert into product (label_product, description_product, price_product, quantity_product) values ('sit', 'Nullam porttitor lacus at turpis.', 49.61, 1);
insert into product (label_product, description_product, price_product, quantity_product) values ('justo', 'Ut at dolor quis odio consequat varius.', 256.25, 16);
insert into product (label_product, description_product, price_product, quantity_product) values ('nulla', 'Nulla tellus.', 890.23, 8);
insert into product (label_product, description_product, price_product, quantity_product) values ('quis', 'Aenean lectus.', 63.14, 12);
insert into product (label_product, description_product, price_product, quantity_product) values ('vivamus vestibulum sagittis', 'Donec posuere metus vitae ipsum.', 133.7, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('vel nulla eget', 'Donec semper sapien a libero.', 216.65, 4);
insert into product (label_product, description_product, price_product, quantity_product) values ('viverra eget congue', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.', 887.86, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('mi', 'Etiam faucibus cursus urna.', 627.8, 12);
insert into product (label_product, description_product, price_product, quantity_product) values ('feugiat non', 'Vivamus in felis eu sapien cursus vestibulum.', 128.59, 17);
insert into product (label_product, description_product, price_product, quantity_product) values ('pulvinar', 'Duis consequat dui nec nisi volutpat eleifend.', 292.98, 22);
insert into product (label_product, description_product, price_product, quantity_product) values ('justo pellentesque', 'Cras in purus eu magna vulputate luctus.', 339.74, 14);
insert into product (label_product, description_product, price_product, quantity_product) values ('dictumst maecenas ut', 'Phasellus in felis.', 274.71, 3);
insert into product (label_product, description_product, price_product, quantity_product) values ('volutpat quam pede', 'Vestibulum sed magna at nunc commodo placerat.', 777.68, 10);
insert into product (label_product, description_product, price_product, quantity_product) values ('duis mattis egestas', 'Nulla ut erat id mauris vulputate elementum.', 131.72, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('condimentum', 'Pellentesque ultrices mattis odio.', 8.99, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('posuere', 'Phasellus in felis.', 909.62, 23);
insert into product (label_product, description_product, price_product, quantity_product) values ('eu tincidunt', 'Nullam varius.', 170.6, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('sollicitudin mi sit', 'Vestibulum sed magna at nunc commodo placerat.', 111.66, 19);
insert into product (label_product, description_product, price_product, quantity_product) values ('sapien varius ut', 'Nullam varius.', 261.07, 6);
insert into product (label_product, description_product, price_product, quantity_product) values ('placerat praesent', 'Nulla tempus.', 928.3, 19);
insert into product (label_product, description_product, price_product, quantity_product) values ('habitasse', 'Sed vel enim sit amet nunc viverra dapibus.', 697.54, 1);
insert into product (label_product, description_product, price_product, quantity_product) values ('nibh in quis', 'Quisque ut erat.', 720.88, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('in congue etiam', 'Nunc purus.', 149.18, 4);
insert into product (label_product, description_product, price_product, quantity_product) values ('sit', 'Nullam varius.', 661.23, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('ipsum integer', 'Donec ut dolor.', 472.95, 15);
insert into product (label_product, description_product, price_product, quantity_product) values ('tincidunt lacus at', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 795.29, 13);
insert into product (label_product, description_product, price_product, quantity_product) values ('primis', 'Phasellus sit amet erat.', 309.54, 8);
insert into product (label_product, description_product, price_product, quantity_product) values ('praesent', 'Phasellus in felis.', 941.8, 10);
insert into product (label_product, description_product, price_product, quantity_product) values ('semper sapien', 'Curabitur convallis.', 439.94, 3);
insert into product (label_product, description_product, price_product, quantity_product) values ('amet', 'In quis justo.', 23.64, 9);
insert into product (label_product, description_product, price_product, quantity_product) values ('eleifend', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', 949.71, 22);
insert into product (label_product, description_product, price_product, quantity_product) values ('integer non velit', 'Nulla mollis molestie lorem.', 933.07, 23);
insert into product (label_product, description_product, price_product, quantity_product) values ('pede', 'Vestibulum ac est lacinia nisi venenatis tristique.', 138.67, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('morbi', 'Morbi non quam nec dui luctus rutrum.', 162.2, 7);
insert into product (label_product, description_product, price_product, quantity_product) values ('enim leo', 'Etiam vel augue.', 335.91, 19);
insert into product (label_product, description_product, price_product, quantity_product) values ('in sapien', 'Nam nulla.', 700.99, 12);
insert into product (label_product, description_product, price_product, quantity_product) values ('integer', 'Donec ut dolor.', 830.35, 2);
insert into product (label_product, description_product, price_product, quantity_product) values ('nibh ligula', 'Morbi porttitor lorem id ligula.', 61.13, 4);
insert into product (label_product, description_product, price_product, quantity_product) values ('in tempus', 'In sagittis dui vel nisl.', 448.6, 25);
insert into product (label_product, description_product, price_product, quantity_product) values ('ante ipsum', 'Duis at velit eu est congue elementum.', 78.3, 3);
insert into product (label_product, description_product, price_product, quantity_product) values ('ut suscipit', 'Praesent lectus.', 409.65, 2);
insert into product (label_product, description_product, price_product, quantity_product) values ('donec quis', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 527.13, 21);
insert into product (label_product, description_product, price_product, quantity_product) values ('blandit ultrices enim', 'Phasellus in felis.', 717.78, 20);
insert into product (label_product, description_product, price_product, quantity_product) values ('amet cursus', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 469.71, 16);
insert into product (label_product, description_product, price_product, quantity_product) values ('porttitor', 'In eleifend quam a odio.', 55.25, 22);
insert into product (label_product, description_product, price_product, quantity_product) values ('justo sollicitudin ut', 'Etiam pretium iaculis justo.', 599.93, 11);
insert into product (label_product, description_product, price_product, quantity_product) values ('nulla sed', 'In hac habitasse platea dictumst.', 447.73, 12);
insert into product (label_product, description_product, price_product, quantity_product) values ('quisque', 'Praesent blandit.', 243.37, 24);
insert into product (label_product, description_product, price_product, quantity_product) values ('diam nam tristique', 'Nulla ut erat id mauris vulputate elementum.', 14.45, 23);
insert into product (label_product, description_product, price_product, quantity_product) values ('odio', 'Pellentesque ultrices mattis odio.', 201.17, 6);
insert into product (label_product, description_product, price_product, quantity_product) values ('vehicula condimentum', 'Etiam faucibus cursus urna.', 738.53, 3);
insert into product (label_product, description_product, price_product, quantity_product) values ('hac habitasse', 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 280.19, 18);
insert into product (label_product, description_product, price_product, quantity_product) values ('morbi non', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 697.36, 13);




-- Populating 'sell' table:
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (3, 5, 64);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (4, 4, 57);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (1, 5, 54);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (3, 2, 16);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (2, 3, 25);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (4, 1, 61);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (1, 1, 55);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (5, 5, 8);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (1, 4, 19);
insert into sell (quantity_sell, id_employee_fk, id_product_fk) values (4, 4, 18);



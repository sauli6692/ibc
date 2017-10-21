DROP DATABASE IF EXISTS ibc;
CREATE DATABASE ibc;
USE ibc;

CREATE TABLE ADM_USER(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(64),
    salt VARCHAR(64),
    member_id INT,
    CONSTRAINT ADM_USER_PK PRIMARY KEY (id)
);

CREATE TABLE ADM_ROLE(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(255),
    CONSTRAINT ADM_ROLE_PK PRIMARY KEY (id)
);

CREATE TABLE ADM_COMPONENT(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(255),
    CONSTRAINT ADM_COMPONENT_PK PRIMARY KEY (id)
);

CREATE TABLE ADM_MODEL(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    CONSTRAINT ADM_MODEL_PK PRIMARY KEY (id)
);

CREATE TABLE ADM_USER_ROLE(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT ADM_USER_ROLE_PK PRIMARY KEY (user_id, role_id)
);

CREATE TABLE ADM_ROLE_COMPONENT(
    role_id INT NOT NULL,
    component_id INT NOT NULL,
    CONSTRAINT ADM_ROLE_COMPONENT_PK PRIMARY KEY (role_id, component_id)
);

CREATE TABLE ADM_COMPONENT_MODEL(
    component_id INT NOT NULL,
    model_id INT NOT NULL,
    privileges VARCHAR(4) NOT NULL,
    CONSTRAINT ADM_COMPONENT_MODEL_PK PRIMARY KEY (component_id, model_id)
);

CREATE TABLE MIN_MINITRY(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
	description VARCHAR(150),
	CONSTRAINT MIN_MINITRY_PK PRIMARY KEY (id)
);


CREATE TABLE MIN_MINISTRY_OBJECTIVES(
	id INT NOT NULL AUTO_INCREMENT,
	objective VARCHAR(150) NOT NULL,
	ministry_id INT NOT NULL,
	CONSTRAINT MIN_MINISTRY_OBJECTIVES_PK PRIMARY KEY (id)
);

CREATE TABLE MIN_MINISTRY_LEADERS(
	ministry_id INT NOT NULL,
	leader_id INT NOT NULL,
	CONSTRAINT MIN_MINISTRY_LEADERS_PK PRIMARY KEY (ministry_id, leader_id)
);

CREATE TABLE MIN_MINISTRY_TEAM(
	ministry_id INT NOT NULL,
	member_id INT NOT NULL,
	CONSTRAINT MIN_MINISTRY_TEAM_PK PRIMARY KEY (ministry_id, member_id)
);


CREATE TABLE RTE_HARVEST(
	person_id INT NOT NULL,
	route_id INT NOT NULL,
	discarded TINYINT(1),
	discarded_reason VARCHAR(100),
	CONSTRAINT RTE_HARVEST_PK PRIMARY KEY (person_id)
);

CREATE TABLE RTE_COLLABORATOR(
	member_id INT NOT NULL,
	route_id INT NOT NULL,
	ministry_id INT,
	CONSTRAINT RTE_COLLABORATOR_PK PRIMARY KEY (member_id)
);

CREATE TABLE RTE_VISIT(
	collaborator_id INT NOT NULL,
	harvest_id INT NOT NULL,
	date DATE,
	CONSTRAINT RTE_VISIT_PK PRIMARY KEY (collaborator_id, harvest_id)
);

CREATE TABLE RTE_ROUTE(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(150),
	direction1 VARCHAR(150),
	direction2 VARCHAR(150),
	zoneMap BLOB,
	leader_id INT,
	CONSTRAINT RTE_ROUTE_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_PERSON(
	id INT NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	birthday DATE,
	new_birthday DATE,
	baptized TINYINT(1),
	integration_level INT,
	gender CHAR(1),
	occupation INT,
	civil_status INT,
	last_visit DATE,
	invited_by_id INT,
	direction1 VARCHAR(150),
	direction2 VARCHAR(150),
	CONSTRAINT PMM_PERSON_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_FAMILY(
	person_id INT NOT NULL,
	family_id INT NOT NULL,
	relationship INT,
	CONSTRAINT PMM_FAMILY_PK PRIMARY KEY (person_id, family_id)
);


CREATE TABLE PMM_MEMBER(
	person_id INT NOT NULL,
	CONSTRAINT PMM_MEMBER_PK PRIMARY KEY (person_id)
);

CREATE TABLE PMM_DISCIPLESHIP(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(25),
	description VARCHAR(150),
	CONSTRAINT PMM_DISCIPLESHIP_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_LESSON(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(25),
	description VARCHAR(150),
	discipleship_id INT NOT NULL,
	CONSTRAINT PMM_LESSON_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_PERSON_DISCIPLESHIP(
	disciple_id INT NOT NULL,
	discipleship_id INT NOT NULL,
	teacher_id INT NOT NULL,
	last_lesson_id INT,
	start_date DATE,
	end_date DATE,
	CONSTRAINT PMM_PERSON_DISCIPLESHIP_PK PRIMARY KEY (disciple_id, discipleship_id)
);


-- Lookup Tables --

CREATE TABLE PMM_INTEGRATION_LEVEL(
	id INT NOT NULL AUTO_INCREMENT,
	value VARCHAR(20),
	CONSTRAINT PMM_INTEGRATION_LEVEL_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_OCCUPATION(
	id INT NOT NULL AUTO_INCREMENT,
	value VARCHAR(50),
	CONSTRAINT PMM_OCCUPATION_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_CIVIL_STATUS(
	id INT NOT NULL AUTO_INCREMENT,
	value VARCHAR(50),
	CONSTRAINT PMM_CIVIL_STATUS_LEVEL_PK PRIMARY KEY (id)
);

CREATE TABLE PMM_FAMILY_RELATIONSHIP(
	id INT NOT NULL AUTO_INCREMENT,
	value VARCHAR(50),
	CONSTRAINT PMM_FAMILY_RELATIONSHIP_PK PRIMARY KEY (id)
);

-- CONSTRAINTS --
ALTER TABLE PMM_PERSON ADD CONSTRAINT PMM_INVITED_BY_FK FOREIGN KEY (invited_by_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON ADD CONSTRAINT PMM_PERSON_INTEGRATION_LEVEL_FK FOREIGN KEY (integration_level) REFERENCES PMM_INTEGRATION_LEVEL(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON ADD CONSTRAINT PMM_PERSON_OCCUPATION_FK FOREIGN KEY (occupation) REFERENCES PMM_OCCUPATION(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON ADD CONSTRAINT PMM_PERSON_CIVIL_STATUS_FK FOREIGN KEY (civil_status) REFERENCES PMM_CIVIL_STATUS(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PMM_FAMILY ADD CONSTRAINT PMM_FAMILY_PERSON_FK FOREIGN KEY (person_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_FAMILY ADD CONSTRAINT PMM_FAMILY_FK FOREIGN KEY (family_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_FAMILY ADD CONSTRAINT PMM_FAMILY_FAMILY_RELATIONSHIP_FK FOREIGN KEY (relationship) REFERENCES PMM_FAMILY_RELATIONSHIP(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RTE_HARVEST ADD CONSTRAINT RTE_HARVEST_PERSON_FK FOREIGN KEY (person_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_HARVEST ADD CONSTRAINT RTE_HARVEST_ROUTE_FK FOREIGN KEY (route_id) REFERENCES RTE_ROUTE(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PMM_MEMBER ADD CONSTRAINT PMM_MEMBER_PERSON_FK FOREIGN KEY (person_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RTE_COLLABORATOR ADD CONSTRAINT RTE_COLLABORATOR_MEMBER_FK FOREIGN KEY (member_id) REFERENCES PMM_MEMBER(person_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_COLLABORATOR ADD CONSTRAINT RTE_COLLABORATOR_ROUTE_FK FOREIGN KEY (route_id) REFERENCES RTE_ROUTE(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_COLLABORATOR ADD CONSTRAINT RTE_COLLABORATOR_MINISTRY_FK FOREIGN KEY (ministry_id) REFERENCES MIN_MINITRY(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_COLLABORATOR ADD CONSTRAINT RTE_COLLABORATOR_ROUTE_UQ UNIQUE(route_id);
ALTER TABLE RTE_COLLABORATOR ADD CONSTRAINT RTE_COLLABORATOR_MINISTRY_UQ UNIQUE(ministry_id);

ALTER TABLE RTE_VISIT ADD CONSTRAINT RTE_VISIT_COLLABORATOR_FK FOREIGN KEY (collaborator_id) REFERENCES RTE_COLLABORATOR(member_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_VISIT ADD CONSTRAINT RTE_VISIT_HARVEST_FK FOREIGN KEY (harvest_id) REFERENCES RTE_HARVEST(person_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RTE_ROUTE ADD CONSTRAINT RTE_ROUTE_COLLABORATOR_FK FOREIGN KEY (leader_id) REFERENCES RTE_COLLABORATOR(member_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE RTE_ROUTE ADD CONSTRAINT RTE_ROUTE_COLLABORATOR_UQ UNIQUE(leader_id);

ALTER TABLE MIN_MINISTRY_OBJECTIVES ADD CONSTRAINT MIN_MINISTRY_OBJECTIVES_MINISTRY_FK FOREIGN KEY (ministry_id) REFERENCES MIN_MINITRY(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE MIN_MINISTRY_LEADERS ADD CONSTRAINT MIN_MINISTRY_LEADERS_MINISTRY_FK FOREIGN KEY (ministry_id) REFERENCES MIN_MINITRY(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE MIN_MINISTRY_LEADERS ADD CONSTRAINT MIN_MINISTRY_LEADERS_MEMBER_FK FOREIGN KEY (leader_id) REFERENCES PMM_MEMBER(person_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE MIN_MINISTRY_TEAM ADD CONSTRAINT MIN_MINISTRY_TEAM_MINISTRY_FK FOREIGN KEY (ministry_id) REFERENCES MIN_MINITRY(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE MIN_MINISTRY_TEAM ADD CONSTRAINT MIN_MINISTRY_TEAM_MEMBER_FK FOREIGN KEY (member_id) REFERENCES PMM_MEMBER(person_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PMM_LESSON ADD CONSTRAINT PMM_LESSON_DISCIPLESHIP_FK FOREIGN KEY (discipleship_id) REFERENCES PMM_DISCIPLESHIP(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE PMM_PERSON_DISCIPLESHIP ADD CONSTRAINT PMM_PERSON_DISCIPLESHIP_DISCIPLE_FK FOREIGN KEY (disciple_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON_DISCIPLESHIP ADD CONSTRAINT PMM_PERSON_DISCIPLESHIP_DISCIPLESHIP_FK FOREIGN KEY (discipleship_id) REFERENCES PMM_DISCIPLESHIP(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON_DISCIPLESHIP ADD CONSTRAINT PMM_PERSON_DISCIPLESHIP_TEACHER_FK FOREIGN KEY (teacher_id) REFERENCES PMM_PERSON(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE PMM_PERSON_DISCIPLESHIP ADD CONSTRAINT PMM_PERSON_DISCIPLESHIP_LESSON_FK FOREIGN KEY (last_lesson_id) REFERENCES PMM_LESSON(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ADM_USER ADD CONSTRAINT ADM_USERNAME_UQ UNIQUE(username);
ALTER TABLE ADM_USER ADD CONSTRAINT ADM_MEMBER_ID_UQ UNIQUE(member_id);
ALTER TABLE ADM_USER ADD CONSTRAINT ADM_USER_MEMBER_FK FOREIGN KEY (member_id) REFERENCES PMM_MEMBER(person_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ADM_USER_ROLE ADD CONSTRAINT ADM_USER_ROLE_USER_FK FOREIGN KEY (user_id) REFERENCES ADM_USER(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE ADM_USER_ROLE ADD CONSTRAINT ADM_USER_ROLE_ROLE_FK FOREIGN KEY (role_id) REFERENCES ADM_ROLE(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ADM_ROLE_COMPONENT ADD CONSTRAINT ADM_ROLE_COMPONENT_ROLE_FK FOREIGN KEY (role_id) REFERENCES ADM_ROLE(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE ADM_ROLE_COMPONENT ADD CONSTRAINT ADM_ROLE_COMPONENT_COMPONENT_FK FOREIGN KEY (component_id) REFERENCES ADM_COMPONENT(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ADM_COMPONENT_MODEL ADD CONSTRAINT ADM_COMPONENT_MODEL_COMPONENT_FK FOREIGN KEY (component_id) REFERENCES ADM_COMPONENT(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE ADM_COMPONENT_MODEL ADD CONSTRAINT ADM_COMPONENT_MODEL_MODEL_FK FOREIGN KEY (model_id) REFERENCES ADM_MODEL(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- DML for Lookup Tables --
INSERT INTO PMM_INTEGRATION_LEVEL(value) VALUES ('Unido Recientemente');
INSERT INTO PMM_INTEGRATION_LEVEL(value) VALUES ('Integrado');
INSERT INTO PMM_INTEGRATION_LEVEL(value) VALUES ('Inconstante');
INSERT INTO PMM_INTEGRATION_LEVEL(value) VALUES ('Retirado');

INSERT INTO PMM_OCCUPATION(value) VALUES ('Estudiante Primaria');
INSERT INTO PMM_OCCUPATION(value) VALUES ('Estudiante Secundaria');
INSERT INTO PMM_OCCUPATION(value) VALUES ('Estudiante Universitario');
INSERT INTO PMM_OCCUPATION(value) VALUES ('Empleado');
INSERT INTO PMM_OCCUPATION(value) VALUES ('En Busca de Empleo');
INSERT INTO PMM_OCCUPATION(value) VALUES ('Otros');

INSERT INTO PMM_CIVIL_STATUS(value) VALUES ('Soltero(a)');
INSERT INTO PMM_CIVIL_STATUS(value) VALUES ('Casado(a)');
INSERT INTO PMM_CIVIL_STATUS(value) VALUES ('Divorciado(a)');
INSERT INTO PMM_CIVIL_STATUS(value) VALUES ('Viudo(a)');
INSERT INTO PMM_CIVIL_STATUS(value) VALUES ('Unión Libre');

INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Esposo(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Hijo(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Mamá');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Papá');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Abuelo(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Nieto(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Tío(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Primo(a)');
INSERT INTO PMM_FAMILY_RELATIONSHIP(value) VALUES ('Otro');

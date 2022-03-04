INSERT INTO users (name, username, password, isAdmin) VALUES ('Admin','admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', true);
INSERT INTO users (name, username, password) VALUES ('Jón Jónsson','Nonn12', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii');
INSERT INTO users (name, username, password) VALUES ('Vanda Sigurðardótirr','vandasigvel', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii');
INSERT INTO users (name, username, password) VALUES ('Haraldur','halli', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii');

INSERT INTO events (id, name, slug, description, maker) VALUES (1, 'Forritarahittingur í febrúar', 'forritarahittingur-i-februar', 'Forritarar hittast í febrúar og forrita saman eitthvað frábært.',1);
INSERT INTO events (id, name, slug, description, maker) VALUES (2, 'Hönnuðahittingur í mars', 'honnudahittingur-i-mars', 'Spennandi hittingur hönnuða í Hönnunarmars.',1);
INSERT INTO events (id, name, slug, description, maker) VALUES (3, 'Verkefnastjórahittingur í apríl', 'verkefnastjorahittingur-i-april', 'Virkilega vel verkefnastýrður hittingur.',1);

INSERT INTO registrations (name, comment, event) VALUES ('Admin', 'Hlakka til að forrita með ykkur', 1);
INSERT INTO registrations (name, comment, event) VALUES ('Admin', null, 1);
INSERT INTO registrations (name, comment, event) VALUES ('Admin', 'verður vefforritað?', 1);


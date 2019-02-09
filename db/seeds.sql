
drop database scorekeeper;
create database scorekeeper;


use scorekeeper;

insert into teams
    (teamName)
VALUES
    ('Raw Tan Zombies'),
    ('The InnerCity Spinners'),
    ('The Wigglers'),
    ('End Return Buzzards'),
    ('North Beat Silencers'),
    ('Sprinting Honkers'),
    ('Johnny Tornadoes'),
    ('Gloating Icebergs');


insert into players
    (firstName, lastName, jerseyNumber, TeamID)
VALUES
    ('James', 'Johnson' , '5' , 1),
    ('Alex', 'Smith' , '88' , 1),
    ('Bob', 'Caldwell' , '34' , 1),
    ('Marcelino', 'Ocampo' , '87' , 1),
    ('Mary', 'Rothfuss' , '59' , 1),
    ('Antony', 'Mcdonell' , '89' , 1),
    ('Clifton', 'Tiedemann' , '2' , 1),
    ('Newton', 'Gerard' , '76' , 1),
    ('Brendon', 'Kosinski' , '30' , 1),
    ('Alan', 'Latch' , '4' , 2),
    ('Harris', 'Almy' , '20' , 2),
    ('Lupe', 'Hillyer' , '83' , 2),
    ('Archie', 'Litton' , '14' , 2),
    ('Rene', 'Alphonse' , '28' , 2),
    ('Lane', 'Donohoe' , '38' , 2),
    ('Jae', 'Simeon' , '11' , 2),
    ('Josiah', 'Burkhalter' , '8' , 2),
    ('Randolph', 'Pascale' , '48' , 2),
    ('Rickey', 'Culligan' , '64' , 3),
    ('Kerry', 'Toole' , '69' , 3),
    ('Sammy', 'Moffatt' , '90' , 3),
    ('Erik', 'Balcom' , '38' , 3),
    ('Benito', 'Shreffler' , '55' , 3),
    ('Marco', 'Polo' , '94' , 3),
    ('Arnulfo', 'Argo' , '71' , 3),
    ('Garrett', 'Cruze' , '12' , 3),
    ('Duane', 'Dildine' , '73' , 3),
    ('Eldon', 'Parrent' , '97' , 4),
    ('Chadwick', 'Garcia' , '75' , 4),
    ('Carroll', 'Rolfe' , '16' , 4),
    ('Ambrose', 'Damico' , '24' , 4),
    ('Heath', 'Jerez' , '6' , 4),
    ('Mikel', 'Blasi' , '46' , 4),
    ('Rodolfo', 'Eckhardt' , '2' , 4),
    ('Quincy', 'Cothern' , '43' , 4),
    ('Renato', 'Shelor' , '89' , 4),
    ('Truman', 'Edgemon' , '58' , 5),
    ('Denver', 'Romano' , '50' , 5),
    ('Winston', 'Cobey' , '89' , 5),
    ('Shane', 'Deyoung' , '45' , 5),
    ('Orlando', 'Thorne' , '85' , 5),
    ('Mohamed', 'Mcguffey' , '73' , 5),
    ('Cristobal', 'Kocian' , '82' , 5),
    ('Juan', 'Raglin' , '20' , 5),
    ('Dustin', 'Gendron' , '49' , 5),
    ('Chuck', 'Beighley' , '74' , 6),
    ('Emerson', 'Bartman' , '72' , 6),
    ('Roman', 'Boxx' , '8' , 6),
    ('Hunter', 'Penrod' , '5' , 6),
    ('Graham', 'Wedge' , '50' , 6),
    ('Monroe', 'Dorrell' , '45' , 6),
    ('Faustino', 'Segawa' , '25' , 6),
    ('Quinton', 'Bermudez' , '47' , 6),
    ('Jayson', 'Mcghie' , '85' , 6),
    ('Erwin', 'Rodriquez' , '18' , 7),
    ('Aldo', 'Earhart' , '65' , 7),
    ('Thanh', 'Schlagel' , '29' , 7),
    ('Walker', 'Siegal' , '81' , 7),
    ('Louis', 'Rigby' , '36' , 7),
    ('Shelton', 'Lococo' , '12' , 7),
    ('Jared', 'Seamans' , '16' , 7),
    ('Freddie', 'Poudrier' , '48' , 7),
    ('Rod', 'Rosenberger' , '61' , 7),
    ('Abram', 'Cohen' , '45' , 8),
    ('Diego', 'Dorantes' , '76' , 8),
    ('Buster', 'Duffel' , '50' , 8),
    ('Bernie', 'Khan' , '30' , 8),
    ('Wes', 'Prestwood' , '49' , 8),
    ('Carol', 'Reisman' , '33' , 8),
    ('Gaylord', 'Musgrove' , '99' , 8),
    ('Tyron', 'Mcelhannon' , '75' , 8),
    ('Kenny', 'Erlandson' , '54' , 8);


insert into games
    (gameDate, homeTeamID, visitorTeamID)
VALUES
    ('2019-02-02 13:00:00', 1 , 7),
    ('2019-02-03 13:00:00', 2 , 6),
    ('2019-02-04 16:00:00', 3 , 5),
    ('2019-02-05 16:00:00', 4 , 1),
    ('2019-02-06 19:00:00', 5 , 3),
    ('2019-02-07 19:00:00', 6 , 2),
    ('2019-02-08 19:00:00', 7 , 4),
('2019-02-09 13:00:00', 1 , 7),
('2019-02-10 13:00:00', 2 , 6),
('2019-02-11 16:00:00', 3 , 5),
('2019-02-12 16:00:00', 4 , 1),
('2019-02-13 19:00:00', 5 , 3),
('2019-02-14 19:00:00', 6 , 2),
('2019-02-15 19:00:00', 7 , 4);



insert into goals
    (timeRemaining, GameID, PlayerID, TeamID)
VALUES
    (2012, 1 , 3 , 1),
    (1232, 1 , 6 , 1),
    (1115, 1 , 56 , 7),
    (1330, 2 , 11 , 2),
    (1325, 2 , 50 , 6),
    (1001, 2 , 49 , 6),
    (920, 2 , 53 , 6);




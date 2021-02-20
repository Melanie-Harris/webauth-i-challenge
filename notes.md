-npm init (for package that json. press enter until you get package)
-npm i knex (ability to use knex feature)
-npm i express (ability to use express feature))
-npm i nodemon -g
-npm i cors
-knex init (knexfile.js which houses migrations and seeds)
    *inside of knexfile.js delete everything except the development portion
    * then add
-npm install sqlite3
-knex migrate:make migration 
    *make tables in migration file
-knex migrate:latest
-knex seed:make 001-users (create seed files. create file for each data set) 
-knex seed:run (run seeds)

-order
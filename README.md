# Pasos para usar el front-end del proyecto
## Version de node
para este proyecto de angular se necesita la version 18.16.0 pueden descargarsolo esta versio o tambien
pueden descargar el manejador de versiones de node, lo cual les recomiendo, lo pueden descargar desde 
aqui: https://github.com/coreybutler/nvm-windows
## instalar angular CLI 
una vez hayan descargado la version de Node.js, procedemos a instakar angular cli con el  siguiente 
comando

    npm install -g @angular/cli

## instalar dependencias
para instalar las dependencias de node simplemente ejecutamos el comando 


    npm install

para ejecutar el programa simplemente ejecutamos

    ng serve

---

# pasos para usar el back-end de nuestro proyecto
primeramente devemos verificar la version de php que tengamos instaldo, para hacer esto 
escribimos en la terminal, para este proyecto necesitamos la version 8.1 o superior
    
    php -v
si no tenemos php podemos instalarlo desde aqui: https://www.apachefriends.org/es/index.html

## instalar composer
el paso siguiente es la instalacion de composer para poder gestionar las librerias
necesarias para ejecutar el proyecto en laravel 10
podremos descargar composer desde aqui: https://getcomposer.org/download/

## instalar dependencias de composer
ejecutamos el siguiente comando  para instalar las dependencias de composer en nuestro proyecto
    
    composer install
    
## generar key de laravel
aqui debemos copiar el contenido del archivo .env.example en el archivo .env, luego
debemos ejecutar el siguiente comando para poder usar laravel

    php artisan key:generate

## ejecutar las migraciones
para esto ya debemos tener una base de datos y haber configurado el archivo .env, aqui debemos ubicar el nombre de la base de datos y demas datos de coneccion para postgres.
una vez establecidas los datos de coneccion a tu base de datos local ejecutamos el siguiente comando
   
    php artisan migrate

con esto ya deberiamos tener la base de datos con las tablas basicas de nuestro sistema

## establecer jwt key
lo siguiente que queda por hacer es establecer el json web token (jwt)m lo hacemos con el siguiente comando
    
    php artisan jwt:secret

y listo, ya podemos usar tanto nuestro front como nuestro backend
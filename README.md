# Huubie Local Dev RESTful API

Crea una API local para pruebas y desarrollo, con los mismos puntos de
entrada que la API de producción, pero co una base de datos diferente,
lo que permite hacer cambios y pruebas de todo tipo, antes de aprobarlas
y ponerlas en producción, sin alterar los datos reales.

## Arquitectura

Esta simple implementación fue desarrollada con [Node.js](https://nodejs.org)
v18.18.2, sobre el marco de desarrollo (framework)
[Express](https://expressjs.com) v4.19.2.

El servidor de base de datos es [PostgreSQL](https://postgresql.org) v14.11,

sobre Linux, y la Base de Datos es consultada y manipulada con ayuda de
[Prisma](https://prisma.io) ORM v5.13.

## Requisitos

Antes de continuar, asegúrese de contar con el siguiente software en su
sistema local:

- **PostgreSQL**: Servidor de Bases de Datos, fuente abierta, PostgreSQL
  versión 14.11 o superior.
- **Node.js**: Entorno de ejecución de JavaScript Node.js, versión 18.18.2
  o superior.
- **NPM**: Manejador de paquetes de Node, versión 9.8.1 o superior.

## Instalación

Para instalar la API, es necesario clonar el presente repositorio, instalar
las dependencias, establecer algunas variables de entorno y ejecutar los
comados de inicialización antes de correr la API de manera local.

## Clonar el repositorio

    $ git clone https://github.com/sterroso/huubie_local-api.git
    $ cd huubie_local-api
    $ npm i
    $ npm run dev

## Variables de entorno

Para poder correr la API local, requiere la creacion de las variables de
entorno:

1. Crear un archivo .env en huubie_local-api
2. En el archivo .env escribir lo siguiente:

    - PORT=4000
    
    - JWT_SECRET="Numero aleatorio generado con el siguiente comando"

        En la terminal posicionados en huubie_local-api (cd huubie_local-api) 
        copiaras y pegaras:

            head /dev/urandom | sha256sum
        
        La terminal te responderar con el numero aleatorio que copiaras y pegaras
        eb JWT_SECRET.

    - DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/huubie_api_dev?schema=public"

        *Nota:* USUARIO se sustituira por tu nombre de usuario de Postgres, asi como
        CONTRASENA, y huubie_api_dev dependera del nombre que le asignes a la hora de 
        crear tu base de datos (puedes ponerle huubie_api_dev y dejar la URL igual, o 
        puedes ponerle pepito y cambiar .../pepito?schema=public).

## Creacion de la base de datos

1. En SQL Shell despues de ingresas tus datos 

      Server [localhost]:
      Database [postgres]:
      Port [5432]:
      Username [TuNombreDeUsuario]:
      Password for user postgres:

  pondras el siguiente comando para crear tu base de datos:

    CREATE DATABASE huubie_api_dev;

    Te debe de contestar: CREATE DATABASE

2. Para confirmar que has creado correctamente tu base de datos, realiza el 
   siguiente comando:

    \l
    Te debera salir una tabla con todas tus BDD y debe aparecer huubie_api_dev.

3. Una vez confirmado conectaras tu BDD con el sigueinte comando:

    \c huubie_api_dev
    Te debe aparecer: You are now connected to database "huubie_api_dev" 
    as user "TUUSUARIO".

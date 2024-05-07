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

### Clonar el repositorio

    $ git clone https://this.repo.git
    $ cd huubie_local-api
    $ npm i
    $ npm run dev

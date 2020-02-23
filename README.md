# Código del proyecto final WallaClone del BootCamp 7 KeepCoding

## Back-end

El Back-end está desarrollado con NodeJs.

### Antes de arracar

Como primera acción que se debe realizar es instalar las dependencias con el comando: `npm install`.
Si no se realiza esta acción el servidor no será capaz de arrancar.

Modos de ejecución:

### `npm start`

Arranca el servidor en el modo de producción<br />
Acceda a [http://localhost:4000](http://localhost:4000) para acceder a través del navegador.


### `npm run dev`

Arranca el servidor en el modo de desarrollo.
Se estará reinicializando el servicio en cada modificación que se realice, para un control en tiempo real del servicio.

### Variables de entorno

Antes de arrancar el servidor debemos crear un archivo .env en el cual debe indicarse las variables de entorno del proyecto.
Encontrará un ejemplo de las variables necesarias en el repositorio de código.

## Front-end

El Front-end está desarrollado con React, en su versión con Hooks y Context.

### Antes de arracar

Como primera acción que se debe realizar es instalar las dependencias con el comando: `npm install`.
Si no se realiza esta acción nuestra aplicación podrá ejecutarse.

Modos de ejecución:

### `npm start`

Arranca la aplicación en modo de desarrollo<br />
Acceda a [http://localhost:3000](http://localhost:3000) para acceder a través del navegador.

### `npm run build`

Con este comando se genera un fichero minificado con el código para desplegar en producción.
En caso de haberse generado el fichero build y, se requiera hacer cualquier modificación en desarrollo, será necesario volver a ejecutar el comando, el cual creará el fichero nuevamente.

## Despliegue

El despliegue de este proyecto está realizado sobre una instancia de un servidor de AWS.
Como web service, se ha utilizado Nginx y, para la persistencia del servidor NodeJs se ha utilizado PM2.
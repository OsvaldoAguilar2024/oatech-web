# oatech-web

Landing de OA Tech (oatech.com.co).

- `server/index.ts`: código de la página. Se publica como Railway Function en el servicio `oatech-web` (proyecto `ia-para-contadores`). Este archivo es una copia de referencia del código desplegado.
- `fotos/`: imágenes de la página en AVIF, servidas desde jsDelivr fijadas a un commit:
  `https://cdn.jsdelivr.net/gh/OsvaldoAguilar2024/oatech-web@<commit>/fotos/<nombre>.avif`

Para cambiar fotos: subir los archivos nuevos, hacer commit y poner el hash de ese commit en la constante `FOTOS` en `server/index.ts`.

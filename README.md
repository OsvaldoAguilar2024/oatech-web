# oatech-web

Landing de OA Tech (oatech.com.co).

- `server/index.ts`: código de la página. Se publica como Railway Function en el servicio `oatech-web` (proyecto `ia-para-contadores`). Este archivo es una copia de referencia del código desplegado.
- `fotos/`: imágenes de la página en AVIF, servidas desde jsDelivr con el tag `fotos-v1`:
  `https://cdn.jsdelivr.net/gh/OsvaldoAguilar2024/oatech-web@fotos-v1/fotos/<nombre>.avif`

Para cambiar fotos: subir los archivos nuevos, crear un tag nuevo (por ejemplo `fotos-v2`) y actualizar la constante `FOTOS` en `server/index.ts`.

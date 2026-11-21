# oatech-web

Sitio de OA Tech (oatech.com.co) y sus subpáginas. Todo corre como **Railway Functions** en el proyecto **oatech** de Railway. Las funciones no se despliegan desde este repositorio: el código vive en Railway y aquí se guarda una **copia de respaldo**. Cuando cambies una función en Railway, actualiza también su archivo aquí.

## Servicios del proyecto oatech en Railway

| Servicio Railway | Archivo en este repo | Qué hace |
|---|---|---|
| `oatech-web` | `server/index.ts` | Página principal (oatech.com.co) y `/farma`. Guarda contactos y diagnósticos en Postgres y avisa por correo con Resend. |
| `oatech-decide` | `functions/oatech-decide/index.tsx` | decide.oatech.com.co: diagnóstico de IA con calculadora. |
| `oatech-bubble` | `functions/oatech-bubble/index.tsx` | bubble.oatech.com.co: migraciones fuera de Bubble (en inglés). |
| `landing` | `functions/landing/index.tsx` | Landing "IA para Contadores" con lista de espera en Postgres. |
| `oatech-media` | `functions/oatech-media/index.tsx` | Sirve imágenes incrustadas en el código. |
| `oatech-demo` | `functions/oatech-demo/index.tsx` | demo.oatech.com.co. **Ojo:** este archivo es solo el cargador. El código real de la demo está comprimido dentro de Postgres, en la tabla `demo_meta.codigo` (partes 1 a 6, SHA-256 `c44f0afa…3d37`). Respáldalo desde la base de datos. |
| `oatech-brand` | *(no incluido)* | Sirve `logo-oscuro.webp`, `favicon.png`, `apple-touch-icon.png` y `firma.png`, incrustados en base64 en el código. Ver abajo. |
| `assets` | *(no incluido)* | Sirve `osvaldo.webp` (foto), incrustada en base64 en el código. Ver abajo. |
| `Postgres` | — | Base de datos. Tablas: `oatech_contactos`, `oatech_diagnosticos`, `oatech_firma`, `waitlist*`, `demo_meta.codigo`. |

### oatech-brand y assets

Su código es casi todo imágenes en base64, así que no se copió aquí. Para respaldarlas, descarga los archivos desde sus URL públicas y verifica que el SHA-256 coincida:

| Archivo | URL | SHA-256 |
|---|---|---|
| logo-oscuro.webp | https://oatech-brand-production.up.railway.app/logo-oscuro.webp | `9cee50392d05f9fa4bb1dd458d4ea0ff91208a86309925d1c5fef1f60fe31f5b` |
| favicon.png | https://oatech-brand-production.up.railway.app/favicon.png | `c36095172ef1ece4af1b9f43ee2eb6521db2bcdeb63a6c839ae99b6396d6fc97` |
| apple-touch-icon.png | https://oatech-brand-production.up.railway.app/apple-touch-icon.png | `f3f4c9eb169b65f1b95d1f0b546f588563e8647a146cdc48707ebba203c9cca1` |
| firma.png | https://oatech-brand-production.up.railway.app/firma.png | `ce272d997548c8b60d8d7c6c115bb14834babdf200991d483d4186aff0e451b0` |
| osvaldo.webp | https://oatech-assets.up.railway.app/osvaldo.webp | (ver `/hash` en el servicio `assets`) |

Ambas funciones leen el archivo pedido y lo devuelven con `Cache-Control` de una semana y `Access-Control-Allow-Origin: *`.

## Variables de oatech-web

- `DATABASE_URL`: conexión a Postgres.
- `ADMIN_KEY`: clave para `GET /api/contacto` y `GET /api/diagnostico` (`?key=...`, admite `&format=csv`).
- `RESEND_API_KEY`: clave de Resend para los avisos por correo.
- `EMAIL_FROM`: remitente de los avisos (`OA Tech <avisos@oatech.com.co>`).
- `NOTIFY_EMAIL` (opcional): destinatario de los avisos. Por defecto, `osvaldo.aguilar@oatech.com.co`.

## Fotos

`fotos/`: imágenes de la página en AVIF, servidas desde jsDelivr fijadas a un commit:
`https://cdn.jsdelivr.net/gh/OsvaldoAguilar2024/oatech-web@<commit>/fotos/<nombre>.avif`

Para cambiar fotos: sube los archivos nuevos, haz commit y pon el hash de ese commit en la constante `FOTOS` de `server/index.ts`.

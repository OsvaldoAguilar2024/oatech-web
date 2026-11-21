// OA Tech · Demo "Una sola verdad" (datos 100% ficticios). Código comprimido guardado por partes en la base de datos.
import { SQL } from "bun";
const HASH = "c44f0afae46fa8eec3d83236e6786f50589a5e91d73876a1209590d23d413d37";
const db = new SQL(Bun.env.DATABASE_URL!);
const rows: any[] = await db.unsafe("SELECT parte, CASE WHEN parte = 2 THEN substr(datos, 1, 15558) ELSE datos END AS datos FROM demo_meta.codigo WHERE parte BETWEEN 1 AND 6 ORDER BY parte");
await db.close();
const SRC = rows.map((r) => r.datos).join("");
const got = new Bun.CryptoHasher("sha256").update(SRC).digest("hex");
if (got !== HASH) { console.error("Código incompleto o alterado:", got); throw new Error("hash"); }
const code = new TextDecoder().decode(Bun.gunzipSync(Buffer.from(SRC, "base64")));
let file = "/tmp/oatech-demo-app.ts";
try { await Bun.write(file, code); } catch (e) { file = import.meta.dir + "/oatech-demo-app.ts"; await Bun.write(file, code); }
await import(file);

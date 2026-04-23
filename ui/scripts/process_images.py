"""
Procesador de imágenes de productos.

Uso:
  python scripts/process_images.py

Input:  ui/public/images/raw/   → {id}.jpg | {id}.png | {id}.webp
Output: ui/public/images/products/ → {id}.png

Cada imagen queda:
  - Sin fondo (transparente)
  - 600x600 px, centrada con padding transparente
  - Formato PNG
"""

import io
import sys
from pathlib import Path
from PIL import Image
from rembg import remove

INPUT_DIR  = Path(__file__).parent.parent / "public" / "images" / "raw"
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "products"
TARGET_SIZE = 600
SUPPORTED   = {".jpg", ".jpeg", ".png", ".webp"}


def process(src: Path) -> None:
    print(f"  Procesando {src.name}...")

    with open(src, "rb") as f:
        raw = f.read()

    # Remover fondo → RGBA
    result_bytes = remove(raw)
    no_bg = Image.open(io.BytesIO(result_bytes)).convert("RGBA")

    # Recortar al bounding box real (elimina padding innecesario)
    bbox = no_bg.getbbox()
    if bbox:
        no_bg = no_bg.crop(bbox)

    # Escalar manteniendo aspect ratio
    no_bg.thumbnail((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

    # Canvas cuadrado transparente y centrar
    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    x = (TARGET_SIZE - no_bg.width)  // 2
    y = (TARGET_SIZE - no_bg.height) // 2
    canvas.paste(no_bg, (x, y), no_bg)

    dest = OUTPUT_DIR / (src.stem + ".png")
    canvas.save(dest, "PNG")
    print(f"  -> Guardado en {dest.relative_to(Path(__file__).parent.parent.parent)}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    filter_ids = set(sys.argv[1:])
    images = [
        p for p in INPUT_DIR.iterdir()
        if p.suffix.lower() in SUPPORTED
        and (not filter_ids or p.stem in filter_ids)
    ]

    if not images:
        print(f"No se encontraron imágenes en {INPUT_DIR}")
        return

    print(f"Encontradas {len(images)} imagen(es). Procesando...\n")

    errors = []
    for img_path in sorted(images):
        try:
            process(img_path)
        except Exception as e:
            errors.append((img_path.name, str(e)))
            print(f"  [ERROR] {img_path.name}: {e}")

    print(f"\nListo. {len(images) - len(errors)}/{len(images)} procesadas correctamente.")
    if errors:
        print("Errores:")
        for name, msg in errors:
            print(f"  - {name}: {msg}")


if __name__ == "__main__":
    main()

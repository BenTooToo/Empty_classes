from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOURCE_ROOT = PROJECT_ROOT / "original-images"

LOSSLESS_IMAGES = {
    "ghost-girl-official-roster-crop.png",
}

CRITICAL_IMAGES = {
    "ghost-girl-id-portrait.png",
    "ghost-girl-inverted-eyes-strip.png",
    "pics/hash-bloodshot-eyes-jumpscare.png",
}

PORTRAIT_IMAGES = {
    "ben2tu-avatar.png",
    "lin-ruoxuan.png",
    "pics/admin.png",
    "pics/friend1.png",
    "pics/friend2.png",
}


def encoding_options(relative_path: str) -> dict[str, object]:
    if relative_path in LOSSLESS_IMAGES:
        return {"lossless": True, "method": 6}
    if relative_path in CRITICAL_IMAGES:
        return {"quality": 92, "method": 6}
    if relative_path in PORTRAIT_IMAGES:
        return {"quality": 90, "method": 6}
    return {"quality": 88, "method": 6}


def convert_image(source_path: Path) -> tuple[Path, int, int]:
    relative_path = source_path.relative_to(SOURCE_ROOT)
    relative_key = relative_path.as_posix()
    output_path = (PROJECT_ROOT / relative_path).with_suffix(".webp")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source)
        original_size = image.size
        save_options = encoding_options(relative_key)

        if source.info.get("icc_profile"):
            save_options["icc_profile"] = source.info["icc_profile"]
        if source.info.get("exif"):
            save_options["exif"] = source.info["exif"]

        image.save(output_path, "WEBP", **save_options)

    with Image.open(output_path) as generated:
        if generated.size != original_size:
            raise RuntimeError(
                f"Dimension mismatch for {relative_key}: "
                f"{original_size} != {generated.size}"
            )
        generated.verify()

    return output_path, source_path.stat().st_size, output_path.stat().st_size


def main() -> None:
    if not SOURCE_ROOT.is_dir():
        raise SystemExit(f"Missing source directory: {SOURCE_ROOT}")

    source_paths = sorted(SOURCE_ROOT.rglob("*.png"))
    if not source_paths:
        raise SystemExit("No PNG source images found.")

    original_bytes = 0
    webp_bytes = 0

    for source_path in source_paths:
        output_path, source_size, output_size = convert_image(source_path)
        original_bytes += source_size
        webp_bytes += output_size
        relative_output = output_path.relative_to(PROJECT_ROOT).as_posix()
        reduction = 100 * (1 - output_size / source_size)
        print(
            f"{relative_output}: "
            f"{source_size / 1024:.0f} KiB -> {output_size / 1024:.0f} KiB "
            f"({reduction:.1f}% smaller)"
        )

    total_reduction = 100 * (1 - webp_bytes / original_bytes)
    print(
        f"\nTotal: {original_bytes / 1024 / 1024:.2f} MiB -> "
        f"{webp_bytes / 1024 / 1024:.2f} MiB "
        f"({total_reduction:.1f}% smaller)"
    )


if __name__ == "__main__":
    main()

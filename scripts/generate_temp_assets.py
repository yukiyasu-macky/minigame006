from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "temp"


def ensure_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def save(img: Image.Image, name: str) -> None:
    path = OUT / name
    ensure_dir(path)
    img.save(path)


def vertical_bg(top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    w, h = 1080, 1920
    img = Image.new("RGBA", (w, h))
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        color = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(3)) + (255,)
        for x in range(w):
            px[x, y] = color
    draw = ImageDraw.Draw(img, "RGBA")
    for i in range(18):
        x = (i * 157) % w
        y = 170 + (i * 211) % 1280
        draw.ellipse((x - 120, y - 45, x + 160, y + 55), fill=(255, 255, 255, 26))
    return img.filter(ImageFilter.GaussianBlur(0.4))


def make_backgrounds() -> None:
    title = vertical_bg((253, 231, 188), (202, 160, 103))
    draw = ImageDraw.Draw(title, "RGBA")
    draw.rounded_rectangle((90, 1110, 990, 1740), radius=60, fill=(128, 81, 48, 90))
    draw.rounded_rectangle((160, 1190, 920, 1680), radius=70, fill=(141, 205, 196, 170))
    draw.rectangle((0, 0, 1080, 120), fill=(98, 59, 37, 210))
    save(title, "backgrounds/temp_title_bg.png")

    home = vertical_bg((250, 228, 191), (198, 151, 95))
    draw = ImageDraw.Draw(home, "RGBA")
    draw.rounded_rectangle((86, 360, 994, 1540), radius=70, fill=(132, 88, 55, 95), outline=(86, 57, 38, 90), width=8)
    draw.rounded_rectangle((170, 760, 910, 1360), radius=86, fill=(139, 204, 195, 180), outline=(92, 63, 42, 120), width=9)
    draw.ellipse((220, 900, 860, 1270), fill=(182, 221, 214, 95))
    draw.rounded_rectangle((120, 310, 960, 460), radius=36, fill=(104, 63, 40, 220))
    for i in range(5):
        x = 190 + i * 170
        draw.rounded_rectangle((x, 510, x + 72, 640), radius=24, fill=(244, 205, 124, 130), outline=(92, 63, 42, 90), width=4)
    save(home, "backgrounds/temp_home_bg.png")

    game = vertical_bg((245, 223, 184), (124, 188, 179))
    draw = ImageDraw.Draw(game, "RGBA")
    draw.rounded_rectangle((80, 520, 1000, 1520), radius=86, fill=(89, 171, 166, 220), outline=(92, 63, 42, 120), width=10)
    for i in range(12):
        x = 130 + (i * 83) % 820
        y = 610 + (i * 137) % 780
        draw.arc((x - 90, y - 30, x + 90, y + 30), 0, 180, fill=(255, 255, 255, 64), width=5)
    save(game, "backgrounds/temp_game_bg.png")

    result = vertical_bg((255, 238, 203), (217, 177, 121))
    draw = ImageDraw.Draw(result, "RGBA")
    draw.ellipse((210, 760, 870, 1420), fill=(255, 255, 255, 70))
    draw.rounded_rectangle((130, 280, 950, 1640), radius=60, outline=(91, 61, 40, 110), width=8)
    save(result, "backgrounds/temp_result_bg.png")


def transparent(size: tuple[int, int]) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    return img, ImageDraw.Draw(img, "RGBA")


def make_cat() -> None:
    img, draw = transparent((512, 512))
    outline = (83, 52, 36, 230)
    cream = (246, 224, 190, 255)
    draw.ellipse((118, 118, 394, 394), fill=cream, outline=outline, width=10)
    draw.polygon([(152, 142), (196, 62), (232, 150)], fill=cream, outline=outline)
    draw.polygon([(280, 150), (318, 62), (360, 142)], fill=cream, outline=outline)
    draw.ellipse((168, 238, 202, 272), fill=outline)
    draw.ellipse((310, 238, 344, 272), fill=outline)
    draw.arc((224, 274, 288, 324), 10, 170, fill=outline, width=6)
    draw.ellipse((212, 328, 300, 378), fill=(238, 207, 173, 255), outline=outline, width=6)
    draw.rounded_rectangle((212, 88, 300, 128), radius=18, fill=(255, 246, 226, 255), outline=outline, width=6)
    save(img.filter(ImageFilter.GaussianBlur(0.15)), "characters/temp_cat_round.png")


def make_piece(name: str, fill: tuple[int, int, int], text_color: tuple[int, int, int]) -> None:
    img, draw = transparent((128, 128))
    draw.ellipse((16, 18, 112, 110), fill=fill + (255,), outline=(77, 51, 35, 210), width=6)
    draw.ellipse((34, 30, 70, 48), fill=(255, 255, 255, 70))
    if name == "rock":
        draw.line((34, 70, 94, 46), fill=(98, 84, 72, 130), width=5)
        draw.line((48, 88, 96, 72), fill=(98, 84, 72, 110), width=4)
    elif name == "bubble":
        draw.ellipse((20, 20, 108, 108), fill=(157, 225, 229, 86), outline=(255, 255, 255, 190), width=8)
        draw.ellipse((38, 32, 58, 52), fill=(255, 255, 255, 150))
    else:
        draw.arc((38, 38, 90, 92), 15, 150, fill=text_color + (170,), width=5)
    save(img, f"puzzle/temp_{name}.png")


def make_puzzle_parts() -> None:
    make_piece("bubble", (166, 224, 229), (77, 51, 35))
    make_piece("leaf", (178, 211, 125), (77, 95, 44))
    make_piece("mud", (173, 123, 87), (91, 61, 40))
    make_piece("moss", (124, 174, 125), (49, 92, 66))
    make_piece("flower", (231, 166, 176), (134, 75, 92))
    make_piece("rock", (153, 142, 130), (83, 70, 61))


def make_fx() -> None:
    steam, draw = transparent((256, 256))
    for i in range(4):
        x = 44 + i * 42
        draw.ellipse((x, 38, x + 74, 220), fill=(255, 255, 255, 42))
    save(steam.filter(ImageFilter.GaussianBlur(12)), "fx/temp_steam.png")

    sparkle, draw = transparent((128, 128))
    for x, y, r in [(64, 26, 18), (34, 72, 12), (94, 82, 14), (62, 104, 8)]:
        draw.polygon([(x, y - r), (x + r // 3, y - r // 3), (x + r, y), (x + r // 3, y + r // 3), (x, y + r), (x - r // 3, y + r // 3), (x - r, y), (x - r // 3, y - r // 3)], fill=(255, 231, 134, 220))
    save(sparkle, "fx/temp_sparkle.png")

    zabaa, draw = transparent((512, 512))
    for i in range(8):
        y = 110 + i * 34
        draw.arc((40, y, 472, y + 120), 185, 355, fill=(200, 244, 245, 120), width=10)
    draw.ellipse((72, 132, 440, 396), fill=(255, 255, 255, 36))
    save(zabaa.filter(ImageFilter.GaussianBlur(1.5)), "fx/temp_zabaa_effect.png")


def make_ui() -> None:
    panel, draw = transparent((900, 420))
    draw.rounded_rectangle((12, 12, 888, 408), radius=42, fill=(255, 244, 219, 235), outline=(97, 66, 44, 150), width=8)
    draw.rounded_rectangle((44, 44, 856, 376), radius=30, outline=(217, 173, 116, 120), width=4)
    save(panel, "ui/temp_panel.png")

    button, draw = transparent((640, 180))
    draw.rounded_rectangle((10, 10, 630, 158), radius=36, fill=(143, 93, 58, 255), outline=(73, 45, 31, 220), width=8)
    draw.rounded_rectangle((30, 22, 610, 72), radius=24, fill=(180, 124, 78, 90))
    draw.rectangle((26, 150, 614, 168), fill=(62, 37, 26, 220))
    save(button, "ui/temp_button.png")


def main() -> None:
    make_backgrounds()
    make_cat()
    make_puzzle_parts()
    make_fx()
    make_ui()


if __name__ == "__main__":
    main()

export function size(size: number) {
    return size * 16 + "px";
}

export function border(
    color: string,
    style: string = "solid",
    width: number = 1
) {
    return `${width}px ${style} ${color}`;
}

export const screenSizes = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};

export function hexToRgb(
    hex: string
): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function darken(color: string, amount: number) {
    // console.log(color)
    const { r, g, b } = hexToRgb(color) ?? { r: 0, g: 0, b: 0 };
    return rgbToHex(
        Math.round(r * (1 - amount)),
        Math.round(g * (1 - amount)),
        Math.round(b * (1 - amount))
    );
}

export function lighten(color: string, amount: number) {
    const { r, g, b } = hexToRgb(color) ?? { r: 0, g: 0, b: 0 };
    return rgbToHex(
        Math.round(r + (255 - r) * amount),
        Math.round(g + (255 - g) * amount),
        Math.round(b + (255 - b) * amount)
    );
}

export function rgbA(rgb: string, alpha: number) {
    return `rgba(${rgb}, ${alpha})`;
}

export function rgba(r: number, g: number, b: number, alpha: number) {
    if (alpha > 1) {
        alpha = 1;
    }
    if (alpha < 0) {
        alpha = 0;
    }
    if (r > 255) {
        r = 255;
    }
    if (r < 0) {
        r = 0;
    }
    if (g > 255) {
        g = 255;
    }
    if (g < 0) {
        g = 0;
    }
    if (b > 255) {
        b = 255;
    }
    if (b < 0) {
        b = 0;
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function blend(color1: string, color2: string, ratio: number): string {
    // Remove leading '#' if present
    color1 = color1.replace(/^#/, "");
    color2 = color2.replace(/^#/, "");

    // Convert hex to RGB values
    const r1 = parseInt(color1.substring(0, 2), 16);
    const g1 = parseInt(color1.substring(2, 4), 16);
    const b1 = parseInt(color1.substring(4, 6), 16);
    const r2 = parseInt(color2.substring(0, 2), 16);
    const g2 = parseInt(color2.substring(2, 4), 16);
    const b2 = parseInt(color2.substring(4, 6), 16);

    // Interpolate the RGB values based on the ratio
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    // Convert back to hex string
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function sortListAlphabetically<T>(list: T[], property: keyof T): T[] {
    return list.sort((a, b) => {
        const valueA = a[property];
        const valueB = b[property];

        if (valueA < valueB) {
            return -1;
        }

        if (valueA > valueB) {
            return 1;
        }

        return 0;
    });
}

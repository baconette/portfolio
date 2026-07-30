import { readFileSync } from "node:fs";

export function loadJson(path) {
    return JSON.parse(readFileSync(path, "utf8"));
}

function isRef(value) {
    return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

/** Follows a DTCG `{a.b.c}` alias to its terminal `$value`, resolved against the given token tree. */
export function deref(tree, value) {
    if (!isRef(value)) return value;

    const path = value.slice(1, -1).split(".");
    let node = tree;
    for (const segment of path) {
        node = node?.[segment];
    }
    return deref(tree, node?.$value);
}

/** Flattens a DTCG token tree into Map<dotPath, {value, description}> — one entry per leaf ($value-bearing) node. */
export function flattenTokens(tree) {
    const leaves = new Map();

    function walk(node, path) {
        if (node == null || typeof node !== "object") return;
        if ("$value" in node) {
            leaves.set(path.join("."), {
                value: node.$value,
                description: node.$description ?? "",
            });
            return;
        }
        for (const [key, child] of Object.entries(node)) {
            if (key.startsWith("$")) continue;
            walk(child, [...path, key]);
        }
    }

    walk(tree, []);
    return leaves;
}

export function classify(resolvedValue) {
    if (resolvedValue && typeof resolvedValue === "object" && !Array.isArray(resolvedValue) && "hex" in resolvedValue) {
        return "color";
    }
    if (
        resolvedValue &&
        typeof resolvedValue === "object" &&
        !Array.isArray(resolvedValue) &&
        "value" in resolvedValue &&
        "unit" in resolvedValue
    ) {
        return "dimension";
    }
    if (Array.isArray(resolvedValue)) return "shadow";
    if (typeof resolvedValue === "number") return "number";
    if (typeof resolvedValue === "string") return "string";
    if (resolvedValue && typeof resolvedValue === "object" && "fontFamily" in resolvedValue) return "typography";
    return "other";
}

export function toCssColor(resolvedValue) {
    const { hex, alpha } = resolvedValue;
    if (alpha == null || alpha >= 1) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function formatValue(kind, resolvedValue) {
    switch (kind) {
        case "color": {
            const { hex, alpha } = resolvedValue;
            return alpha != null && alpha < 1 ? `${hex} @ ${Math.round(alpha * 100)}%` : hex;
        }
        case "dimension":
            return `${resolvedValue.value}${resolvedValue.unit}`;
        case "number":
            return String(resolvedValue);
        case "string":
            return resolvedValue;
        case "shadow":
            return `${resolvedValue.length} layer${resolvedValue.length === 1 ? "" : "s"}`;
        case "typography":
            return `${resolvedValue.fontFamily}, ${resolvedValue.fontSize?.value}${resolvedValue.fontSize?.unit}`;
        default:
            return JSON.stringify(resolvedValue);
    }
}

/** Order-independent-for-objects, order-preserving-for-arrays deep stringify, for equality checks. */
export function stableStringify(value) {
    if (Array.isArray(value)) {
        return `[${value.map(stableStringify).join(",")}]`;
    }
    if (value && typeof value === "object") {
        const keys = Object.keys(value).sort();
        return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

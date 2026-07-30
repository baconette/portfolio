import tokensJson from "./tokens.json";

type JsonNode = Record<string, unknown>;

const tokens = tokensJson as JsonNode;

interface DtcgColorValue {
    hex: string;
    alpha?: number;
}

interface DtcgDimensionValue {
    value: number;
    unit: string;
}

function isRef(value: unknown): value is string {
    return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

/** Follows a DTCG `{a.b.c}` alias to its terminal `$value`, one level of $value at a time. */
function deref(value: unknown): unknown {
    if (!isRef(value)) return value;

    const path = value.slice(1, -1).split(".");
    let node: unknown = tokens;
    for (const segment of path) {
        node = (node as JsonNode | undefined)?.[segment];
    }
    return deref((node as JsonNode | undefined)?.$value);
}

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function cssColor(rawValue: unknown): string {
    const { hex, alpha } = rawValue as DtcgColorValue;
    return alpha != null && alpha < 1 ? hexToRgba(hex, alpha) : hex;
}

function px(rawValue: unknown): number {
    return (rawValue as DtcgDimensionValue).value;
}

function entries(node: unknown): [string, JsonNode][] {
    return Object.entries(node as JsonNode).filter((entry): entry is [string, JsonNode] => !entry[0].startsWith("$"));
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export interface ColorSwatch {
    /** Dot-path token name, e.g. "primitive.lime.500" or "background.page". */
    name: string;
    /** CSS-renderable color, resolved through any aliases. */
    color: string;
    hex: string;
    description: string;
}

export interface ColorGroup {
    key: string;
    description: string;
    swatches: ColorSwatch[];
}

function buildColorGroup(key: string, groupNode: JsonNode): ColorGroup {
    const swatches = entries(groupNode).map(([step, stepNode]) => {
        const raw = deref(stepNode.$value);
        return {
            name: `${key}.${step}`,
            color: cssColor(raw),
            hex: (raw as DtcgColorValue).hex,
            description: (stepNode.$description as string) ?? "",
        };
    });
    return {
        key,
        description: (groupNode.$description as string) ?? "",
        swatches,
    };
}

const colorNode = tokens.color as JsonNode;
const primitiveNode = colorNode.primitive as JsonNode;

export const colorPrimitiveGroups: ColorGroup[] = entries(primitiveNode).map(([family, familyNode]) =>
    buildColorGroup(family, familyNode),
);

export const colorSemanticGroups: ColorGroup[] = (["background", "foreground", "border", "accent"] as const).map(
    (category) => buildColorGroup(category, colorNode[category] as JsonNode),
);

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export interface SpacingPrimitive {
    name: string;
    px: number;
    description: string;
}

export interface SpacingSemanticToken {
    name: string;
    description: string;
    mobilePx: number;
    webPx: number;
}

const spacingNode = tokens.spacing as JsonNode;

export const spacingPrimitives: SpacingPrimitive[] = entries(spacingNode.primitive as JsonNode).map(
    ([step, stepNode]) => ({
        name: `spacing.primitive.${step}`,
        px: px(stepNode.$value),
        description: (stepNode.$description as string) ?? "",
    }),
);

const spacingSemanticCategories = ["inline", "component", "card", "content", "section", "page"] as const;

export const spacingSemanticTokens: SpacingSemanticToken[] = spacingSemanticCategories.flatMap((category) => {
    const categoryNode = spacingNode[category] as JsonNode | undefined;
    if (!categoryNode) return [];
    return entries(categoryNode).map(([name, tokenNode]) => ({
        name: `spacing.${category}.${name}`,
        description: (tokenNode.$description as string) ?? "",
        mobilePx: px(deref((tokenNode.mobile as JsonNode).$value)),
        webPx: px(deref((tokenNode.web as JsonNode).$value)),
    }));
});

// ---------------------------------------------------------------------------
// Radius
// ---------------------------------------------------------------------------

export interface RadiusToken {
    name: string;
    px: number;
    description: string;
}

const radiusNode = tokens.radius as JsonNode;

export const radiusPrimitives: RadiusToken[] = entries(radiusNode.primitive as JsonNode).map(([step, stepNode]) => ({
    name: `radius.primitive.${step}`,
    px: px(stepNode.$value),
    description: (stepNode.$description as string) ?? "",
}));

const radiusSemanticKeys = ["none", "sm", "md", "lg", "xl", "pill"] as const;

export const radiusSemanticTokens: RadiusToken[] = radiusSemanticKeys.map((key) => {
    const node = radiusNode[key] as JsonNode;
    return {
        name: `radius.${key}`,
        px: px(deref(node.$value)),
        description: (node.$description as string) ?? "",
    };
});

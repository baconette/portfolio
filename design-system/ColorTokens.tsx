import { colorPrimitiveGroups, colorSemanticGroups, type ColorGroup } from "./token-data";
import "./design-tokens.css";

function ColorGroupSection({ group }: { group: ColorGroup }) {
    return (
        <div className="dt-group">
            <h3 className="dt-group-title">{group.key}</h3>
            {group.description && <p className="dt-group-description">{group.description}</p>}
            <div className="dt-color-grid">
                {group.swatches.map((swatch) => (
                    <div className="dt-color-card" key={swatch.name}>
                        <div className="dt-color-swatch">
                            <div className="dt-color-swatch-fill" style={{ backgroundColor: swatch.color }} />
                        </div>
                        <div className="dt-color-meta">
                            <span className="dt-color-name">{swatch.name}</span>
                            <span className="dt-color-hex">{swatch.hex}</span>
                            {swatch.description && <p className="dt-color-description">{swatch.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PrimitiveColorTokens() {
    return (
        <div className="dt-page">
            <div className="dt-section">
                <h2 className="dt-section-title">Color primitives</h2>
                <p className="dt-section-description">
                    Raw color ramps — 11 even-lightness OKLCH steps per family. Hidden from pickers in Figma; semantic
                    tokens alias these.
                </p>
                {colorPrimitiveGroups.map((group) => (
                    <ColorGroupSection group={group} key={group.key} />
                ))}
            </div>
        </div>
    );
}

export function SemanticColorTokens() {
    return (
        <div className="dt-page">
            <div className="dt-section">
                <h2 className="dt-section-title">Semantic colors</h2>
                <p className="dt-section-description">
                    Background, foreground, border, and accent roles that alias the primitives above. Use these in
                    product code instead of primitive scales directly.
                </p>
                {colorSemanticGroups.map((group) => (
                    <ColorGroupSection group={group} key={group.key} />
                ))}
            </div>
        </div>
    );
}

export function ColorTokens() {
    return (
        <>
            <PrimitiveColorTokens />
            <SemanticColorTokens />
        </>
    );
}

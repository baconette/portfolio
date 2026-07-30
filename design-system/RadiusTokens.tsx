import { radiusPrimitives, radiusSemanticTokens } from "./token-data";
import "./design-tokens.css";

export function RadiusTokens() {
    return (
        <div className="dt-page">
            <div className="dt-section">
                <h2 className="dt-section-title">Radius primitives</h2>
                <p className="dt-section-description">Raw radius scale.</p>
                <div className="dt-radius-grid">
                    {radiusPrimitives.map((token) => (
                        <div className="dt-radius-card" key={token.name}>
                            <div className="dt-radius-box" style={{ borderRadius: `${token.px}px` }} />
                            <span className="dt-radius-name">{token.name}</span>
                            <span className="dt-radius-value">{token.px}px</span>
                            {token.description && <p className="dt-radius-description">{token.description}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="dt-section">
                <h2 className="dt-section-title">Semantic radius</h2>
                <p className="dt-section-description">
                    Contextual radius roles, each aliasing a primitive step above (or 0 for full-bleed).
                </p>
                <div className="dt-radius-grid">
                    {radiusSemanticTokens.map((token) => (
                        <div className="dt-radius-card" key={token.name}>
                            <div className="dt-radius-box" style={{ borderRadius: `${token.px}px` }} />
                            <span className="dt-radius-name">{token.name}</span>
                            <span className="dt-radius-value">{token.px}px</span>
                            {token.description && <p className="dt-radius-description">{token.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

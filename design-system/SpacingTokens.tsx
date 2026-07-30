import { spacingPrimitives, spacingSemanticTokens } from "./token-data";
import "./design-tokens.css";

const MAX_PRIMITIVE_PX = Math.max(...spacingPrimitives.map((token) => token.px));
const MAX_SEMANTIC_PX = Math.max(...spacingSemanticTokens.map((token) => Math.max(token.mobilePx, token.webPx)));

export function SpacingTokens() {
    return (
        <div className="dt-page">
            <div className="dt-section">
                <h2 className="dt-section-title">Spacing primitives</h2>
                <p className="dt-section-description">Raw 4px-base spacing scale (matches platform constraints).</p>
                <div className="dt-spacing-list">
                    {spacingPrimitives.map((token) => (
                        <div className="dt-spacing-row" key={token.name}>
                            <span className="dt-spacing-label">{token.name}</span>
                            <div className="dt-spacing-track">
                                <div
                                    className="dt-spacing-bar"
                                    style={{ width: `${(token.px / MAX_PRIMITIVE_PX) * 100}%` }}
                                />
                            </div>
                            <span className="dt-spacing-value">{token.px}px</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dt-section">
                <h2 className="dt-section-title">Semantic spacing</h2>
                <p className="dt-section-description">
                    Contextual spacing roles expressed as Mobile/Web pairs, each aliasing a primitive step above.
                </p>
                <div className="dt-spacing-list">
                    {spacingSemanticTokens.map((token) => (
                        <div className="dt-spacing-row" key={token.name}>
                            <span className="dt-spacing-label">{token.name}</span>
                            <div className="dt-spacing-modes">
                                <span className="dt-spacing-mode-label">Mobile</span>
                                <div className="dt-spacing-track" style={{ flex: 1 }}>
                                    <div
                                        className="dt-spacing-bar"
                                        style={{ width: `${(token.mobilePx / MAX_SEMANTIC_PX) * 100}%` }}
                                    />
                                </div>
                                <span className="dt-spacing-value">{token.mobilePx}px</span>
                            </div>
                            <span />
                            <div className="dt-spacing-modes" style={{ gridColumn: "2 / 3" }}>
                                <span className="dt-spacing-mode-label">Web</span>
                                <div className="dt-spacing-track" style={{ flex: 1 }}>
                                    <div
                                        className="dt-spacing-bar"
                                        style={{ width: `${(token.webPx / MAX_SEMANTIC_PX) * 100}%` }}
                                    />
                                </div>
                                <span className="dt-spacing-value">{token.webPx}px</span>
                            </div>
                            {token.description && <p className="dt-spacing-description">{token.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

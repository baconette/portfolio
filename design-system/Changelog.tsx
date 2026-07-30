import historyJson from "./changelog/history.json";
import "./design-tokens.css";

interface ChangelogChange {
    path: string;
    status: "added" | "removed" | "changed";
    kind: "color" | "dimension" | "number" | "string" | "shadow" | "typography" | "other";
    description: string;
    before: string | null;
    after: string | null;
    beforeColor?: string;
    afterColor?: string;
}

interface ChangelogEntry {
    id: string;
    timestamp: string;
    summary: string;
    changes: ChangelogChange[];
}

const history = historyJson as unknown as ChangelogEntry[];

const BADGE_LABEL: Record<ChangelogChange["status"], string> = {
    added: "Added",
    removed: "Removed",
    changed: "Changed",
};

function formatTimestamp(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function ChangeDiff({ change }: { change: ChangelogChange }) {
    if (change.kind === "color") {
        return (
            <div className="dt-changelog-diff">
                {change.beforeColor && (
                    <div className="dt-changelog-swatch" style={{ backgroundColor: change.beforeColor }} />
                )}
                {change.before && change.after && <span className="dt-changelog-arrow">→</span>}
                {change.afterColor && (
                    <div className="dt-changelog-swatch" style={{ backgroundColor: change.afterColor }} />
                )}
                <span className="dt-changelog-value">
                    {change.before ?? "—"} → {change.after ?? "—"}
                </span>
            </div>
        );
    }

    return (
        <div className="dt-changelog-diff">
            <span className="dt-changelog-value">
                {change.before ?? "—"} → {change.after ?? "—"}
            </span>
        </div>
    );
}

function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
    return (
        <div className="dt-changelog-entry">
            <div className="dt-changelog-entry-header">
                <span className="dt-changelog-timestamp">{formatTimestamp(entry.timestamp)}</span>
                <span className="dt-changelog-summary">{entry.summary}</span>
            </div>
            <div className="dt-changelog-rows">
                {entry.changes.map((change) => (
                    <div className="dt-changelog-row" key={`${entry.id}-${change.path}`}>
                        <span className={`dt-changelog-badge dt-changelog-badge-${change.status}`}>
                            {BADGE_LABEL[change.status]}
                        </span>
                        <div className="dt-changelog-path-col">
                            <span className="dt-changelog-path">{change.path}</span>
                            {change.description && <p className="dt-changelog-description">{change.description}</p>}
                        </div>
                        <ChangeDiff change={change} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Changelog() {
    if (history.length === 0) {
        return (
            <div className="dt-page">
                <div className="dt-section">
                    <h2 className="dt-section-title">Changelog</h2>
                    <p className="dt-section-description">
                        Tracks every change to <code>design-system/tokens.json</code> across syncs, with before/after
                        values and color swatches for anything that changed.
                    </p>
                    <div className="dt-changelog-empty">
                        No syncs recorded yet. Run <code>npm run tokens:sync</code> after editing{" "}
                        <code>design-system/tokens.json</code> to generate the first entry.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dt-page">
            <div className="dt-section">
                <h2 className="dt-section-title">Changelog</h2>
                <p className="dt-section-description">
                    Tracks every change to <code>design-system/tokens.json</code> across syncs, newest first. Color
                    tokens render as before/after swatches; other token types show before/after values.
                </p>
                {history.map((entry) => (
                    <ChangelogEntryCard entry={entry} key={entry.id} />
                ))}
            </div>
        </div>
    );
}

export const HeaderCenteredCaseStudy = ({ coverUrl, title }: { coverUrl: string; title: string }) => (
    <div className="relative h-[350px] max-h-[350px] w-full overflow-hidden bg-secondary">
        <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-utility-olive-900/60" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1 className="text-center text-display-xl font-bold text-brand">{title}</h1>
        </div>
    </div>
);

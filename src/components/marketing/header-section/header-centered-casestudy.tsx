export const HeaderCenteredCaseStudy = ({ coverUrl, title }: { coverUrl: string; title: string }) => (
    <div className="h-[350px] max-h-[350px] w-full overflow-hidden bg-secondary">
        <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
    </div>
);

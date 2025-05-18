import { cn } from "@/_core/utils";

// Props for the HeaderSidebarMainTemplate component
type HeaderSidebarMainTemplateProps = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarWidth?: string;
  sidebarPosition?: "left" | "right"; // NEW
  maxWidth?: boolean;
};

export function CustomHeaderSidebarMainTemplate({
  header,
  sidebar,
  main,
  sidebarWidth = "w-64",
  sidebarPosition = "left", // default is left
  maxWidth,
}: HeaderSidebarMainTemplateProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        maxWidth ? " max-w-[1366px] mx-auto" : ""
      )}
    >
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background  py-3">
        {header}
      </header>
      <div className="flex flex-1 gap-x-6 ">
        {sidebarPosition === "left" && (
          <aside
            className={`hidden md:block ${sidebarWidth} border bg-muted/20 p-4 rounded-xl`}
          >
            {sidebar}
          </aside>
        )}
        <main className="flex-1 p-6 border rounded-xl bg-muted/40">{main}</main>
        {sidebarPosition === "right" && (
          <aside
            className={`hidden md:block ${sidebarWidth} border bg-muted/20 p-4 rounded-xl`}
          >
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
}

/* 
    WHAT: A complete layout with a sticky header, sidebar, and main content area.
    HOW TO USE: Provide header (e.g., navbar), sidebar (e.g., menu), and main content.
                Optionally set sidebarWidth with a Tailwind class.
    WHEN TO USE: Ideal for dashboard-style applications, admin panels, or any app needing
                 persistent navigation and a content area, like a CRM or project management tool.
    EXAMPLE:
    <HeaderSidebarMainTemplate
      header={<h1>Dashboard</h1>}
      sidebar={<ul>Nav Links</ul>}
      main={<div>Dashboard Content</div>}
      sidebarWidth="w-72"
    />
  */

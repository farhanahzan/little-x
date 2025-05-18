import React from "react";
type DashboardLeftRightSidebarTemplateProps = {
  rightSidebar: React.ReactNode;
  leftSidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarWidth?: string;
  maxWidth?: boolean;
};
const DashboardLeftRightSidebar = (
  props: DashboardLeftRightSidebarTemplateProps
) => {
  const { rightSidebar, leftSidebar, main, sidebarWidth } = props;

  return (
    <div className="min-h-screen flex max-w-[85.375rem] mx-auto ">
      {/* left sidebar */}
      <aside
        className={` ${sidebarWidth} hidden md:block border-x border-border  bg-sidebar-background  `}
      >
        {leftSidebar}
      </aside>

      {/* main */}
      <main className="flex-1 ">{main}</main>

      {/* right sidebar */}
      <aside
        className={` ${sidebarWidth} hidden lg:block border-x border-border bg-sidebar-background `}
      >
        {rightSidebar}
      </aside>
    </div>
  );
};

export default DashboardLeftRightSidebar;

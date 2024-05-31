import React, { ReactNode } from "react";

interface SubNavBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  children: ReactNode;
}

export function SubNavBar({
  currentPage,
  onPageChange,
  children,
}: SubNavBarProps) {
  return (
    <div className="h-12 bg-[#2b2b2b] select-none">
      <div className="w-full h-full">
        <ul className="h-full flex justify-evenly items-center">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const isActive = child.props.page === currentPage;
              const childProps = {
                onClick: () => onPageChange(child.props.page),
                className: `${child.props.className}`,
              };
              return React.cloneElement(child, childProps);
            }
            return child;
          })}
        </ul>
      </div>
    </div>
  );
}
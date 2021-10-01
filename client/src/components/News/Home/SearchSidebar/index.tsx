import { FC, ReactNode, useEffect, useState, useRef } from "react";
import { SidebarWrapper, ToggleButton, Content } from "./index.style";
import useOnClickOutside from "@/lib/hooks/useOnClickOutside";

interface Props {
  width: number;
  children: ReactNode;
  sideOpen: boolean;
  sideBarClose: () => void;
}

const SearchSidebar: FC<Props> = ({
  width,
  children,
  sideOpen,
  sideBarClose,
}) => {
  const [xPosition, setX] = useState<number>(0);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      sideBarClose();
      setX(-width);
    }
  };

  useEffect(() => {
    setX(0);
  }, []);

  useEffect(() => {
    if (sideOpen) {
      toggleMenu();
    }
  }, [sideOpen]);

  const sidebarRef = useRef(null);

  useOnClickOutside(sidebarRef, () => {
    if (xPosition === -width) {
      toggleMenu();
    }
  });

  return (
    <SidebarWrapper
      ref={sidebarRef}
      width={width}
      xPosition={xPosition}
      style={{}}
    >
      <ToggleButton
        onClick={() => toggleMenu()}
        style={{
          transform: `translate(-15px, 5vh)`,
        }}
      />
      <Content>{children}</Content>
    </SidebarWrapper>
  );
};

export default SearchSidebar;

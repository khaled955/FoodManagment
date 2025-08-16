import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MySidebar from "../Sidebar/MySidebar";
import { useEffect, useState } from "react";

/** tiny hook to track Bootstrap md breakpoint */
function useMediaQuery(query: string) {
  const [m, setM] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mm = matchMedia(query);
    const h = () => setM(mm.matches);
    mm.addEventListener("change", h);
    return () => mm.removeEventListener("change", h);
  }, [query]);
  return m;
}

export default function MasterLayout() {
  const [isCollapse, setIsCollapse] = useState(false);  // desktop collapse (80 ↔ 240)
  const [mobileOpen, setMobileOpen] = useState(false);  // mobile drawer open/close

  const isMdUp = useMediaQuery("(min-width: 768px)");   // Bootstrap md ≈ 768px

  const handleToggleCollapse = () => setIsCollapse(v => !v);
  const openMobileMenu = () => setMobileOpen(current=>!current);
  const closeMobileMenu = () => setMobileOpen(false);

  // Only push content on md+; on mobile content should be full width
  const contentLeft = isMdUp ? (isCollapse ? 80 : 240) : 0;

  return (
    <div className="container-fluid min-vh-100 d-flex p-0">
    

<MySidebar
  handleToggleCollapse={handleToggleCollapse}
  isCollapse={isCollapse}
  mobileOpen={mobileOpen}
  onCloseMobile={closeMobileMenu}
/>



      <div className="flex-grow-1 w-100 p-4" style={{ marginLeft: contentLeft }}>
        <Navbar onOpenMobileMenu={openMobileMenu} />
        <Outlet />
      </div>
    </div>
  );
}

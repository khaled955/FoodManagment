import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import logo from "../../../../assets/imags/sidebarlogo.png";
import useRole from "../../../../Hooks/useRole";
import { UserToken } from "../../../../Context/UserAuth.context";

type Props = {
  /** Collapse rail on desktop (80 ↔ 240) */
  handleToggleCollapse: () => void;
  isCollapse: boolean;

  /** Mobile drawer open/close (controlled) */
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

/** Bootstrap md ≈ 768px */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mm = matchMedia(query);
    const handler = () => setMatches(mm.matches);
    mm.addEventListener("change", handler);
    return () => mm.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export default function MySidebar({
  handleToggleCollapse,
  isCollapse,
  mobileOpen,
  onCloseMobile,
}: Props) {
  const navigate = useNavigate();
  const isAdmin = useRole();

  const userCtx = useContext(UserToken);
  if (!userCtx) throw new Error("MySidebar must be used within UserAuthProvider");
  const { setUserAuth } = userCtx;

  // Only reserve width on desktop; on mobile let it overlay
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const railWidth = isCollapse ? 80 : 240;

  // Close drawer on ESC (mobile)
  useEffect(() => {
    if (isMdUp) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseMobile();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMdUp, onCloseMobile]);

  const go = (path: string) => () => {
    navigate(path);
    if (!isMdUp) onCloseMobile();
  };

  const doLogout = () => {
    setUserAuth?.(null);
    localStorage.removeItem("userToken");
    if (!isMdUp) onCloseMobile();
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: isMdUp ? railWidth : 0, // no layout shift on mobile
        zIndex: 1040,
      }}
      aria-hidden={!isMdUp && !mobileOpen}
    >
      <Sidebar
        collapsed={isCollapse}   // desktop rail collapse
        toggled={mobileOpen}     // mobile drawer visibility
        breakPoint="md"          // < md → overlay, ≥ md → static rail
        onBackdropClick={onCloseMobile}
        className="h-100 side-bar-container"
      >
        <Menu className="h-100 fw-bold py-5 mt-5">
          {/* Header / brand + collapse toggle (desktop) */}
          <MenuItem className="mb-4" onClick={handleToggleCollapse}>
            <img className="w-75" src={logo} alt="Food Manager brand" />
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-house"></i>} onClick={go("/dashboard")}>
            Home
          </MenuItem>

          {isAdmin && (
            <MenuItem icon={<i className="fa-solid fa-users"></i>} onClick={go("users")}>
              Users
            </MenuItem>
          )}

          <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} onClick={go("recipes")}>
            Recipes
          </MenuItem>

          {isAdmin && (
            <MenuItem icon={<i className="fa-solid fa-table-list"></i>} onClick={go("categories")}>
              Categories
            </MenuItem>
          )}

          {!isAdmin && (
            <MenuItem icon={<i className="fa-solid fa-star"></i>} onClick={go("favs")}>
              Favourites
            </MenuItem>
          )}

          <MenuItem icon={<i className="fa-solid fa-unlock"></i>} onClick={go("change-password")}>
            Change Password
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={doLogout}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}




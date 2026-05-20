import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Leaf } from "lucide-react";
import { clsx } from "clsx";

interface DropItem { label: string; to: string; }
interface NavItem { label: string; to?: string; children?: DropItem[]; }

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", to: "/" },
  {
    label: "Recorridos",
    children: [
      { label: "Época de Secas", to: "/recorridos/seca" },
      { label: "Época de Lluvias", to: "/recorridos/lluvias" },
      { label: "Especiales", to: "/recorridos/especiales" },
    ],
  },
  {
    label: "Biodiversidad en RA",
    children: [
      { label: "Fauna", to: "/biodiversidad/fauna" },
      { label: "Flora", to: "/biodiversidad/flora" },
      { label: "Galería en RA", to: "/galeria" },
    ],
  },
  { label: "Manuales Didácticos", to: "/manuales" },
  { label: "Acerca de", to: "/acerca-de" },
  { label: "Créditos", to: "/creditos" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) =>
    setActiveDropdown(prev => (prev === label ? null : label));

  return (
    <header className="sticky top-0 z-50 bg-verde-800/95 backdrop-blur-sm shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-display text-xl font-bold">
            <Leaf className="text-verde-400" size={22} />
            Ecorut@s
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => item.children && setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm font-body text-verde-100 hover:text-white rounded-md transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    <ul
                      className={clsx(
                        "absolute top-full left-0 mt-1 w-52 bg-verde-900 rounded-lg shadow-xl py-1 transition-all duration-200",
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      {item.children.map(child => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              clsx(
                                "block px-4 py-2 text-sm font-body transition-colors",
                                isActive
                                  ? "text-verde-400 bg-verde-800"
                                  : "text-verde-100 hover:text-white hover:bg-verde-800"
                              )
                            }
                          >
                            {child.to.endsWith('seca') && child.label === 'Época de Secas' ? 'Temporada Seca' : child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.to!}
                    className={({ isActive }) =>
                      clsx(
                        "px-3 py-2 text-sm font-body rounded-md transition-colors",
                        isActive
                          ? "text-white bg-verde-700"
                          : "text-verde-100 hover:text-white hover:bg-verde-700"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
  <button
    onClick={() => setMobileOpen(prev => !prev)}
    className="lg:hidden text-verde-100 hover:text-white p-2"
    aria-label="Abrir menú"
  >
    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
  </button>
        </div >

    {/* Mobile menu */ }
  {
    mobileOpen && (
      <div className="lg:hidden pb-4 space-y-1">
        {NAV_ITEMS.map(item => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center justify-between w-full px-3 py-2 text-verde-100 font-body text-sm rounded-md hover:bg-verde-700"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={clsx(
                      "transition-transform duration-200",
                      activeDropdown === item.label && "rotate-180"
                    )}
                  />
                </button>
                {activeDropdown === item.label && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.children.map(child => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-verde-200 hover:text-white rounded-md hover:bg-verde-700"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.to!}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-verde-100 hover:text-white rounded-md hover:bg-verde-700"
              >
                {item.label}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    )
  }
      </nav >
    </header >
  );
}
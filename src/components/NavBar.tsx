"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import "./navBar.css";

const pages = [
  { name: "Cómo funciona", src: "/guides" },
  { name: "Bonos", src: "/bonos" },
  { name: "OddsMatcher", src: "/oddsMatcher" },
  { name: "Lo hacemos por ti", src: "/forYou" },
  { name: "Blog", src: "/blog" },
];

function NavBar() {
  const [cookies] = useCookies(["token"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Filter pages to show "Servicio Premium" only if no token
  const filteredPages = pages.filter((page) =>
    page.name === "Servicio Premium" ? !cookies.token : true
  );

  // Determinar si el usuario está logueado
  const isLoggedIn = cookies.token || session;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <Image
              className="hero-logo"
              alt="logo"
              src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746718585/WIN_BET_420_3_1_locn8p.png"
              width={200}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle">
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="menu-icon"
              fill="white"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {filteredPages.map((page, index) => (
            <Link key={index} href={page.src} className="navbar-link">
              {page.name}
            </Link>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="navbar-login">
          {isLoggedIn ? (
            <Link href="/me">
              <button className="login-button">
                <svg
                  className="login-icon"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                User
              </button>
            </Link>
          ) : (
            <Link href="/auth/register">
              <button className="login-button">
                <svg
                  className="login-icon"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {filteredPages.map((page, index) => (
            <Link
              key={index}
              href={page.src}
              className="mobile-menu-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {page.name}
            </Link>
          ))}
          <div className="mobile-menu-login">
            {isLoggedIn ? (
              <Link href="/me" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="login-button">
                  <svg
                    className="login-icon"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  User
                </button>
              </Link>
            ) : (
              <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="login-button">
                  <svg
                    className="login-icon"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
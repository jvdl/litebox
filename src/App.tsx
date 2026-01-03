import React, { useEffect, useState, type ReactNode } from 'react';
import { litebox } from './litebox';
import "./litebox.css";
// import Basic from './examples/basic';
// import Multiple from "./examples/multiple";
const Basic = React.lazy(() => import('./examples/basic'));
const Multiple = React.lazy(() => import("./examples/multiple"));

const links = [
  { name: "Basic", href: "#/basic", Component: Basic },
  { name: "Multiple", href: "#/multiple", Component: Multiple },
];

export const App = () => {
  const [activeLink, setActiveLink] = useState(links.find(link => link.href === (window.location.hash || "#/basic")) || links[0]);
  const [activeComponent, setActiveComponent] = useState<ReactNode | null>(null);

  const hashChange = () => {
    const hash = window.location.hash || "#/basic";
    const link = links.find((link) => link.href === hash);
    if (!link) {
      return;
    }
    setActiveLink(link);
  }

  useEffect(() => {
    window.addEventListener("hashchange", hashChange);

    return () => {
      window.removeEventListener("hashchange", hashChange);
    }
  });

  useEffect(() => {
    setActiveComponent(<activeLink.Component />)
  }, [activeLink]);

  return (
    <>
      <nav>
        {links.map((link) => (
          <a key={link.name} href={link.href} className={link.href === activeLink.href ? "active" : ""}>
            {link.name}
          </a>
        ))}
      </nav>
      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          {activeComponent || <Basic />}
        </React.Suspense>
      </main>
    </>
  );

}

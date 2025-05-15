import Link from "next/link";
import { Icon2fa, IconLogout } from "@tabler/icons-react";

import classes from "./navbar.module.css";

export type NavbarItemProps = {
  label: string;
  to: string;
  icon: typeof Icon2fa;
  active?: string;
};
export type NavbarProps = {
  active?: string;
  items: NavbarItemProps[];
};

const NavbarItem = (item: NavbarItemProps) => {
  const isActive = item.active === item.to ? true : undefined;

  return (
    <Link className={classes.link} href={item.to} data-active={isActive}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  );
};

export const Navbar = ({ items, active }: NavbarProps) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {items.map((item) => (
          <NavbarItem key={item.label} active={active} {...item} />
        ))}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

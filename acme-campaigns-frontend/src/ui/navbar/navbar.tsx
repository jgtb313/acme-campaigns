import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon2fa, IconLogout } from "@tabler/icons-react";

import classes from "./navbar.module.css";

export type NavbarItemProps = {
  label: string;
  to: string;
  icon: typeof Icon2fa;
  active?: boolean;
};
export type NavbarProps = {
  items: NavbarItemProps[];
};

const NavbarItem = (item: NavbarItemProps) => {
  const pathname = usePathname();
  const active = pathname === item.to ? true : undefined;

  return (
    <Link className={classes.link} href={item.to} data-active={active}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  );
};

export const Navbar = ({ items }: NavbarProps) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {items.map((item) => (
          <NavbarItem key={item.label} {...item} />
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

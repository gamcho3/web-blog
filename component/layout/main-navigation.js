import React from "react";
import classes from "./main-navigation.module.css";
import Link from "next/link";
import Logo from "./logo";
import { useSession, signOut } from "next-auth/client";
const MainNavigation = () => {
  const [session, loading] = useSession();

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {!session && !loading ? (
            <li>
              <Link href="/login">LogIn</Link>
            </li>
          ) : (
            <li>
              <a onClick={() => signOut()}>LogOut</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

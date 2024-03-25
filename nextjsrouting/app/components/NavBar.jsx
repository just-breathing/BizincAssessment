'use client'

import Link from "next/link";
import styles from "../layouts/navBar.module.css"
 
import { usePathname } from 'next/navigation'
const NavBar = () => {
    const pathname = usePathname()


  // Define your navbar items and their corresponding routes
  const navItems = [
    { label: 'Todo List', route: '/' },
    { label: 'About', route: '/about' },
  ];

    return ( 
        <div className={styles.navBar} >
        {navItems.map((item, idx) => (
            <Link href={item.route} key={idx} className={`${pathname === item.route ? styles.active : ''}`}>
                {item.label}
            </Link>
        ))}
        </div>
     );
}
 
export default NavBar;
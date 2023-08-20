import React from "react";
import {
    HiCog,
    HiHome,
    HiOutlineUsers,
    HiShoppingCart,
    HiCurrencyEuro,
    HiViewGrid,
} from "react-icons/hi";
import { FormattedMessage } from "react-intl";
export type SidebarItemType=
      {
        href: string ,
        linkName: any,
        icon: React.ReactNode,
        priveleges: string[],
    }


export const sidebarData:SidebarItemType[] = [
    {
        href: "/timeline",
        linkName: <FormattedMessage id="dashboard"/>,
        icon: <HiHome size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/membres",
        linkName: <FormattedMessage id="member"/>,
        icon: <HiOutlineUsers size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/cotisation",
        linkName: <FormattedMessage id="cotisation"/>,
        icon: <HiCurrencyEuro size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/credit",
        linkName: <FormattedMessage id="credit"/>,
        icon: <HiViewGrid size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager"],
    },
    {
        href: "/timeline/remboursement",
        linkName: <FormattedMessage id="rembourssement"/>,
        icon: <HiShoppingCart size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/settings",
        linkName: <FormattedMessage id="settings"/>,
        icon: <HiCog size={20} />,
        priveleges: ["SuperAdmin"],
    },
   
];
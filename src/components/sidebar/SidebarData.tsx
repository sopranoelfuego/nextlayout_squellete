import React from "react";
import {
    HiOutlineCog,
    HiOutlineChartBar,
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineCash,
    HiOutlineCurrencyEuro,
    HiOutlineViewGrid,
    HiOutlineScale
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
        icon: <HiOutlineHome size={20} />,
        priveleges: ["USER", "ADMIN", "TRESORIER" ],
    },
    {
        href: "/timeline/profile",
        linkName: <FormattedMessage id="my_account"/>,
        icon: <HiOutlineScale size={20} />,
        priveleges: ["USER", "ADMIN", "TRESORIER" ],
    },
    {
        href: "/timeline/membres",
        linkName: <FormattedMessage id="member"/>,
        icon: <HiOutlineUsers size={20} />,
        priveleges: ["ADMIN"],
    },
    {
        href: "/timeline/cotisation",
        linkName: <FormattedMessage id="cotisation"/>,
        icon: <HiOutlineCurrencyEuro size={20} />,
        priveleges: ["ADMIN", "TRESORIER"],
    },
    {
        href: "/timeline/credit",
        linkName: <FormattedMessage id="credit"/>,
        icon: <HiOutlineViewGrid size={20} />,
        priveleges: ["ADMIN", "TRESORIER"],
    },
    {
        href: "/timeline/remboursement",
        linkName: <FormattedMessage id="rembourssement"/>,
        icon: <HiOutlineCash size={20} />,
        priveleges: ["ADMIN", "TRESORIER"],
    },
    {
        href: "/timeline/settings",
        linkName: <FormattedMessage id="settings"/>,
        icon: <HiOutlineCog size={20} />,
        priveleges: ["ADMIN", "TRESORIER"],
    },
    {
        href: "/timeline/reports",
        linkName: <FormattedMessage id="rapports"/>,
        icon: <HiOutlineChartBar size={20} />,
        priveleges: ["ADMIN", "TRESORIER"],
    },
   
];
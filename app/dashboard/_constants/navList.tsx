import { IconType } from "react-icons/lib";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  LuLayoutDashboard,
  LuAtom,
  LuShieldCheck,
  LuUser,
  LuSettings,
} from "react-icons/lu";

type NavListType = {
  id: number;
  name: string;
  icon: IconType;
  route: string;
};

export const navList: NavListType[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: LuLayoutDashboard,
    route: "/dashboard",
  },
  {
    id: 2,
    name: "Explore",
    icon: LuAtom,
    route: "/dashboard/explore",
  },
  {
    id: 3,
    name: "Upgrade",
    icon: LuShieldCheck,
    route: "/dashboard/upgrade",
  },
  {
    id: 4,
    name: "Profile",
    icon: LuUser,
    route: "/dashboard/profile",
  },
  {
    id: 5,
    name: "Settings",
    icon: LuSettings,
    route: "/dashboard/settings",
  },
  {
    id: 6,
    name: "About me",
    icon: IoMdInformationCircleOutline,
    route: "/dashboard/about",
  },
];
import {
  Users,
  Settings,
  LayoutGrid,
  FileSignature,
  LucideIcon,
  Pen,
  List,
  Radio,
  CircleCheck,
  BadgeX,
  BadgePercent,
  CircleDollarSign,
  Layers3,
  Medal,
  RefreshCcwDot,
  Ban,
  File,
  CalendarDays,
  Calendar,
  UserCog,
  GitCompareArrows,
  SquareStack,
  MicVocal,
  GalleryVertical,
  MessageSquare,
  Bell,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Unit",
          active: pathname.includes("/dashboard/unit"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/unit/create",
              label: "Create",
              active: pathname === "/dashboard/unit/create",
              icon: Pen,
            },
            {
              href: "/dashboard/unit",
              label: "List",
              active: pathname === "/dashboard/unit",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Scout",
          active: pathname.includes("/dashboard/scout"),
          icon: Users,
          submenus: [
            {
              href: "/dashboard/scout/request",
              label: "Request",
              active: pathname === "/dashboard/scout/request",
              icon: Radio,
            },
            {
              href: "/dashboard/scout",
              label: "Active",
              active: pathname === "/dashboard/scout",
              icon: List,
            },
            {
              href: "/dashboard/scout/verified",
              label: "Verified",
              active: pathname === "/dashboard/scout/verified",
              icon: CircleCheck,
            },
            {
              href: "/dashboard/scout/suspended",
              label: "Suspended",
              active: pathname === "/dashboard/scout/suspended",
              icon: BadgeX,
            },
          ],
        },
        {
          href: "",
          label: "Event",
          active: pathname.includes("/dashboard/event"),
          icon: CalendarDays,
          submenus: [
            {
              href: "/dashboard/event/create",
              label: "Create",
              active: pathname === "/dashboard/event/create",
              icon: Pen,
            },
            {
              href: "/dashboard/event",
              label: "List",
              active: pathname === "/dashboard/event",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Training",
          active: pathname.includes("/dashboard/training"),
          icon: GitCompareArrows,
          submenus: [
            {
              href: "/dashboard/training/create",
              label: "Create",
              active: pathname === "/dashboard/training/create",
              icon: Pen,
            },
            {
              href: "/dashboard/training",
              label: "List",
              active: pathname === "/dashboard/training",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Award",
          active: pathname.includes("/dashboard/award"),
          icon: Medal,
          submenus: [
            {
              href: "/dashboard/award/create",
              label: "Create",
              active: pathname === "/dashboard/award/create",
              icon: Pen,
            },
            {
              href: "/dashboard/award",
              label: "List",
              active: pathname === "/dashboard/award",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Applications",
          active: pathname.includes("/dashboard/app"),
          icon: File,
          submenus: [
            {
              href: "/dashboard/app/migration",
              label: "Migration",
              active: pathname === "/dashboard/app/migration",
              icon: RefreshCcwDot,
            },
            {
              href: "/dashboard/app/ban",
              label: "Ban",
              active: pathname === "/dashboard/app/ban",
              icon: Ban,
            },
            {
              href: "/dashboard/app/event",
              label: "Event",
              active: pathname === "/dashboard/app/event",
              icon: Calendar,
            },
            {
              href: "/dashboard/app/training",
              label: "Training",
              active: pathname === "/dashboard/app/training",
              icon: GitCompareArrows,
            },
          ],
        },
        {
          href: "",
          label: "Commitee",
          active: pathname.includes("/dashboard/commitee"),
          icon: UserCog,
          submenus: [
            {
              href: "/dashboard/committee/create",
              label: "Create",
              active: pathname === "/dashboard/committee/create",
              icon: Pen,
            },
            {
              href: "/dashboard/committee",
              label: "List",
              active: pathname === "/dashboard/committee",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Utils",
          active: pathname.includes("/dashboard/utils"),
          icon: SquareStack,
          submenus: [
            {
              href: "/dashboard/utils/fee",
              label: "Fee",
              active: pathname === "/dashboard/utils/fee",
              icon: CircleDollarSign,
            },
            {
              href: "/dashboard/utils/coupon",
              label: "Coupon",
              active: pathname === "/dashboard/utils/coupon",
              icon: BadgePercent,
            },
            {
              href: "/dashboard/utils/signature",
              label: "Signature",
              active: pathname === "/dashboard/utils/signature",
              icon: FileSignature,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Client",
      menus: [
        {
          href: "/dashboard/news",
          label: "News",
          active: pathname.includes("/dashboard/news"),
          icon: MicVocal,
          submenus: [
            {
              href: "/dashboard/news/create",
              label: "Create",
              active: pathname === "/dashboard/news/create",
              icon: Pen,
            },
            {
              href: "/dashboard/news",
              label: "List",
              active: pathname === "/dashboard/news",
              icon: List,
            },
          ],
        },
        {
          href: "/dashboard/gallery",
          label: "Gallery",
          active: pathname.includes("/dashboard/gallery"),
          icon: GalleryVertical,
          submenus: [
            {
              href: "/dashboard/gallery/create",
              label: "Create",
              active: pathname === "/dashboard/gallery/create",
              icon: Pen,
            },
            {
              href: "/dashboard/gallery",
              label: "List",
              active: pathname === "/dashboard/gallery",
              icon: List,
            },
          ],
        },
        {
          href: "/dashboard/notice",
          label: "Notice",
          active: pathname.includes("/dashboard/notice"),
          icon: Bell,
          submenus: [
            {
              href: "/dashboard/notice/create",
              label: "Create",
              active: pathname === "/dashboard/notice/create",
              icon: Pen,
            },
            {
              href: "/dashboard/notice",
              label: "List",
              active: pathname === "/dashboard/notice",
              icon: List,
            },
          ],
        },
      ],
    },
  ];
}

export function getMenuListScout(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/scout",
          label: "Dashboard",
          active: pathname === "/scout",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Event",
          active: pathname.includes("/scout/event"),
          icon: Calendar,
          submenus: [
            {
              href: "/scout/event",
              label: "List",
              active: pathname === "/scout/event",
              icon: List,
            },
            {
              href: "/scout/event/app",
              label: "Applications",
              active: pathname === "/scout/event/app",
              icon: File,
            },
          ],
        },
        {
          href: "",
          label: "Training",
          active: pathname.includes("/scout/training"),
          icon: GitCompareArrows,
          submenus: [
            {
              href: "/scout/training",
              label: "List",
              active: pathname === "/scout/training",
              icon: List,
            },
            {
              href: "/scout/training/app",
              label: "Applications",
              active: pathname === "/scout/training/app",
              icon: File,
            },
          ],
        },
        {
          href: "",
          label: "Unit",
          active: pathname.includes("/scout/unit"),
          icon: Layers3,
          submenus: [
            {
              href: "/scout/unit",
              label: "Manage",
              active: pathname === "/scout/unit",
              icon: Settings,
            },
            {
              href: "/scout/unit/request",
              label: "Request",
              active: pathname === "/scout/unit/request",
              icon: Radio,
            },
          ],
        },
        {
          href: "/scout/profile",
          label: "Profile",
          active: pathname.includes("/scout/profile"),
          icon: UserCog,
          submenus: [],
        },
      ],
    },
  ];
}

import {
  CreditCard,
  DollarSign,
  BarChart3,
  PiggyBank,
  Wallet,
  BellRing,
  TrendingUp,
  Calculator,
  BadgeDollarSign,
  Home,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
    color: "bg-finance-blue/10 text-finance-blue",
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: CreditCard,
    color: "bg-finance-red/10 text-finance-red",
  },
  {
    title: "Income",
    path: "/income",
    icon: DollarSign,
    color: "bg-finance-green/10 text-finance-green",
  },
  {
    title: "Budget",
    path: "/budget",
    icon: Calculator,
    color: "bg-finance-purple/10 text-finance-purple",
  },
  {
    title: "Bills",
    path: "/bills",
    icon: BellRing,
    color: "bg-finance-orange/10 text-finance-orange",
  },
  {
    title: "Savings",
    path: "/savings",
    icon: PiggyBank,
    color: "bg-finance-teal/10 text-finance-teal",
  },
  {
    title: "Investments",
    path: "/investments",
    icon: TrendingUp,
    color: "bg-finance-indigo/10 text-finance-indigo",
  },
  {
    title: "Debt",
    path: "/debt",
    icon: BadgeDollarSign,
    color: "bg-finance-yellow/10 text-finance-yellow",
  },
  {
    title: "Loans",
    path: "/loans",
    icon: Wallet,
    color: "bg-finance-gray/10 text-finance-gray",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
    color: "bg-finance-blue/10 text-finance-blue",
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-14 items-center border-b px-4 md:hidden">
            <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="ml-4 text-xl font-semibold">FinTrack AI</h1>
          </div>
          <div className="container p-4 md:p-6 overflow-auto max-h-[calc(100vh-56px)] md:max-h-screen">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex items-center px-6 py-4">
        <DollarSign className="h-6 w-6 text-primary" />
        <h1 className="ml-2 text-xl font-bold">FinTrack AI</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2",
                    location.pathname === item.path ? "bg-primary/10" : "hover:bg-primary/5"
                  )}
                >
                  <div className={cn("tracker-icon", item.color)}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

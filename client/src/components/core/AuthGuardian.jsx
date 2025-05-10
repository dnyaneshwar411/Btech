"use server";
import { fetchData } from "@/api/server";
import Sidebar from "./sidebar/Sidebar";
import Theme from "./Theme";

export default async function AuthGuardian({ children }) {
  try {
    const response = await fetchData("admin/profile");
    return (
      <div className="flex h-screen bg-white dark:bg-base-background transition-colors duration-200">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className="bg-white dark:bg-base-secondary shadow-sm h-16 sticky top-0 flex items-center justify-between px-6 border-b border-gray-200 dark:border-base-border">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-text-primary ml-4"></h1>
            </div>
            <Theme />
          </header>
          <main className="p-6 dark:bg-base-background">
            {children}
          </main>
        </div>
      </div>
    );
    if (response.status_code === 200) {

    } else {
      return <>
        {children}
      </>
      // return <ResetRedirectUser />
    }
  } catch (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }
};
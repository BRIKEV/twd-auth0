import { rootLoader } from "@/lib/auth";

export const loaderApp = async () => {
  const { user, isAuthenticated } = await rootLoader();
  return { user, isAuthenticated };
};
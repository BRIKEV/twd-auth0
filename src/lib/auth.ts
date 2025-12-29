export async function rootLoader() {
  const res = await fetch("/api/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    return { user: {}, isAuthenticated: false };
  }

  return {
    user: await res.json(),
    isAuthenticated: true,
  };
}
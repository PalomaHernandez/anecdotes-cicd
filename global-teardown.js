export default async () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3001";
  const res = await fetch(`${baseURL}/api/testing/reset`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Failed to reset backend after tests");
  }
};

const createTestUser = async (request, prefix = "prueba") => {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const username = `${prefix}-${suffix}`;
  const name = `Test user ${suffix}`;
  const password = "Contraseña";

  const res = await request.post("/api/users", {
    data: { name, username, password },
  });

  return { username, name, password };
};

export { createTestUser };

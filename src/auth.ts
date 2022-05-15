export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    console.log(token);
  } catch (e) {}
};

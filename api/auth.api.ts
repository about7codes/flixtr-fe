// Signup/Create User
export const signupRequest = async ({
  name,
  email,
  password,
  propic,
}: {
  name: string;
  email: string;
  password: string;
  propic: number;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_ROUTE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        propic: propic,
      }),
    });

    const user = await res.json();

    if (res.ok && user) {
      return user;
    } else if (user.error) {
      throw new Error(user.error);
    } else {
      throw new Error("Signup failed.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

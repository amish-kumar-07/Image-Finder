// app/components/Navbar.tsx
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-5 text-black">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

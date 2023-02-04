import { Space } from "@prisma/client";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  space: Space | undefined;
  user: User | undefined;
};

export default function NavBar({ user, space }: Props) {
  const onSignout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="navbar border-b bg-base-100 px-8 py-2">
      <div className="flex-1">
        <Link href="/">
          <div className="ml-2 hidden text-xl font-semibold text-slate-700 md:inline-block">
            {space?.name || "Home"}
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            {user && <Avatar user={user} />}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li className="border-b border-gray-200">
              {user && <div>{user.name || user.email}</div>}
            </li>
            <li>
              <a onClick={() => void onSignout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

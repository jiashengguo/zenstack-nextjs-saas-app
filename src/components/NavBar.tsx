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
    <div className="navbar bg-base-100 border-b px-8 py-2">
      <div className="flex-1">
        <Link href="/">
          <div className="ml-2 hidden text-xl font-semibold text-slate-700 md:inline-block">
            {space?.name || "Home"}
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            {user && <Avatar user={user} />}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li className="border-b border-gray-200">
              {user && <div>{user.name || user.email}</div>}
            </li>
            <li>
              <a onClick={ onSignout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

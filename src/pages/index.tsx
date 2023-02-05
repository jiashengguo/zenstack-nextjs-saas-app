import { Space } from "@prisma/client";
import Spaces from "../components/Spaces";
import WithNavBar from "../components/WithNavBar";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getEnhancedPrisma } from "../server/enhanced-db";
import { useCurrentUser } from "../lib/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  spaces: Space[];
};

const Home: NextPage<Props> = ({ spaces }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    void router.push("/signin");
    return <></>;
  }

  return (
    <WithNavBar>
      {user && (
        <div className="mt-8 flex w-full flex-col items-center text-center">
          <h1 className="text-2xl text-gray-800">
            Welcome {user.name || user.email}!
          </h1>

          <div className="w-full p-8">
            <h2 className="mb-8 text-left text-lg text-gray-700 md:text-xl">
              Choose a space to start, or{" "}
              <Link className="link-primary underline" href="/create-space">
                create a new one.
              </Link>
            </h2>
            <Spaces spaces={spaces} />
          </div>
        </div>
      )}
    </WithNavBar>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const db = await getEnhancedPrisma(ctx);
  const spaces = await db.space.findMany();
  return {
    props: { spaces },
  };
};

export default Home;

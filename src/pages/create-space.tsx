/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useSpace } from "../lib/hooks";
import { SpaceUserRole } from "@prisma/client";
import WithNavBar from "../components/WithNavBar";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const CreateSpace: NextPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { create } = useSpace();
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const space = await create({
        data: {
          name,
          slug,
          members: {
            create: [
              {
                userId: session!.user.id,
                role: SpaceUserRole.ADMIN,
              },
            ],
          },
        },
      });
      console.log("Space created:", space);
      alert("Space created successfull! You'll be redirected.");

      setTimeout(() => {
        if (space) {
          void router.push(`/space/${space.slug}`);
        }
      }, 2000);
    } catch (err: any) {
      console.error(err);
      if (err.info?.prisma === true) {
        if (err.info.code === "P2002") {
          alert("Space slug already in use");
        } else {
          alert(`Unexpected Prisma error: ${err.info.code as string}`);
        }
      } else {
        alert(JSON.stringify(err));
      }
    }
  };

  return (
    <WithNavBar>
      <div className="flex h-full items-center justify-center">
        <form onSubmit={void onSubmit}>
          <h1 className="mb-8 text-3xl">Create a space</h1>
          <div className="flex-col space-y-4">
            <div>
              <label htmlFor="name" className="text-lg">
                Space name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Name of your space"
                className="input-bordered input mt-2 w-full max-w-xs"
                autoFocus
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
              />
            </div>
            <div>
              <label htmlFor="slug" className="text-lg">
                Space slug
              </label>
              <input
                id="slug"
                type="text"
                required
                placeholder="Slug of your space"
                className="input-bordered input mt-2 w-full max-w-xs"
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setSlug(e.currentTarget.value)
                }
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <input
              type="submit"
              disabled={
                name.length < 4 ||
                name.length > 20 ||
                !slug.match(/^[0-9a-zA-Z]{4,16}$/)
              }
              value="Create"
              className="btn-primary btn px-8"
            />
            <button
              className="btn-outline btn"
              onClick={() => void router.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </WithNavBar>
  );
};

export default CreateSpace;

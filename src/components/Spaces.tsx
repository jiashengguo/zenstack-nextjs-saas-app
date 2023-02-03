import { Space } from "@prisma/client";
import Link from "next/link";

type Props = {
  spaces: Space[];
};

export default function Spaces({ spaces }: Props) {
  return (
    <ul className="flex flex-wrap gap-4">
      {spaces?.map((space) => (
        <li
          className="card h-32 w-80 cursor-pointer border text-gray-600 shadow-xl hover:bg-gray-50"
          key={space.id}
        >
          <Link href={`/space/${space.slug}`}>
            <div className="card-body" title={space.name}>
              <h2 className="card-title line-clamp-1">{space.name}</h2>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

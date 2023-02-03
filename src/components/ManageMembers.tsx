/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCurrentUser } from '../lib/context';
import { useSpaceUser } from '../lib/hooks';
import { Space, SpaceUserRole } from '@prisma/client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Avatar from './Avatar';

type Props = {
    space: Space;
};

export default function ManageMembers({ space }: Props) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<SpaceUserRole>(SpaceUserRole.USER);
    const user = useCurrentUser();
    const { findMany, create: addMember, del: delMember } = useSpaceUser();

    const { data: members } = findMany({
        where: {
            spaceId: space.id,
        },
        include: {
            user: true,
        },
        orderBy: {
            role: 'desc',
        },
    });

    const inviteUser = async () => {
        try {
            const r = await addMember({
                data: {
                    user: {
                        connect: {
                            email,
                        },
                    },
                    space: {
                        connect: {
                            id: space.id,
                        },
                    },
                    role,
                },
            });
            console.log('SpaceUser created:', r);
        } catch (err: any) {
            console.error(err);
            if (err.info?.prisma === true) {
                if (err.info.code === 'P2002') {
                    alert('User is already a member of the space');
                } else if (err.info.code === 'P2025') {
                    alert('User is not found for this email');
                } else {
                    alert(`Unexpected Prisma error: ${err.info.code as string}`);
                }
            } else {
                alert(`Error occurred: ${JSON.stringify(err)}`);
            }
        }
    };

    const removeMember = async (id: string) => {
        if (confirm(`Are you sure to remove this member from space?`)) {
            await delMember({ where: { id } });
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 items-center mb-8 w-full">
                <input
                    type="text"
                    placeholder="Type user email and enter to invite"
                    className="input input-sm input-bordered flex-grow mr-2"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.currentTarget.value);
                    }}
                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            void inviteUser();
                        }
                    }}
                />

                <select
                    className="select select-sm mr-2"
                    value={role}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setRole(e.currentTarget.value as SpaceUserRole);
                    }}
                >
                    <option value={SpaceUserRole.USER}>USER</option>
                    <option value={SpaceUserRole.ADMIN}>ADMIN</option>
                </select>

                <button onClick={() => void inviteUser()}>
                    <PlusIcon className="w-6 h-6 text-gray-500" />
                </button>
            </div>

            <ul className="space-y-2">
                {members?.map((member) => (
                    <li
                        key={member.id}
                        className="flex flex-wrap w-full justify-between"
                    >
                        <div className="flex items-center">
                            <div className="hidden md:block mr-2">
                                <Avatar user={member.user} size={32} />
                            </div>
                            <p className="w-36 md:w-48 line-clamp-1 mr-2">
                                {member.user.name || member.user.email}
                            </p>
                            <p>{member.role}</p>
                        </div>
                        <div className="flex items-center">
                            {user?.id !== member.user.id && (
                                <TrashIcon
                                    className="w-4 h-4 text-gray-500"
                                    onClick={() => {
                                        void removeMember(member.id);
                                    }}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import { User } from 'next-auth';
import Image from 'next/image';

type Props = {
    user: User;
    size?: number;
};

export default function Avatar({ user, size }: Props) {
    if (!user) {
        return <></>;
    }
    return (
        <div className="tooltip" data-tip={user.name || user.email}>
            <Image
                src={`https://picsum.photos/seed/${user.id}/32/32`}
                alt="avatar"
                width={size || 32}
                height={size || 32}
                className="rounded-full"
                style={{ height: size }}
            />
        </div>
    );
}

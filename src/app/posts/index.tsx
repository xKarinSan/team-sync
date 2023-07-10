import Link from "next/link";

const page = () => {
    return (
        <div>
            <h1>Posts</h1>
            <Link href="/user">User</Link>
            <Link href="/">Home</Link>
        </div>
    );
};

export default page;

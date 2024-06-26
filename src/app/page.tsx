import Insert from "@/components/action/insert/insert";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className='flex justify-center gap-3 mt-3 mb-4 text-xl items-center'>
        <h1>掲示板</h1>
        <ModeToggle />
        <Link href={'/edit'} className="absolute right-6 text-base">編集</Link>
      </div>
      <Insert />
    </div>
  );
}

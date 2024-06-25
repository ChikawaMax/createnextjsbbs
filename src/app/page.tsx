import Insert from "@/components/action/insert/insert";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Home() {
  return (
    <div>
      <div className='flex justify-center gap-3 mt-3 text-xl items-center'>
        <h1>掲示板</h1>
        <ModeToggle />
      </div>
      <Insert />
    </div>
  );
}

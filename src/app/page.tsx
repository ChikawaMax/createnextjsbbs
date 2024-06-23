import Delete from "@/components/action/delete/delete";
import Insert from "@/components/action/insert/insert";
import Select from "@/components/action/select/select";
import Update from "@/components/action/update/update";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-5">
      <Insert />
      <Select />
      <Update />
      <Delete />
    </div>
  );
}

"use client";
export default function Topbar({ icon, name, category }) {
  return (
    <div className="flex justify-between items-center md:text-base text-sm">
      <div className="flex gap-4 font-bold md:text-lg text-base">
        {icon}
        {name}
      </div>

      {category.map((e, i) => (
        <div>{e}</div>
      ))}
    </div>
  );
}

"use client";
import TemplateUI from "./TemplateUI";
import { Github } from "lucide-react";
import { Users } from "lucide-react";

export default function ServerUI({ onOpenModal }) {
  const name = "Servers";
  const category = ["Discover", "Categories", "Create Server"];

  return (
    <div className="p-5  min-w-[500px]">
      <TemplateUI
        icon={<Users size="30" />}
        name={name}
        category={category}
        onOpenModal={onOpenModal}
      />
    </div>
  );
}

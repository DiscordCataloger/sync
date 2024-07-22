"use client";
import React, { useState } from "react";
import ServerUI from "../../(components)/ServerUI";
import ServerModal from "@/app/(frontend)/(components)/ServerModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="bg-blue-100 h-screen">
      <ServerUI onOpenModal={handleOpenModal} />
      <ServerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

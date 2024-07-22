"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Categories({ category, position, setPosition }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="friend" variant="unset">
          {category}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-36"
      >
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="home">Home</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="gaming">Gaming</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

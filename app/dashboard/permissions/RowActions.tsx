// RowActions.tsx
"use client";

import { useState, useEffect } from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import DeleteGroup from "@/components/CRUD/Groups/DeleteGroup";
import EditGroup from "@/components/CRUD/Groups/EditGroup";
import { TablePermission } from "@/types";

export function RowActions({ row }: { row: Row<TablePermission> }) {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);

  const handleEditUserOpen = () => setIsEditUserOpen(true);
  const handleDeleteUserOpen = () => setIsDeleteUserOpen(true);
  // const handleCloseEditDialog = () => setIsEditUserOpen(false);

  // Client-only media query check: true if screen width >= 640px (sm)
  const [isSmUp, setIsSmUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = (e: MediaQueryListEvent) => setIsSmUp(e.matches);
    setIsSmUp(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none"
              aria-label="Edit item"
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleEditUserOpen}
              className="flex justify-between items-center"
            >
              <span>Edit Group</span>
              <Pencil className="text-blue-500" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteUserOpen}
              className="flex justify-between items-center"
            >
              <span>Delete Group</span>
              <Trash2 className="text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render Sheet only on screens >= sm, and Drawer only on smaller screens.
          Using the media query result avoids mounting both components on small
          screens. */}
      {isSmUp ? (
        <Sheet open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <SheetContent side="right" className="2xl:max-w-2xl">
            <SheetHeader></SheetHeader>
            <EditGroup roles={row.original} />
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DrawerContent className="flex flex-col h-full p-4">
            <EditGroup roles={row.original} />
          </DrawerContent>
        </Drawer>
      )}

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <AlertDialogContent>
          <DeleteGroup roles={row.original} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

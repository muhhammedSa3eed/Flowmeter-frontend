/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'react-hot-toast';
import MultipleSelector from '@/components/ui/multiselect';
import { Checkbox } from '@/components/ui/checkbox';

const CrudOptions = [
  { label: 'Create', value: 'canCreate' },
  { label: 'Read', value: 'canRead' },
  { label: 'Update', value: 'canUpdate' },
  { label: 'Delete', value: 'canDelete' },
];

const RoleSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  permissions: z.array(z.string()).optional(),
});
const availableTables = ['Devices', 'Users', 'Rfp', 'Permissions'];

export interface TablePermission {
  id: number;
  userId: number | null;
  roleId: number | null;
  tableName: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  user: any | null;
  role: {
    id: number;
    name: string;
  } | null;
}

export default function EditGroup({ roles }: { roles: TablePermission }) {
  const id = useId();
  console.log({ CrudOptions });
  const token = Cookies.get('token');
  const router = useRouter();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: roles.role?.name || '',
      permissions: [],
    },
  });

  useEffect(() => {
    const initialPerms: string[] = [];
    if (roles.canCreate) initialPerms.push('canCreate');
    if (roles.canRead) initialPerms.push('canRead');
    if (roles.canUpdate) initialPerms.push('canUpdate');
    if (roles.canDelete) initialPerms.push('canDelete');
    setSelectedPermissions(initialPerms);
  }, [roles]);

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    const payload = {
      name: values.name,
      permissions: [
        {
          canCreate: selectedPermissions.includes('canCreate'),
        },
        { canRead: selectedPermissions.includes('canRead') },
        { canUpdate: selectedPermissions.includes('canUpdate') },
        { canDelete: selectedPermissions.includes('canDelete') },
      ],
      // tableName: roles.tableName,
      // canCreate: selectedPermissions.includes('canCreate'),
      // canRead: selectedPermissions.includes('canRead'),
      // canUpdate: selectedPermissions.includes('canUpdate'),
      // canDelete: selectedPermissions.includes('canDelete'),
      // role: {
      //   id: roles.role?.id,
      //   name: values.name,
      // },
    };
    console.log({ payload });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/roles/${roles.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'An error occurred.');
      } else {
        toast.success('Group has been successfully updated.');
        form.reset();
        router.refresh();
      }
    } catch (err) {
      toast.error('Failed to update Group.');
    }
  }

  return (
    <div dir="ltr">
      <SheetTitle className="mb-2">Edit Group</SheetTitle>
      <SheetDescription className="mb-2">
        Modify the group name and table permissions.
      </SheetDescription>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Admin" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mx-auto max-w-auto">
            <div className="bg-background overflow-hidden  rounded-md border border-green-500">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-500 ">
                    <TableHead className="border-green-500">Table</TableHead>
                    <TableHead className="border-green-500">
                      Permissions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* <TableBody>
                  {availableTables.map((table) => (
                    <TableRow
                      key={table}
                      className="border-green-500  hover:bg-transparent"
                    >
                      <TableCell className="border-green-500 bg-muted/50">
                        <Checkbox
                          className="border-green-500"
                          checked={selectedPermissions.includes(table)}
                          onCheckedChange={(checked) =>
                            setSelectedPermissions((prev) =>
                              checked
                                ? [...prev, table]
                                : prev.filter((t) => t !== table)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="border-green-500 bg-muted/50">
                        {table}
                      </TableCell>
                      <TableCell className="border-green-500">
                        <MultipleSelector
                          className="border-green-500"
                          value={CrudOptions.filter((opt) =>
                            (tablePermissions[table] || []).includes(opt.value)
                          )}
                          onChange={(opts) =>
                            setTablePermissions((prev) => ({
                              ...prev,
                              [table]: opts.map((o) => o.value),
                            }))
                          }
                          options={CrudOptions}
                          placeholder="Select permissions"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
                <TableBody>
                  <TableRow className="border-green-500 [&>*:not(:last-child)]:border-r hover:bg-transparent h-[200px]">
                    <TableCell className="border-green-500 bg-muted/50 font-medium">
                      {roles.tableName}
                    </TableCell>
                    <TableCell className="border-green-500 flex items-start">
                      <MultipleSelector
                        className="border-green-500 z-50"
                        value={CrudOptions.filter((opt) =>
                          selectedPermissions.includes(opt.value)
                        )}
                        onChange={(opts) =>
                          setSelectedPermissions(opts.map((o) => o.value))
                        }
                        options={CrudOptions}
                        placeholder="Select permissions"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-muted-foreground mt-4 text-center text-sm">
              Table permissions per role
            </p>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button size="custom" variant="destructive" className="mr-auto">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" size="custom" variant="Accepted">
              Save
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </div>
  );
}

{
  /* <TableBody>
                  <TableRow className="border-green-500 [&>*:not(:last-child)]:border-r hover:bg-transparent">
                    <TableCell className="border-green-500 bg-muted/50">
                      {roles.tableName}
                    </TableCell>
                    <TableCell className="border-green-500">
                      <MultipleSelector
                        className="border-green-500"
                        value={CrudOptions.filter((opt) =>
                          selectedPermissions.includes(opt.value)
                        )}
                        onChange={(opts: any[]) =>
                          setSelectedPermissions(
                            opts.map((o: { value: any }) => o.value)
                          )
                        }
                        options={CrudOptions}
                        placeholder="Select permissions"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody> */
}

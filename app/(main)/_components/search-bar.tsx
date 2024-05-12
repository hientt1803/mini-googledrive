import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

type SearchBar = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export const SearchBar = ({ query, setQuery }: SearchBar) => {
  const searchForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setQuery(values.query);
  };

  return (
    <div className="my-5 md:my-0">
      <Form {...searchForm}>
        <form
          onSubmit={searchForm.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={searchForm.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search your file" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            variant={"secondary"}
            disabled={searchForm.formState.isSubmitting}
            className="flex gap-1"
          >
            {searchForm.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

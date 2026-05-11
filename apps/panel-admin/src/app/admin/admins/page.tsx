import { getAdministratorsAction } from "@/features/administrators/actions/get-administrators.action";
import { AdminsView } from "@/features/administrators/components/list/AdminsView/AdminsView";
import { ADMIN_DEFAULT_PAGE } from "@/features/administrators/constants/administrators.constants";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminsPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(ADMIN_DEFAULT_PAGE, Number(pageParam ?? ADMIN_DEFAULT_PAGE));

  const data = await getAdministratorsAction(page);

  return <AdminsView {...data} />;
}

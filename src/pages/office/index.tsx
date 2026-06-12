import { useUser } from "@/store/useUser";
import { useVisits } from "@/hooks/api/useVisits";
import { AppLayout } from "@/components/layout";

export default function Office() {
  const userStore = useUser();
  const orgUnit = userStore.organizationalUnit;

  const { data: response } = useVisits(orgUnit);
  const visits = response?.data;

  return (
    <AppLayout>
      <section>
        {visits?.map(() => (
          <div>1</div>
        ))}
      </section>
    </AppLayout>
  );
}

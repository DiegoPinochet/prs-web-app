import { ShowUserPrs } from "./_components/show-user-prs";
import { getCurrentUser } from "./_fetchers/get-current.fetcher";
import { getUserDisciplinesFetcher } from "./_fetchers/get-user-disciplines.fetcher";
import { UpsertPrDialog } from "./_components/upsert-pr-dialog";
import { listDisciplineFetcher } from "./_fetchers/list-disciplines.fetcher";

export default async function PR({ params }: { params: { username: string } }) {
  const [user, userDisciplines, disciplines] = await Promise.all([
    getCurrentUser(),
    getUserDisciplinesFetcher(params.username),
    listDisciplineFetcher(),
  ]);
  return (
    <div className="mt-5">
      {user && (
        <div className="flex flex-row px-4 w-full">
          <UpsertPrDialog
            username={params.username}
            disciplineOptions={disciplines}
          />
        </div>
      )}
      <ShowUserPrs
        username={params.username}
        userDisciplines={userDisciplines}
      />
    </div>
  );
}

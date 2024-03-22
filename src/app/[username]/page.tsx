"use server";

import { getUserDisciplinesFetcher } from "./_fetchers/get-user-disciplines.fetcher";
import { getCurrentUser } from "./_fetchers/get-current.fetcher";
import { UpsertPrDialog } from "./@pr/_components/upsert-pr-dialog";
import { ShowUserPrs } from "./_components/show-user-prs";
import { listDisciplineFetcher } from "./@pr/_fetchers/list-disciplines.fetcher";

const UserPRs = async ({ params }: { params: { username: string } }) => {
  const [user, userDisciplines, disciplines] = await Promise.all([
    getCurrentUser(),
    getUserDisciplinesFetcher(params.username),
    listDisciplineFetcher(),
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-center">
        PRs
      </h2>
      <p className="text-center">Busca PRs por disciplina y por ejericio.</p>

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
    </div>
  );
};

export default UserPRs;

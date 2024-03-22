import { Disciplines } from "../types";

export class DisciplineRepository {
  private disciplines = [
    {
      name: "Crossfit",
      value: "crossfit",
      exercises: [
        { name: "Squat Clean", value: "squat-clean" },
        { name: "OHS", value: "ohs" },
        { name: "Split Jerk", value: "split-jerk" },
        { name: "Back Squat", value: "back-squat" },
        { name: "Front Squat", value: "front-squat" },
        { name: "Strict Shoulder Press", value: "strict-shoulder-press" },
        { name: "Squat Snatch", value: "squat-snatch" },
        { name: "Deadlift", value: "deadlift" },
        { name: "Bench Press", value: "bench-press" },
        { name: "Push Press", value: "push-press" },
        { name: "Push Jerk", value: "push-jerk" },
        { name: "Thruster", value: "thruster" },
        { name: "Power Clean", value: "power-clean" },
        { name: "Power Snatch", value: "power-snatch" },
        { name: "Clean & Jerk", value: "clean-jerk" },
        { name: "Snatch", value: "snatch" },
        { name: "Clean", value: "clean" },
        { name: "Jerk", value: "jerk" },
      ],
    },
  ];
  async listDisciplines() {
    return this.disciplines;
  }

  async getDisciplineExercises(discipline: string) {
    return (
      this.disciplines.find((d) => d.value === discipline)?.exercises || []
    );
  }

  async mapDisciplines(disciplines: Disciplines[]): Promise<Disciplines[]> {
    const mappedDisciplines = disciplines.map((discipline) => {
      const mappedDiscipline = this.disciplines.find(
        (d) => d.value === discipline.name
      );

      if (!mappedDiscipline) {
        return;
      }

      return {
        name: mappedDiscipline.name,
        exercises: discipline.exercises.map((exercise) => {
          const mappedExercise = mappedDiscipline.exercises.find(
            (e) => e.value === exercise.name
          );

          if (!mappedExercise) {
            return;
          }

          return {
            name: mappedExercise.name,
            pr: exercise.pr,
          };
        }),
      };
    });

    console.log(mappedDisciplines);

    return mappedDisciplines.filter((d) => d) as Disciplines[];
  }
}

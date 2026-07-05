import { SubjectCard } from "@/components/subjects/subject-card"
import { H1, Muted } from "@/components/ui/typography"
import { subjects } from "@/lib/dummy-data"

export default function SubjectsIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <H1>Subjects</H1>
        <Muted>{subjects.length} subjects in your library</Muted>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  )
}

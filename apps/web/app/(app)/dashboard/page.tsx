import { BookOpen, FileCheck2, Flame, Target } from "lucide-react"

import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentChatsList } from "@/components/dashboard/recent-chats-list"
import { RecentUploadsList } from "@/components/dashboard/recent-uploads-list"
import { StatCard } from "@/components/dashboard/stat-card"
import { SubjectCard } from "@/components/subjects/subject-card"
import { H1, H2, Lead } from "@/components/ui/typography"
import { currentUser, documents, studyStreak, subjects } from "@/lib/dummy-data"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const firstName = currentUser.name.split(" ")[0]
  const activeSubjects = subjects.filter((s) => s.documentCount > 0)
  const avgMastery = Math.round(
    activeSubjects.reduce((sum, s) => sum + s.masteryPercent, 0) / activeSubjects.length
  )
  const readyDocuments = documents.filter((d) => d.status === "ready").length
  const recentSubjects = [...subjects]
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
    .slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>
          {getGreeting()}, {firstName}
        </H1>
        <Lead>
          You&apos;re on a {studyStreak.currentDays}-day study streak. Keep it up!
        </Lead>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Subjects" value={String(subjects.length)} icon={BookOpen} />
        <StatCard
          label="Documents ready"
          value={String(readyDocuments)}
          hint={`${documents.length} total`}
          icon={FileCheck2}
        />
        <StatCard
          label="Study streak"
          value={`${studyStreak.currentDays} days`}
          hint={`Best: ${studyStreak.longestDays} days`}
          icon={Flame}
        />
        <StatCard label="Average mastery" value={`${avgMastery}%`} icon={Target} />
      </div>

      <section className="flex flex-col gap-4">
        <H2>Recent subjects</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <H2>Recent uploads</H2>
          <RecentUploadsList />
        </section>

        <section className="flex flex-col gap-4">
          <H2>Recent chats</H2>
          <RecentChatsList />
        </section>
      </div>

      <section className="flex flex-col gap-4">
        <H2>Quick actions</H2>
        <QuickActions />
      </section>
    </div>
  )
}

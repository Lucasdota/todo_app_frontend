import Interface from "@/components/dashboard/Interface";

export const metadata = {
  title: "To-do List | Dashboard",
  description: "Create and customize your to-dos online.",
  keywords: ["To-do list", "online", "application"],
};

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 md:p-2">
      <Interface />
    </main>
  );
}

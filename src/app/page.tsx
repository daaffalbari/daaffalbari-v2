import { getAllProjects } from "@/lib/projects";
import { getCmsPostListItems } from "@/lib/posts";
import { HomeClient } from "@/components/HomeClient";

export default async function Home() {
  const [projects, cmsPosts] = await Promise.all([
    getAllProjects(),
    getCmsPostListItems(),
  ]);
  return <HomeClient projects={projects} cmsPosts={cmsPosts} />;
}

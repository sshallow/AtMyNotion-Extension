import fetchClient from "~fetch/fetch";

interface Page {
    id: string;
    pageId: string
    name: string;
    fullIconUrl: string;
    visitedAt: number;
}

interface RecentPageVisitsResponse {
    pages: Page[];
}

async function fetchRecentPageVisits(userId: string, spaceId: string): Promise<RecentPageVisitsResponse> {

    console.log("fetchRecentPageVisits")
    const response = await fetchClient({
        url: "https://www.notion.so/api/v3/getRecentPageVisits",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Notion-Active-User-Header": userId,
            "X-Notion-Space-Id": spaceId,
        },
        body: {
            userId: userId,
            spaceId: spaceId
        }
    });

    if (!response) {
        throw new Error("Network response was not ok");
    }

    console.log("fetchRecentPageVisits res",response.json())
    return await response.json();
}

export default fetchRecentPageVisits;

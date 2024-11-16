import { google } from "googleapis";
import { config } from "dotenv";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import ja from "dayjs/locale/ja";

if (process.env.NODE_ENV !== "production") {
  config();
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
dayjs.locale(ja);

const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

type YoutubeInfo = {
  channelTitle: string;
  publishedAt: string;
  videoTitle: string;
  description: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  url: string;
};

const fetchStatistics = async (
  youtube: ReturnType<typeof google.youtube>,
  videoId: string,
) => {
  const res = await youtube.videos.list({
    part: ["statistics"],
    id: [videoId],
  });
  return res.data.items?.[0].statistics ?? {};
};

export const searchYoutube = async (keyword: string) => {
  const result: YoutubeInfo[] = [];

  const youtube = google.youtube({
    version: "v3",
    auth: GOOGLE_CLOUD_API_KEY,
  });

  const res = await youtube.search.list({
    q: keyword,
    part: ["snippet"],
    relevanceLanguage: "ja",
    type: ["video"],
    order: "viewCount",
    maxResults: 5,
  });
  const youtubeItems = res.data.items ?? [];

  for (const youtubeItem of youtubeItems) {
    const videoId = youtubeItem.id?.videoId ?? "";
    const statistics = await fetchStatistics(youtube, videoId);

    result.push({
      channelTitle: youtubeItem.snippet?.channelTitle ?? "",
      publishedAt:
        dayjs(youtubeItem.snippet?.publishedAt)
          .tz()
          .format("YYYY年MM月DD日(ddd)") ?? "",
      videoTitle: youtubeItem.snippet?.title ?? "",
      description: youtubeItem.snippet?.description ?? "",
      viewCount: statistics.viewCount ?? "",
      likeCount: statistics.likeCount ?? "",
      commentCount: statistics.likeCount ?? "",
      url: `https://www.youtube.com/watch?v=${videoId}`,
    });
  }

  return result;
};

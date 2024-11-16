import { parse } from "json2csv";
import { YoutubeInfo } from "../api/youtube.js";
import path from "path";
import { writeFileSync } from "fs";

export const downloadCSVSearchResult = (result: YoutubeInfo[]) => {
  const fields = [
    { label: "チャンネル名", value: "channelTitle" },
    { label: "公開日", value: "publishedAt" },
    { label: "動画名", value: "videoTitle" },
    { label: "概要", value: "description" },
    { label: "視聴回数", value: "viewCount" },
    { label: "いいね数", value: "likeCount" },
    { label: "コメント数", value: "commentCount" },
    { label: "URL", value: "url" },
  ];

  const output = parse(result, { fields: fields, withBOM: true });
  const filePath = path.resolve("./search_result.csv");
  writeFileSync(filePath, output, "utf-8");
};

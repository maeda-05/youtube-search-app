import { searchYoutube } from "./api/youtube.js";
import { downloadCSVSearchResult } from "./lib/json2csv.js";

const searchByKeyword = async (keyword: string) => {
  try {
    if (!keyword) {
      console.log("キーワードを指定してください");
      return;
    }

    const res = await searchYoutube(keyword);
    if (res.length <= 0) {
      console.log("検索結果が見つかりませんでした");
      return;
    } else {
      console.log(res);
      downloadCSVSearchResult(res);
      return;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const keyword = process.argv[2];
searchByKeyword(keyword);

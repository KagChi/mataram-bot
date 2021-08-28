import axios from "axios";
import cheerio from "cheerio";

const filteredImageLink = ["https://1cak.com/images/unsave.jpg"];

class oneCakScrape {
    public lastImageUrl: string | null = null;
    public lastTitle: string | null = null;
    async getFirstImage() {
        const html = await this.getWebData();
        const imageLink = this.filterImageOnly(html);
        const titleImage = this.filterTextOnly(html);
        if (filteredImageLink.includes(imageLink!)) this.getFirstImage();
        if (this.lastImageUrl === imageLink && this.lastTitle === titleImage!) this.getFirstImage();
        this.lastImageUrl = imageLink!;
        this.lastTitle = titleImage!;
        return { url: imageLink!, title: titleImage! };
    }

    private async getWebData() {
        const data = await axios.get("https://1cak.com/shuffle");
        return data.data;
    }

    private filterImageOnly(htmlData: any) {
        const $ = cheerio.load(htmlData);
        return $("img").attr("src");
    }

    private filterTextOnly(htmlData: any) {
        const $ = cheerio.load(htmlData);
        return $("img").attr("title");
    }
}

export const oneCak = new oneCakScrape();

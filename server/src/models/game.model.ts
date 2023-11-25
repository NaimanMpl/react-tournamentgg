export class Game {

    private id: number;
    private title: string;
    private category: string;
    private description: string;
    private date: Date;
    private platform: string;
    private coverImg: string;

    constructor(id: number, title: string, category: string, description: string, date: Date, platform: string, coverImg: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.date = date;
        this.platform = platform;
        this.coverImg = coverImg;
    }

    public toObject = () => {
        return {
            gameId: this.id,
            title: this.title,
            category: this.category,
            description: this.description,
            date: this.date,
            platform: this.platform,
            image: this.coverImg
        }
    }

}
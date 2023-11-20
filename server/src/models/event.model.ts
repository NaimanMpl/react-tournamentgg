export class Event {

    private id: number
    private title: string;
    private description: string;
    private start: Date;
    private end: Date;

    constructor(id: number, title: string, description: string, start: Date, end: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }

    public toArray = (): Object => {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            start: this.start.toISOString(),
            end: this.end.toISOString()
        }
    }

    public getId = (): number => {
        return this.id;
    }

}
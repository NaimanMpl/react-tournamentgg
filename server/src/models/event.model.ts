import { Game } from "./game.model";

export class Event {

    private id: number
    private title: string;
    private description: string;
    private start: Date;
    private end: Date;
    private participant: number;
    private game: Game;

    constructor(id: number, title: string, description: string, start: Date, end: Date, participant: number, game: Game) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.participant = participant;
        this.game = game;
    }

    public toArray = (): Object => {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            participant: this.participant,
            game: this.game.toObject()
        }
    }

    public getId = (): number => {
        return this.id;
    }

}
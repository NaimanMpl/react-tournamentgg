import User from "../interfaces/user.interface";
import { Game } from "./game.model";

export class Event {

    private id: string
    private title: string;
    private description: string;
    private start: Date;
    private end: Date;
    private participant: number;
    private game: Game;
    private users: Array<User>;

    constructor(id: string, title: string, description: string, start: Date, end: Date, participant: number, game: Game, users: Array<User>) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.participant = participant;
        this.game = game;
        this.users = users;
    }

    public toArray = (): Object => {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            participant: this.participant,
            game: this.game.toObject(),
            users: this.users
        }
    }

    public getId = (): string => {
        return this.id;
    }

}
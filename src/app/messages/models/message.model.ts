import { Offre } from "./offre.model";

export class Message {
    public id!: string;
    public offre?: Offre;
    public idUserEnvoi!: number;
    public dateEnvoi!: Date;
    public texte?: string;
}

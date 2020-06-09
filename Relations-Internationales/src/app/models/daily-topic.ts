/**
 * Représente un problème journalier
 */
export class DailyTopic {

    private idDailyTopic: string;
    private dateDailyTopic: Date;
    private description: string;
    private name: string;
    private idPerson: string;
    private type: string;

    constructor(data: object) {
        const dailyTopic = data || {};
        this.idDailyTopic = dailyTopic['idDailyTopic'];
        this.dateDailyTopic = new Date(dailyTopic['dateDailyTopic']);
        this.description = dailyTopic['description'];
        this.name = dailyTopic['name'];
        this.idPerson = dailyTopic['idPerson'];
        this.type = dailyTopic['type'];
    }

    public getIdDailyTopic(): string { return this.idDailyTopic; }
    public getDateDailyTopic(): Date { return this.dateDailyTopic; }
    public getDescription(): string { return this.description; }
    public getName(): string { return this.name; }
    public getIdPerson(): string { return this.idPerson; }
    public getType(): string { return this.type; }

    public setIdDailyTopic(value: string): void { this.idDailyTopic = value; }
    public setDateDailyTopic(value: Date): void { this.dateDailyTopic = value; }
    public setDescription(value: string): void { this.description = value; }
    public setName(value: string): void { this.name = value; }
    public setIdPerson(value: string): void { this.idPerson = value; }
    public setType(value: string): void { this.type = value; }
}

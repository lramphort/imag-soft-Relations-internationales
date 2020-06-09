/**
 * Représente une réponse possible
 */
export class PossibleAnswer {

    private idPossibleAnswer: string;
    private idPoll: string;
    private value: string;

    constructor(data: object) {
        const possibleAnswer = data || {};
        this.idPossibleAnswer = possibleAnswer['idPossibleAnswer'];
        this.idPoll = possibleAnswer['idPoll'];
        this.value = possibleAnswer['valuePossibleAnswer'];
    }

    public getIdPossibleAnswer(): string { return this.idPossibleAnswer; }
    public getIdPoll(): string { return this.idPoll; }
    public getValue(): string { return this.value; }

    public setIdPossibleAnswer(value: string): void { this.idPossibleAnswer = value; }
    public setIdPoll(value: string): void { this.idPoll = value; }
    public setValue(value: string): void { this.value = value; }
}

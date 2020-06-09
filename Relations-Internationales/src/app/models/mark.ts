/**
 * Représente une note
 */
export class Mark {

    private idMark: string;
    private idCourse: string;
    private idPerson: string;
    private typeMark: string;
    private valueMark: number;

    constructor(data: object) {
        const mark = data || {};
        this.idMark = mark['idMark'];
        this.idCourse = mark['idCourse'];
        this.idPerson = mark['idPerson'];
        this.typeMark = mark['typeMark'];
        this.valueMark = mark['valueMark'];
    }

    public getIdMark(): string { return this.idMark; }
    public getIdCourse(): string { return this.idCourse; }
    public getIdPerson(): string { return this.idPerson; }
    public getTypeMark(): string { return this.typeMark; }
    public getValueMark(): number { return this.valueMark; }

    public setIdMark(value: string): void { this.idMark = value; }
    public setIdCourse(value: string): void { this.idCourse = value; }
    public setIdPerson(value: string): void { this.idPerson = value; }
    public setTypeMark(value: string): void { this.typeMark = value; }
    public setValueMark(value: number): void { this.valueMark = value; }
}

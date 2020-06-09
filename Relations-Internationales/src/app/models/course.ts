/**
 * Représente un cour
 */
export class Course {

    private idCourse: string;
    private description: string;
    private name: string;
    private ects: string;
    private idPerson: string;
    private teacherFullName: string;
    private teacherEmail: string;
    private lastCommentary: string;
    private codeUE: string;
    private semester: string;
    private state: string;
    private lastModification: Date;

    constructor(data?: object) {
        const course = data || {};

        this.idCourse = course['idCourse'];
        this.description = course['description'];
        this.name = course['name'];
        this.ects = course['ects'];
        this.idPerson = course['idPerson'];
        this.teacherFullName = course['teacherFullName'];
        this.teacherEmail = course['teacherEmail'];
        this.codeUE = course['codeUE'];
        this.semester = course['semester'];
        this.state = course['state'];
        this.lastModification = course['lastModification'];
    }

    public getIdCourse(): string { return this.idCourse; }
    public getDescription(): string { return this.description; }
    public getName(): string { return this.name; }
    public getEcts(): string { return this.ects; }
    public getIdPerson(): string { return this.idPerson; }
    public getTeacherFullName(): string { return this.teacherFullName; }
    public getTeacherEmail(): string { return this.teacherEmail; }
    public getCodeUE(): string { return this.codeUE; }
    public getSemester(): string { return this.semester; }
    public getState(): string { return this.state; }
    public getLastModification(): Date { return this.lastModification; }

    public setIdCourse(value: string): void { this.idCourse = value; }
    public setDescription(value: string): void { this.description = value; }
    public setName(value: string): void { this.name = value; }
    public setEcts(value: string): void { this.ects = value; }
    public setIdPerson(value: string): void { this.idPerson = value; }
    public setTeacherFullName(value: string): void { this.teacherFullName = value; }
    public setTeacherEmail(value: string): void { this.teacherEmail = value; }
    public setCodeUE(value: string): void { this.codeUE = value; }
    public setSemester(value: string): void { this.semester = value; }
    public setState(value: string): void { this.state = value; }
}

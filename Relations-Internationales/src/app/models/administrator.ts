/**
 * Représente un administrateur
 */
export class Administrator {

    private idPerson: string;
    private emailAddress: string;
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private lastConnection: Date;
    private phoneNumber: string;

    constructor(data: object) {
        const administrator = data || {};
        this.idPerson = administrator['idPerson'];
        this.emailAddress = administrator['emailAddress'];
        this.firstName = administrator['firstName'];
        this.lastName = administrator['lastName'];
        this.birthDate = administrator['birthDate'];
        this.lastConnection = administrator['lastConnection'];
        this.phoneNumber = administrator['phoneNumber'];
    }

    public getIdPerson(): string { return this.idPerson; }
    public getEmailAddress(): string { return this.emailAddress; }
    public getFirstName(): string { return this.firstName; }
    public getLastName(): string { return this.lastName; }
    public getBirthDate(): Date { return this.birthDate; }
    public getLastConnection(): Date { return this.lastConnection; }
    public getPhoneNumber(): string { return this.phoneNumber; }

    public setIdPerson(value: string): void { this.idPerson = value; }
    public setEmailAddress(value: string): void { this.emailAddress = value; }
    public setFirstName(value: string): void { this.firstName = value; }
    public setLastName(value: string): void { this.lastName = value; }
    public setBirthDate(value: Date): void { this.birthDate = value; }
    public setLastConnection(value: Date): void { this.lastConnection = value; }
    public setPhoneNumber(value: string): void { this.phoneNumber = value; }
}

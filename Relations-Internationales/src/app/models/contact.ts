/**
 * Représente un contact
 */
export class Contact {

    private idContact: string;
    private idPerson: string;
    private emailAddress: string;
    private firstName: string;
    private lastName: string;
    private phoneNumber: string;
    private affiliation: string;
    private description: string;

    constructor(data: object) {
        const contact = data || {};
        this.idContact = contact['idContact'];
        this.idPerson = contact['idPerson'];
        this.emailAddress = contact['emailAddress'];
        this.firstName = contact['firstName'];
        this.lastName = contact['lastName'];
        this.phoneNumber = contact['phoneNumber'];
        this.affiliation = contact['affiliation'];
        this.description = contact['description'];
    }

    public getIdContact(): string { return this.idContact; }
    public getIdPerson(): string { return this.idPerson; }
    public getEmailAddress(): string { return this.emailAddress; }
    public getFirstName(): string { return this.firstName; }
    public getLastName(): string { return this.lastName; }
    public getPhoneNumber(): string { return this.phoneNumber; }
    public getAffiliation(): string { return this.affiliation; }
    public getDescription(): string { return this.description; }

    public setIdContact(value: string): void { this.idContact = value; }
    public setIdPerson(value: string): void { this.idPerson = value; }
    public setEmailAddress(value: string): void { this.emailAddress = value; }
    public setFirstName(value: string): void { this.firstName = value; }
    public setLastName(value: string): void { this.lastName = value; }
    public setPhoneNumber(value: string): void { this.phoneNumber = value; }
    public setAffiliation(value: string): void { this.affiliation = value; }
    public setDescription(value: string): void { this.description = value; }
}

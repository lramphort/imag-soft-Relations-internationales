/**
 * Représente un étudiant
 */
export class Student {

    private idPerson: string;
    private emailAddress: string;
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private lastConnection: Date;
    private phoneNumber: string;
    private university: string;
    private isEntrant: string;
    private isArchived: string;
    private isLearningAgreementValid: string;
    private dateLearningAgreementValid: Date;
    private hasNewDailyTopics: string;

    constructor(data: object) {
        const student = data || {};

        this.idPerson = student['idPerson'];
        this.emailAddress = student['emailAddress'];
        this.firstName = student['firstName'];
        this.lastName = student['lastName'];
        this.birthDate = student['birthDate'];
        this.lastConnection = student['lastConnection'];
        this.phoneNumber = student['phoneNumber'];
        this.university = student['university'];
        this.isEntrant = student['isEntrant'];
        this.isArchived = student['isArchived'];
        this.isLearningAgreementValid = student['isLearningAgreementValid'];
        this.dateLearningAgreementValid = student['dateLearningAgreementValid'] || null;
    }

    public getIdPerson(): string { return this.idPerson; }
    public getEmailAddress(): string { return this.emailAddress; }
    public getFirstName(): string { return this.firstName; }
    public getLastName(): string { return this.lastName; }
    public getBirthDate(): Date { return this.birthDate; }
    public getLastConnection(): Date { return this.lastConnection; }
    public getPhoneNumber(): string { return this.phoneNumber; }
    public getUniversity(): string { return this.university; }
    public getIsEntrant(): string { return this.isEntrant; }
    public getIsArchived(): string { return this.isArchived; }
    public getIsLearningAgreementValid(): string { return this.isLearningAgreementValid; }
    public getDateLearningAgreementValid(): Date { return this.dateLearningAgreementValid; }
    public getHasNewDAilyTopics(): string { return this.hasNewDailyTopics; }

    public setIdPerson(value: string): void { this.idPerson = value; }
    public setEmailAddress(value: string): void { this.emailAddress = value; }
    public setFirstName(value: string): void { this.firstName = value; }
    public setLastName(value: string): void { this.lastName = value; }
    public setBirthDate(value: Date): void { this.birthDate = value; }
    public setLastConnection(value: Date): void { this.lastConnection = value; }
    public setPhoneNumber(value: string): void { this.phoneNumber = value; }
    public setUniversity(value: string): void { this.university = value; }
    public setIsEntrant(value: string): void { this.isEntrant = value; }
    public setIsArchived(value: string): void { this.isArchived = value; }
    public setIsLearningAgreementValid(value: string): void { this.isLearningAgreementValid = value; }
    public setDateLearningAgreementValid(value: Date): void { this.dateLearningAgreementValid = value; }
    public setHasNewDAilyTopics(value: string): void { this.hasNewDailyTopics = value; }
}

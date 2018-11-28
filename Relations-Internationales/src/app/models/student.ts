import { Person } from './person';
import { Contact } from './contact';
import { Course } from './course';
import { DailyTopic } from './daily-topic';

export class Student extends Person {

    private university: string;
    private isEntrant: boolean;
    private isArchived: boolean;
    private isLearningAgreementValid: { value: boolean, date: Date };
    private courses: Course[];
    private contacts: Contact[];
    private dailyTopics: DailyTopic[];

    constructor(idPerson: string, emailAddress: string, firstName: string, lastName: string,
        birthDate: Date, lastConnection: Date, phoneNumber: string,
        university: string, isEntrant: boolean, isArchived: boolean, courses: Course[],
        contacts: Contact[], dailyTopics: DailyTopic[]) {
        super(idPerson, emailAddress, firstName, lastName, birthDate, lastConnection, phoneNumber);
        this.university = university;
        this.isEntrant = isEntrant;
        this.isArchived = isArchived;
        this.isLearningAgreementValid = { value: false, date: null };
        this.courses = courses;
        this.contacts = contacts;
        this.dailyTopics = dailyTopics;
    }

    public getUniversity(): string { return this.university; }
    public getIsEntrant(): boolean { return this.isEntrant; }
    public getIsArchived(): boolean { return this.isArchived; }
    public getIsLearningAgreementValid(): { value: boolean, date: Date } { return this.isLearningAgreementValid; }
    public getCourses(): Course[] { return this.courses; }
    public getContacts(): Contact[] { return this.contacts; }
    public getDailyTopics(): DailyTopic[] { return this.dailyTopics; }

    public setUniversity(value: string): void { this.university = value; }
    public setIsEntrant(value: boolean): void { this.isEntrant = value; }
    public setIsArchived(value: boolean): void { this.isArchived = value; }
    public setIsLearningAgreementValid(value: { value: boolean, date: Date }): void { this.isLearningAgreementValid = value; }
    public setCourses(value: Course[]): void { this.courses = value; }
    public setDailyTopics(value: DailyTopic[]): void { this.dailyTopics = value; }
}

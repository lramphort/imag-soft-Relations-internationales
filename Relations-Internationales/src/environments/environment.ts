// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ip_address: 'http://im2ag-relations-internationales.univ-grenoble-alpes.fr',
  back: {
    login_student: '/student/login_student.php',
    login_administrator: '/administrator/login_administrator.php',

    get_administrators: '/administrator/get_administrator.php',

    get_students: '/student/get_student.php',
    add_student: '/student/add_student.php',
    delete_student: '/student/delete_student.php',
    update_LA_student: '/student/update_LA_student.php',
    update_isArchived_student: '/student/update_is-archived_student.php',

    get_courses: '/course/get_course.php',
    add_course: '/course/add_course.php',
    delete_course: '/course/delete_course.php',
    update_state_course: '/course/update_state_course.php',

    get_contacts: '/contact/get_contact.php',
    add_contact: '/contact/add_contact.php',
    delete_contact: '/contact/delete_contact.php',

    get_dailyTopics: '/daily_topic/get_daily_topic.php',
    add_dailyTopic: '/daily_topic/add_daily_topic.php',
    delete_dailyTopic: '/daily_topic/delete_daily_topic.php',

    get_marks: '/mark/get_mark.php',
    add_mark: '/mark/add_mark.php',
    delete_mark: '/mark/delete_mark.php',

    get_polls: '/poll/get_poll.php',
    add_poll: '/poll/add_poll.php',
    delete_poll: '/poll/delete_poll.php',
    update_poll: '/poll/update_poll.php',

    add_possibleAnswer: '/possibleAnswer/add_possibleAnswer.php',
    get_possibleAnswers: '/possibleAnswer/get_possibleAnswer.php',

    count_dailyTopics_not_seen: '/administrator/count_daily_topic_not_seen.php',
    update_dailyTopic: '/administrator/update_daily_topic.php',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

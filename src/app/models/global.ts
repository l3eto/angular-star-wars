export class Global {
    constructor(username: string, authdata: string) {
        this.currentUser = {
            username: username,
            authdata: authdata
        };
    }
    currentUser: {
        username: string;
        authdata: string;
    };
}
export class GlobalUser {
    constructor(username: string, authdata: string) {
        this.username = username;
        this.authdata = authdata;
    }
    username: string;
    authdata: string;
}
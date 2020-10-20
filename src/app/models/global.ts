import { GlobalUser } from './global-user';

export class Global {
    constructor(currentUser: GlobalUser) {
        this.currentUser = currentUser;
    }
    currentUser: GlobalUser;
}